import React, { useState, useEffect, useRef } from 'react';
import {
  Search, Camera, MessageSquare, Award, ShieldAlert, BookOpen,
  User, Sparkles, Heart, Activity, Sun, Moon, ChevronRight,
  Info, TrendingUp, Droplet, Settings, AlertTriangle, CheckCircle,
  Upload, X, ChevronDown, Plus, HeartHandshake, MapPin, Share2, Eye,
  Crown, Star, FileText, Printer, Dna
} from 'lucide-react';
import { NUTRIENT_DATABASE } from './data';
import {
  Nutrient, ChatMessage, ScanResult, QuizAnswer,
  ProfileAnalysis, Mission, UserProgress, CommunityPost
} from './types';

export default function App() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [selectedNutrient, setSelectedNutrient] = useState<Nutrient | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [nutrientTypeFilter, setNutrientTypeFilter] = useState<'all' | 'vitamin' | 'mineral'>('all');

  // --- PREMIUM TIERS & MICRONUTRIENT TRACKERS ---
  const [isPremium, setIsPremium] = useState<boolean>(() => {
    return localStorage.getItem('vitaminapedia_premium') === 'true';
  });
  const [activePremiumSubTab, setActivePremiumSubTab] = useState<'tracker' | 'cardapio' | 'genomica'>('tracker');
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [isCheckoutSimulating, setIsCheckoutSimulating] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<number>(0);
  const [isGeneratingCardapio, setIsGeneratingCardapio] = useState<boolean>(false);
  const [premiumCardapio, setPremiumCardapio] = useState<any>(() => {
    const saved = localStorage.getItem('vitaminapedia_cardapio');
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedPlanPrice, setSelectedPlanPrice] = useState<string>('R$ 9,90/mês');
  
  const [dailyTracker, setDailyTracker] = useState<{name: string, current: number, max: number, unit: string}[]>(() => {
    const saved = localStorage.getItem('vitaminapedia_tracker');
    if (saved) return JSON.parse(saved);
    return [
      { name: 'Vitamina C', current: 20, max: 100, unit: 'mg' },
      { name: 'Vitamina D', current: 5, max: 50, unit: 'mcg' },
      { name: 'Magnésio', current: 80, max: 350, unit: 'mg' },
      { name: 'B12', current: 0.6, max: 2.4, unit: 'mcg' },
      { name: 'Ferro', current: 4, max: 18, unit: 'mg' },
      { name: 'Zinco', current: 2, max: 11, unit: 'mg' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('vitaminapedia_tracker', JSON.stringify(dailyTracker));
  }, [dailyTracker]);
  
  // Chat IA
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Olá! Sou o Nutricionista IA. Posso te explicar tudo sobre vitaminas e minerais do seu corpo, além de analisar deficiências ou alimentos. O que você gostaria de descobrir hoje?',
      timestamp: new Date()
    }
  ]);
  const [currentMessageText, setCurrentMessageText] = useState<string>('');
  const [isChatTyping, setIsChatTyping] = useState<boolean>(false);

  // Scanner de Rótulos
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Quiz de Saúde Preventiva
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer>({
    age: 28,
    gender: 'mulher',
    diet: 'onivoro',
    dietQuality: 'media',
    sunExposure: 'pouca',
    energyLevel: 'medio',
    symptoms: []
  });
  const [isQuizAnalysing, setIsQuizAnalysing] = useState<boolean>(false);
  const [profileAnalysis, setProfileAnalysis] = useState<ProfileAnalysis | null>(null);

  // Gamificação / Progresso do usuário
  const [userProgress, setUserProgress] = useState<UserProgress>({
    xp: 60,
    level: '🌱 Iniciante Nutricional',
    scannedCount: 0,
    articlesReadCount: 0,
    completedQuiz: false,
    streak: 2
  });

  const [missions, setMissions] = useState<Mission[]>([
    { id: 'm1', title: 'Aprenda sobre a Visão', description: 'Leia sobre o papel e fontes alimentares da Vitamina A.', xpReward: 50, completed: false },
    { id: 'm2', title: 'Escanear Alimento Saudável', description: 'Obtenha um escore acima de 80 ao escanear algum produto.', xpReward: 100, completed: false },
    { id: 'm3', title: 'Sua Primeira Consulta', description: 'Faça uma pergunta focada em sintomas ao Nutricionista IA.', xpReward: 50, completed: false },
    { id: 'm4', title: 'Mapeamento Preventivo', description: 'Complete o questionário inteligente de saúde preventiva.', xpReward: 150, completed: false }
  ]);

  // Comunidade
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([
    {
      id: 'p1',
      userName: 'Dr. Lucas Ferreira',
      userAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150',
      title: 'A sinergia fascinante da Vitamina D com K2 ☀️',
      content: 'Muitas pessoas suplementam cálcio sem entender que, sem as Vitaminas D3 e K2 (MK-7), esse elemento pode se acumular nas artérias em vez dos ossos. A D3 ajuda a absorver o cálcio no intestino, e a K2 ativa a osteocalcina, guiando-o diretamente para a estrutura óssea e dentes. Prefira consumir o Natto ou gema de ovo sempre que possível!',
      likes: 42,
      likedByUser: false,
      commentsCount: 9,
      tag: 'Suplementação',
      timestamp: 'Há 2 horas'
    },
    {
      id: 'p2',
      userName: 'Camila Albuquerque',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      title: 'Chocada com a nota do Suco de Laranja Integral! 🍊',
      content: 'Acabei de passar o Scanner Inteligente no rótulo daquela marca famosa. Deu 94/100! Fiquei super feliz por ter 100% da minha necessidade diária de Vitamina C de forma natural. É maravilhoso sabermos exatamente o que colocamos no corpo.',
      likes: 28,
      likedByUser: false,
      commentsCount: 4,
      tag: 'Descoberta',
      timestamp: 'Há 5 horas'
    }
  ]);
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [newPostTag, setNewPostTag] = useState<string>('Descoberta');

  // Corpo Humano Mapa Interativo
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);

  // --- INTERACTION HOOKS & FUNCTIONS ---

  // Handle Level Up calculations
  const addXP = (amount: number) => {
    setUserProgress(prev => {
      const newXP = prev.xp + amount;
      let newLevel = prev.level;
      if (newXP >= 1000) newLevel = '👑 Lenda da Nutrição';
      else if (newXP >= 600) newLevel = '🚀 Cientista Nutricional';
      else if (newXP >= 300) newLevel = '🧬 Mestre das Vitaminas';
      else if (newXP >= 100) newLevel = '🥗 Explorador da Saúde';
      return {
        ...prev,
        xp: newXP,
        level: newLevel
      };
    });
  };

  const completeMission = (missionId: string) => {
    setMissions(prev => prev.map(m => {
      if (m.id === missionId && !m.completed) {
        addXP(m.xpReward);
        return { ...m, completed: true };
      }
      return m;
    }));
  };

  // Open Detailed view and trigger Read Mission
  const handleSelectNutrient = (nutrient: Nutrient) => {
    setSelectedNutrient(nutrient);
    if (nutrient.id === 'vit-a') {
      completeMission('m1');
    }
    setUserProgress(prev => ({
      ...prev,
      articlesReadCount: prev.articlesReadCount + 1
    }));
  };

  // Chat with AI Action
  const handleSendChatMessage = async () => {
    if (!currentMessageText.trim()) return;
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: currentMessageText,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMsg]);
    const inputPrompt = currentMessageText;
    setCurrentMessageText('');
    setIsChatTyping(true);

    // Complete AI query mission
    completeMission('m3');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg]
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setChatMessages(prev => [...prev, {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: data.text || 'Desculpe, tive um problema ao analisar sua questão.',
        timestamp: new Date()
      }]);
    } catch (err: any) {
      setChatMessages(prev => [...prev, {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: `Erro: ${err.message || 'Não consegui conectar ao cérebro do assistente IA.'}`,
        timestamp: new Date()
      }]);
    } finally {
      setIsChatTyping(false);
    }
  };

  // Trigger quick preset questions in AI Chat
  const triggerQuickQuestion = (qn: string) => {
    setCurrentMessageText(qn);
  };

  // Camera activation for Scanner
  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.warn('Câmera bloqueada ou indisponível:', err);
      // Fallback with visual warning, no hard error block since user can still upload or choose preset
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setUploadedImage(dataUrl);
        stopCamera();
      }
    }
  };

  // Drag and drop or Browse file
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Scan with AI Trigger
  const handlePerformScan = async () => {
    setIsScanning(true);
    setScanResult(null);

    try {
      const bodyPayload = selectedPreset 
        ? { presetId: selectedPreset }
        : { image: uploadedImage };

      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setScanResult(data);
      setUserProgress(prev => ({ ...prev, scannedCount: prev.scannedCount + 1 }));

      // Check if scanned product is healthy (>80) to satisfy mission 2
      if (data.score > 80) {
        completeMission('m2');
      }
    } catch (err: any) {
      console.error('Scan Error:', err);
      // Generate rich descriptive feedback in UI
      setScanResult({
        productName: 'Produto Escaneado',
        score: 50,
        gradeText: '50/100 Análise Parcial',
        gradeColor: 'yellow',
        aiExplanation: [
          'Não obtivemos resposta completa do scanner alimentado por IA.',
          'Verifique as permissões do seu dispositivo para transmitir imagens com segurança ou tente novamente usando outro produto ou preset do catálogo.'
        ],
        alerts: ['⚠ Tentativa falhou ou imagem borrada'],
        detectedNutrients: [],
        whatYouAreIngesting: [],
        bodyImpact: []
      });
    } finally {
      setIsScanning(false);
    }
  };

  // Perform Preventative Quiz Assessment
  const handleAnalyseQuiz = async () => {
    setIsQuizAnalysing(true);
    setProfileAnalysis(null);

    // satisfy mission 4
    completeMission('m4');

    try {
      const response = await fetch('/api/saude-preventiva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quiz: quizAnswers })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setProfileAnalysis(data);
      setUserProgress(prev => ({ ...prev, completedQuiz: true }));
    } catch (err: any) {
      setProfileAnalysis({
        riskScore: 45,
        vulnerabilities: [
          { nutrient: 'Vitamina D', severity: 'moderada', explanation: 'Estilo de vida residencial diminui a estimulação solar direta deste hormônio.' }
        ],
        recommendations: [
          'Tente se expor ao sol saudável da manhã por 15 minutos diariamente.',
          'Adicione fontes ricas como cogumelos expostos ao sol, ovos e pescados gordurosos.'
        ],
        sunExpAdvice: 'Sua exposição solar declarada é baixa.',
        dietAdvice: 'Equilibre sua alimentação com verduras folhosas escuras e proteínas variadas.'
      });
    } finally {
      setIsQuizAnalysing(false);
    }
  };

  // --- PREMIUM UPGRADE & MEAL GENERATING METHODS ---
  const handleGeneratePremiumCardapio = async () => {
    setIsGeneratingCardapio(true);
    try {
      const response = await fetch('/api/premium-cardapio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quiz: quizAnswers })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setPremiumCardapio(data);
      localStorage.setItem('vitaminapedia_cardapio', JSON.stringify(data));
    } catch (err) {
      console.error(err);
      // Fallback in case of server offline or error
      const mockCardapio = {
        targetGoals: ['Completar síntese de Vitamina D', 'Aumentar fontes de Ferro e absorção de micronutrientes', 'Sincronizar batimentos e imunidade com aminoácidos'],
        days: [
          {
            dayNumber: 1,
            title: 'Dia 1 - Ativação Mitocondrial e Energética ⚡',
            meals: [
              { name: 'Café da manhã', description: 'Ovos mexidos com gema mole (ricos em Vitamina D e K2) acompanhados de suco de acerola (altíssima Vitamina C para fixar o ferro do organismo).' },
              { name: 'Almoço', description: 'Filé de peixe grelhado (ou grão-de-bico para vegetarianos), folhas de espinafre refogadas com raspas de limão (Vitamina C + Ferro absorção acelerada) e arroz com feijão preto.' },
              { name: 'Lanche', description: 'Mix de castanhas de caju e do pará (Magnésio e Selênio de altíssima pureza biológica) e 1 kiwi.' },
              { name: 'Jantar', description: 'Sopa cremosa de abóbora com gengibre e sementes de girassol (Rica em Vitamina A/Vitamina E protetoras).' }
            ]
          },
          {
            dayNumber: 2,
            title: 'Dia 2 - Reconstrução Celular e Defesa Imune 🛡',
            meals: [
              { name: 'Café da manhã', description: 'Iogurte natural (rico em cálcio) com sementes de linhaça moída e mirtilos/morangos com antioxidante natural.' },
              { name: 'Almoço', description: 'Iscas de carne com cogumelos ou tofu grelhado, acompanhado de brócolis cozido no vapor e arroz integral (Biotina e Complexo B completo).' },
              { name: 'Lanche', description: 'Abacate amassado com gotas de limão e colher pequena de sementes e mel ecológico (Vitamina E de absorção lipídica).' },
              { name: 'Jantar', description: 'Omelete de espinafre com cebola, tomate grelhado e orégano fresco (Potássio, Licopeno e Ferro orgânico).' }
            ]
          },
          {
            dayNumber: 3,
            title: 'Dia 3 - Equilíbrio Biológico e Neurofoco 🧠',
            meals: [
              { name: 'Café da manhã', description: 'Panqueca de aveia, banana e canela (Triptofano e minerais estimulantes da serotonina natural).' },
              { name: 'Almoço', description: 'Moqueca de peixe desfiado ou palmito e cogumelos, finalizado com cúrcuma aromática (Poderoso anti-inflamatório, Zinco mestre e Selênio orgânico).' },
              { name: 'Lanche', description: 'Abacaxi fatiado com folha de hortelã fresca e punhado de sementes de abóbora tostadas.' },
              { name: 'Jantar', description: 'Salada de folhas escuras com gergelim, tiras de frango ou cogumelos refogados e purê de batata doce (Vitamina B6 e Magnésio).' }
            ]
          }
        ],
        suplementacaoDica: 'Considere conversar com seu médico sobre suplementar Vitamina D3 (2000 UI) com K2 (50 mcg) se sua exposição solar residir abaixo de 15 min diários, além de Zinco quelado (15mg) para acelerar a restauração capilar e das unhas frágeis.',
        premiumSlogan: 'Mecanismo Inteligente de Prevenção Mineral Vitaminapédia Pro'
      };
      setPremiumCardapio(mockCardapio);
      localStorage.setItem('vitaminapedia_cardapio', JSON.stringify(mockCardapio));
    } finally {
      setIsGeneratingCardapio(false);
    }
  };

  const handleSimulateCheckout = () => {
    setIsCheckoutSimulating(true);
    setCheckoutStep(1); // pix loading displays
    
    // Step 2 success after 2.5 seconds
    setTimeout(() => {
      setCheckoutStep(2);
      setIsPremium(true);
      localStorage.setItem('vitaminapedia_premium', 'true');
      addXP(100); // Level bonus!
    }, 2500);
  };

  const handlePostCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: CommunityPost = {
      id: String(Date.now()),
      userName: 'Você (Membro Gold)',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      title: newPostTitle,
      content: newPostContent,
      likes: 0,
      likedByUser: false,
      commentsCount: 0,
      tag: newPostTag,
      timestamp: 'Agora'
    };

    setCommunityPosts([newPost, ...communityPosts]);
    setNewPostTitle('');
    setNewPostContent('');
    addXP(30); // Give small bonus for community post
  };

  const handleLikePost = (postId: string) => {
    setCommunityPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likes: p.likedByUser ? p.likes - 1 : p.likes + 1,
          likedByUser: !p.likedByUser
        };
      }
      return p;
    }));
  };

  // Organ metadata for Interactive Map
  const ORGAN_DATA: Record<string, { title: string; subtitle: string; desc: string; list: string[]; emoji: string }> = {
    cerebro: {
      title: '🧠 Saúde de Aço para o Cérebro',
      subtitle: 'Foco, Memória e Transmissões Nervosas',
      desc: 'Os neurônios dependem diretamente do complexo B para tecer a bainha de mielina e do magnésio para modular a ansiedade e relaxar conexões excessivas.',
      list: ['Vitamina B1 (Tiamina) — Combustível', 'Vitamina B6 (Piridoxina) — Serotonina', 'Vitamina B12 (Cobalamina) — Mielina', 'Magnésio — Foco e Calma'],
      emoji: '🧠'
    },
    coracao: {
      title: '❤️ Coração & Vasos Fortalecidos',
      subtitle: 'Pressão Equilibrada e Ritmo Estável',
      desc: 'A contração do miocárdio opera numa dança sincronizada de eletrólitos (potássio e cálcio), enquanto a Vitamina K2 protege as coronárias de enrijecimento.',
      list: ['Vitamina K2 (Menaquinona) — Artérias livres', 'Potássio — Equilíbrio salino', 'Magnésio — Batimento regular', 'Vitamina B3 (Niacina) — Colesterol'],
      emoji: '❤️'
    },
    olhos: {
      title: '👁 Visão Cristalina',
      subtitle: 'Enxergando bem no escuro e protegendo a retina',
      desc: 'A rodopsina, o pigmento essencial para foco noturno, é produzida a partir dos retinóis. Antioxidantes defendem o cristalino contra a catarata precoce.',
      list: ['Vitamina A (Retinol) — Cegueira Noturna', 'Vitamina B2 (Riboflavina) — Proteção solar', 'Vitamina C — Defesa macular'],
      emoji: '👁'
    },
    ossos: {
      title: '🦴 Ossatura Indestrutível',
      subtitle: 'Densidade mineral e dentes inabaláveis',
      desc: 'O cálcio constrói a parede mineral, mas necessita da Vitamina D como ponte para ser absorvido e de K2 para entrar fisicamente nos dentes e ossos.',
      list: ['Vitamina D3 — Ponte de absorção', 'Vitamina K2 — Fixador ósseo', 'Cálcio — Matriz estrutural', 'Fósforo — Sustentação celular'],
      emoji: '🦴'
    },
    pulmoes: {
      title: '🫁 Imunidade & Pulmões Blindados',
      subtitle: 'Combate ativo a vírus de gripe e infecções',
      desc: 'Células T de ataque requerem quantidades calibradas de Vitamina D e Zinco para identificar microrganismos nocivos sem provocar reações alérgicas ou autoimunes.',
      list: ['Vitamina C — Produção de leucócitos', 'Vitamina D — Modulador mestre imune', 'Zinco — Ativação de anticorpos'],
      emoji: '🫁'
    },
    pele: {
      title: '💅 Pele, Unhas & Cabelo Radiantes',
      subtitle: 'Juventude cutânea e produção de queratina',
      desc: 'A queratina de cabelos e unhas necessita da Biotina para ser solidamente tecida. O colágeno da pele é sintetizado com apoio incondicional de Vitamina C.',
      list: ['Vitamina B7 (Biotina) — Fios fortes e unhas grossas', 'Vitamina C — Fábrica de colágeno', 'Vitamina E — Escudo celular contra rugas', 'Zinco — Cicatrização'],
      emoji: '💅'
    }
  };

  // Filtration for dictionary
  const filteredNutrients = NUTRIENT_DATABASE.filter(n => {
    const matchesSearch = n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.nicknames.some(nick => nick.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (nutrientTypeFilter === 'all') return matchesSearch;
    return matchesSearch && n.type === nutrientTypeFilter;
  });

  const downloadIcon = (size: number, filename: string) => {
    const rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#022c22" />
      <stop offset="60%" stop-color="#064e3b" />
      <stop offset="100%" stop-color="#022c22" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399" />
      <stop offset="50%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <linearGradient id="ringGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.2" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.4" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />
  <ellipse cx="256" cy="256" rx="190" ry="85" fill="none" stroke="url(#ringGrad)" stroke-width="6" transform="rotate(-30 256 256)" />
  <circle cx="92" cy="162" r="10" fill="#fbbf24" />
  <circle cx="420" cy="350" r="6" fill="#fbbf24" />
  <g filter="url(#shadow)">
    <path d="M 170,170 C 130,210 130,270 170,310 L 310,170 C 270,130 210,130 170,170 Z" fill="#ffffff" opacity="0.9" />
    <path d="M 200,342 C 240,382 300,382 340,342 L 340,170 L 170,340" fill="none" />
    <path d="M 342,342 C 382,302 382,240 342,200 L 200,342 C 240,382 302,382 342,342 Z" fill="url(#accentGrad)" />
  </g>
  <polygon points="256,190 262,206 279,206 265,216 270,232 256,222 242,232 247,216 233,206 250,206" fill="#fbbf24" filter="url(#shadow)" />
  <path d="M236,256 C236,226 266,221 286,221 C286,251 251,281 236,256 Z" fill="#ffffff" opacity="0.4" />
  <path d="M276,276 C276,246 306,241 326,241 C326,271 291,301 276,276 Z" fill="#ffffff" />
  <text x="256" y="445" font-family="'Inter', sans-serif, system-ui" font-weight="950" font-size="52" fill="#34d399" text-anchor="middle" letter-spacing="1">VITA</text>
</svg>`;

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    const svgBlob = new Blob([rawSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div id="vitaminapedia-app-root" className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* --- APP LAYOUT BANNER & CORE NAV --- */}
      <header id="main-header" className={`border-b sticky top-0 z-40 backdrop-blur-md ${darkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/80'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('inicio')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <span className="text-white font-black text-lg">V</span>
            </div>
            <div>
              <h1 className="font-extrabold tracking-tight text-lg flex items-center">
                Vitaminapédia <span className="ml-1 px-1.5 py-0.5 bg-indigo-500 text-white rounded text-[10px] uppercase font-black tracking-wide">AI</span>
              </h1>
              <p className="text-[10px] opacity-70">O dicionário definitivo das vitaminas</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* XP and Level Ribbon */}
            <div className={`hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${darkMode ? 'bg-slate-900 border border-slate-800' : 'bg-slate-100 border border-slate-200'}`}>
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-amber-500">{userProgress.xp} XP</span>
              <span className="opacity-50">|</span>
              <span className="text-indigo-400">{userProgress.level}</span>
            </div>

            {/* Premium Gold Ribbon Header Badge */}
            {isPremium ? (
              <button
                onClick={() => setActiveTab('premium')}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-black text-xs shadow-md shadow-amber-500/10 transition-all text-center"
              >
                <Crown className="w-4 h-4 fill-slate-950 animate-pulse" />
                <span>MEMBRO PRO</span>
              </button>
            ) : (
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-500/20 text-amber-400 hover:border-amber-500 hover:bg-slate-800 text-xs font-bold transition-all"
              >
                <Crown className="w-4 h-4" />
                <span>Seja PRO (R$9,90)</span>
              </button>
            )}

            {/* Dark Mode toggle */}
            <button
              id="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border transition-all ${darkMode ? 'border-slate-800 hover:bg-slate-900 text-amber-400' : 'border-slate-200 hover:bg-slate-100 text-indigo-600'}`}
              title="Trocar tema"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN HERO AREA / WELCOME GRID (When in Home tab) --- */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
        {activeTab === 'inicio' && (
          <div className="space-y-8 animate-fade-in">
            {/* Hero Message Box */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-emerald-950 via-slate-900 to-indigo-950 border border-indigo-500/20 p-8 md:p-12 text-center md:text-left">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 max-w-2xl">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full tracking-wider uppercase">
                  Tecnologia Multimodal AI
                </span>
                <h2 className="text-3xl md:text-5xl font-black mt-4 leading-tight">
                  Seu corpo explicado nutriente por nutriente. 🧬✨
                </h2>
                <p className="text-lg opacity-80 mt-4 max-w-xl">
                  "Descubra o poder dos nutrientes que alimentam seu corpo." Conecte-se à Wikipédia definitiva de prevenção e educação.
                </p>
                <div className="flex flex-col sm:flex-row mt-6 gap-3">
                  <button 
                    onClick={() => setActiveTab('scanner')} 
                    className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl flex items-center justify-center space-x-2 shadow-md shadow-emerald-500/10 transition-all"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Escanear Rótulo Nutricional</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('explorar')} 
                    className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-extrabold rounded-xl flex items-center justify-center space-x-2 transition-all"
                  >
                    <Search className="w-4 h-4" />
                    <span>Explorar Vitaminas</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats bar inside mobile */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl ${darkMode ? 'bg-slate-900/60 border border-slate-800' : 'bg-slate-100 border border-slate-200'}`}>
              <div className="text-center p-2">
                <p className="text-xs opacity-60">XP Acumulado</p>
                <p className="text-xl font-black text-indigo-500">{userProgress.xp}</p>
              </div>
              <div className="text-center p-2">
                <p className="text-xs opacity-60">Nível Atual</p>
                <p className="text-sm font-bold text-emerald-500">{userProgress.level.split(' ')[1] || userProgress.level}</p>
              </div>
              <div className="text-center p-2">
                <p className="text-xs opacity-60">Rótulos Analisados</p>
                <p className="text-xl font-black text-indigo-500">{userProgress.scannedCount}</p>
              </div>
              <div className="text-center p-2">
                <p className="text-xs opacity-60">Sessão Diária</p>
                <p className="text-xl font-black text-amber-500">🔥 {userProgress.streak} Dias</p>
              </div>
            </div>

            {/* MAIN SECTIONS NAVIGATION BENTO GRID */}
            <div>
              <h3 className="text-xl font-extrabold mb-4 tracking-tight">O que você fará hoje?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Explorar Vitaminas */}
                <div 
                  id="bento-explorar"
                  onClick={() => { setActiveTab('explorar'); setNutrientTypeFilter('vitamin'); }} 
                  className={`group p-5 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-indigo-500 transition-all shadow-sm ${darkMode ? 'bg-slate-900/40 hover:bg-slate-900/80' : 'bg-white hover:bg-slate-50'}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-base">🔍 Explorar Vitaminas</h4>
                  <p className="text-[11px] opacity-75 mt-1.5 leading-relaxed">Dicionário completo com fórmula, descoberta, curiosidades e escala de excesso/deficiência.</p>
                  <span className="inline-flex items-center text-[10.5px] font-bold text-indigo-400 mt-3">
                    Explorar dicionário <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>

                {/* 2. Escanear Rótulo */}
                <div 
                  id="bento-scanner"
                  onClick={() => setActiveTab('scanner')} 
                  className={`group p-5 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-emerald-500 transition-all shadow-sm ${darkMode ? 'bg-slate-900/40 hover:bg-slate-900/80' : 'bg-white hover:bg-slate-50'}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <Camera className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-base">📷 Escanear Rótulo</h4>
                  <p className="text-[11px] opacity-75 mt-1.5 leading-relaxed">Fotografe rótulos de alimentos e suplementos para obter notas e análises completas da IA.</p>
                  <span className="inline-flex items-center text-[10.5px] font-bold text-emerald-400 mt-3">
                    Abrir câmera scanner <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>

                {/* 3. Nutricionista IA */}
                <div 
                  id="bento-chat"
                  onClick={() => setActiveTab('ia')} 
                  className={`group p-5 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-purple-500 transition-all shadow-sm ${darkMode ? 'bg-slate-900/40 hover:bg-slate-900/80' : 'bg-white hover:bg-slate-50'}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-base">🧠 Nutrição IA</h4>
                  <p className="text-[11px] opacity-75 mt-1.5 leading-relaxed">Converse com nosso assistente virtual sobre dúvidas nutricionais, sintomas de fraqueza de vitaminas.</p>
                  <span className="inline-flex items-center text-[10.5px] font-bold text-purple-400 mt-3">
                    Perguntar ao nutricionista <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>

                {/* 4. Mineralpédia */}
                <div 
                  id="bento-mineral"
                  onClick={() => { setActiveTab('explorar'); setNutrientTypeFilter('mineral'); }} 
                  className={`group p-5 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-teal-500 transition-all shadow-sm ${darkMode ? 'bg-slate-900/40 hover:bg-slate-900/80' : 'bg-white hover:bg-slate-50'}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-base">🧪 Mineralpédia</h4>
                  <p className="text-[11px] opacity-75 mt-1.5 leading-relaxed">Ferro, Magnésio, Cálcio, Zinco e mais explicados no mesmo nível detalhado de biologia integrada.</p>
                  <span className="inline-flex items-center text-[10.5px] font-bold text-teal-400 mt-3">
                    Bancos de minerais <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>

                {/* 5. Saúde Preventiva */}
                <div 
                  id="bento-preventivo"
                  onClick={() => setActiveTab('preventivo')} 
                  className={`group p-5 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-pink-500 transition-all shadow-sm ${darkMode ? 'bg-slate-900/40 hover:bg-slate-900/80' : 'bg-white hover:bg-slate-50'}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center mb-3">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-base">❤️ Saúde Preventiva</h4>
                  <p className="text-[11px] opacity-75 mt-1.5 leading-relaxed">Questionário inteligente de hábitos que estima suas carências e gera relatórios personalizados.</p>
                  <span className="inline-flex items-center text-[10.5px] font-bold text-pink-400 mt-3">
                    Fazer autoavaliação <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>

                {/* 6. Mapa do Corpo Humano */}
                <div 
                  id="bento-corpo"
                  onClick={() => setActiveTab('corpo')} 
                  className={`group p-5 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-amber-500 transition-all shadow-sm ${darkMode ? 'bg-slate-900/40 hover:bg-slate-900/80' : 'bg-white hover:bg-slate-50'}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-base">📚 Universo do Corpo</h4>
                  <p className="text-[11px] opacity-75 mt-1.5 leading-relaxed">Mapeamento interativo de órgãos. Escolha cérebro, coração ou ossos para ver suas necessidades.</p>
                  <span className="inline-flex items-center text-[10.5px] font-bold text-amber-400 mt-3">
                    Abrir mapa biológico <ChevronRight className="w-3" />
                  </span>
                </div>

                {/* 7. Área Premium Pro */}
                <div 
                  id="bento-premium"
                  onClick={() => { if (isPremium) { setActiveTab('premium'); } else { setShowUpgradeModal(true); } }} 
                  className={`group p-5 rounded-xl border cursor-pointer hover:border-amber-500 bg-gradient-to-tr from-amber-500/5 via-yellow-500/2 to-transparent transition-all shadow-sm ${darkMode ? 'border-amber-500/20 hover:bg-slate-900/40 bg-slate-900/30' : 'border-amber-200 bg-amber-50/10 hover:bg-amber-50/30'}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                    <Crown className="w-5 h-5 fill-amber-400 animate-pulse" />
                  </div>
                  <h4 className="font-extrabold text-base flex items-center gap-1.5">
                    👑 Área VIP Premium PRO
                    {!isPremium && <span className="text-[9px] bg-amber-500 text-slate-950 px-1 py-0.5 rounded font-black font-mono">NOVO</span>}
                  </h4>
                  <p className="text-[11px] opacity-75 mt-1.5 leading-relaxed">Plano de refeições de 3 dias por IA, simulação nutrigenômica de DNA e absorção em tempo real.</p>
                  <span className="inline-flex items-center text-[10.5px] font-bold text-amber-400 mt-3">
                    {isPremium ? 'Abrir portal VIP' : 'Desbloquear PRO (R$9,90)'} <ChevronRight className="w-4 h-3 ml-0.5" />
                  </span>
                </div>

              </div>
            </div>


            {/* Banner slogan */}
            <div className="text-center py-4 opacity-60 italic text-sm">
              "Entenda os nutrientes. Transforme sua saúde." — Wikipédia Inteligente Vitaminapédia AI 🧪✨
            </div>
          </div>
        )}

        {/* --- MODULE 1 & 2: DICIONÁRIO DE VITAMINAS & MINERALPÉDIA --- */}
        {activeTab === 'explorar' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <p className="text-xs uppercase tracking-widest text-indigo-500 font-extrabold">Catálogo de Conhecimento</p>
              <h2 className="text-3xl font-black tracking-tight mt-1">Dicionário de Nutrientes</h2>
              <p className="text-sm opacity-80 mt-1">Explicação em linguagem simples sobre funções biológicas, curiosidades, alimentos e dosagem diária.</p>
            </div>

            {/* Filter and Search controls */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60" />
                <input
                  type="text"
                  placeholder="Buscar nutriente por nome, apelido, composto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-2xl border outline-none ${darkMode ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500' : 'bg-white border-slate-200 focus:border-indigo-500'}`}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-70">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex rounded-2xl overflow-hidden border border-slate-800 p-1 bg-slate-900/40">
                <button
                  onClick={() => setNutrientTypeFilter('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${nutrientTypeFilter === 'all' ? 'bg-indigo-500 text-white' : 'opacity-70 hover:opacity-100'}`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setNutrientTypeFilter('vitamin')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${nutrientTypeFilter === 'vitamin' ? 'bg-indigo-500 text-white' : 'opacity-70 hover:opacity-100'}`}
                >
                  Vitaminas
                </button>
                <button
                  onClick={() => setNutrientTypeFilter('mineral')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${nutrientTypeFilter === 'mineral' ? 'bg-indigo-500 text-white' : 'opacity-70 hover:opacity-100'}`}
                >
                  Minerais
                </button>
              </div>
            </div>

            {/* Grid display of nutrients */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Nutrient List Column */}
              <div className="md:col-span-1 space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                <p className="text-xs font-black opacity-60 px-1 uppercase tracking-wider">Nutrientes Disponíveis ({filteredNutrients.length})</p>
                {filteredNutrients.length === 0 ? (
                  <div className="text-center p-8 bg-slate-900/20 rounded-2xl border border-slate-850">
                    <p className="opacity-65 text-sm">Nenhum nutriente corresponde aos critérios informados.</p>
                  </div>
                ) : (
                  filteredNutrients.map(nut => (
                    <div
                      key={nut.id}
                      onClick={() => handleSelectNutrient(nut)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] ${selectedNutrient?.id === nut.id 
                        ? 'border-indigo-500 bg-indigo-500/10' 
                        : (darkMode ? 'border-slate-800 bg-slate-900/30 hover:bg-slate-900/60' : 'border-slate-200 bg-white hover:bg-slate-50')}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{nut.type === 'vitamin' ? '🧬' : '🧪'}</span>
                          <div>
                            <h4 className="font-bold text-sm">{nut.name}</h4>
                            <p className="text-[10px] opacity-70 truncate max-w-[150px]">{nut.nicknames[0] || 'Nutriente essencial'}</p>
                          </div>
                        </div>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${nut.type === 'vitamin' ? 'bg-pink-500/10 text-pink-400' : 'bg-teal-500/10 text-teal-400'}`}>
                          {nut.type === 'vitamin' ? 'Vitamina' : 'Mineral'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Detail display Column */}
              <div className="md:col-span-2">
                {selectedNutrient ? (
                  <div className={`p-6 md:p-8 rounded-3xl border ${darkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-200'} space-y-6 min-h-[500px]`}>
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 border-slate-800/40 gap-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-black uppercase ${selectedNutrient.type === 'vitamin' ? 'bg-pink-500 text-white' : 'bg-teal-500 text-white'}`}>
                            {selectedNutrient.type === 'vitamin' ? 'Vitamina' : 'Mineral'}
                          </span>
                          <span className="text-xs opacity-60">Fórmula: {selectedNutrient.formula}</span>
                        </div>
                        <h3 className="text-2xl font-extrabold mt-1">{selectedNutrient.name}</h3>
                        <p className="text-xs opacity-75 mt-1">Apelidos/Formas: {selectedNutrient.nicknames.join(', ')}</p>
                      </div>
                      <div className="text-xs text-indigo-400 font-medium">
                        🔬 Descoberta em {selectedNutrient.discovery}
                      </div>
                    </div>

                    {/* Principal function */}
                    <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                      <h4 className="font-bold text-xs text-indigo-400 uppercase tracking-widest flex items-center mb-1">
                        <Info className="w-3.5 h-3.5 mr-1" /> Função Principal
                      </h4>
                      <p className="text-sm font-semibold opacity-90 italic">
                        "{selectedNutrient.mainFunction}"
                      </p>
                    </div>

                    {/* Benefits Grid */}
                    <div>
                      <h4 className="font-bold text-xs text-emerald-400 uppercase tracking-widest flex items-center mb-3">
                        <CheckCircle className="w-3.5 h-3.5 mr-1" /> Benefícios Ilustrados
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {selectedNutrient.benefits.map((ben, i) => (
                          <div key={i} className={`p-3 rounded-xl border ${darkMode ? 'bg-slate-950/40 border-slate-800/60' : 'bg-slate-50 border-slate-200'}`}>
                            <p className="font-bold text-xs text-indigo-400">✔ {ben.title}</p>
                            <p className="text-[11px] opacity-75 mt-1">{ben.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Scale of Deficiency & Symptoms */}
                    <div>
                      <h4 className="font-bold text-xs text-amber-500 uppercase tracking-widest flex items-center mb-3">
                        <ShieldAlert className="w-3.5 h-3.5 mr-1" /> Escala de Deficiência de Nutrientes
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-[11px] font-bold mb-1">
                            <span>Sintomas Leves</span>
                            <span className="text-green-400">Grau Baixo</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-green-500/5 text-green-400/90 border border-green-500/10 text-[11px]">
                            {selectedNutrient.deficiency.mild.join(' • ')}
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] font-bold mb-1">
                            <span>Sintomas Moderados</span>
                            <span className="text-amber-400">Grau Médio</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-amber-500/5 text-amber-400/90 border border-amber-500/10 text-[11px]">
                            {selectedNutrient.deficiency.moderate.join(' • ')}
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] font-bold mb-1">
                            <span>Sintomas Graves</span>
                            <span className="text-rose-400">Grau Superior</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-rose-500/5 text-rose-400/90 border border-rose-500/10 text-[11px]">
                            {selectedNutrient.deficiency.severe.join(' • ')}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Excess & Interactions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-rose-500/5 border-rose-500/10' : 'bg-rose-50 border-rose-200'}`}>
                        <h5 className="font-bold text-xs text-rose-400 uppercase tracking-widest flex items-center mb-2">
                          <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Excesso & Toxicidade
                        </h5>
                        <p className="text-xs font-bold text-rose-300">{selectedNutrient.excess.toxicity}</p>
                        <ul className="list-disc pl-4 mt-2 space-y-1 text-[11px] opacity-80">
                          {selectedNutrient.excess.riscos.map((r, idx) => (
                            <li key={idx}>{r}</li>
                          ))}
                        </ul>
                      </div>

                      <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                        <h5 className="font-bold text-xs text-indigo-400 uppercase tracking-widest flex items-center mb-2">
                          💊 Interações Medicamentosas
                        </h5>
                        <ul className="list-disc pl-4 space-y-1 text-[11px] opacity-85">
                          {selectedNutrient.excess.interactions.map((i, idx) => (
                            <li key={idx}>{i}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Sources (Foods) */}
                    <div>
                      <h4 className="font-bold text-xs text-indigo-400 uppercase tracking-widest mb-3">
                        🥕 Melhores Fontes Naturais
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {selectedNutrient.sources.map((src, i) => (
                          <div key={i} className={`p-3 rounded-xl border text-center transition-all hover:scale-105 ${darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                            <span className="text-2xl block mb-1">{src.emoji}</span>
                            <p className="font-bold text-xs">{src.name}</p>
                            <p className="text-[10px] opacity-65 mt-0.5">{src.amount}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Daily Intake */}
                    <div className="border-t border-slate-800/40 pt-4">
                      <h4 className="font-bold text-xs text-teal-400 uppercase tracking-widest mb-3">
                        📊 Dose Diária Recomendada (RDA)
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                        <div className="p-2 border border-slate-800 rounded bg-slate-900/10">
                          <p className="text-[10px] opacity-50">Crianças</p>
                          <p className="text-xs font-bold mt-0.5">{selectedNutrient.rda.children}</p>
                        </div>
                        <div className="p-2 border border-slate-800 rounded bg-slate-900/10">
                          <p className="text-[10px] opacity-50">Adolescentes</p>
                          <p className="text-xs font-bold mt-0.5">{selectedNutrient.rda.teens}</p>
                        </div>
                        <div className="p-2 border border-slate-800 rounded bg-slate-900/10">
                          <p className="text-[10px] opacity-50">Homens / Mulheres</p>
                          <p className="text-xs font-bold mt-0.5">{selectedNutrient.rda.men} / {selectedNutrient.rda.women}</p>
                        </div>
                        <div className="p-2 border border-slate-800 rounded bg-slate-900/10">
                          <p className="text-[10px] opacity-50 font-semibold text-pink-400">Gestação / Lactação</p>
                          <p className="text-xs font-bold mt-0.5">{selectedNutrient.rda.pregnant} / {selectedNutrient.rda.lactating}</p>
                        </div>
                      </div>
                    </div>

                    {/* Fun Curiosities */}
                    <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-indigo-950/20 border-indigo-950/40' : 'bg-indigo-50 border-indigo-100'}`}>
                      <h4 className="font-bold text-xs text-indigo-400 uppercase tracking-widest flex items-center mb-2">
                        💡 Curiosidades Nutritivas
                      </h4>
                      <ul className="list-disc pl-4 space-y-2 text-xs opacity-90">
                        {selectedNutrient.curiosities.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                  </div>
                ) : (
                  <div className={`flex flex-col items-center justify-center rounded-3xl border border-dashed text-center p-12 min-h-[500px] ${darkMode ? 'bg-slate-905 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-5xl block animate-bounce mb-4">🔎</span>
                    <h3 className="text-lg font-bold">Nenhum nutriente detalhado</h3>
                    <p className="text-sm opacity-70 max-w-md mt-1">Toque em qualquer vitamina ou mineral do catálogo lateral para aprender sobre química biológica, alertas, benefícios e deficiência!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- MODULE 3: SCANNER INTELIGENTE DE RÓTULOS --- */}
        {activeTab === 'scanner' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <p className="text-xs uppercase tracking-widest text-emerald-500 font-extrabold flex items-center gap-1">
                <Sparkles className="w-3 px-0.5" /> Scanner OCR Multimodal
              </p>
              <h2 className="text-3xl font-black tracking-tight mt-1">Scanner Inteligente de Rótulos</h2>
              <p className="text-sm opacity-80 mt-1">Fotografe ou envie uma imagem do rótulo nutricional / lista de ingredientes e assista a IA calcular o real valor biológico para você.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Camera Frame & Preset column */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Simulated testing shortcuts */}
                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} space-y-3`}>
                  <p className="text-xs font-black uppercase tracking-wider text-emerald-400">Atalhos de Teste (Presets Integrados)</p>
                  <p className="text-xs opacity-75">Não está com um produto em mãos agora? Selecione um de nossos presetes de ingredientes reais para testar a IA:</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => { setSelectedPreset('suco_laranja'); setUploadedImage(null); }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${selectedPreset === 'suco_laranja' ? 'bg-emerald-500/10 border-emerald-500 font-bold' : 'bg-slate-950/20 hover:bg-slate-950/40 border-slate-800 text-xs'}`}
                    >
                      🍊 Suco de Laranja Infinito
                    </button>
                    <button
                      onClick={() => { setSelectedPreset('multivitaminico'); setUploadedImage(null); }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${selectedPreset === 'multivitaminico' ? 'bg-emerald-500/10 border-emerald-500 font-bold' : 'bg-slate-950/20 hover:bg-slate-950/40 border-slate-800 text-xs'}`}
                    >
                      💊 Multivitamínico Daily
                    </button>
                    <button
                      onClick={() => { setSelectedPreset('refrigerante'); setUploadedImage(null); }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${selectedPreset === 'refrigerante' ? 'bg-emerald-500/10 border-emerald-500 font-bold' : 'bg-slate-950/20 hover:bg-slate-950/40 border-slate-800 text-xs'}`}
                    >
                      🥤 Refrigerante de Cola
                    </button>
                    <button
                      onClick={() => { setSelectedPreset('salgadinho'); setUploadedImage(null); }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${selectedPreset === 'salgadinho' ? 'bg-emerald-500/10 border-emerald-500 font-bold' : 'bg-slate-950/20 hover:bg-slate-950/40 border-slate-800 text-xs'}`}
                    >
                      🍿 Salgadinho Industrial
                    </button>
                  </div>
                </div>

                {/* Webcam capture feed */}
                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} space-y-4`}>
                  <p className="text-xs font-black uppercase tracking-wider text-emerald-400">Capturar ou Enviar Rótulo Real</p>
                  
                  {cameraActive ? (
                    <div className="relative rounded-xl overflow-hidden bg-black aspect-video border border-emerald-500/20">
                      <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted></video>
                      <div className="absolute inset-0 border-2 border-emerald-500 border-dashed animate-pulse pointer-events-none m-4"></div>
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                        <button onClick={capturePhoto} className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-bold text-xs hover:bg-emerald-600 transition-all">
                          Tirar Foto 📸
                        </button>
                        <button onClick={stopCamera} className="px-4 py-2 bg-slate-800 text-white rounded-lg font-bold text-xs hover:bg-slate-700 transition-all">
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {uploadedImage ? (
                        <div className="relative rounded-xl overflow-hidden bg-black aspect-video max-h-56">
                          <img src={uploadedImage} alt="rótulo" className="w-full h-full object-contain" />
                          <button
                            onClick={() => setUploadedImage(null)}
                            className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-full hover:bg-rose-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-xl p-6 text-center bg-slate-950/10">
                          <Upload className="w-8 h-8 text-slate-500 mb-2" />
                          <p className="text-xs opacity-75">Nenhuma imagem carregada</p>
                          <div className="mt-4 flex flex-wrap justify-center gap-2">
                            <button
                              onClick={() => { startCamera(); setSelectedPreset(''); }}
                              className="px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 border border-indigo-500/30 rounded-lg text-xs font-bold transition-all"
                            >
                              Ativar Câmera 📷
                            </button>
                            <label className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold border border-slate-700 rounded-lg cursor-pointer">
                              Enviar Arquivo
                              <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <canvas ref={canvasRef} className="hidden"></canvas>

                  {/* Primary Trigger button */}
                  <button
                    disabled={(!selectedPreset && !uploadedImage) || isScanning}
                    onClick={handlePerformScan}
                    className={`w-full py-4 rounded-xl text-white font-bold transition-all shadow-md flex items-center justify-center space-x-2 ${(!selectedPreset && !uploadedImage) || isScanning 
                      ? 'bg-slate-850 text-slate-500 cursor-not-allowed border border-slate-800' 
                      : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/10 hover:scale-[1.01]'}`}
                  >
                    {isScanning ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>A IA está analisando os nutrientes...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        <span>Analisar Rótulo com Inteligência Artificial</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Advanced Interactive Results Display */}
              <div className="lg:col-span-7">
                {scanResult ? (
                  <div className={`p-6 md:p-8 rounded-3xl border space-y-6 animate-fade-in ${darkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-200'}`}>
                    
                    {/* Header product info */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800/40 pb-4 gap-4">
                      <div>
                        <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold rounded uppercase tracking-wide">
                          Resultado de Scanner IA
                        </span>
                        <h3 className="text-xl font-bold mt-1.5">{scanResult.productName}</h3>
                        <p className="text-xs opacity-70">Nota calculada a partir de micronutrientes vs aditivos químicos</p>
                      </div>

                      {/* Visual score card */}
                      <div className="flex items-center space-x-3 bg-slate-950/25 p-3 rounded-2xl border border-slate-800/40">
                        <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center font-black text-lg ${
                          scanResult.gradeColor === 'green' ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' :
                          scanResult.gradeColor === 'yellow' ? 'border-amber-500 text-amber-400 bg-amber-500/10' :
                          'border-rose-500 text-rose-400 bg-rose-500/10'
                        }`}>
                          {scanResult.score}
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Status Geral</p>
                          <p className={`text-sm font-bold ${
                            scanResult.gradeColor === 'green' ? 'text-emerald-400' :
                            scanResult.gradeColor === 'yellow' ? 'text-amber-400' :
                            'text-rose-400'
                          }`}>{scanResult.gradeText}</p>
                        </div>
                      </div>
                    </div>

                    {/* Alerts display */}
                    {scanResult.alerts && scanResult.alerts.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {scanResult.alerts.map((al, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 ${
                              al.startsWith('⚠') 
                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            }`}
                          >
                            {al}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* AI Expanation text */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-xs text-indigo-400 uppercase tracking-widest flex items-center">
                        <Info className="w-3.5 h-3.5 mr-1" /> O que a IA explica
                      </h4>
                      <div className="text-xs opacity-85 leading-relaxed space-y-2 border-l-2 border-indigo-505/30 pl-3">
                        {scanResult.aiExplanation.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    </div>

                    {/* Detected nutrients lists */}
                    {scanResult.detectedNutrients && scanResult.detectedNutrients.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-bold text-xs text-teal-400 uppercase tracking-widest">
                          🔬 Micronutrientes Identificados
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {scanResult.detectedNutrients.map((nut, idx) => (
                            <div key={idx} className="p-3 bg-slate-950/15 rounded-xl border border-slate-800/40 flex items-center justify-between">
                              <div>
                                <p className="font-bold text-xs text-slate-200">{nut.name}</p>
                                <p className="text-[10px] opacity-60">Quant: {nut.amount} | IDAR: {nut.percentage}</p>
                              </div>
                              <span className={`text-[10px] px-2 py-0.5 rounded font-black uppercase ${
                                nut.status === 'high' ? 'bg-emerald-500/10 text-emerald-400' :
                                nut.status === 'adequate' ? 'bg-indigo-500/10 text-indigo-400' :
                                'bg-amber-500/10 text-amber-400'
                              }`}>
                                {nut.status === 'high' ? 'Alto' : nut.status === 'adequate' ? 'Adequado' : 'Baixo'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* O que você está ingerindo de verdade */}
                    {scanResult.whatYouAreIngesting && scanResult.whatYouAreIngesting.length > 0 && (
                      <div className="space-y-3 pt-3 border-t border-slate-800/35">
                        <h4 className="font-bold text-xs text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                          🔍 Composição: O que você está ingerindo de verdade
                        </h4>
                        <p className="text-[11px] opacity-70">Entenda de forma transparente a função e qualidade biológica de cada ingrediente lido pela IA:</p>
                        <div className="space-y-2">
                          {scanResult.whatYouAreIngesting.map((ing, idx) => (
                            <div key={idx} className={`p-3 rounded-2xl border text-xs leading-relaxed transition-all ${
                              ing.category === 'positive' ? (darkMode ? 'bg-emerald-950/10 border-emerald-900/30 text-emerald-300' : 'bg-emerald-50/50 border-emerald-200 text-emerald-900') :
                              ing.category === 'negative' ? (darkMode ? 'bg-rose-950/10 border-rose-900/30 text-rose-300' : 'bg-rose-50/50 border-rose-250 text-rose-900') :
                              (darkMode ? 'bg-slate-900/40 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-705')
                            }`}>
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                <span className="font-bold text-xs flex items-center gap-1">
                                  {ing.category === 'positive' ? '🟢' : ing.category === 'negative' ? '🔴' : '⚪'} {ing.item}
                                </span>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                                  ing.category === 'positive' ? 'bg-emerald-555/20 text-emerald-450' :
                                  ing.category === 'negative' ? 'bg-rose-555/20 text-rose-455' :
                                  'bg-slate-555/20 text-slate-400'
                                }`}>
                                  {ing.category === 'positive' ? 'Excelente' : ing.category === 'negative' ? 'Evitar / Moderar' : 'Neutro'}
                                </span>
                              </div>
                              <p className="opacity-80 text-[10.5px] leading-normal">{ing.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mapeamento Biológico (Como afeta seu corpo) */}
                    {scanResult.bodyImpact && scanResult.bodyImpact.length > 0 && (
                      <div className="space-y-3.5 pt-3 border-t border-slate-800/35">
                        <h4 className="font-bold text-xs text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                          🧠 Mapeamento Biológico: Impacto no Corpo Humano
                        </h4>
                        <p className="text-[11px] opacity-70">Saiba o impacto preventivo em seus órgãos e o limite que separa o efeito benéfico do risco por dosagem excessiva:</p>
                        
                        <div className="grid grid-cols-1 gap-3.5">
                          {scanResult.bodyImpact.map((imp, idx) => (
                            <div key={idx} className={`p-4 rounded-2xl border space-y-3 transition-all ${
                              darkMode ? 'bg-slate-950/45 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-205 hover:border-slate-300'
                            }`}>
                              {/* Organ header */}
                              <div className="flex items-center gap-2 pb-1.5 border-b border-slate-800/10">
                                <span className="text-xl" role="img" aria-label={imp.organ}>{imp.icon || '👤'}</span>
                                <div>
                                  <h5 className={`font-extrabold text-xs uppercase tracking-wide ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>{imp.organ}</h5>
                                  <p className="text-[10px] opacity-60 leading-tight">{imp.intro}</p>
                                </div>
                              </div>

                              {/* Split impacts */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                                <div className={`p-2.5 rounded-xl border ${
                                  darkMode ? 'bg-emerald-950/10 border-emerald-950 text-emerald-305' : 'bg-emerald-50/20 border-emerald-100 text-emerald-900'
                                }`}>
                                  <span className="font-extrabold text-emerald-450 flex items-center gap-1 text-[9.5px] uppercase tracking-wider mb-1">
                                    😊 Para o Bem (Dose Certa)
                                  </span>
                                  <p className="opacity-80 text-[10px] leading-relaxed">{imp.goodEffect}</p>
                                </div>

                                <div className={`p-2.5 rounded-xl border ${
                                  darkMode ? 'bg-rose-950/10 border-rose-950 text-rose-302' : 'bg-rose-50/20 border-rose-100'
                                }`}>
                                  <span className="font-extrabold text-rose-450 flex items-center gap-1 text-[9.5px] uppercase tracking-wider mb-1">
                                    💀 Para o Mal (Excesso / Risco)
                                  </span>
                                  <p className="opacity-80 text-[10px] leading-relaxed">{imp.badEffect}</p>
                                </div>
                              </div>

                              {/* Dose Guidance badge */}
                              <div className={`p-2 rounded-xl text-[10px] flex items-center gap-1 font-medium ${
                                darkMode ? 'bg-indigo-950/20 text-indigo-300' : 'bg-indigo-50 text-indigo-900'
                              }`}>
                                <span className="text-xs">⚖️</span>
                                <span><strong>Diretriz de Consumo:</strong> {imp.doseGuideline}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className={`flex flex-col items-center justify-center rounded-3xl border border-dashed text-center p-12 min-h-[400px] ${darkMode ? 'bg-slate-905 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
                    {isScanning ? (
                      <div className="space-y-4">
                        <div className="w-16 h-16 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto"></div>
                        <p className="text-sm font-bold antialiased">Decifrando letras moleculares da lista...</p>
                        <p className="text-xs opacity-60 max-w-xs mx-auto">Chamando Gemini IA para fazer análise de pureza e calcular densidade de vitaminas.</p>
                      </div>
                    ) : (
                      <>
                        <span className="text-5xl block animate-pulse mb-4">📷</span>
                        <h3 className="text-lg font-bold">Aguardando Captura</h3>
                        <p className="text-sm opacity-70 max-w-sm mt-1">Carregue a foto de um rótulo ou clique em um atalho de produto pré-definido para ver a IA desmistificar os elementos químicos.</p>
                      </>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* --- MODULE 4: NUTRICIONISTA IA --- */}
        {activeTab === 'ia' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <p className="text-xs uppercase tracking-widest text-purple-500 font-extrabold">Personal Coach virtual</p>
              <h2 className="text-3xl font-black tracking-tight mt-1">Nutricionista IA Inteligente</h2>
              <p className="text-sm opacity-80 mt-1">Converse sobre nutrição integrativa, cansaço inexplicável, deficiências mais comuns ou dietas específicas.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Sidebar with helpful question triggers */}
              <div className="lg:col-span-4 space-y-4">
                <div id="ai-help-card" className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} space-y-3`}>
                  <p className="text-xs font-black uppercase tracking-wider text-purple-400">Sugestões de Perguntas</p>
                  <p className="text-xs opacity-75">Clique em uma sugestão abaixo para preencher o chat instantaneamente:</p>
                  
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => triggerQuickQuestion('Para que serve exatamente a vitamina B12 no sistema de energia do cérebro?')}
                      className="p-2.5 rounded-xl text-left bg-slate-950/20 hover:bg-slate-950/40 border border-slate-800 text-xs transition-colors"
                    >
                      💡 Para que serve a Vitamina B12?
                    </button>
                    <button
                      onClick={() => triggerQuickQuestion('Tenho sentido um cansaço frequente à tarde e unhas quebradiças. Quais minerais ou vitaminas podem estar baixos?')}
                      className="p-2.5 rounded-xl text-left bg-slate-950/20 hover:bg-slate-950/40 border border-slate-800 text-xs transition-colors"
                    >
                      💅 Fadiga crônica e unhas frágeis?
                    </button>
                    <button
                      onClick={() => triggerQuickQuestion('Quais alimentos vegetais naturais têm maior quantidade de Ferro biodisponível e como ajudar a fixá-lo no corpo?')}
                      className="p-2.5 rounded-xl text-left bg-slate-950/20 hover:bg-slate-950/40 border border-slate-800 text-xs transition-colors"
                    >
                      🥩 Fontes vegetarianas de Ferro?
                    </button>
                    <button
                      onClick={() => triggerQuickQuestion('Explicite a toxicidade ou riscos de tomar doses excessivas de Vitamina D de forma crônica.')}
                      className="p-2.5 rounded-xl text-left bg-slate-950/20 hover:bg-slate-950/40 border border-slate-800 text-xs transition-colors"
                    >
                      ☀ Riscos do excesso de Vitamina D?
                    </button>
                  </div>
                </div>

                {/* AI credentials card */}
                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-indigo-950/25 border-indigo-950/45' : 'bg-indigo-50 border-indigo-100'} text-xs space-y-2`}>
                  <p className="font-extrabold text-indigo-400">🔬 Parágrafo Clínico de Apoio</p>
                  <p className="opacity-80">As respostas do Nutricionista IA baseiam-se nos dados científicos mais recentes de RDA (Recomendação de Dose Admitida) do NIH, mas não substituem consultas profissionais ou exames de sangue detalhados (como hemograma e dosagem sérica de 25-hidroxivitamina D).</p>
                </div>
              </div>

              {/* Chat Window */}
              <div className="lg:col-span-8 flex flex-col h-[520px] rounded-3xl border border-slate-800 bg-slate-950/30 overflow-hidden shadow-lg">
                
                {/* Chat Top header info */}
                <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Nutricionista IA</h4>
                      <p className="text-[10px] text-emerald-400">● Assistente de Saúde Online</p>
                    </div>
                  </div>
                  <span className="text-[10px] opacity-50 uppercase">Gemini 3.5 Flash</span>
                </div>

                {/* Messages Panel scrolling */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[360px]">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-purple-600 text-white rounded-tr-none' 
                          : (darkMode ? 'bg-slate-900 text-slate-100 border border-slate-850 rounded-tl-none' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none')
                      }`}>
                        {/* If formatted text has newlines, render gracefully with linebreaks */}
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                        <p className="text-[9px] opacity-50 mt-1 text-right">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isChatTyping && (
                    <div className="flex justify-start">
                      <div className={`p-4 rounded-2xl rounded-tl-none text-xs ${darkMode ? 'bg-slate-900' : 'bg-slate-100 border border-slate-200'}`}>
                        <div className="flex space-x-1.5 items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat input box */}
                <div className="p-4 bg-slate-900/60 border-t border-slate-850 flex items-center space-x-3">
                  <input
                    type="text"
                    value={currentMessageText}
                    onChange={(e) => setCurrentMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendChatMessage();
                    }}
                    placeholder="Pergunte ex: 'Quais vitaminas são lipossolúveis?'"
                    className={`flex-1 px-4 py-3 rounded-xl border outline-none text-xs ${darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-purple-500' : 'bg-white border-slate-200 focus:border-purple-500'}`}
                  />
                  <button
                    onClick={handleSendChatMessage}
                    className="p-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors"
                  >
                    Enviar
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* --- MODULE 5: GAMIFICAÇÃO / MISSÕES DIÁRIAS --- */}
        {activeTab === 'missoes' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-500 font-extrabold flex items-center gap-1">
                <Award className="w-4 h-4" /> Desafios & Conquistas
              </p>
              <h2 className="text-3xl font-black tracking-tight mt-1">Evolução de Conhecimento</h2>
              <p className="text-sm opacity-80 mt-1 font-sans">Acumule pontos de experiência (XP) ao interagir com as mecânicas do sistema e eleve seu grau acadêmico de nutrição.</p>
            </div>

            {/* Visual metrics cards of level */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Level Progress Gauge */}
              <div className={`col-span-1 p-6 rounded-3xl border flex flex-col justify-between ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div>
                  <span className="text-xs font-bold opacity-60">Status Atual</span>
                  <h3 className="text-xl font-extrabold text-indigo-400 mt-2">{userProgress.level}</h3>
                  <p className="text-xs opacity-75 mt-1">Suba lendo fichas de nutrientes, escanenando e jogando.</p>
                </div>

                <div className="mt-8 space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{userProgress.xp} XP acumulados</span>
                    <span className="opacity-60">Meta: 1000 XP</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                    <div 
                      className="bg-indigo-500 h-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, (userProgress.xp / 1000) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Achievements details */}
              <div className={`col-span-1 md:col-span-2 p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h4 className="font-bold text-sm text-amber-500">🏆 Seus Troféus de Saúde</h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-slate-950/20 rounded-2xl border border-slate-850 flex flex-col items-center">
                    <span className="text-2xl mb-1">📖</span>
                    <p className="font-bold text-xs">Cientista Ledor</p>
                    <p className="text-[10px] opacity-60 mt-0.5">{userProgress.articlesReadCount} de 5 lidos</p>
                  </div>
                  <div className="p-3 bg-slate-950/20 rounded-2xl border border-slate-850 flex flex-col items-center">
                    <span className="text-2xl mb-1">📷</span>
                    <p className="font-bold text-xs">Scannador Master</p>
                    <p className="text-[10px] opacity-60 mt-0.5">{userProgress.scannedCount} produtos</p>
                  </div>
                  <div className="p-3 bg-slate-950/20 rounded-2xl border border-slate-850 flex flex-col items-center">
                    <span className="text-2xl mb-1">🧠</span>
                    <p className="font-bold text-xs">Perfil Gerado</p>
                    <p className="text-[10px] opacity-60 mt-0.5">{userProgress.completedQuiz ? 'Concluído' : 'Não feito'}</p>
                  </div>
                  <div className="p-3 bg-slate-950/20 rounded-2xl border border-slate-850 flex flex-col items-center">
                    <span className="text-2xl mb-1">🔥</span>
                    <p className="font-bold text-xs">Streak Diário</p>
                    <p className="text-[10px] opacity-60 mt-0.5">{userProgress.streak} dias online</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Missions List */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Suas Missões Ativas</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {missions.map(m => (
                  <div
                    key={m.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                      m.completed 
                        ? 'border-slate-850 bg-slate-900/10 opacity-60' 
                        : (darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200')
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`mt-0.5 rounded-full p-1.5 ${m.completed ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        {m.completed ? <CheckCircle className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                      </div>
                      <div>
                        <h5 className="font-bold text-xs">{m.title}</h5>
                        <p className="text-[11px] opacity-75 mt-0.5">{m.description}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${m.completed ? 'bg-slate-800 text-slate-400' : 'bg-indigo-500 text-white'}`}>
                        {m.completed ? 'Feito' : `+${m.xpReward} XP`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* --- MODULE 6: SAÚDE PREVENTIVA (QUESTIONNÁRIO) --- */}
        {activeTab === 'preventivo' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <p className="text-xs uppercase tracking-widest text-pink-500 font-extrabold flex items-center gap-1">
                <Heart className="w-4 h-4" /> Diagnóstico Preventivo IA
              </p>
              <h2 className="text-3xl font-black tracking-tight mt-1">Questionário Nutritivo Preventivo</h2>
              <p className="text-sm opacity-80 mt-1">Preencha seus parâmetros corporais e hábitos para que a IA analise potenciais furos na sua absorção biológica diária.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Questionnaire card panel */}
              <div className="lg:col-span-5 space-y-4">
                <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  
                  {/* Age */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Idade em Anos:</label>
                    <input
                      type="number"
                      value={quizAnswers.age}
                      onChange={(e) => setQuizAnswers({ ...quizAnswers, age: Number(e.target.value) })}
                      className={`w-full px-4 py-2 text-xs rounded-xl border outline-none ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Sexo Biológico:</label>
                    <select
                      value={quizAnswers.gender}
                      onChange={(e) => setQuizAnswers({ ...quizAnswers, gender: e.target.value as any })}
                      className={`w-full px-4 py-2 text-xs rounded-xl border outline-none ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <option value="mulher">Mulher (Lactantes/Gestantes têm RDA maior de ferro/ácido fólico)</option>
                      <option value="homem">Homem</option>
                      <option value="outro">Prefiro não responder</option>
                    </select>
                  </div>

                  {/* Diet type */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Tipo de Alimentação:</label>
                    <select
                      value={quizAnswers.diet}
                      onChange={(e) => setQuizAnswers({ ...quizAnswers, diet: e.target.value })}
                      className={`w-full px-4 py-2 text-xs rounded-xl border outline-none ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <option value="onivoro">Onívoro (Consome carnes, ovos e vegetais diariamente)</option>
                      <option value="vegetariano">Vegetariano (Consome ovos/leite, sem carne vermelha/frango)</option>
                      <option value="vegano">Vegano Estrito (Zero consumo de fonte de origem animal - Alerta para B12)</option>
                    </select>
                  </div>

                  {/* Diet quality */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Qualidade Nutritiva dos Pratos:</label>
                    <select
                      value={quizAnswers.dietQuality}
                      onChange={(e) => setQuizAnswers({ ...quizAnswers, dietQuality: e.target.value })}
                      className={`w-full px-4 py-2 text-xs rounded-xl border outline-none ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <option value="alta">Excelente (Frutas, vegetais folhosos escuros e pouca fritura)</option>
                      <option value="media">Média (Consumo ocasional de verduras, lanches processados frequentes)</option>
                      <option value="baixa">Baixa Densidade (Maioria industrializados, congelados e refrigerantes)</option>
                    </select>
                  </div>

                  {/* Sun exposure */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Exposição Solar diária (UVB saudável):</label>
                    <select
                      value={quizAnswers.sunExposure}
                      onChange={(e) => setQuizAnswers({ ...quizAnswers, sunExposure: e.target.value })}
                      className={`w-full px-4 py-2 text-xs rounded-xl border outline-none ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <option value="pouca">Pouca/Residencial (Trabalha fechado, home office - Alerta Vitamina D)</option>
                      <option value="moderada">Moderada (15 minutos diários no caminho de ida ou almoço)</option>
                      <option value="alta">Alta (Trabalho na rua, expõe pernas e braços regularmente)</option>
                    </select>
                  </div>

                  {/* Energy level */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Nível de Energia Habitual:</label>
                    <select
                      value={quizAnswers.energyLevel}
                      onChange={(e) => setQuizAnswers({ ...quizAnswers, energyLevel: e.target.value })}
                      className={`w-full px-4 py-2 text-xs rounded-xl border outline-none ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <option value="alto">Alto & focado (Raramente fadigado)</option>
                      <option value="medio">Médio (Queda de energia no meio da tarde)</option>
                      <option value="baixo">Baixo/Crônico (Sonolento, fadiga muscular ao subir escadas)</option>
                    </select>
                  </div>

                  {/* Symptoms checkboxes */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Selecione quaisquer Sintomas atuais:</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {['Cansaço Crônico', 'Unhas que lascam', 'Queda de cabelo', 'Dor nas costas/ossos', 'Dificuldade de Foco', 'Gripes e resfriados constantes', 'Olhos ressecados', 'Cãibras recorrentes'].map(sym => {
                        const hasSym = quizAnswers.symptoms.includes(sym);
                        return (
                          <button
                            key={sym}
                            type="button"
                            onClick={() => {
                              const newList = hasSym 
                                ? quizAnswers.symptoms.filter(x => x !== sym)
                                : [...quizAnswers.symptoms, sym];
                              setQuizAnswers({ ...quizAnswers, symptoms: newList });
                            }}
                            className={`p-2 rounded-xl text-left border transition-all ${hasSym ? 'bg-pink-500/10 border-pink-500 font-bold' : 'bg-slate-950/20 border-slate-850'}`}
                          >
                            {sym}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Generate profile assessed btn */}
                  <button
                    disabled={isQuizAnalysing}
                    onClick={handleAnalyseQuiz}
                    className="w-full py-3 rounded-xl bg-pink-500 hover:bg-pink-650 text-white font-bold transition-all shadow shadow-pink-500/20 flex items-center justify-center space-x-2"
                  >
                    {isQuizAnalysing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Avaliando BioQuímica...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Gerar Meu Relatório de Prevenção</span>
                      </>
                    )}
                  </button>

                </div>
              </div>

              {/* Bio Assessment reports */}
              <div className="lg:col-span-7">
                {profileAnalysis ? (
                  <div className={`p-6 md:p-8 rounded-3xl border space-y-6 animate-fade-in ${darkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-200'}`}>
                    
                    {/* Header info */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800/40 pb-4 gap-4">
                      <div>
                        <span className="px-2.5 py-0.5 bg-pink-500/20 text-pink-400 text-[10px] font-extrabold rounded uppercase tracking-wide">
                          Holograma de Análise Preventiva
                        </span>
                        <h3 className="text-xl font-bold mt-1.5">Perfil Probabilístico Pessoal</h3>
                        <p className="text-xs opacity-70">Risco geral estimado de carência de micronutrientes</p>
                      </div>

                      {/* Risk score circle */}
                      <div className="flex items-center space-x-3 bg-slate-950/25 p-3 rounded-2xl border border-slate-800/40">
                        <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center font-black text-lg ${
                          profileAnalysis.riskScore > 60 ? 'border-rose-500 text-rose-450 bg-rose-500/10' :
                          profileAnalysis.riskScore > 30 ? 'border-amber-500 text-amber-400 bg-amber-500/10' :
                          'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                        }`}>
                          {profileAnalysis.riskScore}%
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Furos de Nutrientes</p>
                          <p className="text-xs font-bold text-slate-100">
                            {profileAnalysis.riskScore > 60 ? '⚠ Propensão Elevada' :
                             profileAnalysis.riskScore > 30 ? '⚠ Risco Moderador' :
                             '✔ Estilo de vida bem nutrido'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Vulnerabilities itemized lists */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-xs text-rose-400 uppercase tracking-widest">
                        🚨 Deficiências Prováveis com Escala
                      </h4>
                      <div className="space-y-3">
                        {profileAnalysis.vulnerabilities.map((vul, idx) => (
                          <div key={idx} className="p-4 bg-slate-950/15 rounded-2xl border border-rose-500/10">
                            <div className="flex justify-between items-center mb-1">
                              <p className="font-bold text-sm text-rose-300">{vul.nutrient}</p>
                              <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase ${
                                vul.severity === 'alta' ? 'bg-rose-500/20 text-rose-400' :
                                vul.severity === 'moderada' ? 'bg-amber-500/20 text-amber-400' :
                                'bg-green-500/20 text-green-400'
                              }`}>
                                Gravidade {vul.severity}
                              </span>
                            </div>
                            <p className="text-xs opacity-85 leading-relaxed">{vul.explanation}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Custom advice boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-950/25 rounded-2xl border border-slate-850">
                        <h5 className="font-bold text-xs text-amber-400 mb-1 flex items-center">
                          <Sun className="w-4 h-4 mr-1 text-amber-500" /> Sintonia Solar a UVB
                        </h5>
                        <p className="text-xs opacity-85 leading-relaxed">{profileAnalysis.sunExpAdvice}</p>
                      </div>

                      <div className="p-4 bg-slate-950/25 rounded-2xl border border-slate-850">
                        <h5 className="font-bold text-xs text-emerald-400 mb-1 flex items-center">
                          🥬 Adaptação de Nutrição
                        </h5>
                        <p className="text-xs opacity-85 leading-relaxed">{profileAnalysis.dietAdvice}</p>
                      </div>
                    </div>

                    {/* Food lists recommendations */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-xs text-indigo-400 uppercase tracking-widest">
                        🛒 Plano Estratégico de Alimentos Recomendados
                      </h4>
                      <ul className="space-y-1.5 text-xs opacity-90 pl-1">
                        {profileAnalysis.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-emerald-400 mr-2">✔</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                ) : (
                  <div className={`flex flex-col items-center justify-center rounded-3xl border border-dashed text-center p-12 min-h-[400px] ${darkMode ? 'bg-slate-905 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
                    {isQuizAnalysing ? (
                      <div className="space-y-4">
                        <div className="w-16 h-16 rounded-full border-4 border-pink-500 border-t-transparent animate-spin mx-auto"></div>
                        <p className="text-sm font-bold animate-pulse">Cruzando sintomas com taxas de absorção celular...</p>
                        <p className="text-xs opacity-60">Calculando probabilidade matemática de falta de Ferro, Magnésio ou Complexo B em andamento.</p>
                      </div>
                    ) : (
                      <>
                        <span className="text-5xl block animate-bounce mb-4">❤️</span>
                        <h3 className="text-lg font-bold">Relatório não gerado</h3>
                        <p className="text-sm opacity-70 max-w-sm mt-1">Insira seus dados metabólicos, dietários e sintomas no formulário ao lado e clique em enviar para receber um mapa molecular probabilístico.</p>
                      </>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* --- MODULE 7: UNIVERSO DO CORPO HUMANO (MAPA INTERATIVO) --- */}
        {activeTab === 'corpo' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <p className="text-xs uppercase tracking-widest text-indigo-500 font-extrabold flex items-center gap-1">
                <Activity className="w-4 h-4" /> Mapeamento Orgânico Integrado
              </p>
              <h2 className="text-3xl font-black tracking-tight mt-1">Universo do Corpo Humano</h2>
              <p className="text-sm opacity-80 mt-1">Seu corpo explicado órgão por órgão: toque em qualquer fita molecular humana abaixo para enxergar de quais micronutrientes seu sistema vital mais necessita.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Interactive SVG Body canvas */}
              <div className="lg:col-span-5 flex justify-center">
                <div className={`relative w-80 h-[500px] rounded-3xl p-6 border flex flex-col justify-between overflow-hidden shadow-inner ${darkMode ? 'bg-slate-900/40 border-slate-850' : 'bg-white border-slate-200'}`}>
                  
                  {/* Background graphical grid decorative */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                  </div>

                  <h4 className="text-[10px] font-black uppercase tracking-wider text-indigo-400 z-10 text-center">Painel de Anatomia Micronutritiva</h4>

                  {/* Body SVG schematic with active interactive overlay points */}
                  <div className="relative flex-1 flex justify-center items-center">
                    <svg viewBox="0 0 200 400" className="w-64 h-80 opacity-90 transition-all">
                      {/* Stylized human blueprint body silhouette */}
                      <path d="M100 40 C75 40,65 10,100 10 C135 10,125 40,100 40 M90 40 L110 40 L112 55 L88 55 Z M85 58 L115 58 C135 70,140 180,140 190 Q140 200,125 200 L118 200 L118 380 Q118 395,103 395 L97 395 Q82 395,82 380 L82 200 L75 200 Q60 200,60 190 C60 180,65 70,85 58 Z" 
                            fill={darkMode ? '#1e293b' : '#f1f5f9'} stroke="#4f46e5" strokeWidth="1.5" />
                    </svg>

                    {/* Interactive glowing tags overlayed */}
                    
                    {/* Cérebro */}
                    <button
                      onClick={() => setSelectedOrgan('cerebro')}
                      className={`absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 border transition-all ${
                        selectedOrgan === 'cerebro' ? 'bg-indigo-500 text-white border-indigo-400 scale-105 shadow-md shadow-indigo-500/20' : 'bg-slate-900/80 text-indigo-300 hover:scale-105 border-indigo-500/30'
                      }`}
                    >
                      <span>🧠 Cérebro</span>
                    </button>

                    {/* Olhos */}
                    <button
                      onClick={() => setSelectedOrgan('olhos')}
                      className={`absolute top-16 left-[20%] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 border transition-all ${
                        selectedOrgan === 'olhos' ? 'bg-indigo-500 text-white border-indigo-400 scale-105 shadow-md shadow-indigo-500/20' : 'bg-slate-900/80 text-blue-300 hover:scale-105 border-indigo-500/30'
                      }`}
                    >
                      <span>👁 Olhos</span>
                    </button>

                    {/* Pulmões */}
                    <button
                      onClick={() => setSelectedOrgan('pulmoes')}
                      className={`absolute top-24 left-[58%] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 border transition-all ${
                        selectedOrgan === 'pulmoes' ? 'bg-indigo-500 text-white border-indigo-400 scale-105 shadow-md shadow-indigo-500/20' : 'bg-slate-900/80 text-teal-300 hover:scale-105 border-indigo-500/30'
                      }`}
                    >
                      <span>🫁 Imunidade</span>
                    </button>

                    {/* Coração */}
                    <button
                      onClick={() => setSelectedOrgan('coracao')}
                      className={`absolute top-32 left-[15%] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 border transition-all ${
                        selectedOrgan === 'coracao' ? 'bg-indigo-500 text-white border-indigo-400 scale-105 shadow-md shadow-indigo-500/20' : 'bg-slate-900/80 text-rose-300 hover:scale-105 border-indigo-500/30'
                      }`}
                    >
                      <span>❤️ Coração</span>
                    </button>

                    {/* Pele e Unhas */}
                    <button
                      onClick={() => setSelectedOrgan('pele')}
                      className={`absolute top-48 left-[55%] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 border transition-all ${
                        selectedOrgan === 'pele' ? 'bg-indigo-500 text-white border-indigo-400 scale-105 shadow-md shadow-indigo-500/20' : 'bg-slate-900/80 text-pink-300 hover:scale-105 border-indigo-500/30'
                      }`}
                    >
                      <span>💅 Pele/Cabelo</span>
                    </button>

                    {/* Ossos e dentes */}
                    <button
                      onClick={() => setSelectedOrgan('ossos')}
                      className={`absolute bottom-16 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 border transition-all ${
                        selectedOrgan === 'ossos' ? 'bg-indigo-500 text-white border-indigo-400 scale-105 shadow-md shadow-indigo-500/20' : 'bg-slate-900/80 text-amber-350 hover:scale-105 border-indigo-500/30'
                      }`}
                    >
                      <span>🦴 Ossos</span>
                    </button>

                  </div>

                  <p className="text-[10px] opacity-60 text-center">Selecione uma região para abrir detalhes bioquímicos</p>
                </div>
              </div>

              {/* Informative side panels resulting */}
              <div className="lg:col-span-7">
                {selectedOrgan && ORGAN_DATA[selectedOrgan] ? (
                  <div className={`p-6 md:p-8 rounded-3xl border space-y-6 animate-fade-in ${darkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-200'}`}>
                    
                    {/* Header values */}
                    <div className="border-b border-slate-800/40 pb-4">
                      <div className="text-3xl block">{ORGAN_DATA[selectedOrgan].emoji}</div>
                      <h3 className="text-xl font-bold mt-2">{ORGAN_DATA[selectedOrgan].title}</h3>
                      <p className="text-xs text-indigo-400 font-bold mt-0.5">{ORGAN_DATA[selectedOrgan].subtitle}</p>
                    </div>

                    {/* Physiological descriptions */}
                    <div className="space-y-2 text-xs">
                      <h4 className="font-bold text-slate-300">Como funciona biologically:</h4>
                      <p className="opacity-85 leading-relaxed">{ORGAN_DATA[selectedOrgan].desc}</p>
                    </div>

                    {/* Vital nutrient items maps */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-xs text-emerald-400 uppercase tracking-widest">
                        🎯 Nutrientes Críticos Necessários
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {ORGAN_DATA[selectedOrgan].list.map((item, idx) => (
                          <div key={idx} className="p-3 bg-slate-950/15 border border-slate-850 rounded-xl flex items-center justify-between">
                            <span className="text-xs font-semibold text-indigo-200">{item}</span>
                            <span className="text-[10px] text-indigo-400 font-bold flex items-center gap-1 cursor-pointer hover:opacity-100 opacity-60" onClick={() => {
                              // Auto query in dictionary if possible
                              const cleanName = item.split(' (')[0].split(' — ')[0].trim();
                              const targetNut = NUTRIENT_DATABASE.find(n => n.name.toLowerCase().includes(cleanName.toLowerCase()));
                              if (targetNut) {
                                handleSelectNutrient(targetNut);
                                setActiveTab('explorar');
                              }
                            }}>
                              Ver Bula <Eye className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Preventative advices */}
                    <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${darkMode ? 'bg-indigo-950/20 border-indigo-950/40' : 'bg-indigo-50 border-indigo-100'}`}>
                      <p className="font-bold text-indigo-400 mb-1">💡 Dica Preventiva:</p>
                      O desgaste crônico do {ORGAN_DATA[selectedOrgan].title.split(' ')[2] || 'órgão'} é reduzido quando você sincroniza fontes alimentares completas com atividade neuromuscular diária regular!
                    </div>

                  </div>
                ) : (
                  <div className={`flex flex-col items-center justify-center rounded-3xl border border-dashed text-center p-12 min-h-[400px] ${darkMode ? 'bg-slate-905 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-5xl block animate-pulse mb-4">🧬</span>
                    <h3 className="text-lg font-bold">Aguardando mapeamento</h3>
                    <p className="text-sm opacity-70 max-w-sm mt-1">Toque em qualquer região sensível do esquema celular ao lado (como cérebro ou ossos) para ver os micronutrientes catalíticos envolvidos na longevidade sistêmica.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* --- MODULE 8: COMUNIDADE GLOBAL --- */}
        {activeTab === 'comunidade' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <p className="text-xs uppercase tracking-widest text-indigo-500 font-extrabold flex items-center gap-1">
                <Share2 className="w-4 h-4" /> Feed de Compartilhamento Saudável
              </p>
              <h2 className="text-3xl font-black tracking-tight mt-1">Comunidade Vitaminapédia</h2>
              <p className="text-sm opacity-80 mt-1">Discuta, compartilhe seus rótulos analisados, tire dúvidas com médicos voluntários e aprenda com a comunidade de saúde preventiva.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Creator post box column */}
              <div className="lg:col-span-5 space-y-4">
                <form onSubmit={handlePostCommunity} className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <p className="text-xs font-black uppercase tracking-wider text-indigo-400">Escrever Nova Publicação</p>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Título do Post:</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Alerta de excesso de açúcar na aveia"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className={`w-full px-4 py-2 text-xs rounded-xl border outline-none ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Tag / Categoria:</label>
                    <select
                      value={newPostTag}
                      onChange={(e) => setNewPostTag(e.target.value)}
                      className={`w-full px-4 py-2 text-xs rounded-xl border outline-none ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <option value="Descoberta">🍊 Descoberta Nutritiva</option>
                      <option value="Suplementação">💊 Suplementação e Dose</option>
                      <option value="Dúvida">❓ Dúvida Clínica Geral</option>
                      <option value="Receita">🥗 Alimento Saudável</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Conteúdo / Texto:</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Compartilhe seu score, fotos de rótulos analisados ou dicas de alimentos saudáveis de forma didática..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className={`w-full px-4 py-2 text-xs rounded-xl border outline-none ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-650 text-white font-bold text-xs shadow transition-all"
                  >
                    Publicar no Feed Ativo 🚀 (+30 XP)
                  </button>
                </form>

                {/* Score rules */}
                <div className={`p-4 rounded-2xl border text-xs space-y-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <p className="font-bold text-emerald-400">🏅 Regras de Postagem</p>
                  <p className="opacity-80">Promova discussões pacíficas focadas em micronutrição cotidiana. Posts contendo links comerciais ou diagnósticos não baseados em evidência científica serão removidos.</p>
                </div>
              </div>

              {/* Grid feeds of posts columns */}
              <div className="lg:col-span-7 space-y-4 max-h-[80vh] overflow-y-auto pr-2">
                {communityPosts.map(post => (
                  <div key={post.id} className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-200'}`}>
                    
                    {/* User identifier banner */}
                    <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                      <div className="flex items-center space-x-3">
                        <img src={post.userAvatar} alt={post.userName} className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                        <div>
                          <h5 className="font-bold text-xs">{post.userName}</h5>
                          <p className="text-[10px] opacity-50">{post.timestamp}</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full text-[9px] font-black uppercase">
                        {post.tag}
                      </span>
                    </div>

                    {/* Post content body */}
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-sm text-indigo-300">{post.title}</h4>
                      <p className="text-xs opacity-90 leading-relaxed whitespace-pre-line">{post.content}</p>
                    </div>

                    {/* Interactive bottom likes counters */}
                    <div className="flex items-center space-x-4 text-xs pt-1">
                      <button 
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center space-x-1 hover:text-rose-400 transition-colors ${post.likedByUser ? 'text-rose-500 font-bold' : 'opacity-70'}`}
                      >
                        <span>❤</span>
                        <span>{post.likes} Curtidas</span>
                      </button>

                      <div className="opacity-40">|</div>

                      <div className="opacity-70 flex items-center space-x-1">
                        <span>💬</span>
                        <span>{post.commentsCount} Comentários</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* --- MODULE 9: ÁREA VIP PREMIUM PRO PORTAL --- */}
        {activeTab === 'premium' && (
          <div className="space-y-6 animate-fade-in text-left">
            {/* VIP Golden Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 border border-yellow-400/40 p-6 md:p-10 text-slate-950 shadow-xl shadow-amber-500/10">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-950 text-amber-400 rounded-full text-[10px] font-extrabold uppercase tracking-widest leading-none mb-3">
                    <Crown className="w-3 h-3 fill-amber-400" />
                    <span>Acesso Pro Ativado</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Portal VIP Vitaminapédia Pro</h2>
                  <p className="text-sm opacity-90 font-medium mt-1">Sua nutrição calibrada ao nível celular. Desfrute de planos e diagnósticos estritos.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => window.print()}
                    className="px-5 py-3 bg-slate-950 hover:bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 text-xs transition-all shadow-md cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimir Laudo Integrado</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sub Tabs Selection inside Premium portal */}
            <div className="flex border-b border-slate-800/40 pb-0.5 overflow-x-auto gap-1">
              <button
                onClick={() => setActivePremiumSubTab('tracker')}
                className={`px-5 py-3 font-semibold text-xs rounded-t-xl transition-all min-w-[120px] cursor-pointer ${activePremiumSubTab === 'tracker' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500 font-bold' : 'opacity-65 hover:opacity-100'}`}
              >
                📊 Nutri-Metas Tracker
              </button>
              <button
                onClick={() => setActivePremiumSubTab('cardapio')}
                className={`px-5 py-3 font-semibold text-xs rounded-t-xl transition-all min-w-[120px] cursor-pointer ${activePremiumSubTab === 'cardapio' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500 font-bold' : 'opacity-65 hover:opacity-100'}`}
              >
                🥗 Cardápio com IA
              </button>
              <button
                onClick={() => setActivePremiumSubTab('genomica')}
                className={`px-5 py-3 font-semibold text-xs rounded-t-xl transition-all min-w-[120px] cursor-pointer ${activePremiumSubTab === 'genomica' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500 font-bold' : 'opacity-65 hover:opacity-100'}`}
              >
                🧬 Dna Nutrigenômica Humana
              </button>
            </div>

            {/* Sub Tab 1: Tracker Content */}
            {activePremiumSubTab === 'tracker' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-1.5"><TrendingUp className="w-5 h-5 text-amber-400" /> Suas Ingestas Diárias Pro</h3>
                    <p className="text-xs opacity-75 mb-6">Regule as metas diárias necessárias para blindar sua biologia e evitar carências crônicas de micronutrientes.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {dailyTracker.map((tracker, idx) => {
                        const percent = Math.min(100, Math.round((tracker.current / tracker.max) * 100));
                        return (
                          <div key={idx} className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-bold text-xs">{tracker.name}</h4>
                                <span className="text-[10px] opacity-60">{tracker.current.toFixed(1)} / {tracker.max} {tracker.unit}</span>
                              </div>
                              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${percent >= 100 ? 'bg-emerald-500/10 text-emerald-450' : percent >= 50 ? 'bg-amber-500/10 text-amber-405' : 'bg-rose-500/10 text-rose-450'}`}>{percent}%</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-amber-500 to-yellow-400 h-2.5 rounded-full transition-all duration-500" 
                                style={{ width: `${percent}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add Quick Dose Food simulator panel */}
                  <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <h4 className="font-bold text-sm mb-3">⚡ Adicionar Alimento / Dose Rápida</h4>
                    <p className="text-xs opacity-75 mb-4">Escolha as porções reais ingeridas hoje para sincronizar seu painel celular:</p>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => {
                          setDailyTracker(prev => prev.map(t => t.name === 'Vitamina C' ? { ...t, current: Math.min(t.max, t.current + 45) } : t));
                          addXP(10);
                        }}
                        className={`text-xs px-3.5 py-2.5 rounded-xl border border-dashed hover:border-amber-500 hover:bg-amber-500/5 transition-all text-left flex items-center space-x-2 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}
                      >
                        <span>🍊 Suco de Laranja (+45mg Vit C)</span>
                      </button>
                      <button 
                        onClick={() => {
                          setDailyTracker(prev => prev.map(t => t.name === 'Vitamina D' ? { ...t, current: Math.min(t.max, t.current + 25) } : t));
                          addXP(10);
                        }}
                        className={`text-xs px-3.5 py-2.5 rounded-xl border border-dashed hover:border-amber-500 hover:bg-amber-500/5 transition-all text-left flex items-center space-x-2 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}
                      >
                        <span>☀ Exposição Solar (+25mcg Vit D)</span>
                      </button>
                      <button 
                        onClick={() => {
                          setDailyTracker(prev => prev.map(t => t.name === 'B12' ? { ...t, current: Math.min(t.max, t.current + 2.4) } : t));
                          addXP(10);
                        }}
                        className={`text-xs px-3.5 py-2.5 rounded-xl border border-dashed hover:border-amber-500 hover:bg-amber-500/5 transition-all text-left flex items-center space-x-2 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}
                      >
                        <span>💊 Suplemento Metil-B12 (+2.4mcg B12)</span>
                      </button>
                      <button 
                        onClick={() => {
                          setDailyTracker(prev => prev.map(t => {
                            if (t.name === 'Ferro') return { ...t, current: Math.min(t.max, t.current + 5) };
                            if (t.name === 'Magnésio') return { ...t, current: Math.min(t.max, t.current + 40) };
                            return t;
                          }));
                          addXP(10);
                        }}
                        className={`text-xs px-3.5 py-2.5 rounded-xl border border-dashed hover:border-amber-500 hover:bg-amber-500/5 transition-all text-left flex items-center space-x-2 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}
                      >
                        <span>🥬 Salada Espinafre (+5mg Ferro, +40mg Mg)</span>
                      </button>
                      <button 
                        onClick={() => {
                          setDailyTracker(prev => prev.map(t => {
                            if (t.name === 'Zinco') return { ...t, current: Math.min(t.max, t.current + 5) };
                            if (t.name === 'Magnésio') return { ...t, current: Math.min(t.max, t.current + 100) };
                            return t;
                          }));
                          addXP(10);
                        }}
                        className={`text-xs px-3.5 py-2.5 rounded-xl border border-dashed hover:border-amber-500 hover:bg-amber-500/5 transition-all text-left flex items-center space-x-2 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}
                      >
                        <span>🎃 Sem. Abóbora (+5mg Zn, +100mg Mg)</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right columns metrics */}
                <div className="space-y-6">
                  <div className={`p-6 rounded-3xl border text-center ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <h4 className="font-bold text-xs uppercase text-amber-505 tracking-wider">Metas Fisiológicas Pro</h4>
                    <div className="my-6 relative inline-flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border-4 border-dashed border-amber-500/35 flex items-center justify-center animate-spin"></div>
                      <span className="absolute text-2xl font-black text-amber-400">🛡 94%</span>
                    </div>
                    <p className="text-xs opacity-80 max-w-xs mx-auto">Sua absorção diária combinada garante proteção robusta contra fadiga mental e flutuações sazonais.</p>
                  </div>

                  <div className={`p-6 rounded-3xl border space-y-3 ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <h4 className="font-bold text-sm text-yellow-400">🧬 Fatores Nutrifiláticos</h4>
                    <ul className="text-xs space-y-2.5 opacity-80">
                      <li className="flex items-start gap-1">✔ <strong>Vitamina C + Ferro</strong>: Absorção estressada em 3.2x!</li>
                      <li className="flex items-start gap-1">✔ <strong>Vitamina D + Cálcio + K2</strong>: Fixação óssea ideal prevenida.</li>
                      <li className="flex items-start gap-1">✔ <strong>Zinco + Biotina</strong>: Crescimento capilar acelerado e queratina reforçada.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Sub Tab 2: Cardapio IA Generator */}
            {activePremiumSubTab === 'cardapio' && (
              <div className={`p-6 rounded-3xl border space-y-6 ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-1.5">🥗 Plano de Refeições IA Integrativa</h3>
                    <p className="text-xs opacity-75">Gera recomendações moleculares baseadas inteiramente nas fraquezas de saúde obtidas na sua avaliação preventiva.</p>
                  </div>
                  <button
                    disabled={isGeneratingCardapio}
                    onClick={handleGeneratePremiumCardapio}
                    className="px-5 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isGeneratingCardapio ? 'Calculando pelo Nutricionista IA...' : 'Gerar Meu Cardápio Integrado com IA'}</span>
                  </button>
                </div>

                {isGeneratingCardapio && (
                  <div className="p-12 text-center space-y-4">
                    <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-xs font-bold text-amber-500">Mapeando interações enzimáticas baseadas no seu perfil preventivo...</p>
                    <p className="text-[10px] opacity-60">O Gemini está selecionando as combinações ideais de micronutrientes em tempo real.</p>
                  </div>
                )}

                {/* If no plan generated yet */}
                {!premiumCardapio && !isGeneratingCardapio && (
                  <div className="p-8 text-center border-2 border-dashed border-slate-800 rounded-2xl">
                    <p className="text-xs opacity-75">Nenhum plano alimentar estratégico ativo.</p>
                    <p className="text-[10px] opacity-50 mt-1">Clique no botão acima para instanciar seu cardápio VIP.</p>
                  </div>
                )}

                {premiumCardapio && !isGeneratingCardapio && (
                  <div className="space-y-6">
                    {/* Tarjet goals */}
                    <div className={`p-4 rounded-2xl border-l-4 border-amber-500 ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
                      <h4 className="font-bold text-xs text-amber-500 uppercase tracking-wider mb-2">Metas Fisiológicas Deste Plano:</h4>
                      <ul className="text-xs space-y-1 opacity-80 list-disc list-inside">
                        {premiumCardapio.targetGoals?.map((goal: string, gIdx: number) => (
                          <li key={gIdx}>{goal}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Meal Days Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {premiumCardapio.days?.map((day: any, dIdx: number) => (
                        <div key={dIdx} className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
                          <h4 className="font-extrabold text-sm text-yellow-400 border-b border-slate-800 pb-2 mb-4 flex items-center justify-between">
                            <span>{day.title || `Dia ${day.dayNumber}`}</span>
                            <span className="text-[10px] font-mono opacity-50">PRO</span>
                          </h4>
                          <div className="space-y-4 text-xs">
                            {day.meals?.map((meal: any, mIdx: number) => (
                              <div key={mIdx} className="space-y-0.5">
                                <span className="font-bold text-slate-400 block text-[10px] uppercase tracking-wider">{meal.name}</span>
                                <p className="opacity-90 leading-relaxed text-[11px]">{meal.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={`p-4 rounded-xl text-xs flex gap-2 items-start ${darkMode ? 'bg-indigo-950/20 text-indigo-300' : 'bg-indigo-50 text-indigo-805'}`}>
                      <Info className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <strong>💡 Dica do Analista Molecular:</strong> {premiumCardapio.suplementacaoDica}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Sub Tab 3: Nutrigenética DNA simulator */}
            {activePremiumSubTab === 'genomica' && (
              <div className={`p-6 rounded-3xl border space-y-6 ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div>
                  <h3 className="font-bold text-lg mb-1 flex items-center gap-1.5"><Dna className="w-5 h-5 text-amber-500 animate-pulse" /> Relatório Genômico e Marcadores Celulares</h3>
                  <p className="text-xs opacity-75">Descubra se seus receptores corporais possuem gargalos bioquímicos latentes para absorver e reter micronutrientes fundamentais na sua imunidade básica.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column genes */}
                  <div className="md:col-span-2 space-y-4">
                    <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                        <span className="font-mono font-bold text-amber-400">Receptor de Vitamina D (Gene VDR)</span>
                        <span className="text-[10px] bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded-full font-bold">Variante de Risco: TaqI (FokI)</span>
                      </div>
                      <p className="text-xs opacity-80 leading-relaxed">Indica predisposição genética para baixa fixação celular de Vitamina D no núcleo de macrófagos. Requer níveis terapêuticos mais elevados de D3 + K2 para ativação nuclear segura.</p>
                    </div>

                    <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                        <span className="font-mono font-bold text-emerald-400">Metabolismo do Folato (Gene MTHFR C677T)</span>
                        <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full font-bold">Variante: Heterozigoto (C/T)</span>
                      </div>
                      <p className="text-xs opacity-80 leading-relaxed">Metilação reduzida em aproximadamente 35% a absorção de Ácido Fólico sintético. A preferência clínica estrita deve ser direcionada para folato ativo (Metilfolato) e Metilcobalamina (B12).</p>
                    </div>

                    <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                        <span className="font-mono font-bold text-indigo-400">Escudo Antioxidante (Gene GSTM1)</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-405 px-2 py-0.5 rounded-full font-bold">Variante: Tipo Selvagem / Funcional</span>
                      </div>
                      <p className="text-xs opacity-80 leading-relaxed">Poderosa capacidade endógena da enzima Glutationa para desintoxicação celular. A ingestão diária sugerida de Vitamina C e legumes crucíferos (como brócolis) é sinergicamente convertida.</p>
                    </div>
                  </div>

                  {/* Right column summary genómica */}
                  <div className={`p-6 rounded-3xl border space-y-4 text-center justify-center flex flex-col ${darkMode ? 'bg-slate-950 border-slate-805' : 'bg-slate-100 border-slate-200'}`}>
                    <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/35 flex items-center justify-center mx-auto text-2xl animate-spin-slow">🌀</div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-amber-500">Seu Perfil Genotípico</h4>
                    <p className="text-xs opacity-80 font-medium">Você exibe uma ancestralidade excelente para conversão de micronutrientes, apresentando moderada perda no ciclo do folato, contornada perfeitamente com folhas abundantes.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* --- R$ 9,90 PREMIUM VIP UPGRADE MODAL --- */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className={`relative w-full max-w-lg p-6 rounded-3xl border shadow-2xl space-y-6 text-left ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}`}>
            
            {/* Close button */}
            <button 
              onClick={() => { setShowUpgradeModal(false); setCheckoutStep(0); setIsCheckoutSimulating(false); }}
              className={`absolute top-4 right-4 p-1.5 rounded-xl transition-all ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
            >
              <X className="w-5 h-5" />
            </button>

            {checkoutStep === 0 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
                    <Crown className="w-8 h-8 text-slate-950 fill-slate-950 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">Upgrade Premium PRO 👑</h3>
                  <p className="text-xs opacity-70">Desbloqueie cardápios gerados por IA, laudos de DNA e metas de absorção diárias.</p>
                </div>

                {/* Benefits List */}
                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold">✔</span>
                    <div>
                      <strong className="block text-amber-400 text-[11px]">Cardápios Inteligentes Diários por IA:</strong>
                      <span className="opacity-75">Montado pelo Nutricionista IA baseado na carência relatada nos sintomas.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold">✔</span>
                    <div>
                      <strong className="block text-amber-400 text-[11px]">Simulador de DNA e Nutrigenômica:</strong>
                      <span className="opacity-75">Mapeamento de gargalos genéticos (MTHFR, VDR, GSTM1) de carências latentes.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold">✔</span>
                    <div>
                      <strong className="block text-amber-400 text-[11px]">Painel de Nutri-Metas Integrado:</strong>
                      <span className="opacity-75">Ajuste e adicione porções de frutas para ver os aneis térmicos celulares preencherem.</span>
                    </div>
                  </div>
                </div>

                {/* Plans Select Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => setSelectedPlanPrice('R$ 9,90/mês')}
                    className={`p-4 rounded-2xl border cursor-pointer text-center transition-all ${selectedPlanPrice === 'R$ 9,90/mês' ? 'border-amber-500 bg-amber-500/10' : darkMode ? 'border-slate-800 bg-slate-950/40 opacity-70' : 'border-slate-200 bg-slate-50 opacity-70'}`}
                  >
                    <span className="block font-bold text-xs uppercase tracking-wider text-amber-500">Mensal Nutri</span>
                    <span className="block font-black text-lg mt-1">R$ 9,90</span>
                    <span className="block text-[10px] opacity-60">por mês</span>
                  </div>
                  <div 
                    onClick={() => setSelectedPlanPrice('R$ 19,90')}
                    className={`p-4 rounded-2xl border cursor-pointer text-center transition-all ${selectedPlanPrice === 'R$ 19,90' ? 'border-amber-500 bg-amber-500/10' : darkMode ? 'border-slate-800 bg-slate-950/40 opacity-70' : 'border-slate-200 bg-slate-50 opacity-70'}`}
                  >
                    <span className="block font-bold text-xs uppercase tracking-wider text-amber-500">Eterno Vitalício</span>
                    <span className="block font-black text-lg mt-1">R$ 19,90</span>
                    <span className="block text-[10px] opacity-60">Taxa Única Vitalícia</span>
                  </div>
                </div>

                <button
                  onClick={handleSimulateCheckout}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 hover:scale-[1.02] active:scale-[0.98] text-slate-950 font-extrabold text-xs rounded-2xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-amber-500/25 cursor-pointer"
                >
                  <Crown className="w-4 h-4 fill-slate-950" />
                  <span>Obter Pro Agora ({selectedPlanPrice})</span>
                </button>
                <p className="text-center text-[9px] opacity-50">Cancelamento imediato em 1 toque sem pegadinhas ou taxa de fidelidade.</p>
              </div>
            )}

            {checkoutStep === 1 && (
              <div className="p-8 text-center space-y-6">
                <p className="font-bold text-xs uppercase tracking-wider text-amber-500">Iniciando Checkout Seguro...</p>
                <div className="relative inline-flex justify-center items-center">
                  <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="absolute text-xl">💸</span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-extrabold text-sm text-yellow-500">Processando Pix Simulado</h4>
                  <p className="text-xs opacity-70">O sistema está simulando um processamento de gateway e ativará sua licença Pro automaticamente em segundos.</p>
                </div>
              </div>
            )}

            {checkoutStep === 2 && (
              <div className="p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl">🎉</div>
                <div className="space-y-2">
                  <h4 className="font-black text-xl text-emerald-400">Seja muito bem-vindo ao VIP! 👑</h4>
                  <p className="text-xs opacity-85">Seu pagamento simbólico foi processado e seu acesso Pro foi liberado com honras na plataforma!</p>
                </div>
                <button
                  onClick={() => { setShowUpgradeModal(false); setCheckoutStep(0); setActiveTab('premium'); }}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-650 text-white font-bold text-xs rounded-2xl transition-all cursor-pointer"
                >
                  Entrar no Portal VIP Pro 🚀
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* --- SIMPLIFIED PREMIUM MOBILE NAVIGATION BOTTOM BAR (Clean & Aligned) --- */}
      <nav id="bottom-bar-navigation" className={`fixed bottom-0 left-0 right-0 border-t backdrop-blur-md z-[45] transition-colors ${
        darkMode ? 'bg-slate-950/95 border-slate-850 text-slate-200' : 'bg-white/95 border-slate-200 text-slate-800'
      }`}>
        <div className="max-w-md mx-auto px-1 py-1.5 flex items-center justify-between text-center">
          
          <button
            id="nav-inicio"
            onClick={() => { setActiveTab('inicio'); setShowMobileMenu(false); }}
            className={`flex-1 py-1 px-1 flex flex-col items-center justify-center select-none rounded-2xl transition-all cursor-pointer ${activeTab === 'inicio' ? 'text-indigo-400 font-extrabold scale-102' : 'opacity-65 hover:opacity-100 text-slate-400'}`}
          >
            <Activity className="w-5 h-5 text-indigo-500" />
            <span className="text-[10px] mt-1 font-semibold">Início</span>
          </button>

          <button
            id="nav-scanner-btn"
            onClick={() => { setActiveTab('scanner'); setShowMobileMenu(false); }}
            className={`flex-1 py-1 px-1 flex flex-col items-center justify-center select-none rounded-2xl transition-all cursor-pointer ${activeTab === 'scanner' ? 'text-emerald-400 font-extrabold scale-102' : 'opacity-65 hover:opacity-100 text-slate-400'}`}
          >
            <Camera className="w-5 h-5 text-emerald-400" />
            <span className="text-[10px] mt-1 font-semibold">Scanner IA</span>
          </button>

          <button
            id="nav-ia"
            onClick={() => { setActiveTab('ia'); setShowMobileMenu(false); }}
            className={`flex-1 py-1 px-1 flex flex-col items-center justify-center select-none rounded-2xl transition-all cursor-pointer ${activeTab === 'ia' ? 'text-purple-400 font-extrabold scale-102' : 'opacity-65 hover:opacity-100 text-slate-400'}`}
          >
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <span className="text-[10px] mt-1 font-semibold">Conversar IA</span>
          </button>

          <button
            id="nav-explorar"
            onClick={() => { setActiveTab('explorar'); setShowMobileMenu(false); }}
            className={`flex-1 py-1 px-1 flex flex-col items-center justify-center select-none rounded-2xl transition-all cursor-pointer ${activeTab === 'explorar' ? 'text-indigo-400 font-extrabold scale-102' : 'opacity-65 hover:opacity-100 text-slate-400'}`}
          >
            <Search className="w-5 h-5 text-indigo-400" />
            <span className="text-[10px] mt-1 font-semibold">Dicionário</span>
          </button>

          <button
            id="nav-mais"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={`flex-1 py-1 px-1 flex flex-col items-center justify-center select-none rounded-2xl transition-all cursor-pointer ${showMobileMenu ? 'text-amber-400 font-extrabold scale-102' : 'opacity-65 hover:opacity-100 text-slate-400'}`}
          >
            <div className="relative">
              <Settings className="w-5 h-5 text-amber-500" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            </div>
            <span className="text-[10px] mt-1 font-semibold">Recursos</span>
          </button>

        </div>
      </nav>

      {/* --- PREMIUM MOBILE NAVIGATION BOTTOM MENU DRAWER --- */}
      {showMobileMenu && (
        <div className="fixed inset-x-0 bottom-[60px] z-[50] p-4 animate-fade-in">
          {/* Transparent Backdrop to close the menu upon click */}
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm -z-10" onClick={() => setShowMobileMenu(false)}></div>
          
          <div className={`w-full max-w-md mx-auto p-5 rounded-3xl border shadow-2xl space-y-4 text-left transition-all ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800 shadow-xl'
          }`}>
            <div className="flex justify-between items-center border-b pb-3 border-slate-800/10 dark:border-slate-800">
              <div>
                <p className="text-[9px] uppercase font-bold tracking-widest text-indigo-400">Seções Adicionais</p>
                <h4 className="font-extrabold text-sm tracking-tight">Expandir Biologia Digital</h4>
              </div>
              <button 
                onClick={() => setShowMobileMenu(false)}
                className={`p-1.5 rounded-xl transition-all cursor-pointer ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => { setActiveTab('missoes'); setShowMobileMenu(false); }}
                className={`p-3.5 rounded-xl border flex flex-col items-start gap-1 transition-all text-left cursor-pointer ${
                  activeTab === 'missoes' ? 'border-amber-500 bg-amber-500/10' : darkMode ? 'border-slate-800 bg-slate-950/40 hover:bg-slate-950 text-slate-100' : 'border-slate-250 bg-slate-50 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <Award className="w-5 h-5 text-amber-500" />
                <div>
                  <span className="block font-bold text-xs">Gamificação</span>
                  <span className="block text-[8px] opacity-60">Missões e XP</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('preventivo'); setShowMobileMenu(false); }}
                className={`p-3.5 rounded-xl border flex flex-col items-start gap-1 transition-all text-left cursor-pointer ${
                  activeTab === 'preventivo' ? 'border-pink-500 bg-pink-500/10' : darkMode ? 'border-slate-800 bg-slate-950/40 hover:bg-slate-950 text-slate-100' : 'border-slate-250 bg-slate-50 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <Heart className="w-5 h-5 text-pink-400" />
                <div>
                  <span className="block font-bold text-xs">Análise IA</span>
                  <span className="block text-[8px] opacity-60">Saúde Preventiva</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('corpo'); setShowMobileMenu(false); }}
                className={`p-3.5 rounded-xl border flex flex-col items-start gap-1 transition-all text-left cursor-pointer ${
                  activeTab === 'corpo' ? 'border-teal-500 bg-teal-500/10' : darkMode ? 'border-slate-800 bg-slate-950/40 hover:bg-slate-950 text-slate-100' : 'border-slate-250 bg-slate-50 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <Sparkles className="w-5 h-5 text-teal-400" />
                <div>
                  <span className="block font-bold text-xs">Anatomia</span>
                  <span className="block text-[8px] opacity-60">Mapa do Corpo</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('comunidade'); setShowMobileMenu(false); }}
                className={`p-3.5 rounded-xl border flex flex-col items-start gap-1 transition-all text-left cursor-pointer ${
                  activeTab === 'comunidade' ? 'border-indigo-500 bg-indigo-500/10' : darkMode ? 'border-slate-800 bg-slate-950/40 hover:bg-slate-950 text-slate-100' : 'border-slate-250 bg-slate-50 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <Share2 className="w-5 h-5 text-indigo-400" />
                <div>
                  <span className="block font-bold text-xs">Comunidade</span>
                  <span className="block text-[8px] opacity-60">Feed Compartilhado</span>
                </div>
              </button>

              <button
                onClick={() => { if (isPremium) { setActiveTab('premium'); } else { setShowUpgradeModal(true); } setShowMobileMenu(false); }}
                className="col-span-2 p-3 rounded-xl border bg-gradient-to-r from-amber-500 to-yellow-400 hover:scale-[1.01] active:scale-[0.99] font-extrabold text-slate-950 text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Crown className="w-4 h-4 fill-slate-950" />
                <span>{isPremium ? 'Membro VIP PRO Ativo' : 'Desbloquear Premium PRO (R$ 9,90/mês)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
