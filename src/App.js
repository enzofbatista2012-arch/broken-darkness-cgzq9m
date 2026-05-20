
import { auth } from "./firebase"; // Ajuste o caminho do arquivo de configuração se necessário
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
 import { useState, useRef, useEffect } from "react";

// ─── APOSTILAS ───────────────────────────────────────────────────────────────
const APOSTILAS = [
  { id: 1, materia: "Matemática", ano: "6º Ano", titulo: "Números Naturais e Operações", conteudo: `# Números Naturais e Operações\n\n## O que são Números Naturais?\nOs números naturais são os números usados para contar: 0, 1, 2, 3, 4, 5, ...\n\nO conjunto dos números naturais é representado por **ℕ = {0, 1, 2, 3, 4, 5, ...}**\n\n## Operações Fundamentais\n\n### Adição\nA adição é a operação de juntar quantidades.\n- Exemplo: 345 + 278 = 623\n- Propriedades: comutativa (a+b = b+a), associativa ((a+b)+c = a+(b+c))\n\n### Subtração\nA subtração é a operação de tirar uma quantidade de outra.\n- Exemplo: 500 - 237 = 263\n\n### Multiplicação\nA multiplicação é uma adição repetida.\n- Exemplo: 24 × 15 = 360\n\n### Divisão\nA divisão é o inverso da multiplicação.\n- Divisão exata: 48 ÷ 6 = 8\n- Divisão com resto: 50 ÷ 6 = 8 (resto 2)\n\n## Potenciação\n- aⁿ = a × a × a ... (n vezes)\n- Exemplo: 2⁵ = 32\n\n## Ordem das Operações\n1. Parênteses ()\n2. Potências e Raízes\n3. Multiplicação e Divisão\n4. Adição e Subtração\n\n## Exercícios\n1. Calcule: 1.250 + 3.748 - 891\n2. Resolva: 45 × 32\n3. Calcule: 3³ + √81\n4. Resolva: 5 + 3 × 2² - (8 ÷ 4)` },
  { id: 2, materia: "Português", ano: "6º Ano", titulo: "Tipos de Texto e Interpretação", conteudo: `# Tipos de Texto e Interpretação\n\n## Tipos de Texto\n\n### 1. Narrativo\nConta uma história com personagens, tempo, espaço e enredo.\n- **Exemplos:** Contos, romances, crônicas, fábulas\n\n### 2. Descritivo\nDescreve características de pessoas, lugares ou objetos.\n- Usa adjetivos e locuções adjetivas\n\n### 3. Argumentativo/Dissertativo\nDefende um ponto de vista com argumentos.\n- **Estrutura:** Introdução → Desenvolvimento → Conclusão\n\n### 4. Injuntivo/Instrucional\nIndica como fazer algo, dá ordens ou instruções.\n- **Exemplos:** Receitas, manuais, regras de jogos\n\n### 5. Expositivo/Informativo\nInforma e explica sobre um assunto.\n- **Exemplos:** Notícias, enciclopédias\n\n## Interpretação de Texto\n\n### Estratégias de Leitura\n1. **Pré-leitura:** Observe título, subtítulos, imagens\n2. **Leitura global:** Leia o texto completamente\n3. **Leitura analítica:** Identifique ideia central de cada parágrafo\n\n### Tipos de Informação\n- **Explícita:** Está claramente escrita no texto\n- **Implícita:** Precisa ser inferida\n\n## Exercícios\n1. Identifique o tipo de texto: "Misture 2 xícaras de farinha, 3 ovos e 1 xícara de leite."\n2. Qual é a diferença entre informação explícita e implícita?` },
  { id: 3, materia: "História", ano: "6º Ano", titulo: "Pré-História e Primeiras Civilizações", conteudo: `# Pré-História e Primeiras Civilizações\n\n## Pré-História\n\n### Paleolítico (Era da Pedra Lascada)\n- Humanos nômades, caçadores e coletores\n- Descoberta do fogo\n- Arte rupestre (pinturas em cavernas)\n\n### Neolítico (Era da Pedra Polida)\n- Revolução Agrícola: cultivo de plantas e criação de animais\n- Surgimento das primeiras aldeias\n\n## Mesopotâmia\nEntre os rios Tigre e Eufrates (atual Iraque).\n\n### Contribuições\n- **Escrita cuneiforme:** Primeira escrita da humanidade\n- **Código de Hamurabi:** Primeiro conjunto de leis escritas\n- **Roda:** Facilitou o transporte\n\n## Egito Antigo\n\n### Organização Social\n- **Faraó:** Rei-deus, poder absoluto\n- **Sacerdotes:** Intermediários\n- **Escribas:** Responsáveis pela escrita\n\n### Contribuições\n- **Hieróglifos:** Sistema de escrita\n- **Pirâmides:** Maravilha da engenharia antiga\n- **Calendário solar:** 365 dias\n\n## Exercícios\n1. Qual foi a importância da Revolução Agrícola?\n2. Por que a escrita foi tão importante?` },
  { id: 4, materia: "Ciências", ano: "6º Ano", titulo: "Célula: Unidade da Vida", conteudo: `# Célula: Unidade da Vida\n\n## O que é uma Célula?\nA célula é a menor unidade estrutural e funcional dos seres vivos.\n\n**Teoria Celular:**\n1. Todo ser vivo é formado por células\n2. A célula é a unidade básica da vida\n3. Toda célula origina-se de outra célula\n\n## Tipos de Células\n\n### Procariótica\n- Sem núcleo definido\n- Exemplos: bactérias\n\n### Eucariótica\n- Com núcleo definido\n- Exemplos: plantas e animais\n\n## Organelas Principais\n\n**Mitocôndrias** - "Usina de energia"\n**Ribossomos** - Sintetizam proteínas\n**Núcleo** - "Centro de controle"\n\n## Diferenças: Animal x Vegetal\n\n| Estrutura | Animal | Vegetal |\n|-----------|--------|---------|\n| Parede celular | ✗ | ✓ |\n| Cloroplastos | ✗ | ✓ |\n| Vacúolo central | Pequeno | Grande |\n\n## Exercícios\n1. Qual a diferença entre célula procariótica e eucariótica?\n2. Por que as mitocôndrias são chamadas de "usinas de energia"?` },
  { id: 5, materia: "Matemática", ano: "7º Ano", titulo: "Frações e Números Decimais", conteudo: `# Frações e Números Decimais\n\n## Frações\n\n### Tipos de Frações\n- **Própria:** numerador < denominador (3/4)\n- **Imprópria:** numerador > denominador (7/3)\n- **Equivalentes:** mesmo valor (1/2 = 2/4 = 3/6)\n\n### Operações\n\n**Adição (mesmo denominador):** 3/7 + 2/7 = 5/7\n\n**Adição (denominadores diferentes):**\n1/3 + 1/4 = 4/12 + 3/12 = 7/12 (MMC = 12)\n\n**Multiplicação:** 2/3 × 3/5 = 6/15 = 2/5\n\n**Divisão:** 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6\n\n## Porcentagem\n\n- 35% = 35/100 = 0,35\n- **Desconto:** R$ 150 com 30% = 150 × 0,70 = R$ 105\n- **Aumento:** R$ 200 com 15% = 200 × 1,15 = R$ 230\n\n## Exercícios\n1. Calcule: 3/4 + 5/6\n2. Divida: 7/8 ÷ 3/4\n3. Calcule 35% de 480\n4. Um produto custava R$ 340 e teve 20% de desconto. Qual o novo preço?` },
  { id: 6, materia: "Matemática", ano: "8º Ano", titulo: "Equações do 1º e 2º Grau", conteudo: `# Equações do 1º e 2º Grau\n\n## Equação do 1º Grau\n\n**Forma:** ax + b = 0, com a ≠ 0\n\n**Exemplo:** 3x + 6 = 0\n→ 3x = -6\n→ x = -2\n\n## Equação do 2º Grau\n\n**Forma:** ax² + bx + c = 0, com a ≠ 0\n\n### Discriminante (Δ)\n**Δ = b² - 4ac**\n- Δ > 0 → duas raízes reais\n- Δ = 0 → uma raiz real\n- Δ < 0 → sem raízes reais\n\n### Fórmula de Bhaskara\n**x = (-b ± √Δ) / (2a)**\n\n**Exemplo:** x² - 5x + 6 = 0\n- Δ = 25 - 24 = 1\n- x₁ = (5 + 1)/2 = 3\n- x₂ = (5 - 1)/2 = 2\n\n## Exercícios\n1. Resolva: 2x + 8 = 0\n2. Resolva: x² - 7x + 12 = 0\n3. Para que valores de x a função f(x) = x² - 4 é negativa?` },
  { id: 7, materia: "Matemática", ano: "9º Ano", titulo: "Funções do 1º e 2º Grau", conteudo: `# Funções do 1º e 2º Grau\n\n## Função do 1º Grau (Afim)\n\n**f(x) = ax + b**, com a ≠ 0\n\n- a > 0 → reta crescente\n- a < 0 → reta decrescente\n- Zero: x = -b/a\n\n**Exemplo:** f(x) = 2x - 6\n- Zero: x = 3\n\n## Função do 2º Grau (Quadrática)\n\n**f(x) = ax² + bx + c**, com a ≠ 0\n\n- a > 0 → parábola para cima (mínimo)\n- a < 0 → parábola para baixo (máximo)\n\n### Vértice\n- **xv = -b / (2a)**\n- **yv = -Δ / (4a)**\n\n**Exemplo:** f(x) = x² - 5x + 6\n- Δ = 1; x₁ = 3; x₂ = 2\n- Vértice: (2,5; -0,25)\n\n## Exercícios\n1. f(x) = 3x - 9. Encontre o zero e f(4).\n2. Um foguete: h(t) = -5t² + 30t. Quando atinge o máximo?` },
  { id: 8, materia: "Biologia", ano: "9º Ano", titulo: "Genética Mendeliana", conteudo: `# Genética Mendeliana\n\n## Conceitos Fundamentais\n\n- **Gene:** segmento de DNA que controla uma característica\n- **Alelo:** cada versão de um gene (A, a)\n- **Genótipo:** constituição genética (AA, Aa, aa)\n- **Fenótipo:** característica observável\n- **Dominante:** se expressa em dose simples (A)\n- **Recessivo:** só se expressa em dose dupla (aa)\n\n## 1ª Lei de Mendel\n\n"Os fatores se separam durante a formação dos gametas."\n\n**Cruzamento Monoíbrido:**\nP: AA × aa → F1: 100% Aa\nF1 × F1: Aa × Aa → F2: 1 AA : 2 Aa : 1 aa\n→ **3 dominantes : 1 recessivo**\n\n## 2ª Lei de Mendel\n\n"Os fatores de pares diferentes se segregam independentemente."\n\nDiíbrido: AaBb × AaBb\nProporção F2: 9:3:3:1\n\n## Exercícios\n1. Dois pais heterozigotos (Aa × Aa). Qual a probabilidade de filho com fenótipo recessivo?\n2. O que é dominância incompleta? Dê um exemplo.` },
  { id: 9, materia: "Física", ano: "8º Ano", titulo: "Leis de Newton", conteudo: `# Leis de Newton\n\n## 1ª Lei — Inércia\n"Todo corpo continua em repouso ou em movimento retilíneo uniforme, a menos que uma força externa atue sobre ele."\n\n**Exemplos:** cinto de segurança, objeto em mesa que não se move.\n\n## 2ª Lei — Força e Aceleração\n**F = m × a**\n\n- F: força (N)\n- m: massa (kg)\n- a: aceleração (m/s²)\n\n**Exemplo:** m = 5 kg, F = 20 N → a = 4 m/s²\n\n## 3ª Lei — Ação e Reação\n"Para toda ação há uma reação igual e oposta."\n\n**Exemplos:** foguete, nadar, recuo de arma.\n\n## Peso e Massa\n- **Peso:** P = m × g (força gravitacional)\n- **Massa:** quantidade de matéria (kg)\n- g ≈ 10 m/s² (Terra)\n\n## Exercícios\n1. Um bloco de 5 kg é empurrado por 20 N. Qual a aceleração?\n2. Se o peso é 120 N, qual a massa? (g = 10 m/s²)\n3. Um carro de 800 kg acelera de 0 a 72 km/h em 8s. Qual a força?` },
  { id: 10, materia: "Química", ano: "8º Ano", titulo: "Estrutura Atômica", conteudo: `# Estrutura Atômica e Tabela Periódica\n\n## Partículas Subatômicas\n\n| Partícula | Carga | Localização |\n|-----------|-------|-------------|\n| Próton (p) | +1 | Núcleo |\n| Nêutron (n) | 0 | Núcleo |\n| Elétron (e⁻) | -1 | Eletrosfera |\n\n- **Z (número atômico):** número de prótons\n- **A (número de massa):** prótons + nêutrons\n\n**Exemplo — Carbono (¹²C):** Z=6, A=12, N=6\n\n## Tabela Periódica\n\n- **118 elementos** confirmados\n- **7 períodos** (linhas)\n- **18 grupos** (colunas)\n\n### Famílias Importantes\n- **IA — Metais Alcalinos:** Li, Na, K — muito reativos\n- **VIIA — Halogênios:** F, Cl, Br — muito eletronegativos\n- **VIII A — Gases Nobres:** He, Ne, Ar — estáveis\n\n## Exercícios\n1. Quantos prótons, nêutrons e elétrons tem o ²³Na?\n2. Por que os gases nobres são estáveis?` },
  { id: 11, materia: "Física", ano: "2º Ano EM", titulo: "Termodinâmica", conteudo: `# Termodinâmica\n\n## Calor vs. Temperatura\n- **Temperatura:** medida da agitação térmica\n- **Calor:** energia em trânsito entre corpos\n\n**Q = m × c × ΔT**\n- Calor específico da água: 1 cal/(g°C)\n\n## Leis da Termodinâmica\n\n### 1ª Lei (Conservação de Energia)\n**ΔU = Q - W**\n\n**Processos:**\n- Isotérmico (T=cte): Q = W\n- Isobárico (P=cte): W = P × ΔV\n- Isocórico (V=cte): W = 0 → ΔU = Q\n- Adiabático (Q=0): ΔU = -W\n\n### 2ª Lei\n"O calor flui espontaneamente do quente para o frio."\n\n### Eficiência de Máquina Térmica\n**η = 1 - T₂/T₁** (Carnot)\n\n**Exemplo:** Entre 500K e 300K → η = 40%\n\n## Exercícios\n1. Converta: 37°C para Kelvin\n2. Calcule o calor para aquecer 200g de água de 20°C a 80°C` },
  { id: 12, materia: "Matemática", ano: "3º Ano EM", titulo: "Probabilidade e Estatística", conteudo: `# Probabilidade e Estatística\n\n## Probabilidade\n\n**P(A) = n(A) / n(Ω)**\n\n- 0 ≤ P(A) ≤ 1\n- P(Aᶜ) = 1 - P(A)\n\n**Exemplo:** Dado: P(par) = 3/6 = 1/2\n\n### Eventos Independentes\n**P(A ∩ B) = P(A) × P(B)**\n\n## Análise Combinatória\n\n**Fatorial:** n! = n × (n-1) × ... × 1\n\n**Permutação:** Pₙ = n!\n\n**Combinação:** Cₙ,ₚ = n! / [p!(n-p)!]\n\n**Exemplo:** Comissão de 3 em 10 pessoas: C₁₀,₃ = 120\n\n## Estatística\n\n**Média:** x̄ = soma / n\n**Mediana:** valor central\n**Moda:** valor mais frequente\n**Desvio Padrão:** σ = √variância\n\n## Exercícios\n1. P(tirar ás de um baralho)?\n2. Anagramas de "AMOR"?\n3. Notas (6,8,7,9,5): calcule média e mediana.` },
  { id: 13, materia: "Biologia", ano: "3º Ano EM", titulo: "Ecologia e Meio Ambiente", conteudo: `# Ecologia e Meio Ambiente\n\n## Níveis de Organização\nIndivíduo → População → Comunidade → Ecossistema → Biosfera\n\n## Cadeias Alimentares\n\nProdutor → Consumidor Primário → Consumidor Secundário\n\n**Regra dos 10%:** cada nível retém ~10% da energia\n- 1000 kcal (plantas) → 100 kcal (herbívoros) → 10 kcal (carnívoros)\n\n## Ciclos Biogeoquímicos\n\n### Ciclo do Carbono\n- Fotossíntese: CO₂ → matéria orgânica\n- Respiração: matéria orgânica → CO₂\n\n### Ciclo do Nitrogênio\n- Fixação → Nitrificação → Assimilação → Amonificação\n\n## Relações Ecológicas\n\n| Relação | Espécies | Exemplo |\n|---------|----------|---------|\n| Mutualismo | (+/+) | Abelha e flor |\n| Parasitismo | (+/-) | Carrapato e cão |\n| Comensalismo | (+/0) | Rêmora e tubarão |\n\n## Problemas Ambientais\n- Efeito estufa intensificado\n- Destruição da camada de ozônio\n- Desmatamento\n\n## Exercícios\n1. Explique a regra dos 10%.\n2. Diferença entre mutualismo e comensalismo?` },
  { id: 14, materia: "Português", ano: "1º Ano EM", titulo: "Literatura Brasileira — Barroco", conteudo: `# Literatura Brasileira — Quinhentismo e Barroco\n\n## Quinhentismo (1500-1601)\n\n**Carta de Pero Vaz de Caminha (1500)**\n- Primeira manifestação literária sobre o Brasil\n- Considerada a "certidão de nascimento" do Brasil\n\n## Barroco Brasileiro (1601-1768)\n\n### Características\n- **Dualidade:** conflito entre razão e fé\n- **Cultismo:** linguagem rebuscada\n- **Conceptismo:** jogos de ideias e paradoxos\n\n### Padre Antônio Vieira\n- *Sermão da Sexagésima* (1655)\n- Estilo conceptista\n\n### Gregório de Matos — "Boca do Inferno"\n- Poesia lírica, sacra e satírica\n- Exemplo de antítese: "Nesta vida tudo é nada, / e o que não é nada, é tudo"\n\n## Figuras de Linguagem\n\n| Figura | Definição |\n|--------|-----------|\n| Antítese | Oposição de ideias |\n| Hipérbole | Exagero |\n| Metáfora | Comparação implícita |\n\n## Exercícios\n1. Por que Caminha é a "certidão de nascimento" do Brasil?\n2. O que é o dualismo barroco?` },
];	

