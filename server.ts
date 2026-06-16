import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// Helper to interact with Gemini safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in the Secrets panel.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// Preset products in case the user does not have a real label to scan, providing fully integrated OCR-like mock data
const PRESET_PRODUCTS: Record<string, { name: string; ingredients: string; desc: string }> = {
  refrigerante: {
    name: 'Refrigerante Cola Tradicional',
    ingredients: 'Água gaseificada, açúcar, extrato de noz de cola, cafeína, acidulante ins 338, corante ins 150d.',
    desc: 'Bebida ultraprocessada com alta concentração de açúcar e zero densidade nutricional.'
  },
  suco_laranja: {
    name: 'Suco de Laranja 100% Integral Perpétuo',
    ingredients: 'Suco de laranja pasteurizado integral. Rico em vitamina C.',
    desc: 'Suco integral sem adição de açúcares ou conservantes.'
  },
  multivitaminico: {
    name: 'NutriDaily Multivitamínico Premium',
    ingredients: 'Carbonato de cálcio, óxido de magnésio, ácido ascórbico (Vitamina C), acetato de tocoferol (Vitamina E), óxido de zinco, pantotenato de cálcio (Vitamina B5), riboflavina (Vitamina B2), cloridrato de piridoxina (Vitamina B6), tiamina (Vitamina B1), sulfato de manganês, óxido de cobre, retinol (Vitamina A), ácido fólico (Vitamina B9), fitomenadiona (Vitamina K1), biotina (Vitamina B7), colecalciferol (Vitamina D3), cianocobalamina (Vitamina B12).',
    desc: 'Suplemento concentrado para reposição de micronutrientes.'
  },
  whey_protein: {
    name: 'Super Whey Isolado Concentrado',
    ingredients: 'Proteína isolada do soro do leite (WPI), aroma idêntico ao natural de baunilha, edulcorante sucralose, ferro quelado, zinco, vitamina B12.',
    desc: 'Suplemento proteico fortificado com ferro e zinco.'
  },
  salgadinho: {
    name: 'Salgadinho Crunch Sabor Queijo',
    ingredients: 'Farinha de milho enriquecida com ferro e ácido fólico, óleos vegetais, sal, condimento preparado sabor queijo (contém realçador de sabor glutamato monossódico), maltodextrina, corante natural urucum, alto teor de sódio.',
    desc: 'Salgadinho de milho frito com alto teor de sódio e gorduras saturadas.'
  }
};

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '15mb' }));

  // --- API ROUTE: NUTRITIONIST CHAT ---
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Mensagens inválidas ou não informadas.' });
      }

      // Convert format of messages for @google/genai
      // Roles must be "user" or "model"
      const formattedContents = messages.map(msg => {
        const role = msg.sender === 'user' ? 'user' : 'model';
        return {
          role,
          parts: [{ text: msg.text }]
        };
      });

      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction: `Você é o "Nutricionista IA", mestre especialista da Vitaminapédia AI.
Você responde com precisão científica mas de maneira simples, entusiasta, acolhedora e inspiradora.
Seu objetivo é desmistificar e ensinar o papel das vitaminas, minerais e nutrientes na saúde cotidiana das pessoas.
Diga sempre como cada nutriente age biologicamente (ex: "ajuda como uma chave para absorver cálcio" etc.).
Sempre responda em português do Brasil, utilizando formatação markdown limpa (negrito para nomes de vitaminas, espaçamento agradável). 
Evite jargões científicos excessivamente densos sem uma explicação simples associada. Se o usuário falar sobre sintomas como cansaço, pele seca ou falta de concentração, relacione didaticamente com as possíveis vitaminas e minerais associadas ao corpo humano (como B12 para cansaço, Zinco para imunidade e pele, etc.).`
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Chat API Error:', error);
      res.status(500).json({ error: error.message || 'Erro interno ao processar chat com Gemini.' });
    }
  });

  // --- API ROUTE: SMART LABEL SCANNER ---
  app.post('/api/scan', async (req, res) => {
    try {
      const { image, presetId } = req.body;
      const ai = getGeminiClient();

      let contents: any[] = [];
      let promptText = `Analise este rótulo ou lista de ingredientes de alimento/suplemento. Retorne uma resposta rigorosamente estruturada em formato JSON.
Você deve calcular uma Nota Nutricional de 0 a 100 baseada na qualidade e densidade de micronutrientes (vitaminas, minerais, proteínas) vs presença de aditivos ruins (excesso de sódio, açúcares simples, gordura trans, conservantes químicos, glutamato).

O gradeColor deve ser:
- 'green' para pontuações de 80 a 100
- 'yellow' para pontuações de 50 a 79
- 'red' para pontuações de 0 a 49

No campo detectedNutrients, liste quaisquer vitaminas, minerais ou macronutrientes importantes identificados na imagem ou texto de ingredientes, estime/leia a quantidade e a porcentagem diária recomendada (se visível ou aproximada biologicamente) e especifique se o status do nutriente naquele produto é 'high', 'adequate' ou 'low'.
No campo aiExplanation, forneça 3 a 4 parágrafos ou frases explicativas ricas sobre o produto ("Este produto possui...", "É excelente para...", "Alerta para...").
No campo alerts, insira alertas caso o produto possua sódio elevado, muito açúcar, adoçantes prejudiciais ou corantes artificiais (ex: "⚠ Alto açúcar", "⚠ Alto sódio"). Se for saudável, insira comentários positivos de alerta (ex: "✔ Excelente Fonte de Fibras").

No campo whatYouAreIngesting, detalhe e descreva de forma simples em português quais substâncias e ingredientes principais (ou aditivos) o usuário de fato estará ingerindo. Dê uma descrição esclarecedora e use as categorias: 'positive' para ingredientes saudáveis, 'neutral' para ingredientes neutros, ou 'negative' para aditivos nocivos, açúcares refinados, gorduras ruins ou estimulantes prejudiciais.

No campo bodyImpact, faça um mapeamento primoroso das partes e órgãos do corpo humano que serão afetados direta ou indiretamente com essa ingestão (ex: Cérebro, Coração, Fígado, Rins, Estômago, Ossos, Pele/Cabelo, Músculos, etc.). Explique em detalhes o lado positivo (o efeito benéfico ou preventivo quando consumido em quantidade adequada) e o lado negativo (o risco ou malefício à saúde caso seja consumido em excesso ou devido à toxicidade dos aditivos desse produto específico), terminando com uma diretriz clara de dose/frequência preventiva sugerida.`;

      if (presetId && PRESET_PRODUCTS[presetId]) {
        const preset = PRESET_PRODUCTS[presetId];
        contents = [
          {
            text: `${promptText}\n\nProduto sendo analisado (Preset do Sistema):\nNome: ${preset.name}\nIngredientes: ${preset.ingredients}\nDescrição básica: ${preset.desc}`
          }
        ];
      } else if (image) {
        // Image scanned or captured
        let cleanBase64 = image;
        let mimeType = 'image/jpeg';

        // Match data:image/png;base64,...
        const match = image.match(/^data:([^;]+);base64,(.*)$/);
        if (match) {
          mimeType = match[1];
          cleanBase64 = match[2];
        }

        const imagePart = {
          inlineData: {
            mimeType,
            data: cleanBase64
          }
        };

        const textPart = {
          text: `${promptText}\n\nPor favor, faça um OCR (leitura ótica) deste rótulo nutricional e retorne os dados no formato JSON especificado.`
        };

        contents = [{ parts: [imagePart, textPart] }];
      } else {
        return res.status(400).json({ error: 'Nenhuma imagem ou preset fornecido para análise.' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              productName: { type: Type.STRING },
              score: { type: Type.INTEGER },
              gradeText: { type: Type.STRING, description: "ex: '92/100 Excelente' ou '35/100 Baixa Qualidade'" },
              gradeColor: { type: Type.STRING, description: "must be exactly 'green', 'yellow' or 'red'" },
              aiExplanation: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              alerts: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              detectedNutrients: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    amount: { type: Type.STRING, description: "ex: '15g' ou '120mg' ou 'Não especificado'" },
                    percentage: { type: Type.STRING, description: "ex: '40% VD' ou '0%'" },
                    status: { type: Type.STRING, description: "exactly 'high', 'adequate' or 'low'" }
                  },
                  required: ['name', 'amount', 'percentage', 'status']
                }
              },
              whatYouAreIngesting: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    item: { type: Type.STRING },
                    category: { type: Type.STRING, description: "must be 'positive', 'neutral' or 'negative'" },
                    description: { type: Type.STRING }
                  },
                  required: ['item', 'category', 'description']
                }
              },
              bodyImpact: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    organ: { type: Type.STRING, description: "ex: 'Cérebro', 'Coração', 'Fígado', 'Rins', 'Estômago', 'Ossos', 'Pele/Cabelo'" },
                    icon: { type: Type.STRING, description: "emoji como 🧠, ❤️, 🛡️, 🦴, etc." },
                    intro: { type: Type.STRING, description: "introdução do impacto" },
                    goodEffect: { type: Type.STRING, description: "benefício na quantidade correta" },
                    badEffect: { type: Type.STRING, description: "problema se consumir em excesso" },
                    doseGuideline: { type: Type.STRING, description: "recomendação de limite diário" }
                  },
                  required: ['organ', 'icon', 'intro', 'goodEffect', 'badEffect', 'doseGuideline']
                }
              }
            },
            required: ['productName', 'score', 'gradeText', 'gradeColor', 'aiExplanation', 'alerts', 'detectedNutrients', 'whatYouAreIngesting', 'bodyImpact']
          }
        }
      });

      const parsedResult = JSON.parse(response.text || '{}');
      res.json(parsedResult);
    } catch (error: any) {
      console.error('Scan API Error:', error);
      res.status(500).json({ error: error.message || 'Erro ao escanear o rótulo.' });
    }
  });

  // --- API ROUTE: PREVENTATIVE HEALTH QUESTIONNAIRE ANALYSIS ---
  app.post('/api/saude-preventiva', async (req, res) => {
    try {
      const { quiz } = req.body;
      if (!quiz) {
        return res.status(400).json({ error: 'Dados do questionário não fornecidos.' });
      }

      const ai = getGeminiClient();
      const promptText = `Você é um algoritmo de medicina nutricional preventiva avançado.
Analise os seguintes dados auto-relatados de hábitos e sintomas de um indivíduo e gere um diagnóstico de probabilidade de carências ou deficiências vitamínicas e minerais de forma didática e detalhada. Fale sobre sol, hábitos, e qual vitamina/mineral precisa focar.

DADOS DO USUÁRIO:
- Idade: ${quiz.age} anos
- Sexo: ${quiz.gender}
- Tipo de Alimentação: ${quiz.diet} (Ex: vegetal, carnes, misturado)
- Qualidade Geral da Dieta declarada: ${quiz.dietQuality}
- Nível de Exposição Solar diária: ${quiz.sunExposure}
- Nível de Energia geral: ${quiz.energyLevel}
- Sintomas relatados: ${quiz.symptoms?.join(', ') || 'Nenhum sintoma relatado.'}

Retorne estritamente um código JSON no seguinte esquema:
{
  "riskScore": (número de 0 a 100 que indica a probabilidade geral acumulada de carências nutricionais baseada nos sintomas e dieta),
  "vulnerabilities": [
    {
      "nutrient": (nome da vitamina ou mineral vulnerável, ex: "Vitamina B12" ou "Magnésio"),
      "severity": (severidade da vulnerabilidade: "alta", "moderada" ou "baixa"),
      "explanation": (exposição de base científica em português claro conectando o sintoma/dieta à falta desse elemento)
    }
  ],
  "recommendations": [ (lista de conselhos práticos e alimentos específicos de fontes naturais recomendados para ele) ],
  "sunExpAdvice": (conselho preciso de bem-estar sobre exposição solar e Vitamina D calibrada pela rotina do usuário),
  "dietAdvice": (conselho preciso sobre adaptação alimentar estratégica)
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: promptText,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              riskScore: { type: Type.INTEGER },
              vulnerabilities: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    nutrient: { type: Type.STRING },
                    severity: { type: Type.STRING, description: "must be 'alta', 'moderada' or 'baixa'" },
                    explanation: { type: Type.STRING }
                  },
                  required: ['nutrient', 'severity', 'explanation']
                }
              },
              recommendations: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              sunExpAdvice: { type: Type.STRING },
              dietAdvice: { type: Type.STRING }
            },
            required: ['riskScore', 'vulnerabilities', 'recommendations', 'sunExpAdvice', 'dietAdvice']
          }
        }
      });

      const parsedResult = JSON.parse(response.text || '{}');
      res.json(parsedResult);
    } catch (error: any) {
      console.error('Quiz Preventative Analysis Error:', error);
      res.status(500).json({ error: error.message || 'Erro ao processar análise preventiva.' });
    }
  });

  // --- API ROUTE: PREMIUM AI INDIVIDUALIZED MEAL PLAN GENERATOR ---
  app.post('/api/premium-cardapio', async (req, res) => {
    try {
      const { quiz } = req.body;
      if (!quiz) {
        return res.status(400).json({ error: 'Dados do questionário de saúde necessários para gerar cardápio.' });
      }

      const ai = getGeminiClient();
      const promptText = `Você é um nutricionista clínico integrativo especialista da Vitaminapédia AI.
Gere um plano alimentar estratégico personalizado de 3 dias (Café da manhã, Almoço, Lanche, Jantar) focado estritamente em otimizar e resolver as carências estimadas desse usuário baseado na sua rotina, sol e sintomas.

DADOS REAIS DO USUÁRIO:
- Idade: ${quiz.age} anos
- Sexo: ${quiz.gender}
- Dieta: ${quiz.diet}
- Qualidade da dieta: ${quiz.dietQuality}
- Sol: ${quiz.sunExposure}
- Energia: ${quiz.energyLevel}
- Sintomas: ${quiz.symptoms?.join(', ') || 'Sem sintomas específicos.'}

Dê conselhos práticos de alimentos fáceis de encontrar no dia-a-dia do Brasil e explique brevemente as funções dos micronutrientes envolvidos.

Retorne estritamente um código JSON no formato abaixo:
{
  "targetGoals": [ "Meta 1", "Meta 2" ],
  "days": [
    {
      "dayNumber": 1,
      "title": "Dia 1 - Ativação Hormonal & Energética",
      "meals": [
        { "name": "Café da Manhã", "description": "Descrição detalhada com micronutrientes" },
        { "name": "Almoço", "description": "Descrição detalhada com micronutrientes" },
        { "name": "Lanche", "description": "Descrição detalhada com micronutrientes" },
        { "name": "Jantar", "description": "Descrição detalhada com micronutrientes" }
      ]
    }
  ],
  "suplementacaoDica": "Diretrizes sobre suplementos recomendados de forma inteligente.",
  "premiumSlogan": "Inovação Médica Preventiva Vitaminapédia Pro"
}
Note: the JSON must contain exactly 3 days in the "days" array. Do not include markdown wraps around the JSON string.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: promptText,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              targetGoals: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              days: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    dayNumber: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    meals: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          name: { type: Type.STRING },
                          description: { type: Type.STRING }
                        },
                        required: ['name', 'description']
                      }
                    }
                  },
                  required: ['dayNumber', 'title', 'meals']
                }
              },
              suplementacaoDica: { type: Type.STRING },
              premiumSlogan: { type: Type.STRING }
            },
            required: ['targetGoals', 'days', 'suplementacaoDica', 'premiumSlogan']
          }
        }
      });

      const parsedResult = JSON.parse(response.text || '{}');
      res.json(parsedResult);
    } catch (error: any) {
      console.error('Premium Cardapio AI Error:', error);
      res.status(500).json({ error: error.message || 'Erro ao processar criação de cardápio premium.' });
    }
  });

  // Serve static files in production or hook up Vite middlewares in development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  const port = 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Vitaminapédia AI Server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch(err => {
  console.error('Fatal Server Error:', err);
});
