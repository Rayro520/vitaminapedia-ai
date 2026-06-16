import { Nutrient } from './types';

export const NUTRIENT_DATABASE: Nutrient[] = [
  // --- VITAMINAS ---
  {
    id: 'vit-a',
    type: 'vitamin',
    name: 'Vitamina A',
    nicknames: ['Retinol', 'Betacaroteno (Pró-vitamina)'],
    formula: 'C20H30O',
    discovery: '1913 por Elmer McCollum e Lafayette Mendel',
    curiosities: [
      'O betacaroteno dá a cor laranja às cenouras e pode deixar a pele temporariamente amarelada se consumido em grande excesso!',
      'Durante a Primeira Guerra Mundial, descobriu-se que a deficiência de Vitamina A deixava os soldados incapazes de enxergar bem à noite.'
    ],
    mainFunction: 'A Vitamina A funciona como o escudo protetor da sua visão e o agente de renovação celular de toda a pele e tecidos.',
    benefits: [
      { title: 'Visão Saudável', description: 'Essencial para a síntese da rodopsina, o pigmento que permite enxergar em locais com pouca luz.', category: 'visao' },
      { title: 'Pele Radiante', description: 'Estimula a renovação celular celular cutânea, auxiliando no combate ao envelhecimento precoce e acne.', category: 'pele' },
      { title: 'Imunidade Forte', description: 'Mantém a barreira mucosa ativa, impedindo a entrada de vírus e bactérias.', category: 'imunidade' }
    ],
    deficiency: {
      mild: ['Olhos secos persistentes (xerose)', 'Pele áspera ou descamativa', 'Ligeira dificuldade para focar no escuro'],
      moderate: ['Cegueira noturna diagnosticável', 'Infecções respiratórias frequentes', 'Cabelo quebradiço e unhas fracas'],
      severe: ['Xeroftalmia (lesões graves nas córneas)', 'Cegueira permanente', 'Atraso sistêmico de crescimento em crianças']
    },
    excess: {
      toxicity: 'Hipervitaminose A (aguda ou crônica)',
      riscos: [
        'Dores de cabeça intensas e aumento da pressão intracraniana',
        'Danos hepáticos severos (hepatotoxicidade)',
        'Efeitos teratogênicos graves se consumido em excesso por gestantes (evitar suplementar retinol puro sem recomendação médica)'
      ],
      interactions: ['Pode potencializar medicação para acne derivada de retinoide, gerando toxicidade cutânea e sistêmica.']
    },
    sources: [
      { name: 'Cenoura', emoji: '🥕', amount: '100g = 330% RDA' },
      { name: 'Fígado bovino', emoji: '🥩', amount: '100g = 450% RDA' },
      { name: 'Ovo (gema)', emoji: '🥚', amount: '1 u = 20% RDA' },
      { name: 'Manga', emoji: '🥭', amount: '100g = 35% RDA' },
      { name: 'Espinafre', emoji: '🥬', amount: '100g = 180% RDA' }
    ],
    rda: {
      children: '300 - 400 mcg',
      teens: '600 mcg',
      men: '900 mcg',
      women: '700 mcg',
      pregnant: '770 mcg',
      lactating: '1200 mcg',
      elderly: '700 - 900 mcg'
    }
  },
  {
    id: 'vit-b1',
    type: 'vitamin',
    name: 'Vitamina B1',
    nicknames: ['Tiamina'],
    formula: 'C12H17N4OS+',
    discovery: '1912 por Casimir Funk, isolada da casca de arroz',
    curiosities: [
      'Foi a primeira vitamina do complexo B a ser descoberta.',
      'O polimento excessivo do arroz nas populações asiáticas do século XIX causou uma epidemia de esgotamento total chamada Beribéri, curada ao devolver as cascas de arroz à dieta.'
    ],
    mainFunction: 'A Tiamina funciona como a faísca que liga o motor mitocondrial, transformando carboidratos e açúcares na energia que seu cérebro e músculos precisam para funcionar.',
    benefits: [
      { title: 'Conversão Energética', description: 'Atua como coenzima vital no metabolismo da glicose no ciclo de Krebs.', category: 'energia' },
      { title: 'Foco Mental', description: 'Essencial para a transmissão dos impulsos nervosos e a saúde dos neurônios.', category: 'cerebro' },
      { title: 'Função Cardíaca', description: 'Previne o enfraquecimento do músculo cardíaco decorrente de depleção energética.', category: 'coracao' }
    ],
    deficiency: {
      mild: ['Cansaço crônico inexplicável', 'Irritabilidade e perda de apetite', 'Ligeira fraqueza nos membros inferiores'],
      moderate: ['Parestesia (dormência nas pernas/mãos)', 'Confusão mental e perda de memória recente', 'Cãibras intensas'],
      severe: ['Doença Beribéri (seco: perda muscular e paralisia; úmido: insuficiência cardíaca congestiva)', 'Síndrome de Wernicke-Korsakoff (frequente em alcoolismo grave)']
    },
    excess: {
      toxicity: 'Praticamente nula (altamente hidrossolúvel)',
      riscos: ['Eliminada rapidamente pela urina', 'Doses extremamente elevadas via intravenosa podem provocar reações alérgicas raras'],
      interactions: ['Diuréticos de alça aumentam a excreção urinária de tiamina.']
    },
    sources: [
      { name: 'Semente de Girassol', emoji: '🌻', amount: '100g = 120% RDA' },
      { name: 'Carne suína líquida', emoji: '🥩', amount: '100g = 70% RDA' },
      { name: 'Feijão Preto', emoji: '🫘', amount: '1 xícara = 35% RDA' },
      { name: 'Levedura de Cerveja', emoji: '🍺', amount: '10g = 80% RDA' }
    ],
    rda: {
      children: '0.5 - 0.6 mg',
      teens: '0.9 - 1.2 mg',
      men: '1.2 mg',
      women: '1.1 mg',
      pregnant: '1.4 mg',
      lactating: '1.4 mg',
      elderly: '1.1 - 1.2 mg'
    }
  },
  {
    id: 'vit-b2',
    type: 'vitamin',
    name: 'Vitamina B2',
    nicknames: ['Riboflavina'],
    formula: 'C17H20N4O6',
    discovery: '1920 por químicos que isolating pigmentos fluorescentes amarelos-esverdeados no leite',
    curiosities: [
      'É a riboflavina que deixa a urina de uma cor amarelo-neon brilhante quando você toma suplementos vitamínicos de alta dosagem. É perfeitamente seguro!',
      'É extremamente sensível à luz solar. Por isso, o leite não deve ser vendido em garrafas de vidro transparentes, para não perder o nutriente.'
    ],
    mainFunction: 'A Riboflavina atua como o motor celular de oxigenação, ajudando a metabolizar gorduras e defendendo as células contra o estresse oxidativo.',
    benefits: [
      { title: 'Saúde Ocular', description: 'Previne o estresse oxidativo nos olhos e reduz o risco de desenvolvimento de catarata.', category: 'visao' },
      { title: 'Super Pele e Mucosas', description: 'Atua diretamente na integridade do colágeno e previne feridas nos cantos da boca.', category: 'pele' },
      { title: 'Produção de Energia', description: 'Essencial na forma de FAD e FMN para a cadeia respiratória celular.', category: 'energia' }
    ],
    deficiency: {
      mild: ['Lábios rachados e secos', 'Sensibilidade excessiva à luz (fotofobia)', 'Língua ligeiramente avermelhada ou inflamada'],
      moderate: ['Queilite angular (rachadura dolorosa no canto dos lábios)', 'Estomatite', 'Dermatite seborreica no rosto'],
      severe: ['Anemia por má absorção de ferro', 'Deterioração nervosa periférica', 'Degeneração precoce do cristalino (risco de catarata)']
    },
    excess: {
      toxicity: 'Nula',
      riscos: ['Não há relatos de toxicidade, pois o excesso é eliminado na urina amarela-brilhante característica.'],
      interactions: ['Antidepressivos tricíclicos podem inibir a ativação da riboflavina no corpo.']
    },
    sources: [
      { name: 'Amêndoas', emoji: '🫘', amount: '100g = 85% RDA' },
      { name: 'Leite Integral', emoji: '🥛', amount: '1 copo = 25% RDA' },
      { name: 'Iogurte Natural', emoji: '🥛', amount: '100g = 20% RDA' },
      { name: 'Couve cozida', emoji: '🥬', amount: '100g = 15% RDA' }
    ],
    rda: {
      children: '0.5 - 0.6 mg',
      teens: '0.9 - 1.3 mg',
      men: '1.3 mg',
      women: '1.1 mg',
      pregnant: '1.4 mg',
      lactating: '1.6 mg',
      elderly: '1.1 - 1.3 mg'
    }
  },
  {
    id: 'vit-b3',
    type: 'vitamin',
    name: 'Vitamina B3',
    nicknames: ['Niacina', 'Nicotinamida', 'Ácido Nicotínico'],
    formula: 'C6H5NO2',
    discovery: '1867 por oxidação química da nicotina, mas apenas identificada como nutriente em 1937',
    curiosities: [
      'Suplementar altas doses de Ácido Nicotínico causa um efeito chamado "flushing" — uma vermelhidão facial intensa quente e passageira devido à dilatação dos vasos sanguíneos.',
      'A extrema deficiência causava a Pelagra ("pele áspera"), doença descrita pelos 3Ds: Dermatite, Diarreia e Demência.'
    ],
    mainFunction: 'A Niacina funciona como o operador de reparação de DNA e regulador máximo dos combustíveis energéticos e níveis de colesterol no sangue.',
    benefits: [
      { title: 'Reparo Genético', description: 'Precursora de NAD/NADP, coenzimas críticas para o reparo do DNA celular.', category: 'geral' },
      { title: 'Controle Lipídico', description: 'Auxilia na elevação de colesterol bom (HDL) e redução dos triglicerídeos.', category: 'coracao' },
      { title: 'Sistema Nervoso', description: 'Protege os neurônios contra morte celular por estresse oxidativo ou inflamação.', category: 'cerebro' }
    ],
    deficiency: {
      mild: ['Fraqueza muscular generalizada', 'Indigestão ou náuseas frequentes', 'Dor de cabeça e mau humor duradouros'],
      moderate: ['Hiperpigmentação em áreas expostas ao sol', 'Apatia e fadiga pronunciada', 'Inflamação intestinal'],
      severe: ['Pelagra clássica (Dermatite em "colar de Casal", Diarreia crônica, Demência flutuante e risco de morte)']
    },
    excess: {
      toxicity: 'Moderada a alta em suplementos isolados',
      riscos: [
        'Vermelhidão repentina e coceira cutânea (Niacin Flush)',
        'Risco de dano hepático se doses elevadas de liberação lenta forem consumidas de forma sustentada',
        'Causar resistência transitória à insulina'
      ],
      interactions: ['Pode aumentar o risco de miopatia se tomada junto com Estatinas (remédios para colesterol).']
    },
    sources: [
      { name: 'Peito de Frango', emoji: '🍗', amount: '100g = 75% RDA' },
      { name: 'Atum', emoji: '🐟', amount: '100g = 100% RDA' },
      { name: 'Amendoim', emoji: '🥜', amount: '100g = 80% RDA' },
      { name: 'Cogumelos Paris', emoji: '🍄', amount: '100g = 25% RDA' }
    ],
    rda: {
      children: '6 - 8 mg',
      teens: '12 - 16 mg',
      men: '16 mg',
      women: '14 mg',
      pregnant: '18 mg',
      lactating: '17 mg',
      elderly: '14 - 16 mg'
    }
  },
  {
    id: 'vit-b5',
    type: 'vitamin',
    name: 'Vitamina B5',
    nicknames: ['Ácido Pantotênico', 'Pantotenato'],
    formula: 'C9H17NO5',
    discovery: '1933 por Roger J. Williams',
    curiosities: [
      'O nome vem do grego "pantothen", que significa "em toda parte", devido ao fato de estar presente em quase todos os alimentos do planeta!',
      'É muito utilizada na indústria cosmética (como D-Pantenol) para hidratação ultra profunda de cabelos e cicatrização de turgências da derme.'
    ],
    mainFunction: 'O Ácido Pantotênico funciona como o arquiteto metabólico, acionando a Coenzima A para sintetizar hormônios de estresse e construir novas gorduras estruturais.',
    benefits: [
      { title: 'Síntese Hormonal', description: 'Atua na glândula suprarrenal estimulando cortisol e hormônios esteroides.', category: 'hormonios' },
      { title: 'Cicatrização da Pele', description: 'Promove a proliferação celular de fibroblastos, acelerando cicatrizações cutâneas.', category: 'pele' },
      { title: 'Foco Energético', description: 'Essencial para converter carboidratos, proteínas e gorduras em ATP.', category: 'energia' }
    ],
    deficiency: {
      mild: ['Cefaleia de tensão', 'Fadiga inexplicada e formigamentos esporádicos', 'Irritabilidade e distúrbios de sono leves'],
      moderate: ['Sensação de queimação dolorosa nos pés (Síndrome do Pé Queimado)', 'Cãibras recorrentes', 'Perda de coordenação motora sutil'],
      severe: ['Disfunção do córtex suprarrenal', 'Depressão psíquica progressiva', 'Sensibilidade gastrointestinal extrema']
    },
    excess: {
      toxicity: 'Inexistente',
      riscos: ['Extremamente segura. Apenas doses altíssimas acima de 10 gramas por dia podem provocar diarreia leve.'],
      interactions: ['Pode prolongar levemente os efeitos do relaxante muscular neostigmina.']
    },
    sources: [
      { name: 'Abacate', emoji: '🥑', amount: '1 u = 40% RDA' },
      { name: 'Gema de Ovo', emoji: '🥚', amount: '1 u = 20% RDA' },
      { name: 'Cogumelo Shiitake', emoji: '🍄', amount: '100g = 70% RDA' },
      { name: 'Salmão', emoji: '🐟', amount: '100g = 30% RDA' }
    ],
    rda: {
      children: '2 - 3 mg',
      teens: '4 mg',
      men: '5 mg',
      women: '5 mg',
      pregnant: '6 mg',
      lactating: '7 mg',
      elderly: '5 mg'
    }
  },
  {
    id: 'vit-b6',
    type: 'vitamin',
    name: 'Vitamina B6',
    nicknames: ['Piridoxina', 'Piridoxal', 'Piridoxamina'],
    formula: 'C8H11NO3',
    discovery: '1934 por Paul György como fator de cura de dermatite em ratos',
    curiosities: [
      'É fundamental para a síntese de hemoglobina, que transporta oxigênio nas hemácias.',
      'Suplementada à noite, muitas pessoas relatam ter sonhos incrivelmente vívidos e com maior grau de lembrança ao acordar!'
    ],
    mainFunction: 'A Piridoxina funciona como a fábrica de neurotransmissores do seu cérebro, moldando o humor ao fabricar serotonina e dopamina.',
    benefits: [
      { title: 'Regulação do Humor', description: 'Co-fator na síntese de serotonina, GABA, dopamina e norepinefrina.', category: 'cerebro' },
      { title: 'Saúde Menstrual (TPM)', description: 'Auxilia no alívio de sintomas de cólica, flutuação emocional e retenção de líquidos na TPM.', category: 'hormonios' },
      { title: 'Imunidade Geral', description: 'Importante para a produção e maturação dos anticorpos e linfócitos.', category: 'imunidade' }
    ],
    deficiency: {
      mild: ['Confusão mental sutil', 'Irritabilidade do humor', 'Rachaduras discretas na boca'],
      moderate: ['Dermatite seborreica', 'Anemia microcítica crônica', 'Oscilações intensas de humor'],
      severe: ['Neuropatia sensorial periférica dolorosa', 'Convulsões em casos de depleção extrema', 'Disfunção progressiva do sistema imune']
    },
    excess: {
      toxicity: 'Alta em suplementação excessiva crônica',
      riscos: [
        'Neuropatia sensorial com perda de coordenação e reflexos (se ultrapassados 200mg/dia por longo prazo)',
        'Dermalites severas raras',
        'Dificuldades para caminhar se acumulada em excesso nos tecidos nervosos'
      ],
      interactions: ['Pode reduzir substancialmente a eficácia do medicamento Levodopa (para Parkinson).']
    },
    sources: [
      { name: 'Banana', emoji: '🍌', amount: '1 u = 30% RDA' },
      { name: 'Batata Cozida', emoji: '🥔', amount: '100g = 20% RDA' },
      { name: 'Grão-de-bico', emoji: '🫘', amount: '1 xícara = 65% RDA' },
      { name: 'Sementes de Gergelim', emoji: '🌱', amount: '100g = 40% RDA' }
    ],
    rda: {
      children: '0.5 - 0.6 mg',
      teens: '1.0 - 1.2 mg',
      men: '1.3 mg (1.7 mg acima de 50 anos)',
      women: '1.3 mg (1.5 mg acima de 50 anos)',
      pregnant: '1.9 mg',
      lactating: '2.0 mg',
      elderly: '1.5 - 1.7 mg'
    }
  },
  {
    id: 'vit-b7',
    type: 'vitamin',
    name: 'Vitamina B7',
    nicknames: ['Biotina', 'Vitamina H'],
    formula: 'C10H16N2O3S',
    discovery: '1931 por Paul György, associada ao "fator protetor da gema do ovo"',
    curiosities: [
      'O nome clássico Vitamina H veio de "Haar und Haut", palavras em alemão para Cabelo e Pele.',
      'Consumir clara de ovo crua regularmente pode induzir a uma forte deficiência de biotina! A clara crua possui uma proteína chamada avidina que se liga firmemente à biotina e impede sua absorção. O cozimento inativa a avidina.'
    ],
    mainFunction: 'A Biotina funciona como a costureira do colágeno e da queratina, fortalecendo a estrutura física dos fios de cabelo, unhas e derme.',
    benefits: [
      { title: 'Fortalecimento Capilar', description: 'Promove a produção adequada de queratina estrutural no folículo do pelo.', category: 'pele' },
      { title: 'Combate a Unhas Fracas', description: 'Estudos mostram melhora de até 25% na espessura de lâminas ungueais frágeis.', category: 'pele' },
      { title: 'Metabolismo de Aminoácidos', description: 'Coenzima da carboxilase, degradando aminoácidos para gerar energia limpa.', category: 'energia' }
    ],
    deficiency: {
      mild: ['Enfraquecimento sutil dos cabelos (queda acima do normal)', 'Unhas que lascam facilmente', 'Pele seca'],
      moderate: ['Alopécia (queda capilar acentuada)', 'Dermatite eritematosa descamativa nos olhos/nariz', 'Letargia ligeira'],
      severe: ['Retardo de desenvolvimento neurológico em bebês', 'Parestesias e fraqueza de tônus muscular', 'Aumento de infecções fúngicas na pele']
    },
    excess: {
      toxicity: 'Nula',
      riscos: ['Eliminada rapidamente pela urina. Não há registro de intoxicação.'],
      interactions: ['Altas doses de Biotina em exames laboratoriais podem causar FALSO diagnóstico interferindo em testes de tireoide (T3, T4 e TSH) ou troponina cardíaca.']
    },
    sources: [
      { name: 'Amendoim Tostado', emoji: '🥜', amount: '100g = 60% RDA' },
      { name: 'Gema de Ovo', emoji: '🥚', amount: '1 u = 33% RDA' },
      { name: 'Batata Doce', emoji: '🍠', amount: '100g = 10% RDA' },
      { name: 'Aveia em Flocos', emoji: '🥣', amount: '100g = 15% RDA' }
    ],
    rda: {
      children: '8 - 12 mcg',
      teens: '20 - 25 mcg',
      men: '30 mcg',
      women: '30 mcg',
      pregnant: '30 mcg',
      lactating: '35 mcg',
      elderly: '30 mcg'
    }
  },
  {
    id: 'vit-b9',
    type: 'vitamin',
    name: 'Vitamina B9',
    nicknames: ['Ácido Fólico', 'Folato', 'Metilfolato'],
    formula: 'C19H19N7O6',
    discovery: '1941 isolada de folhas de espinafre frescas por Mitchell e Snell',
    curiosities: [
      'O nome provém da palavra em latim "folium", que significa folha, destacando que ela é super abundante nas folhas escuras!',
      'Garantir B9 no primeiro mês de gravidez reduz em até 70% o risco de defeitos no tubo neural do bebê, razão pela qual dezenas de países adotam a fortificação obrigatória da farinha de trigo.'
    ],
    mainFunction: 'O Folato atua como a copiadora do seu código de vida, governando a replicação do DNA e o crescimento ideal das novas células corporais.',
    benefits: [
      { title: 'Desenvolvimento Fetal', description: 'Garante o fechamento do tubo neural e formação do sistema nervoso central do embrião.', category: 'geral' },
      { title: 'Hematopoiese Renovadora', description: 'Essencial na medula óssea para a construção e divisão de novas hemácias saudáveis.', category: 'geral' },
      { title: 'Saúde Mental', description: 'Age com a B12 na degradação da homocisteína, neurotransmitindo bem-estar.', category: 'cerebro' }
    ],
    deficiency: {
      mild: ['Cansaço imotivado', 'Língua inflamada com queimação sutil', 'Irritabilidade emocional leve'],
      moderate: ['Anemia megaloblástica (hemácias gigantes imaturas e ineficazes)', 'Fadiga extrema ao menor esforço', 'Problemas gastrointestinais estruturais'],
      severe: ['Defeitos terríveis no nascimento (espinha bífida, anencefalia) se gestantes apresentarem carência severa', 'Comprometimento sistêmico imunitário leucocitário']
    },
    excess: {
      toxicity: 'Baixa a moderada',
      riscos: [
        'Doses gigantescas de ácido fólico sintético podem mascarar uma deficiência oculta de Vitamina B12, atrasando a descoberta de danos neurológicos permanentes',
        'Leves distúrbios digestivos em intolerâncias raras'
      ],
      interactions: ['Anticonvulsivantes podem reduzir a eficácia de folatos e vice-versa.']
    },
    sources: [
      { name: 'Espinafre Cozido', emoji: '🥬', amount: '100g = 65% RDA' },
      { name: 'Feijão Carioca', emoji: '🫘', amount: '1 xícara = 90% RDA' },
      { name: 'Laranja', emoji: '🍊', amount: '1 u = 10% RDA' },
      { name: 'Brócolis', emoji: '🥦', amount: '100g = 30% RDA' }
    ],
    rda: {
      children: '150 - 200 mcg',
      teens: '300 - 400 mcg',
      men: '400 mcg',
      women: '400 mcg',
      pregnant: '600 mcg',
      lactating: '500 mcg',
      elderly: '400 mcg'
    }
  },
  {
    id: 'vit-b12',
    type: 'vitamin',
    name: 'Vitamina B12',
    nicknames: ['Cobalamina', 'Metilcobalamina', 'Cianocobalamina'],
    formula: 'C63H88CoN14O14P',
    discovery: '1948 por Dorothy Hodgkin, que determinou a extraordinária estrutura molecular com cobalto cristalino no centro',
    curiosities: [
      'É a única molécula biológica conhecida que contém o metal Cobalto em sua mecânica estrutural.',
      'Não é fabricada por plantas nem por animais de forma autônoma: ela é exclusivamente gerada por certas bactérias que vivem no solo ou no estômago dos ruminantes. Por isso, populações estritamente veganas devem obrigatoriamente suplementá-la.'
    ],
    mainFunction: 'A B12 funciona como o isolante elétrico supremo das suas células nervosas, tecendo a bainha de mielina para garantir transmissões neurais rápidas e sem falhas.',
    benefits: [
      { title: 'Super Bainha de Mielina', description: 'Mantém a cobertura protetora dos neurônios, garantindo funções cognitivas e sensoriais perfeitas.', category: 'cerebro' },
      { title: 'Injeção de Energia', description: 'Participa na conversão de ácidos graxos dentro das mitocôndrias, gerando combustível energético.', category: 'energia' },
      { title: 'Dupla da B9 contra Anemia', description: 'Codirige a fusão do ferro na medula para gerar hemácias maduras e fortes.', category: 'geral' }
    ],
    deficiency: {
      mild: ['Cansaço físico crônico e lentidão cerebral (brain fog)', 'Formigamentos leves em extremidades dos pés e mãos', 'Dificuldades de memorização e foco'],
      moderate: ['Anemia perniciosa diagnosticada', 'Formigamentos constantes espalhados', 'Perda acentuada de equilíbrio e coordenação'],
      severe: ['Danos irreparáveis no sistema nervoso por desmielinização', 'Forte declínio cognitivo demencial reversível apenas se tratado rápido', 'Fraqueza generalizada que impede caminhadas básicas']
    },
    excess: {
      toxicity: 'Inexistente',
      riscos: ['Eliminada rapidamente pela urina. Não há registro clínico de sobredosagem tóxica sistêmica.'],
      interactions: ['Uso recorrente de omeprazol (inibidores de bomba de prótons) e metformina para diabetes inibe fortemente sua absorção intestinal crônica.']
    },
    sources: [
      { name: 'Marisco / Amêijoas', emoji: '🦪', amount: '100g = 4000% RDA' },
      { name: 'Salmão Grelhado', emoji: '🐟', amount: '100g = 120% RDA' },
      { name: 'Carne Vermelha', emoji: '🥩', amount: '100g = 85% RDA' },
      { name: 'Leite', emoji: '🥛', amount: '1 copo = 20% RDA' }
    ],
    rda: {
      children: '0.9 - 1.2 mcg',
      teens: '1.8 - 2.4 mcg',
      men: '2.4 mcg',
      women: '2.4 mcg',
      pregnant: '2.6 mcg',
      lactating: '2.8 mcg',
      elderly: '2.4 mcg (suplementação recomendada devido à redução de suco gástrico)'
    }
  },
  {
    id: 'vit-c',
    type: 'vitamin',
    name: 'Vitamina C',
    nicknames: ['Ácido Ascórbico'],
    formula: 'C6H8O6',
    discovery: '1928 por Albert Szent-Györgyi, isolado das glândulas suprarrenais e laranjas',
    curiosities: [
      'A grande maioria dos mamíferos fabrica sua própria Vitamina C no fígado ou rins a partir da glicose. Os humanos, primatas e porquinhos-da-índia perderam essa capacidade evolutiva por causa de uma mutação genética!',
      'Navegadores clássicos dos séculos XV a XVIII morriam às centenas devido ao Escorbuto (sangramento massivo das gengivas e pontos de sutura desfeitos nos tecidos), remediado com limões na tripulação.'
    ],
    mainFunction: 'A Vitamina C atua como o mestre de obras do corpo, secretando ativamente o colágeno para ligar músculos, ligamentos, dentes e derme, além de neutralizar radicais livres.',
    benefits: [
      { title: 'Sustentação e Colágeno', description: 'Essencial para a hidroxilação de prolina e lisina na síntese de novas redes de colágeno.', category: 'pele' },
      { title: 'Antioxidante de Impacto', description: 'Eleva de maneira drástica a resistência imune combatendo radicais agressivos.', category: 'imunidade' },
      { title: 'Fixação Máxima do Ferro', description: 'Transforma o ferro vegetal não-heme em uma forma solúvel e de facílima absorção no duodeno.', category: 'geral' }
    ],
    deficiency: {
      mild: ['Gengivas sangrando com facilidade ao escovar dentes', 'Aparecimento inexplicável de manchas roxas na pele', 'Atraso na cicatrização de pequenos cortes'],
      moderate: ['Perda crônica de dentes por flacidez de ligamento periodontal', 'Artralgias dolorosas nas articulações (articulações secas)', 'Fadiga muscular extrema'],
      severe: ['Escorbuto clássico (hemorragias viscerais severas, reabertura de cicatrizes antigas, colapso sistêmico e morte se ignorado)']
    },
    excess: {
      toxicity: 'Baixa (hidrossolúvel)',
      riscos: [
        'Doses maiores de 2.000 mg ao dia podem irritar as paredes intestinais provocando diarreias osmóticas e náuseas',
        'Pode aumentar a propensão ao aparecimento de cálculos renais de oxalato em indivíduos biologicamente predispostos'
      ],
      interactions: ['Pode aumentar expressivamente a absorção de Alumínio presente em antiácidos tomados simultaneamente.']
    },
    sources: [
      { name: 'Acerola', emoji: '🍒', amount: '100g = 1800% RDA' },
      { name: 'Goiaba', emoji: '🥭', amount: '100g = 250% RDA' },
      { name: 'Laranja', emoji: '🍊', amount: '1 u = 90% RDA' },
      { name: 'Morango', emoji: '🍓', amount: '100g = 65% RDA' }
    ],
    rda: {
      children: '15 - 25 mg',
      teens: '65 - 75 mg',
      men: '90 mg (fumantes precisam de +35mg/dia)',
      women: '75 mg (fumantes precisam de +35mg/dia)',
      pregnant: '85 mg',
      lactating: '120 mg',
      elderly: '75 - 90 mg'
    }
  },
  {
    id: 'vit-d',
    type: 'vitamin',
    name: 'Vitamina D',
    nicknames: ['Calciferol', 'Colecalciferol (D3)', 'Ergocalciferol (D2)'],
    formula: 'C27H44O (D3)',
    discovery: '1922 por Elmer McCollum enquanto decifrava a ação do óleo de fígado de bacalhau contra o Raquitismo infantil',
    curiosities: [
      'Não é cientificamente uma vitamina convencional, mas sim um pré-hormônio esteroide sintetizado pelos raios UVB solares na derme!',
      'Estima-se que mais de 50% da população urbana do planeta apresente concentrações subótimas sanguíneas devido à rotina industrial e residencial em ambientes fechados.'
    ],
    mainFunction: 'A Vitamina D funciona como a chave que ajuda seu organismo a absorver cálcio no trato intestinal, fortalecendo a ossatura e agindo como programador genético imunitário.',
    benefits: [
      { title: 'Ossos Indestrutíveis', description: 'Indispensável para que o cálcio circundante se mova fisicamente para remodelar a matriz óssea.', category: 'ossos' },
      { title: 'Músculos Firmes', description: 'Atua em receptores celulares melhorando o tônus de estabilidade e reduzindo quedas em idosos.', category: 'ossos' },
      { title: 'Moduladora de Imunidade', description: 'Ativa linfócitos T para neutralizar invasores, diminuindo também episódios de autoimunidade.', category: 'imunidade' }
    ],
    deficiency: {
      mild: ['Cansaço crônico muscular sutil', 'Resfriados e viroses constantes', 'Dores difusas de baixa intensidade nas costas'],
      moderate: ['Hipertireoidismo secundário', 'Osteopenia (desmineralização gradual da estrutura óssea)', 'Fraqueza muscular pronunciada ao subir escadas'],
      severe: ['Raquitismo irreversível em crianças (ossos das pernas tortos sob o peso do corpo)', 'Osteomalácia dolorosa em adultos', 'Forte aumento de fraturas espontâneas']
    },
    excess: {
      toxicity: 'Alta em super suplementação de doses maciças sem controle',
      riscos: [
        'Hipercalcemia (excesso de cálcio solúvel depositando-se nos tecidos e vasos)',
        'Calcificação progressiva de órgãos como artérias cardíacas e pulmões',
        'Insuficiência renal induzida por pedras gigantes e desgaste urinário'
      ],
      interactions: ['Anabolizantes ou corticoides diminuem os efeitos protetores biológicos da Vitamina D.']
    },
    sources: [
      { name: 'Raios Solares UVB', emoji: '☀️', amount: '15 min = 1000% RDA' },
      { name: 'Óleo de fígado de bacalhau', emoji: '🐟', amount: '1 colher = 175% RDA' },
      { name: 'Salmão Selvagem', emoji: '🐟', amount: '100g = 120% RDA' },
      { name: 'Gema de Ovo de Galinha caipira', emoji: '🥚', amount: '1 u = 10% RDA' },
      { name: 'Cogumelos expostos ao sol', emoji: '🍄', amount: '100g = 50% RDA' }
    ],
    rda: {
      children: '600 UI (15 mcg)',
      teens: '600 UI (15 mcg)',
      men: '600 UI (15 mcg)',
      women: '600 UI (15 mcg)',
      pregnant: '600 UI (15 mcg)',
      lactating: '600 UI (15 mcg)',
      elderly: '800 UI (20 mcg) (necessidades elevadas devido ao afinamento da pele)'
    }
  },
  {
    id: 'vit-e',
    type: 'vitamin',
    name: 'Vitamina E',
    nicknames: ['Tocoferol', 'Tocotrienol'],
    formula: 'C29H50O2',
    discovery: '1922 por Herbert Evans e Katharine Bishop como "fator reprodutivo de sementes"',
    curiosities: [
      'Suas moléculas agem de maneira incrivelmente específica intercalando-se no meio da gordura que envolve as células, funcionando como guarda-costas protetores das membranas celulares!',
      'É muito apreciada em produtos dermocosméticos hidratantes de luxo para prevenir o estresse solar e manter a umidade.'
    ],
    mainFunction: 'A Vitamina E atua como o escudo antioxidante lipossolúvel definitivo do seu organismo, protegendo todas as membranas celulares contra o ranço e o ataque oxidativo decorrentes de poluentes ambientais.',
    benefits: [
      { title: 'Guarda das Células', description: 'Impede a peroxidação lipídica, blindando as membranas protetoras de cada célula.', category: 'geral' },
      { title: 'Saúde Cardiovascular', description: 'Previne que o LDL-colesterol se oxide nas artérias, evitando placas endurecidas.', category: 'coracao' },
      { title: 'Neutralização pós-treino', description: 'Protege os tecidos e regenera fibras pós-exaustão física crônica.', category: 'energia' }
    ],
    deficiency: {
      mild: ['Ligeira fadiga física generalizada', 'Pele excessivamente seca e com menor elasticidade', 'Dificuldade de recuperação pós-treino'],
      moderate: ['Diminuição sutil da coordenação motora reflexa', 'Perda parcial da sensibilidade vibratória tátil', 'Dificuldade visual sutil'],
      severe: ['Ataxia espinocerebelar (perda severa de equilíbrio para caminhar)', 'Anemia hemolítica nos bebês prematuros', 'Cegueira progressiva por degeneração retiniana por oxidação']
    },
    excess: {
      toxicity: 'Baixa a moderada',
      riscos: [
        'Ação anticoagulante severa em doses extremamente excessivas (+1.000 mg ao dia)',
        'Aumenta a probabilidade de sangramento massivo interno se houver algum trauma físico',
        'Raras reações intestinais e digestivas'
      ],
      interactions: ['Pode potencializar massivamente remendos ou medicações anticoagulantes como Varfarina, elevando o risco de sangramentos fortuitos.']
    },
    sources: [
      { name: 'Sementes de Girassol', emoji: '🌻', amount: '100g = 230% RDA' },
      { name: 'Azeite de Oliva Extra Virgem', emoji: '🫒', amount: '1 colher = 15% RDA' },
      { name: 'Amêndoas Secas', emoji: '🥜', amount: '100g = 175% RDA' },
      { name: 'Abacate', emoji: '🥑', amount: '1 u = 25% RDA' }
    ],
    rda: {
      children: '6 - 11 mg',
      teens: '15 mg',
      men: '15 mg',
      women: '15 mg',
      pregnant: '15 mg',
      lactating: '19 mg',
      elderly: '15 mg'
    }
  },
  {
    id: 'vit-k',
    type: 'vitamin',
    name: 'Vitamina K',
    nicknames: ['Filoquinona (K1)', 'Menaquinona (K2)'],
    formula: 'C31H46O2 (K1)',
    discovery: '1929 pelo cientista dinamarquês Henrik Dam, associada ao "fator Koagulation" (daí a letra K)',
    curiosities: [
      'A Vitamina K1 destina-se principalmente a reter o fígado para os fatores de coagulação.',
      'A Vitamina K2 (especialmente a variante MK-7 produzida no prato fermentado japonês Natto) age de maneira espetacular direcionando o cálcio para fora das artérias (impedindo infartos por endurecimento) e transportando-o diretamente para o interior dos dentes e ossos.'
    ],
    mainFunction: 'A Vitamina K funciona como o semáforo que regula onde o cálcio é depositado no corpo, prendendo-o na ossatura e impedindo que feche as suas artérias principais.',
    benefits: [
      { title: 'Coagulação Perfeita', description: 'Co-fator na síntese no fígado das proteínas protetoras de coagulação em cortes sanguíneos.', category: 'coracao' },
      { title: 'Trânsito de Cálcio Saudável', description: 'Ativa a osteocalcina e a proteína Gla da matriz (MGP), evitando calcificação nas veias.', category: 'ossos' },
      { title: 'Ossos Mais Densos', description: 'Trabalha em sintonia fina com a Vitamina D para elevar os fatores de densidade mineral óssea.', category: 'ossos' }
    ],
    deficiency: {
      mild: ['Facilidade atípica de sangrar o nariz (epistasia)', 'Sangramento leve no uso frequente de fio dental', 'Dificuldade mínima em cicatrizar arranhões'],
      moderate: ['Surgimento constante e espalhado de hematomas espontâneos sem batidas', 'Doses de fluxo menstrual muito mais intensas do que o normal', 'Micção com pontos discretos de sangue'],
      severe: ['Hemorragias viscerais ou digestivas maciças incontroláveis', 'Forte risco de osteoporose precoce em idosos por má fixação de cálcio', 'Doença hemorrágica fatal em bebês recém-nascidos (por isso recebem injeção de K ao nascer)']
    },
    excess: {
      toxicity: 'Inexistente para formas naturais de K1 e K2',
      riscos: [
        'Praticamente livre de riscos. Apenas a forma sintética clássica K3 (Menadiona) já causou icterícia e anemia em recém-nascidos se suplementada erroneamente',
        'Dificulta a ação de anticoagulantes prescritos'
      ],
      interactions: ['Anula de forma total a utilidade de remédios anticoagulantes baseados em Varfarina/Marevan. Pacientes com próteses ou tromboses crônicas devem gerenciar o consumo alimentar de folhas verdes rigidamente.']
    },
    sources: [
      { name: 'Couve Cozida', emoji: '🥬', amount: '100g = 700% RDA' },
      { name: 'Natto (soja fermentada)', emoji: '🫘', amount: '100g = 900% RDA (K2 MK-7)' },
      { name: 'Espinafre fresco', emoji: '🥬', amount: '100g = 400% RDA' },
      { name: 'Acelga cozida', emoji: '🥬', amount: '100g = 300% RDA' }
    ],
    rda: {
      children: '30 - 60 mcg',
      teens: '75 mcg',
      men: '120 mcg',
      women: '90 mcg',
      pregnant: '90 mcg',
      lactating: '90 mcg',
      elderly: '90 - 120 mcg'
    }
  },

  // --- MINERAIS ---
  {
    id: 'min-iron',
    type: 'mineral',
    name: 'Ferro',
    nicknames: ['Ferro Heme (Origem Animal)', 'Ferro Não-Heme (Origem Vegetal)'],
    formula: 'Fe',
    discovery: 'Conhecido desde a antiguidade clássica; essencialidade biológica decifrada no século XVII',
    curiosities: [
      'O ferro é o que deixa o seu sangue com a cor vermelho escuro tão característica e dá o seu característico sabor metálico!',
      'É o componente fundamental da clorofila em algumas plantas primitivas e da hemoglobina que transporta o oxigênio por todo o corpo humano.'
    ],
    mainFunction: 'O Ferro funciona como o veículo de transporte que carrega oxigênio dos pulmões para cada célula e músculo do seu corpo.',
    benefits: [
      { title: 'Transporte de Oxigênio', description: 'Insustentável sem ferro para compor a hemoglobina das hemácias e a mioglobina muscular.', category: 'energia' },
      { title: 'Energia Sem Cansaço', description: 'Co-fator da síntese de citocromos energéticos nos geradores de ATP celulares.', category: 'energia' },
      { title: 'Regulação Cognitiva', description: 'Elemento crítico para focos cognitivos ideais na síntese de neurônios recém-criados.', category: 'cerebro' }
    ],
    deficiency: {
      mild: ['Pele pálida nas bochechas e por dentro dos lábios', 'Mãos e pés frios mesmo em dias quentes', 'Ligeira falta de ar ao subir degraus rápido'],
      moderate: ['Fadiga física e lentidão de pensamento consistentes', 'Unha frágil em formato de colher (coiloníquia)', 'Dificuldade extrema de concentração acadêmica-foco'],
      severe: ['Anemia Ferropriva diagnosticada', 'Alopécia severa e lesões dolorosas na língua', 'Falta de ar mesmo deitado ou em repouso absoluto (risco sistêmico)']
    },
    excess: {
      toxicity: 'Hemocromatose ou sobrecarga de ferro',
      riscos: [
        'Acúmulo crônico destrutivo no coração, pâncreas (risco de induzir diabetes do bronzeamento) e fígado',
        'Forte propensão a dores articulares intratáveis e fadiga intensa',
        'Sobredosagem aguda (como ingestão acidental infantil de suplementos de ferro de adultos) é altamente letal'
      ],
      interactions: ['Cálcio tomado na mesma refeição reduz a absorção intestinal de ferro em até 50%.']
    },
    sources: [
      { name: 'Bife de Carne Bovina', emoji: '🥩', amount: '100g = 20% RDA' },
      { name: 'Lentilha Cozida', emoji: '🫘', amount: '1 xícara = 35% RDA' },
      { name: 'Sementes de Abóbora', emoji: '🎃', amount: '100g = 50% RDA' },
      { name: 'Gema de Ovo', emoji: '🥚', amount: '1 u = 7% RDA' }
    ],
    rda: {
      children: '7 - 10 mg',
      teens: '11 - 15 mg',
      men: '8 mg',
      women: '18 mg (necessidade elevada por causa de perdas menstruais)',
      pregnant: '27 mg (demanda absurda durante a gestação)',
      lactating: '9 mg',
      elderly: '8 mg'
    }
  },
  {
    id: 'min-zinc',
    type: 'mineral',
    name: 'Zinco',
    nicknames: ['Zinco Quelado', 'Picolinato de Zinco'],
    formula: 'Zn',
    discovery: 'Isolado Quimicamente em 1746 por Andreas Marggraf',
    curiosities: [
      'O zinco é o principal responsável celular pela sua percepção de paladar e olfato: se você não possuir zinco suficiente na boca, sua comida perderá o sabor completamente!',
      'As ostras são as campeãs inquestionáveis de zinco no planeta de longe: apenas uma ostra provê o dobro de zinco necessário pro dia inteiro.'
    ],
    mainFunction: 'O Zinco opera como o gerente geral do sistema imune e modulador mestre que ativa mais de 300 genes e enzimas reparadoras.',
    benefits: [
      { title: 'Exército da Imunidade', description: 'Indispensável para modular as células natural killer e o combate a infecções virais.', category: 'imunidade' },
      { title: 'Metabolismo Saboroso', description: 'Funciona como co-fator celular das papilas gustativas de percepção e síntese proteica.', category: 'pele' },
      { title: 'Aceleração de Cicatrizes', description: 'Reduz inflamações cutâneas combatendo a proliferação bacteriana direta.', category: 'pele' }
    ],
    deficiency: {
      mild: ['Pequenas manchas brancas nas unhas (leuconíquia)', 'Perda sutil de paladar e apetite', 'Lenta cicatrização de pequenos arranhões'],
      moderate: ['Queda pronunciada de cabelos', 'Dermatite persistente nas mãos ou coxas', 'Viroses recorrentes em intervalos curtos'],
      severe: ['Hipogonadismo (atraso de puberdade e maturação genital)', 'Atraso drástico no crescimento infantil', 'Diarreia crônica de perigo clínico']
    },
    excess: {
      toxicity: 'Intoxicação por Zinco aguda ou crônica',
      riscos: [
        'Consumir mais de 50mg/dia de forma contínua inibe a absorção de Cobre, desencadeando anemia induzida por cobre',
        'Cólicas estomacais violentas e vômitos acentuados se tomados em jejum',
        'Supressão dos níveis de colesterol bom (HDL) no sangue'
      ],
      interactions: ['Grandes doses inibem a absorção perfeita de Ferro de origem não-heme.']
    },
    sources: [
      { name: 'Ostra Fresca', emoji: '🦪', amount: '1 u = 150% RDA' },
      { name: 'Carne Bovina cozida', emoji: '🥩', amount: '100g = 55% RDA' },
      { name: 'Castanha de Caju', emoji: '🥜', amount: '100g = 45% RDA' },
      { name: 'Semente de Abóbora', emoji: '🎃', amount: '100g = 70% RDA' }
    ],
    rda: {
      children: '3 - 5 mg',
      teens: '8 - 11 mg',
      men: '11 mg',
      women: '8 mg',
      pregnant: '11 mg',
      lactating: '12 mg',
      elderly: '8 - 11 mg'
    }
  },
  {
    id: 'min-magnesium',
    type: 'mineral',
    name: 'Magnésio',
    nicknames: ['Magnésio Bisglicinato', 'Cloreto de Magnésio', 'Malato de Magnésio', 'Treonato de Magnésio'],
    formula: 'Mg',
    discovery: 'Identificado em 1755 por Joseph Black, isolado metalicamente por Humphry Davy em 1808',
    curiosities: [
      'O magnésio é a base celular da clorofila: o que o ferro é para o nosso sangue, o magnésio é para a seiva verde das plantas!',
      'Diferentes ligações químicas trazem diferentes efeitos: Magnésio Malato é ideal contra cansaço muscular; Magnésio Bisglicinato melhora muito o sono; Magnésio Treonato atravessa a barreira hematoencefálica com foco de performance no cérebro.'
    ],
    mainFunction: 'O Magnésio atua como o eletricista mestre das células, regendo mais de 300 reações do ritmo cardíaco, contração muscular e equilíbrio mental.',
    benefits: [
      { title: 'Estabilização Cardíaca', description: 'Impede arritmias ao contrapor o cálcio na bomba seletiva das células cardíacas.', category: 'coracao' },
      { title: 'Musculatura Relaxada', description: 'Previne as cãibras noturnas severas e espasmos da pálpebra (mioquimia).', category: 'ossos' },
      { title: 'Calma e Sono Reparador', description: 'Atua como antagonista de receptores NMDA excitatórios no cérebro, facilitando a ação do GABA.', category: 'cerebro' }
    ],
    deficiency: {
      mild: ['Espasmo esporádico involuntário na pálpebra do olho', 'Cãibras eventuais ao alongar-se pela manhã', 'Dificuldade para descontrair ou deitar de forma calma'],
      moderate: ['Pressão arterial com picos de elevação', 'Fadiga muscular acompanhada de tremores discretos', 'Insônia persistente acordando com queixa de desgaste muscular'],
      severe: ['Arritmias cardíacas severas e potencialmente perigosas', 'Convulsões por excitabilidade extrema', 'Alucinações síncronas de delírio e espasmos musculares constantes']
    },
    excess: {
      toxicity: 'Hipermagnesemia (quase sempre ligada à insuficiência renal severa)',
      riscos: [
        'Diarreia osmótica líquida acentuada (efeito clássico do uso de leite de magnésia laxativo)',
        'Queda drástica excessiva da pressão de bombeamento (hipotensão profunda)',
        'Bloqueio neuromuscular com enfraquecimento total cardíaco respiratório'
      ],
      interactions: ['Pode reduzir a absorção de antibióticos quinolonas se tomados de forma próxima.']
    },
    sources: [
      { name: 'Semente de Abóbora', emoji: '🎃', amount: '100g = 135% RDA' },
      { name: 'Espinafre Cozido', emoji: '🥬', amount: '100g = 20% RDA' },
      { name: 'Chocolate Amargo (70%)', emoji: '🍫', amount: '100g = 55% RDA' },
      { name: 'Amêndoas', emoji: '🥜', amount: '100g = 60% RDA' }
    ],
    rda: {
      children: '80 - 130 mg',
      teens: '240 - 410 mg',
      men: '400 - 420 mg',
      women: '310 - 320 mg',
      pregnant: '350 - 360 mg',
      lactating: '310 - 320 mg',
      elderly: '320 - 420 mg'
    }
  },
  {
    id: 'min-potassium',
    type: 'mineral',
    name: 'Potássio',
    nicknames: ['Potássio Quelato', 'Citrato de Potássio'],
    formula: 'K',
    discovery: 'Isolado em 1807 por Humphry Davy a partir da cinza de potassa',
    curiosities: [
      'Apesar de as lendas consagrarem a banana como a campeã absoluta de potássio, a água de coco, abacates e batatas têm quantidades de potássio substancialmente maiores do que a fruta!',
      'Representa o principal eletrólito intracelular, em oposição simétrica ao sódio localizado fora das células.'
    ],
    mainFunction: 'O Potássio funciona como o condutor do ritmo bioelétrico, mantendo as batidas do seu coração reguladas e equilibrando os fluidos corporais.',
    benefits: [
      { title: 'Ritmo Sinusal Perfeito', description: 'Estabiliza a polarização das células elétricas geradoras do bombeamento cardíaco.', category: 'coracao' },
      { title: 'Combate ao Excesso de Sal', description: 'Promove a eliminação renal do sódio excessivo circulante, aliviando a carga arterial.', category: 'coracao' },
      { title: 'Impulso Motor Poderoso', description: 'Garante eficiência total nas contrações voluntárias esqueléticas da musculatura.', category: 'energia' }
    ],
    deficiency: {
      mild: ['Cansaço imotivado sutil em treinos', 'Ligeira sensação de pernas pesadas ao final do dia', 'Prisão de ventre esporádica'],
      moderate: ['Fraqueza de tônus muscular pronunciada', 'Cãibras recorrentes dolorosas em panturrilhas', 'Palpitações esporádicas incômodas'],
      severe: ['Hipocalemia grave (risco iminente de colapso do batimento por paralisia cardíaca)', 'Paralisia do intestino (íleo paralítico)', 'Dificuldade de contração pulmonar para respirar']
    },
    excess: {
      toxicity: 'Hipercalemia (altamente agressiva devido à facilidade de perturbar o coração)',
      riscos: [
        'Arritmia extrema fulminante por despolarização contínua das membranas cardíacas',
        'Ansiedade severa e cansaço profundo súbito',
        'Falência de filtração renal aguda'
      ],
      interactions: ['Medicamentos poupadores de potássio (como Espironolactona para pressão) podem elevar os níveis de forma dramática aos rins.']
    },
    sources: [
      { name: 'Água de Coco', emoji: '🥥', amount: '1 copo = 15% RDA' },
      { name: 'Abacate', emoji: '🥑', amount: '1 u = 25% RDA' },
      { name: 'Banana Nanica', emoji: '🍌', amount: '1 u = 10% RDA' },
      { name: 'Batata Assada com Casca', emoji: '🥔', amount: '1 u grande = 20% RDA' }
    ],
    rda: {
      children: '2000 - 2300 mg',
      teens: '2600 - 3000 mg',
      men: '3400 mg',
      women: '2600 mg',
      pregnant: '2900 mg',
      lactating: '2800 mg',
      elderly: '2600 - 3400 mg'
    }
  },
  {
    id: 'min-calcium',
    type: 'mineral',
    name: 'Cálcio',
    nicknames: ['Carbonato de Cálcio', 'Citrato de Cálcio', 'Malato de Cálcio'],
    formula: 'Ca',
    discovery: 'Isolado em 1808 por Humphry Davy; papel biológico consolidado no final do século XIX',
    curiosities: [
      'Estima-se que 99% do cálcio corporal se localize rigidamente na ossatura cristalina e dentes, funcionando como estoque reserva estratégico.',
      'Apenas 1% do cálcio circula solúvel na corrente sanguínea — contudo, esse 1% é tão sagrado que se faltar na refeição, o organismo imediatamente retira cálcio dos ossos via paratormônio para evitar paradas musculares urgentes!'
    ],
    mainFunction: 'O Cálcio é as vigas de sustentação estrutural do corpo humano, edificando dentes e ossos densos, além de permitir o mecanismo biológico de contração muscular.',
    benefits: [
      { title: 'Ossatura de Aço', description: 'Matriz principal de hidroxiapatita que confere rigidez total contra compressões físicas.', category: 'ossos' },
      { title: 'Contração do Coração', description: 'Aciona os filamentos de actina e miosina permitindo os batimentos vitais.', category: 'coracao' },
      { title: 'Transmissão Nervosa', description: 'Garante o estímulo e a liberação de mensageiros sinápticos entre os neurônios.', category: 'cerebro' }
    ],
    deficiency: {
      mild: ['Cãibras discretas esporádicas nos pés', 'Unhas que quebram com surpreendente fragilidade', 'Esfregamento sutil de dentes fracos'],
      moderate: ['Osteopenia perceptível em exames de densidade', 'Espasmos generalizados dolorosos (tetania latente)', 'Formigamentos constantes na ponta de dedos'],
      severe: ['Osteoporose severa (ossos quebradiços cheios de pequenos poros vazados)', 'Fraturas espontâneas ao menor choque ou sentar rápido', 'Tetania evidente e espasmo cardíaco perigoso']
    },
    excess: {
      toxicity: 'Hipercalcemia e deposição tecidual',
      riscos: [
        'Praticamente insolúvel se tomado sem Vitaminas D e K2, acumulando-se e gerando placas endurecidas nas artérias',
        'Pedras renais gigantescas de oxalato de cálcio de difícil excreção',
        'Redução severa da absorção de outros nutrientes valiosos (Zinco, Magnésio, Ferro)'
      ],
      interactions: ['Inibe a absorção intestinal de tetraciclina (antibiótico).']
    },
    sources: [
      { name: 'Gergelim (Sementes)', emoji: '🌱', amount: '100g = 95% RDA' },
      { name: 'Queijo Parmesão', emoji: '🧀', amount: '100g = 120% RDA' },
      { name: 'Leite Integral', emoji: '🥛', amount: '1 copo = 30% RDA' },
      { name: 'Tofu Consistente', emoji: '🥛', amount: '100g = 35% RDA' }
    ],
    rda: {
      children: '700 - 1000 mg',
      teens: '1300 mg (período crítico de pico de massa óssea)',
      men: '1000 mg (1200 mg acima de 70 anos)',
      women: '1000 mg (1200 mg acima de 50 anos)',
      pregnant: '1000 mg',
      lactating: '1000 mg',
      elderly: '1200 mg'
    }
  },
  {
    id: 'min-selenium',
    type: 'mineral',
    name: 'Selênio',
    nicknames: ['L-Selenometionina', 'Selenito de Sódio'],
    formula: 'Se',
    discovery: 'Descoberto em 1817 por Jöns Jacob Berzelius',
    curiosities: [
      'A castanha-do-pará é a maior campeã planetária de selênio isolada de longe: apenas uma castanha provê mais que o dobro da meta diária de selênio!',
      'Gera selenoproteínas de incrível atividade enzimática de limpeza de toxinas no fígado.'
    ],
    mainFunction: 'O Selênio atua como o combustível imunitário da glândula tireoide, permitindo a ativação dos hormônios e blindando as células com a poderosa glutationa peroxidase.',
    benefits: [
      { title: 'Ativação da Tireoide', description: 'Coenzima essencial que converte o hormônio passivo T4 no ativo utilizável T3.', category: 'hormonios' },
      { title: 'Super Desintoxicação', description: 'Co-fator estrutural da enzima glutationa, eliminando elementos nocivos circulantes.', category: 'geral' },
      { title: 'Células Longevas', description: 'Combate o envelhecimento precoce dos vasos coronários arteriais.', category: 'coracao' }
    ],
    deficiency: {
      mild: ['Enfraquecimento e queda sutil de fios capilares', 'Unhas frágeis com rachaduras discretas', 'Desgaste e cansaço mental'],
      moderate: ['Fraqueza muscular generalizada involuntária', 'Níveis crescentes de cansaço extremo e hipofunção tireoidiana', 'Imunidade com declínio perceptível'],
      severe: ['Doença de Keshan (insuficiência cardíaca grave por perda de selênio em áreas agrícolas)', 'Infertilidade total recorrente', 'Declínio cognitivo imprevisto']
    },
    excess: {
      toxicity: 'Selenose (altamente tóxico se suplementado sem rigorosos limites)',
      riscos: [
        'Hálito forte com desagradável cheiro característico de alho (devido a gases seleníferos)',
        'Queda rápida massiva de dentes e unhas caindo inteiras aos pedaços',
        'Irritabilidade do humor extrema e tremores perigosos de coordenação'
      ],
      interactions: ['Pode aumentar em taxas discretas efeitos de suplementos de iodo na tireoide.']
    },
    sources: [
      { name: 'Castanha-do-Pará', emoji: '🌰', amount: '1 unidade = 175% RDA' },
      { name: 'Semente de Girassol', emoji: '🌻', amount: '100g = 110% RDA' },
      { name: 'Atum Enlatado', emoji: '🐟', amount: '100g = 135% RDA' },
      { name: 'Ovo de Galinha', emoji: '🥚', amount: '1 u = 25% RDA' }
    ],
    rda: {
      children: '20 - 30 mcg',
      teens: '40 - 55 mcg',
      men: '55 mcg',
      women: '55 mcg',
      pregnant: '60 mcg',
      lactating: '70 mcg',
      elderly: '55 mcg'
    }
  },
  {
    id: 'min-phosphorus',
    type: 'mineral',
    name: 'Fósforo',
    nicknames: ['Fosfato'],
    formula: 'P',
    discovery: 'Isolado em 1669 por Hennig Brand a partir de urina concentrada quimicamente brilhante',
    curiosities: [
      'Representa o segundo mineral mais abundante das estruturas humanas, trabalhando estritamente junto ao cálcio no cristal celular.',
      'O nome vem do grego e significa "portador da luz", referindo-se ao fato de emitir uma incandescência tênue no escuro quando oxidado.'
    ],
    mainFunction: 'O Fósforo é o arquiteto da bateria celular, agindo ativamente com o cálcio nas vigas estruturais dos dentes e constituindo a base energética do ATP e do seu DNA.',
    benefits: [
      { title: 'Componente do ATP', description: 'O "P" da sigla Adenosina Trifosfato: a bateria química que permite contração e vida celular.', category: 'energia' },
      { title: 'Formação óssea dual', description: 'Une-se ao cálcio compondo placas que conferem rigidez à ossatura corporal.', category: 'ossos' },
      { title: 'Tijolos do DNA', description: 'Elemento de estrutura espiral do código genético e das membranas fosfolipídicas.', category: 'geral' }
    ],
    deficiency: {
      mild: ['Ligeira fadiga energética ao começar treinos curtíssimos', 'Fraqueza óssea dental sutil', 'Falta de apetite'],
      moderate: ['Cansaço crônico muscular pronunciado', 'Fragilidade crônica de unhas e dentes descascados', 'Dores no movimento das articulações'],
      severe: ['Hipofosfatemia grave (insuficiência cardiorrespiratória severa)', 'Anemia por fragilidade da membrana das células sanguíneas', 'Amolecimento progressivo completo da estrutura dos ossos']
    },
    excess: {
      toxicity: 'Hiperfosfatemia',
      riscos: [
        'Excesso estrangula o cálcio, arrancando cálcio dos ossos e acelerando osteoporose severa',
        'Calcificação de depósitos em veias e artérias coronárias',
        'Grave incômodo sistêmico digestivo e coceiras fortes'
      ],
      interactions: ['Antiácidos contendo Alumínio ou Magnésio podem inibir a absorção perfeita de fósforo alimentar.']
    },
    sources: [
      { name: 'Salmão Grelhado', emoji: '🐟', amount: '100g = 45% RDA' },
      { name: 'Semente de Abóbora', emoji: '🎃', amount: '100g = 130% RDA' },
      { name: 'Iogurte Natural', emoji: '🥛', amount: '100g = 25% RDA' },
      { name: 'Feijão Preto', emoji: '🫘', amount: '1 xícara = 35% RDA' }
    ],
    rda: {
      children: '460 - 500 mg',
      teens: '1250 mg',
      men: '700 mg',
      women: '700 mg',
      pregnant: '700 mg',
      lactating: '700 mg',
      elderly: '700 mg'
    }
  },
  {
    id: 'min-iodine',
    type: 'mineral',
    name: 'Iodo',
    nicknames: ['Iodeto de Potássio'],
    formula: 'I',
    discovery: 'Descoberto pelo químico francês Bernard Courtois em 1811 ao processar algas marinhas',
    curiosities: [
      'Foi adotado como fortificação obrigatória mundial no sal de cozinha (Sal Iodado) para combater a terrível epidemia mundial de Bócio, que gerava inchaços monstruosos na região do pescoço em áreas interiores distantes do mar.',
      'Representa o componente vital insubstituível dos hormônios tireoidianos T4 (Tetraiodotironina - 4 átomos de iodo) e T3 (Triiodotironina).'
    ],
    mainFunction: 'O Iodo funciona como o pedal acelerador do seu metabolismo, permitindo que a glândula tireoide regule a temperatura e a queima de caloria corporal.',
    benefits: [
      { title: 'Combustível Tireoidiano', description: 'Garante a síntese de T3 e T4, evitando o colapso por hipotireoidismo severo.', category: 'hormonios' },
      { title: 'Ativação Cognitiva', description: 'Essencial na gravidez para o correto desenvolvimento cerebral do feto.', category: 'cerebro' },
      { title: 'Queima Calórica Estável', description: 'Mecanismo crítico para modular o peso corporal saudável por meio do gasto metabólico basal.', category: 'energia' }
    ],
    deficiency: {
      mild: ['Ligeira letargia e lentidão mental ao longo do dia', 'Surgimento fácil de inchaços nos olhos ao amanhecer', 'Unhas e derme secas e descamadas'],
      moderate: ['Ganho de peso inexplicável com pouquíssimo apetite', 'Bócio difuso sutil (ligeiro calo inchado na garganta)', 'Ritmo de batimento cardíaco muito lento (bradicardia)'],
      severe: ['Cretinismo em recém-nascidos (deficiência cognitiva severa irreversível por carência materna)', 'Bócio gigante nodular estrangulante de pescoço', 'Colapso sistêmico grave por coma de mixedema']
    },
    excess: {
      toxicity: 'Intoxicação por Iodo aguda ou tireoidite crônica',
      riscos: [
        'Curiosamente, consumir iodo em excesso colossal pode desligar temporariamente a produção da tireoide (Efeito Wolff-Chaikoff)',
        'Hipertireoidismo induzido com taquicardia descontrolada, agressividade mental e forte perda de peso prejudicial',
        'Gosto metálico acentuado doloroso na garganta'
      ],
      interactions: ['Evitar com Lítio, pois potencializa de forma excessiva a queda hormonal.']
    },
    sources: [
      { name: 'Algas Kelp desidratadas', emoji: '🥬', amount: '1g = 1300% RDA' },
      { name: 'Sal Iodado', emoji: '🧂', amount: '1g = 30% RDA' },
      { name: 'Peixe Pescada', emoji: '🐟', amount: '100g = 45% RDA' },
      { name: 'Leite Desnatado', emoji: '🥛', amount: '1 copo = 35% RDA' }
    ],
    rda: {
      children: '90 - 120 mcg',
      teens: '150 mcg',
      men: '150 mcg',
      women: '150 mcg',
      pregnant: '220 mcg',
      lactating: '290 mcg',
      elderly: '150 mcg'
    }
  },
  {
    id: 'min-copper',
    type: 'mineral',
    name: 'Cobre',
    nicknames: ['Cobre Quelato', 'Gluconato de Cobre'],
    formula: 'Cu',
    discovery: 'Utilizado metalicamente há milênios; essencialidade biológica humana consolidada em 1928',
    curiosities: [
      'Garante que o ferro seja oxidado de forma a poder ser engajado nas moléculas do sangue.',
      'Auxilia na síntese das enzimas de melanina, doando os pigmentos ideais que dão a cor aos seus olhos, pele e cabelos.'
    ],
    mainFunction: 'O Cobre age como o eletricista auxiliar do sangue, auxiliando na síntese do ferro e tecendo elastina para manter as artérias do coração elásticas.',
    benefits: [
      { title: 'Síntese de Melanina', description: 'Componente estrutural que evita o aparecimento precoce de cabelos brancos.', category: 'pele' },
      { title: 'Fixador de Ferro e Globina', description: 'Oxida o ferro ferroso a férrico de forma a engajá-lo nas plaquetas respiratórias.', category: 'geral' },
      { title: 'Artérias Flexíveis', description: 'Co-fator da lisil oxidase tecendo elastina saudável para o coração.', category: 'coracao' }
    ],
    deficiency: {
      mild: ['Aparecimento isolado de cabelos brancos antes dos 30', 'Ligeiro cansaço sem motivo aparente', 'Unhas que quebram facilmente'],
      moderate: ['Anemia inexplicada refratária que teima em não melhorar com suplementação de ferro', 'Queda de cabelos frouxos', 'Dificuldades leves de equilíbrio ao fechar olhos'],
      severe: ['Neutropenia severa (redução perigosa crônica de defesas celulares)', 'Mielopatia por cobre (clara fraqueza periférica semelhante à deficiência de B12)', 'Osteoporose precoce em idades atípicas']
    },
    excess: {
      toxicity: 'Doença de Wilson (genética) ou toxicidade direta da água de canos de cobre',
      riscos: [
        'Dores estomacais agudas com forte queimação intestinal com vômitos azuis-esverdeados',
        'Síntese hepática com cirrose terminal hepática perigosa se ingerido em abusos severos frequentes',
        'Acúmulo nos olhos desenhando um anel marrom ao redor da íris (Anel de Kayser-Fleischer)'
      ],
      interactions: ['Uso recorrente crônico de Zinco inibe as quantidades ideais de Cobre.']
    },
    sources: [
      { name: 'Ostras Frescas', emoji: '🦪', amount: '1 u = 240% RDA' },
      { name: 'Fígado bovino cozido', emoji: '🥩', amount: '100g = 1300% RDA' },
      { name: 'Cacau em Pó', emoji: '🍫', amount: '100g = 300% RDA' },
      { name: 'Sementes de Sésamo', emoji: '🌱', amount: '100g = 450% RDA' }
    ],
    rda: {
      children: '340 - 440 mcg',
      teens: '700 - 890 mcg',
      men: '900 mcg',
      women: '900 mcg',
      pregnant: '1000 mcg',
      lactating: '1300 mcg',
      elderly: '900 mcg'
    }
  },
  {
    id: 'min-manganese',
    type: 'mineral',
    name: 'Manganês',
    nicknames: ['Manganês Quelato', 'Sulfato de Manganês'],
    formula: 'Mn',
    discovery: 'Isolado em 1774 por Johan Gottlieb Gahn',
    curiosities: [
      'Representa um superescudo antioxidante dentro das mitocôndrias celular, através da enzima Mn-Superóxido Dismutase!',
      'É abundante nas cascas grosseiras dos grãos integrais verdes e vegetais folhosos terrestres.'
    ],
    mainFunction: 'O Manganês atua como o catalisador metálico das suas articulações, tecendo novas cartilagens e protegendo as mitocôndrias geradoras de ATP.',
    benefits: [
      { title: 'Cartilagem Resistente', description: 'Coenzima vital da glicosiltransferase que tece o tecido das articulações e ossos.', category: 'ossos' },
      { title: 'Mitocôndrias Blindadas', description: 'Compostos que evitam o desgaste exaustivo dos geradores mitocondriais.', category: 'geral' },
      { title: 'Cura dos Tecidos', description: 'Indispensável com a Vitamina C para prever a colagem rápida de novos tecidos corporais.', category: 'pele' }
    ],
    deficiency: {
      mild: ['Ligeiro cansaço e rigidez ao alongar joelhos', 'Lenta taxa de crescimento capilar duradoura', 'Unhas lameladas'],
      moderate: ['Perda de massa óssea leve transitória', 'Diminuição discreta na tolerância à glicose alimentar', 'Infertilidade reprodutiva flutuante'],
      severe: ['Redução extrema total em proteínas de coagulação sanguínea', 'Atraso sistêmico severo de esqueleto infantil', 'Crises constantes e severas convulsivas por hiperexcitabilidade de tecidos']
    },
    excess: {
      toxicity: 'Manganismo devido à aspiração crônica industrial (Mina de carvão/Indústria de pilhas)',
      riscos: [
        'Doença neurológica idêntica ao Mal de Parkinson, com tremores, rigidez extrema e tonturas sem cura',
        'Pesadelos constantes perturbadores de humor',
        'Prejuízos renais de desgaste sistêmico'
      ],
      interactions: ['Altas doses de ferro reduzem a absorção ideal de manganês nos intestinos.']
    },
    sources: [
      { name: 'Mexilhão cozido', emoji: '🦪', amount: '100g = 250% RDA' },
      { name: 'Arroz Integral', emoji: '🥣', amount: '100g = 45% RDA' },
      { name: 'Pinhões / Noz Pinoli', emoji: '🥜', amount: '100g = 380% RDA' },
      { name: 'Couve cozida', emoji: '🥬', amount: '100g = 40% RDA' }
    ],
    rda: {
      children: '1.2 - 1.5 mg',
      teens: '1.6 - 2.2 mg',
      men: '2.3 mg',
      women: '1.8 mg',
      pregnant: '2.0 mg',
      lactating: '2.6 mg',
      elderly: '1.8 - 2.3 mg'
    }
  }
];