// ─── COMUNIDADES ─────────────────────────────────────────────────────────────
const COMMUNITIES_DATA = [
  { id: 1, nome: "Matemática & Exatas", emoji: "📐", descricao: "Discussões sobre Matemática, Física e Química" },
  { id: 2, nome: "Ciências Humanas", emoji: "🌍", descricao: "História, Geografia, Filosofia e Sociologia" },
  { id: 3, nome: "Linguagens", emoji: "📚", descricao: "Português, Literatura e Redação ENEM" },
  { id: 4, nome: "Biologia & Ciências", emoji: "🔬", descricao: "Biologia, Química e Ciências Naturais" },
  { id: 5, nome: "ENEM & Vestibulares", emoji: "🎯", descricao: "Dicas, materiais e estratégias para o ENEM" },
  { id: 6, nome: "Estudos e Produtividade", emoji: "⚡", descricao: "Técnicas de estudo, organização e foco" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const timeAgo = (date) => {
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 60) return "agora";
  if (diff < 3600) return `${Math.floor(diff / 60)}min atrás`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
  return `${Math.floor(diff / 86400)}d atrás`;
};

const AVATARS = ["👩🎓","👨🎓","🧑‍🎓","👩💻","👨💻","🧑‍💻","👩🔬","👨🔬","🧑‍🔬","🦸‍♀️","🦸‍♂️","🧙‍♀️"];
const COLORS = ["#2d6a4f","#1b4332","#40916c","#1e6091","#6c3483","#b7410e","#1a5276","#4a235a"];
const rndColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];
const rndAvatar = () => AVATARS[Math.floor(Math.random() * AVATARS.length)];

// ─── LOCAL STORAGE ────────────────────────────────────────────────────────────
const storage = {
  getUsers: () => JSON.parse(localStorage.getItem("sv_users") || "{}"),
  saveUsers: (u) => localStorage.setItem("sv_users", JSON.stringify(u)),
  getPosts: () => JSON.parse(localStorage.getItem("sv_posts") || "[]"),
  savePosts: (p) => localStorage.setItem("sv_posts", JSON.stringify(p)),
  getJoined: (uid) => JSON.parse(localStorage.getItem(`sv_joined_${uid}`) || "[]"),
  saveJoined: (uid, j) => localStorage.setItem(`sv_joined_${uid}`, JSON.stringify(j)),
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function StudyVerse() {
  const [screen, setScreen] = useState("splash");
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);

  useEffect(() => {
    if (screen === "splash") {
      const t = setTimeout(() => setScreen("login"), 2000);
      return () => clearTimeout(t);
    }
  }, [screen]);

  useEffect(() => {
    if (user) {
      setPosts(storage.getPosts());
      setJoinedCommunities(storage.getJoined(user.id));
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    setScreen("home");
  };

  const handleLogout = () => {
    setUser(null);
    setPosts([]);
    setJoinedCommunities([]);
    setScreen("login");
  };

  const addPost = (post) => {
    const newPost = { ...post, id: Date.now(), likes: [], comments: [], shares: 0, createdAt: Date.now(), user };
    const updated = [newPost, ...posts];
    setPosts(updated);
    storage.savePosts(updated);
  };

  const toggleLike = (postId) => {
    const updated = posts.map(p => {
      if (p.id !== postId) return p;
      const liked = p.likes.includes(user.id);
      return { ...p, likes: liked ? p.likes.filter(id => id !== user.id) : [...p.likes, user.id] };
    });
    setPosts(updated);
    storage.savePosts(updated);
  };

  const addComment = (postId, text) => {
    const updated = posts.map(p =>
      p.id === postId
        ? { ...p, comments: [...p.comments, { id: Date.now(), text, user, createdAt: Date.now() }] }
        : p
    );
    setPosts(updated);
    storage.savePosts(updated);
  };

  const sharePost = (postId) => {
    const updated = posts.map(p => p.id === postId ? { ...p, shares: (p.shares || 0) + 1 } : p);
    setPosts(updated);
    storage.savePosts(updated);
  };

  const joinCommunity = (id) => {
    const updated = joinedCommunities.includes(id)
      ? joinedCommunities.filter(c => c !== id)
      : [...joinedCommunities, id];
    setJoinedCommunities(updated);
    storage.saveJoined(user.id, updated);
  };

  const deletePost = (postId) => {
    const updated = posts.filter(p => p.id !== postId);
    setPosts(updated);
    storage.savePosts(updated);
  };

  if (screen === "splash") return <SplashScreen />;
  if (screen === "login") return <LoginScreen onLogin={handleLogin} />;

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", height: "100vh", overflow: "hidden", background: "#f0f4f0" }}>
      <HomeScreen
        user={user}
        posts={posts}
        onAddPost={addPost}
        onLike={toggleLike}
        onComment={addComment}
        onShare={sharePost}
        onDeletePost={deletePost}
        joinedCommunities={joinedCommunities}
        onJoin={joinCommunity}
        onLogout={handleLogout}
      />
    </div>
  );
}

// ─── SPLASH ───────────────────────────────────────────────────────────────────
function SplashScreen() {
  return (
    <div style={{ height: "100vh", background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white" }}>
      <div style={{ fontSize: 80, marginBottom: 16, animation: "pulse 1.5s ease-in-out infinite" }}>📚</div>
      <h1 style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-1px", margin: 0 }}>StudyVerse</h1>
      <p style={{ fontSize: 16, opacity: 0.8, marginTop: 8 }}>Seu universo de estudos</p>
      <div style={{ marginTop: 48, display: "flex", gap: 8 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: "white", opacity: 0.4 + i * 0.3, animation: `bounce 1s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
      <style>{`
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      `}</style>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useRef ("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("9º Ano");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      onLogin({ id: user.uid, email: user.email, name: name.trim(), grade: grade });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Este e-mail já está cadastrado.");
      } else {
        setError("Erro ao cadastrar: " + err.message);
      }
      const users = storage.getUsers();
      if (users[email.toLowerCase()]) return setError("Este e-mail já está cadastrado.");
      const newUser = { id: Date.now(), name: name.trim(), email: email.toLowerCase(), password, grade, avatar: rndAvatar(), color: rndColor() };
      users[email.toLowerCase()] = newUser;
      storage.saveUsers(users);
      onLogin(newUser);
    } else {
      if (!email.trim()) return setError("Digite seu e-mail.");
      if (!password) return setError("Digite sua senha.");
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
        const user = userCredential.user;
  
        onLogin({ id: user.uid, email: user.email });
      } catch (err) {
        if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
          setError("E-mail ou senha incorretos. Tente novamente.");
        } else {
          setError("Erro ao fazer login: " + err.message);
        }
      }
    }
  };

  return (
    <div style={{ height: "100vh", background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, overflowY: "auto" }}>
      <div style={{ background: "white", borderRadius: 24, padding: 32, width: "100%", maxWidth: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 48 }}>📚</div>
          <h2 style={{ margin: "8px 0 4px", fontSize: 26, fontWeight: 900, color: "#1b4332" }}>StudyVerse</h2>
          <p style={{ color: "#666", fontSize: 13, margin: 0 }}>Bem-vindo(a) ao seu universo de estudos!</p>
        </div>

        <div style={{ display: "flex", background: "#f0f4f0", borderRadius: 12, padding: 4, marginBottom: 24 }}>
          {[["login", "Entrar"], ["register", "Cadastrar"]].map(([m, label]) => (
            <button key={m} onClick={() => { setMode(m); setError(""); }} style={{ flex: 1, padding: "10px 0", border: "none", borderRadius: 10, background: mode === m ? "#2d6a4f" : "transparent", color: mode === m ? "white" : "#666", fontWeight: 700, cursor: "pointer", fontSize: 14, transition: "all 0.2s" }}>
              {label}
            </button>
          ))}
        </div>

        {mode === "register" && (
          <Field label="Nome completo" value={name} onChange={setName} placeholder="Como devemos te chamar?" />
        )}
        <Field label="E-mail" value={email} onChange={setEmail} placeholder="seu@email.com" type="email" onEnter={handleSubmit} />
        <div style={{ marginBottom: 16, position: "relative" }}>
          <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 700, color: "#444" }}>Senha</label>
          <input value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} type={showPass ? "text" : "password"} placeholder="Mínimo 6 caracteres" style={{ width: "100%", padding: "14px 44px 14px 16px", border: "2px solid #e0e0e0", borderRadius: 12, fontSize: 15, outline: "none", boxSizing: "border-box" }} onFocus={e => e.target.style.borderColor = "#2d6a4f"} onBlur={e => e.target.style.borderColor = "#e0e0e0"} />
          <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 14, top: 38, background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>{showPass ? "🙈" : "👁️"}</button>
        </div>
        {mode === "register" && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 700, color: "#444" }}>Série/Ano</label>
            <select value={grade} onChange={e => setGrade(e.target.value)} style={{ width: "100%", padding: "14px 16px", border: "2px solid #e0e0e0", borderRadius: 12, fontSize: 15, outline: "none", background: "white", cursor: "pointer" }}>
              {["6º Ano","7º Ano","8º Ano","9º Ano","1º Ano EM","2º Ano EM","3º Ano EM"].map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
        )}

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#dc2626", fontWeight: 600 }}>
            ⚠️ {error}
          </div>
        )}

        <button onClick={handleSubmit} style={{ width: "100%", padding: 16, background: "linear-gradient(135deg, #2d6a4f, #40916c)", color: "white", border: "none", borderRadius: 14, fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 20px rgba(45,106,79,0.4)" }}>
          {mode === "login" ? "✨ Entrar e Estudar!" : "🚀 Criar Conta"}
        </button>

        <p style={{ textAlign: "center", fontSize: 12, color: "#999", marginTop: 16, marginBottom: 0 }}>
          {mode === "login" ? "Ainda não tem conta? " : "Já tem conta? "}
          <span onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }} style={{ color: "#2d6a4f", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>
            {mode === "login" ? "Cadastre-se" : "Faça login"}
          </span>
        </p>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", onEnter }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 700, color: "#444" }}>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} onKeyDown={e => e.key === "Enter" && onEnter && onEnter()} type={type} placeholder={placeholder} style={{ width: "100%", padding: "14px 16px", border: "2px solid #e0e0e0", borderRadius: 12, fontSize: 15, outline: "none", boxSizing: "border-box" }} onFocus={e => e.target.style.borderColor = "#2d6a4f"} onBlur={e => e.target.style.borderColor = "#e0e0e0"} />
    </div>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────
function HomeScreen({ user, posts, onAddPost, onLike, onComment, onShare, onDeletePost, joinedCommunities, onJoin, onLogout }) {
  const [tab, setTab] = useState("feed");
  const [selectedApostila, setSelectedApostila] = useState(null);
  const [apostilaFilter, setApostilaFilter] = useState("Todas");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [aiMessages, setAiMessages] = useState([{
    role: "assistant",
    content: `Olá, **${user?.name}**! 👋\n\nSou o seu Tutor IA do StudyVerse! Estou aqui para te ajudar com qualquer dúvida dos seus estudos.\n\nComo aluno(a) do **${user?.grade}**, posso te explicar matérias, resolver exercícios passo a passo, dar dicas de estudo e muito mais!\n\nO que você quer aprender hoje? 😊`
  }]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const aiEndRef = useRef(null);

  useEffect(() => { aiEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [aiMessages]);

  const sendAiMessage = async () => {
    if (!aiInput.trim() || aiLoading) return;
    const userMsg = aiInput.trim();
    setAiInput("");
    setAiMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setAiLoading(true);
    try {
      const history = aiMessages.map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Você é o Tutor IA do StudyVerse, um assistente educacional dedicado e apaixonado por ensinar.

Você está conversando com ${user?.name}, um(a) aluno(a) do ${user?.grade}.

COMO VOCÊ DEVE SE COMPORTAR:
- Sempre trate a pessoa como seu aluno(a), com carinho e respeito
- Use linguagem adequada para a faixa etária (ensino fundamental/médio)
- Explique conceitos com exemplos do cotidiano que façam sentido para um estudante
- Ao resolver exercícios, mostre SEMPRE o passo a passo detalhado
- Elogie quando o aluno demonstrar esforço ou acertar algo
- Quando o aluno errar, corrija com gentileza, sem deixar o aluno constrangido
- Use emojis com moderação para tornar o aprendizado mais divertido
- Sempre encoraje o aluno a continuar estudando
- Se o aluno parecer desmotivado, ofereça palavras de incentivo
- Adapte a complexidade da explicação ao nível do ${user?.grade}
- Responda no idioma que o aluno usar

MATÉRIAS QUE VOCÊ DOMINA:
Matemática, Português, História, Geografia, Ciências, Física, Química, Biologia, Filosofia, Sociologia, Literatura, Redação, Inglês e todas as matérias escolares.

LEMBRE-SE: Você é mais que um tutor - você é um incentivador da jornada de aprendizado de ${user?.name}!`,
          messages: [...history, { role: "user", content: userMsg }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "Desculpe, tive um probleminha! Pode repetir sua pergunta?";
      setAiMessages(prev => [...prev, { role: "assistant", content: text }]);
    } catch {
      setAiMessages(prev => [...prev, { role: "assistant", content: `Ops! Parece que tive um problema de conexão, ${user?.name}. Tente novamente em alguns instantes! 😊` }]);
    }
    setAiLoading(false);
  };

  const anos = ["Todas", "6º Ano", "7º Ano", "8º Ano", "9º Ano", "1º Ano EM", "2º Ano EM", "3º Ano EM"];
  const filteredApostilas = apostilaFilter === "Todas" ? APOSTILAS : APOSTILAS.filter(a => a.ano === apostilaFilter);

  const TABS = [
    { id: "feed", icon: "🏠", label: "Feed" },
    { id: "ai", icon: "🤖", label: "Tutor IA" },
    { id: "apostilas", icon: "📖", label: "Apostilas" },
    { id: "comunidades", icon: "👥", label: "Grupos" },
    { id: "perfil", icon: "👤", label: "Perfil" },
  ];

  const communities = COMMUNITIES_DATA.map(c => ({
    ...c,
    membros: joinedCommunities.includes(c.id) ? 1 : 0
  }));

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#f0f4f0", maxWidth: 480, margin: "0 auto", position: "relative", boxShadow: "0 0 40px rgba(0,0,0,0.1)" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1b4332, #2d6a4f)", padding: "14px 20px", color: "white", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900 }}>📚 StudyVerse</h1>
          <p style={{ margin: 0, fontSize: 12, opacity: 0.8 }}>Olá, {user?.name}! • {user?.grade}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: user?.color || "#40916c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: "2px solid rgba(255,255,255,0.4)" }}>
            {user?.avatar}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {tab === "feed" && <FeedTab posts={posts} user={user} onLike={onLike} onComment={onComment} onShare={onShare} onDeletePost={onDeletePost} onCreatePost={() => setShowCreatePost(true)} />}
        {tab === "ai" && <AITab messages={aiMessages} input={aiInput} setInput={setAiInput} onSend={sendAiMessage} loading={aiLoading} endRef={aiEndRef} user={user} />}
        {tab === "apostilas" && <ApostilasTab apostilas={filteredApostilas} filter={apostilaFilter} anos={anos} onFilter={setApostilaFilter} onSelect={setSelectedApostila} />}
        {tab === "comunidades" && <ComunidadesTab communities={communities} joined={joinedCommunities} onJoin={onJoin} posts={posts} onCreatePost={() => setShowCreatePost(true)} />}
        {tab === "perfil" && <PerfilTab user={user} posts={posts} joinedCommunities={joinedCommunities} onLogout={onLogout} />}
      </div>

      {/* Bottom Nav */}
      <div style={{ background: "white", borderTop: "1px solid #e8ede8", display: "flex", flexShrink: 0 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "10px 0", border: "none", background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 22 }}>{t.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: tab === t.id ? "#2d6a4f" : "#999" }}>{t.label}</span>
            {tab === t.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#2d6a4f" }} />}
          </button>
        ))}
      </div>

      {/* Modais */}
      {selectedApostila && <ApostilaModal apostila={selectedApostila} onClose={() => setSelectedApostila(null)} />}
      {showCreatePost && <CreatePostModal user={user} onPost={onAddPost} onClose={() => setShowCreatePost(false)} />}
    </div>
  );
}

// ─── FEED ────────────────────────────────────────────────────────────────────
function FeedTab({ posts, user, onLike, onComment, onShare, onDeletePost, onCreatePost }) {
  return (
    <div style={{ height: "100%", overflowY: "auto", padding: "12px" }}>
      <button onClick={onCreatePost} style={{ width: "100%", background: "white", border: "2px dashed #2d6a4f", borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", marginBottom: 12 }} onMouseOver={e => e.currentTarget.style.background = "#f0f7f0"} onMouseOut={e => e.currentTarget.style.background = "white"}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: user?.color || "#2d6a4f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{user?.avatar}</div>
        <span style={{ color: "#666", fontSize: 15 }}>✏️ Compartilhe algo com seus colegas...</span>
      </button>

      {posts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 20px", color: "#999" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📝</div>
          <h3 style={{ margin: "0 0 8px", color: "#555" }}>Nenhuma publicação ainda</h3>
          <p style={{ margin: 0, fontSize: 14 }}>Seja o primeiro a compartilhar algo com a comunidade!</p>
        </div>
      ) : (
        posts.map(post => <PostCard key={post.id} post={post} user={user} onLike={onLike} onComment={onComment} onShare={onShare} onDelete={onDeletePost} />)
      )}
      <div style={{ height: 20 }} />
    </div>
  );
}

function PostCard({ post, user, onLike, onComment, onShare, onDelete }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const liked = post.likes.includes(user?.id);
  const isOwner = post.user.id === user?.id;

  const submitComment = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText.trim());
      setCommentText("");
    }
  };

  return (
    <div style={{ background: "white", borderRadius: 16, marginBottom: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: post.user.color || "#2d6a4f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{post.user.avatar}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#222" }}>{post.user.name}</div>
            <div style={{ fontSize: 12, color: "#999" }}>{post.user.grade} • {timeAgo(post.createdAt)}</div>
          </div>
          {isOwner && (
            <button onClick={() => { if (window.confirm("Excluir esta publicação?")) onDelete(post.id); }} style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 18, padding: 4 }} title="Excluir post">🗑️</button>
          )}
        </div>

        {post.content && <p style={{ margin: "0 0 12px", fontSize: 15, color: "#333", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{post.content}</p>}

        {/* Imagem */}
        {post.imageData && (
          <img src={post.imageData} alt="Publicação" style={{ width: "100%", borderRadius: 12, marginBottom: 12, maxHeight: 400, objectFit: "cover", display: "block" }} />
        )}
        {/* Vídeo */}
        {post.videoData && (
          <video src={post.videoData} controls style={{ width: "100%", borderRadius: 12, marginBottom: 12, maxHeight: 350, background: "#000" }} />
        )}

        <div style={{ display: "flex", gap: 6, paddingTop: 10, borderTop: "1px solid #f0f0f0" }}>
          <ActionBtn icon={liked ? "❤️" : "🤍"} count={post.likes.length} label={liked ? "Curtido" : "Curtir"} active={liked} onClick={() => onLike(post.id)} />
          <ActionBtn icon="💬" count={post.comments.length} label="Comentar" onClick={() => setShowComments(!showComments)} />
          <ActionBtn icon="📤" count={post.shares || 0} label="Compartilhar" onClick={() => { onShare(post.id); navigator.clipboard?.writeText(`Veja essa publicação de ${post.user.name} no StudyVerse!`).catch(() => {}); }} />
        </div>
      </div>

      {showComments && (
        <div style={{ padding: "0 16px 16px", borderTop: "1px solid #f5f5f5" }}>
          {post.comments.length === 0 && <p style={{ color: "#bbb", fontSize: 13, margin: "10px 0 8px", textAlign: "center" }}>Nenhum comentário ainda. Seja o primeiro!</p>}
          {post.comments.map(c => (
            <div key={c.id} style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: c.user.color || "#2d6a4f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{c.user.avatar}</div>
              <div style={{ flex: 1, background: "#f5f5f5", borderRadius: 12, padding: "8px 12px" }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: "#555" }}>{c.user.name} <span style={{ fontWeight: 400, color: "#bbb" }}>• {timeAgo(c.createdAt)}</span></div>
                <div style={{ fontSize: 14, color: "#333", marginTop: 2 }}>{c.text}</div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: user.color || "#2d6a4f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{user.avatar}</div>
            <input value={commentText} onChange={e => setCommentText(e.target.value)} onKeyDown={e => e.key === "Enter" && submitComment()} placeholder="Adicione um comentário..." style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #e0e0e0", borderRadius: 20, fontSize: 14, outline: "none" }} onFocus={e => e.target.style.borderColor = "#2d6a4f"} onBlur={e => e.target.style.borderColor = "#e0e0e0"} />
            <button onClick={submitComment} style={{ width: 38, height: 38, borderRadius: "50%", background: "#2d6a4f", border: "none", color: "white", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionBtn({ icon, count, label, active, onClick }) {
  return (
    <button onClick={onClick} title={label} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "8px 4px", border: "none", background: active ? "#e8f5e9" : "transparent", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700, color: active ? "#2d6a4f" : "#888", transition: "all 0.15s" }}>
      <span>{icon}</span>
      {count > 0 && <span style={{ fontSize: 12 }}>{count}</span>}
    </button>
  );
}

// ─── CREATE POST MODAL ────────────────────────────────────────────────────────
function CreatePostModal({ user, onPost, onClose }) {
  const [content, setContent] = useState("");
  const [imageData, setImageData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [mediaName, setMediaName] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) return alert("Arquivo muito grande! Máximo 20MB.");
    setMediaName(file.name);
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = ev.target.result;
      if (file.type.startsWith("image/")) { setImageData(data); setVideoData(null); }
      else if (file.type.startsWith("video/")) { setVideoData(data); setImageData(null); }
      setLoading(false);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removeMedia = () => { setImageData(null); setVideoData(null); setMediaName(""); };

  const handle = () => {
    if (!content.trim() && !imageData && !videoData) return alert("Escreva algo ou adicione uma mídia antes de publicar!");
    onPost({ content: content.trim(), imageData, videoData });
    onClose();
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", zIndex: 50 }} onClick={onClose}>
      <div style={{ background: "white", borderRadius: "24px 24px 0 0", padding: 24, width: "100%", maxHeight: "90vh", overflowY: "auto", boxSizing: "border-box" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1b4332" }}>📝 Nova Publicação</h3>
          <button onClick={onClose} style={{ background: "#f5f5f5", border: "none", fontSize: 20, cursor: "pointer", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>×</button>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: user.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{user.avatar}</div>
          <div>
            <div style={{ fontWeight: 700, color: "#222", fontSize: 14 }}>{user.name}</div>
            <div style={{ fontSize: 12, color: "#888" }}>{user.grade}</div>
          </div>
        </div>

        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="O que você quer compartilhar? Dúvidas, dicas de estudo, conquistas, memes de estudante... 🎓"
          style={{ width: "100%", minHeight: 100, border: "none", fontSize: 16, resize: "none", outline: "none", color: "#333", lineHeight: 1.6, boxSizing: "border-box", fontFamily: "inherit" }}
        />

        {/* Preview de mídia */}
        {loading && <div style={{ textAlign: "center", padding: 16, color: "#888" }}>Carregando mídia... ⏳</div>}
        {imageData && !loading && (
          <div style={{ position: "relative", marginBottom: 12 }}>
            <img src={imageData} alt="Preview" style={{ width: "100%", borderRadius: 12, maxHeight: 250, objectFit: "cover" }} />
            <button onClick={removeMedia} style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%", width: 30, height: 30, color: "white", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>
        )}
        {videoData && !loading && (
          <div style={{ position: "relative", marginBottom: 12 }}>
            <video src={videoData} controls style={{ width: "100%", borderRadius: 12, maxHeight: 220 }} />
            <button onClick={removeMedia} style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%", width: 30, height: 30, color: "white", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>
        )}

        <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 14, marginTop: 8 }}>
          <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, color: "#888" }}>Adicionar à publicação:</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => { fileRef.current.accept = "image/*"; fileRef.current.click(); }} style={{ flex: 1, padding: "12px", border: "2px solid #e0e0e0", borderRadius: 12, background: "white", cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#555", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              🖼️ Foto
            </button>
            <button onClick={() => { fileRef.current.accept = "video/*"; fileRef.current.click(); }} style={{ flex: 1, padding: "12px", border: "2px solid #e0e0e0", borderRadius: 12, background: "white", cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#555", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              🎥 Vídeo
            </button>
          </div>
          <input ref={fileRef} type="file" style={{ display: "none" }} onChange={handleFile} />
        </div>

        <button onClick={handle} disabled={loading} style={{ width: "100%", padding: 16, background: loading ? "#ccc" : "linear-gradient(135deg, #2d6a4f, #40916c)", color: "white", border: "none", borderRadius: 14, fontSize: 16, fontWeight: 800, cursor: loading ? "default" : "pointer", marginTop: 16 }}>
          🚀 Publicar
        </button>
      </div>
    </div>
  );
}

// ─── AI TAB ───────────────────────────────────────────────────────────────────
function AITab({ messages, input, setInput, onSend, loading, endRef, user }) {
  const renderMsg = (text) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} style={{ fontWeight: 700, margin: "4px 0", color: "inherit" }}>{line.slice(2, -2)}</p>;
      if (line.startsWith("- ")) return <li key={i} style={{ margin: "2px 0 2px 12px", fontSize: 14 }}>{line.slice(2).replace(/\*\*(.*?)\*\*/g, (_, t) => t)}</li>;
      if (line === "") return <br key={i} />;
      const processed = line.replace(/\*\*(.*?)\*\*/g, (_, t) => `<strong>${t}</strong>`);
      return <p key={i} style={{ margin: "3px 0", fontSize: 14, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  };

  const suggestions = [
    "Me explica equação do 2º grau",
    "Como funciona a fotossíntese?",
    "Me dê dicas para a redação do ENEM",
    "O que foi a Revolução Francesa?",
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg, #1b4332, #2d6a4f)", padding: "12px 16px", color: "white", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 34 }}>🤖</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>Tutor IA StudyVerse</div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>✅ Online • Especialista em todas as matérias</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 10, flexDirection: m.role === "user" ? "row-reverse" : "row", alignItems: "flex-end" }}>
            {m.role === "assistant" && <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#1b4332,#40916c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🤖</div>}
            {m.role === "user" && <div style={{ width: 32, height: 32, borderRadius: "50%", background: user.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{user.avatar}</div>}
            <div style={{ maxWidth: "82%", background: m.role === "user" ? "linear-gradient(135deg,#2d6a4f,#40916c)" : "white", color: m.role === "user" ? "white" : "#333", padding: "12px 16px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", fontSize: 14, lineHeight: 1.6, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              {m.role === "assistant" ? renderMsg(m.content) : m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#1b4332,#40916c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🤖</div>
            <div style={{ background: "white", padding: "16px 20px", borderRadius: "18px 18px 18px 4px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "flex", gap: 6 }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#2d6a4f", animation: `bounce2 0.8s ${i * 0.15}s ease-in-out infinite` }} />)}
              </div>
            </div>
          </div>
        )}
        {messages.length === 1 && !loading && (
          <div style={{ marginTop: 4 }}>
            <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 8px", textAlign: "center" }}>Sugestões para começar:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => { setInput(s); }} style={{ padding: "8px 14px", background: "white", border: "1.5px solid #2d6a4f", borderRadius: 20, fontSize: 12, color: "#2d6a4f", fontWeight: 600, cursor: "pointer" }}>{s}</button>
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
        <style>{`@keyframes bounce2{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
      </div>

      <div style={{ background: "white", borderTop: "1px solid #eee", padding: 12, display: "flex", gap: 10, flexShrink: 0 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && onSend()} placeholder="Pergunte qualquer coisa sobre seus estudos..." style={{ flex: 1, padding: "12px 16px", border: "2px solid #e0e0e0", borderRadius: 24, fontSize: 14, outline: "none" }} onFocus={e => e.target.style.borderColor = "#2d6a4f"} onBlur={e => e.target.style.borderColor = "#e0e0e0"} />
        <button onClick={onSend} disabled={loading || !input.trim()} style={{ width: 46, height: 46, borderRadius: "50%", background: input.trim() && !loading ? "linear-gradient(135deg,#2d6a4f,#40916c)" : "#e0e0e0", border: "none", color: "white", fontSize: 20, cursor: input.trim() && !loading ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>➤</button>
      </div>
    </div>
  );
}

// ─── APOSTILAS TAB ────────────────────────────────────────────────────────────
function ApostilasTab({ apostilas, filter, anos, onFilter, onSelect }) {
  const materias = [...new Set(APOSTILAS.map(a => a.materia))];
  const [materiaFilter, setMateriaFilter] = useState("Todas");
  const final = apostilas.filter(a => materiaFilter === "Todas" || a.materia === materiaFilter);
  const mats = ["Todas", ...materias];

  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      <div style={{ padding: "12px 12px 0" }}>
        <div style={{ background: "linear-gradient(135deg,#1b4332,#2d6a4f)", borderRadius: 16, padding: 16, color: "white", marginBottom: 12 }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800 }}>📖 Apostilas Completas</h3>
          <p style={{ margin: 0, fontSize: 13, opacity: 0.85 }}>{APOSTILAS.length} apostilas • 6º Ano ao 3º EM</p>
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 8 }}>
          {anos.map(a => (
            <button key={a} onClick={() => { onFilter(a); setMateriaFilter("Todas"); }} style={{ whiteSpace: "nowrap", padding: "7px 14px", borderRadius: 20, border: "none", background: filter === a ? "#2d6a4f" : "white", color: filter === a ? "white" : "#555", fontWeight: 700, cursor: "pointer", fontSize: 13, boxShadow: "0 2px 6px rgba(0,0,0,0.08)", flexShrink: 0 }}>{a}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
          {mats.map(m => (
            <button key={m} onClick={() => setMateriaFilter(m)} style={{ whiteSpace: "nowrap", padding: "6px 12px", borderRadius: 20, border: "none", background: materiaFilter === m ? "#40916c" : "#f0f4f0", color: materiaFilter === m ? "white" : "#555", fontWeight: 600, cursor: "pointer", fontSize: 12, flexShrink: 0 }}>{m}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 12px 20px" }}>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 10 }}>{final.length} apostila{final.length !== 1 ? "s" : ""} encontrada{final.length !== 1 ? "s" : ""}</p>
        {final.map(a => {
          const icons = { Matemática: "📐", Português: "📝", História: "🏛️", Ciências: "🔬", Geografia: "🌍", Física: "⚡", Química: "⚗️", Biologia: "🧬", Filosofia: "🤔" };
          return (
            <div key={a.id} onClick={() => onSelect(a)} style={{ background: "white", borderRadius: 14, padding: 16, marginBottom: 10, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", gap: 14, alignItems: "center", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.transform = "translateY(-1px)"} onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: "linear-gradient(135deg,#1b4332,#40916c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{icons[a.materia] || "📚"}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2d6a4f", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{a.materia} • {a.ano}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#222", marginBottom: 4 }}>{a.titulo}</div>
                <div style={{ fontSize: 12, color: "#888" }}>Toque para ler o conteúdo completo →</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── APOSTILA MODAL ───────────────────────────────────────────────────────────
function ApostilaModal({ apostila, onClose }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", flexDirection: "column" }} onClick={onClose}>
      <div style={{ flex: 1, background: "white", margin: "20px 0 0", borderRadius: "24px 24px 0 0", display: "flex", flexDirection: "column", overflow: "hidden" }} onClick={e => e.stopPropagation()}>
        <div style={{ background: "linear-gradient(135deg,#1b4332,#2d6a4f)", padding: "20px 20px 16px", color: "white", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>{apostila.materia} • {apostila.ano}</div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900, lineHeight: 1.2 }}>{apostila.titulo}</h2>
            </div>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 36, height: 36, color: "white", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          <ApostilaRenderer content={apostila.conteudo} />
        </div>
      </div>
    </div>
  );
}

function ApostilaRenderer({ content }) {
  const lines = content.split("\n");
  return (
    <div style={{ lineHeight: 1.7, color: "#333" }}>
      {lines.map((line, i) => {
        if (line.startsWith("# ")) return <h1 key={i} style={{ fontSize: 22, fontWeight: 900, color: "#1b4332", margin: "0 0 14px", borderBottom: "3px solid #40916c", paddingBottom: 8 }}>{line.slice(2)}</h1>;
        if (line.startsWith("## ")) return <h2 key={i} style={{ fontSize: 17, fontWeight: 800, color: "#2d6a4f", margin: "18px 0 8px" }}>{line.slice(3)}</h2>;
        if (line.startsWith("### ")) return <h3 key={i} style={{ fontSize: 15, fontWeight: 700, color: "#40916c", margin: "12px 0 5px" }}>{line.slice(4)}</h3>;
        if (line.startsWith("- ")) return <li key={i} style={{ margin: "4px 0 4px 16px", fontSize: 14 }}>{line.slice(2).replace(/\*\*(.*?)\*\*/g, (_, t) => t)}</li>;
        if (line.startsWith("|")) {
          const cells = line.split("|").filter(c => c.trim() && !c.trim().match(/^[-]+$/));
          if (cells.length > 0) return <div key={i} style={{ display: "flex", gap: 0, fontSize: 13 }}>{cells.map((c, j) => <div key={j} style={{ flex: 1, padding: "8px 10px", background: i % 2 === 0 ? "#f0f7f0" : "white", border: "1px solid #ddd" }}>{c.trim().replace(/\*\*(.*?)\*\*/g, (_, t) => t)}</div>)}</div>;
        }
        if (line.startsWith("```") || line === "") return <br key={i} />;
        return <p key={i} style={{ margin: "5px 0", fontSize: 14 }}>{line.replace(/\*\*(.*?)\*\*/g, (_, t) => t)}</p>;
      })}
    </div>
  );
}

// ─── COMUNIDADES TAB ──────────────────────────────────────────────────────────
function ComunidadesTab({ communities, joined, onJoin, posts, onCreatePost }) {
  const communityPosts = posts.filter(p => joined.length > 0).slice(0, 5);

  return (
    <div style={{ height: "100%", overflowY: "auto", padding: 12 }}>
      <div style={{ background: "linear-gradient(135deg,#1b4332,#2d6a4f)", borderRadius: 16, padding: 16, color: "white", marginBottom: 14 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800 }}>👥 Grupos de Estudo</h3>
        <p style={{ margin: 0, fontSize: 13, opacity: 0.85 }}>Entre em grupos e compartilhe conhecimento com seus colegas</p>
      </div>

      <button onClick={onCreatePost} style={{ width: "100%", background: "white", border: "2px solid #2d6a4f", borderRadius: 14, padding: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", marginBottom: 14, fontWeight: 700, color: "#2d6a4f", fontSize: 15 }}>
        ✏️ Publicar no Feed
      </button>

      <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, color: "#666" }}>Grupos disponíveis:</p>
      {communities.map(c => {
        const isJoined = joined.includes(c.id);
        return (
          <div key={c.id} style={{ background: "white", borderRadius: 16, padding: 16, marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#e8f5e9,#c8e6c9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{c.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: "#222" }}>{c.nome}</div>
                <div style={{ fontSize: 12, color: "#888", margin: "3px 0" }}>{c.descricao}</div>
                {isJoined && <div style={{ fontSize: 12, color: "#2d6a4f", fontWeight: 700 }}>✓ Você é membro</div>}
              </div>
              <button onClick={() => onJoin(c.id)} style={{ padding: "9px 16px", borderRadius: 20, border: isJoined ? "2px solid #2d6a4f" : "none", background: isJoined ? "white" : "linear-gradient(135deg,#2d6a4f,#40916c)", color: isJoined ? "#2d6a4f" : "white", fontWeight: 800, cursor: "pointer", fontSize: 13, flexShrink: 0 }}>
                {isJoined ? "✓ Membro" : "+ Entrar"}
              </button>
            </div>
          </div>
        );
      })}

      {communityPosts.length > 0 && (
        <>
          <h3 style={{ margin: "16px 0 10px", fontSize: 15, fontWeight: 800, color: "#1b4332" }}>📌 Publicações recentes dos seus grupos</h3>
          {communityPosts.map(post => (
            <div key={post.id} style={{ background: "white", borderRadius: 14, padding: 14, marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: post.user.color || "#2d6a4f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{post.user.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{post.user.name}</div>
                  <div style={{ fontSize: 11, color: "#999" }}>{post.user.grade} • {timeAgo(post.createdAt)}</div>
                </div>
              </div>
              {post.content && <p style={{ margin: 0, fontSize: 14, color: "#444", lineHeight: 1.5 }}>{post.content.substring(0, 180)}{post.content.length > 180 ? "..." : ""}</p>}
              <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 13, color: "#888" }}>
                <span>❤️ {post.likes.length}</span>
                <span>💬 {post.comments.length}</span>
              </div>
            </div>
          ))}
        </>
      )}

      {joined.length === 0 && (
        <div style={{ background: "#fffbe6", border: "1px solid #ffe066", borderRadius: 14, padding: 16, textAlign: "center", marginTop: 8 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>💡</div>
          <p style={{ margin: 0, fontSize: 13, color: "#666" }}>Entre em um grupo para ver publicações dos seus colegas aqui!</p>
        </div>
      )}
      <div style={{ height: 20 }} />
    </div>
  );
}

// ─── PERFIL TAB ───────────────────────────────────────────────────────────────
function PerfilTab({ user, posts, joinedCommunities, onLogout }) {
  const myPosts = posts.filter(p => p.user.id === user?.id);
  const totalLikes = myPosts.reduce((s, p) => s + p.likes.length, 0);

  const stats = [
    { icon: "📝", label: "Posts", value: myPosts.length },
    { icon: "❤️", label: "Curtidas", value: totalLikes },
    { icon: "👥", label: "Grupos", value: joinedCommunities.length },
    { icon: "📖", label: "Apostilas", value: APOSTILAS.length },
  ];

  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      <div style={{ background: "linear-gradient(135deg,#1b4332,#2d6a4f,#40916c)", padding: "32px 20px 48px", color: "white", textAlign: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: user?.color || "#40916c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, margin: "0 auto 12px", border: "3px solid rgba(255,255,255,0.5)" }}>{user?.avatar}</div>
        <h2 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 900 }}>{user?.name}</h2>
        <p style={{ margin: 0, opacity: 0.85, fontSize: 15 }}>🎓 {user?.grade} • Estudante StudyVerse</p>
        <p style={{ margin: "4px 0 0", opacity: 0.65, fontSize: 12 }}>{user?.email}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "16px 12px", marginTop: -20 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "white", borderRadius: 16, padding: 16, textAlign: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#1b4332" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 12px 12px" }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 800, color: "#1b4332" }}>📋 Minhas Publicações</h3>
        {myPosts.length === 0 ? (
          <div style={{ background: "white", borderRadius: 16, padding: 32, textAlign: "center", color: "#999" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📝</div>
            <p style={{ margin: 0, fontSize: 14 }}>Você ainda não publicou nada. Compartilhe algo com a comunidade!</p>
          </div>
        ) : myPosts.map(post => (
          <div key={post.id} style={{ background: "white", borderRadius: 14, padding: 14, marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
            {post.content && <p style={{ margin: "0 0 10px", fontSize: 14, color: "#333", lineHeight: 1.5 }}>{post.content}</p>}
            {post.imageData && <img src={post.imageData} alt="" style={{ width: "100%", borderRadius: 10, marginBottom: 10, maxHeight: 200, objectFit: "cover" }} />}
            {post.videoData && <video src={post.videoData} controls style={{ width: "100%", borderRadius: 10, marginBottom: 10, maxHeight: 180 }} />}
            <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#888" }}>
              <span>❤️ {post.likes.length}</span>
              <span>💬 {post.comments.length}</span>
              <span style={{ marginLeft: "auto" }}>{timeAgo(post.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 12px 24px" }}>
        <button onClick={onLogout} style={{ width: "100%", padding: 14, background: "white", border: "2px solid #dc2626", borderRadius: 14, color: "#dc2626", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
          🚪 Sair da conta
        </button>
      </div>
    </div>
  );
}

