import { Project, LayoutVariant } from '../types';

export const projectsData: Project[] = [
  {
    slug: 'svg-downloader',
    number: '01',
    type: 'ASSET REGISTRY',
    title: {
      en: 'svg-downloader / asset registry',
      fr: 'svg-downloader / registre d’actifs svg',
      ja: 'svg-downloader / svgアセットレジストリ',
      de: 'svg-downloader / svg-asset-register',
      zh: 'svg-downloader / 多源svg资产检索库',
      ru: 'svg-downloader / реестр svg-ассетов',
    },
    eyebrow: {
      en: 'Verified Multi-Source Brand & Technology SVG Asset Registry',
      fr: 'Registre d’actifs SVG multi-sources vérifié pour marques & technologies',
      ja: '検証済みマルチソース ブランド＆技術SVGアセットレジストリ',
      de: 'Verifiziertes Multi-Source Marken- & Technologie-SVG-Asset-Register',
      zh: '多源技术与品牌 SVG 矢量资产验证检索系统',
      ru: 'Верифицированный мульти-источниковый реестр SVG-ассетов брендов и технологий',
    },
    summary: {
      en: 'Multi-source SVG discovery, identity resolution, trusted source catalogs, and cryptographic SHA-256 integrity verification.',
      fr: 'Découverte SVG multi-sources, résolution d’identité, catalogues de sources fiables et vérification d’intégrité SHA-256.',
      ja: 'マルチソースSVG探索、識別子解決、信頼できるソースカタログ、および暗号学的SHA-256整合性検証。',
      de: 'Multi-Source SVG-Erkennung, Identitätsauflösung, vertrauenswürdige Quellkataloge und kryptografische SHA-256-Integritätsprüfung.',
      zh: '多源矢量发现、身份唯一性解析、权威源比对及 SHA-256 密码学完整性校验。',
      ru: 'Мульти-источниковый поиск SVG, разрешение идентификаторов, каталоги проверенных источников и проверка целостности SHA-256.',
    },
    description: {
      en: 'A specialized developer tool and asset registry engineered for discovering, resolving, and downloading verified brand and technology vectors. Connects to trusted source catalogs (Simple Icons, Devicon, Iconify) with automated XML validation, SHA-256 checksum integrity verification, source provenance inspection, and custom export bundles.',
      fr: 'Un outil pour développeurs et registre d’actifs conçu pour découvrir, résoudre et exporter des vecteurs SVG de marques et technologies. Connecté à des catalogues de confiance (Simple Icons, Devicon, Iconify) avec validation XML, somme de contrôle SHA-256 et lots d’ingénierie.',
      ja: 'ブランドおよび技術スタックの検証済みベクター素材を探索・解決・ダウンロードするための開発者ツール兼アセットレジストリ。Simple Icons、Devicon、Iconify等の信頼できるカタログに接続し、自動XML検証、SHA-256チェックサム検証、来歴検査、カスタムZIP書き出しを提供。',
      de: 'Ein spezialisiertes Entwicklerwerkzeug und Asset-Register zur Entdeckung, Auflösung und zum Download verifizierter Marken- und Technologie-Vektoren. Verknüpft Simple Icons, Devicon und Iconify mit XML-Validierung, SHA-256-Prüfsummen und Export-Bundles.',
      zh: '专为现代开发工作流打造的品牌与技术 SVG 矢量资产检索注册系统。接入 Simple Icons、Devicon、Iconify 权威开源源库，提供自动化 XML 解析校验、SHA-256 散列完整性验真、数据溯源比对以及多格式批量工程打包。',
      ru: 'Специализированный инструмент разработчика и реестр ассетов для поиска, разрешения и загрузки проверенных векторных логотипов брендов и технологий. Поддерживает каталоги Simple Icons, Devicon, Iconify, валидацию XML, сверку SHA-256 и экспортные пакеты.',
    },
    category: 'Tools',
    tags: ['SVG', 'Asset Registry', 'SHA-256', 'Developer Tools', 'Iconify', 'Devicon', 'Simple Icons'],
    year: '2025',
    status: 'Live',
    featured: true,
    colSpanDesktop: 'lg:col-span-12',
    aspectRatio: 'aspect-[21/10]',
    pigmentAccent: 'cool',
    visualMode: 'interface',
    watercolorVariant: 'cool',
    watercolorIntensity: 'medium',
    layoutVariant: 'lead-7',
    previewUrl: 'svg-downloader-tau.vercel.app',
    handwrittenNote: {
      en: 'sha-256 verified registry v1.2',
      fr: 'registre vérifié sha-256 v1.2',
      ja: 'sha-256検証済みレジストリ v1.2',
      de: 'sha-256 verifiziertes register v1.2',
      zh: 'sha-256 完整性验真系统 v1.2',
      ru: 'проверенный реестр sha-256 v1.2',
    },
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85',
    role: {
      en: 'Creator & Frontend Systems Engineer',
      fr: 'Créateur & ingénieur systèmes front-end',
      ja: '作者・フロントエンドシステムエンジニア',
      de: 'Entwickler & Frontend-Systemingenieur',
      zh: '创作者与前端系统工程师',
      ru: 'Создатель и фронтенд-инженер систем',
    },
    tools: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Motion',
      'Simple Icons',
      'Devicon',
      'Iconify',
      'Fast XML Parser',
      'JSZip',
      'Express',
      'Google GenAI',
    ],
    github: 'https://github.com/rockybuildingaiweb3-boop/svg-downloader',
    demo: 'https://svg-downloader-tau.vercel.app',
    detailedContent: {
      about: {
        en: 'Frontend developers frequently waste engineering time searching across scattered CDN repositories for brand and technology icons, only to discover inconsistent viewBox dimensions, mutated paths, or unverified licensing. SVG Downloader solves this by operating as a multi-source asset registry that unifies Simple Icons, Devicon, and Iconify into a single verified interface with cryptographic hash validation.',
        fr: 'Les développeurs frontend perdent souvent un temps précieux à chercher des icônes de technologies sur des dépôts CDN disparates. SVG Downloader résout ce problème en unifiant Simple Icons, Devicon et Iconify au sein d’une interface unique avec validation cryptographique.',
        ja: '開発者がブランドや技術ロゴを探す際、分散したCDNを巡り、歪んだviewBoxや不透明な来歴に直面することが頻繁にあります。SVG Downloaderは、Simple Icons、Devicon、Iconifyを統合し、暗号学的ハッシュ検証を備えた単一の検証済みアセットレジストリとしてこの課題を解決します。',
        de: 'Frontend-Entwickler verlieren oft Zeit bei der Suche nach konsistenten Marken- und Technologie-Icons. SVG Downloader vereint Simple Icons, Devicon und Iconify in einer verifizierten Oberfläche mit kryptografischer Hash-Validierung.',
        zh: '前端工程师在寻找技术栈与品牌 SVG 矢量时，常需穿梭于不同 CDN 与仓库，并面对不一致的 viewBox、失真的路径以及未经验证的来历。SVG Downloader 汇聚 Simple Icons、Devicon 与 Iconify，通过密码学校验提供权威统一检索。',
        ru: 'Фронтенд-разработчики часто тратят часы на поиск логотипов в разрозненных источниках. SVG Downloader объединяет Simple Icons, Devicon и Iconify в единый верифицированный интерфейс с криптографической проверкой хешей.',
      },
      designApproach: {
        en: [
          'Multi-source discovery & identity resolution across Simple Icons, Devicon, and Iconify catalogs.',
          'Automated SVG/XML tree validation using Fast XML Parser with real-time SHA-256 checksum calculation.',
          'Fidelity & variant comparison: monochrome, dark, light, and original vector paths side-by-side.',
          'Developer export pipeline: instant raw SVG code copy, individual download, and zipped engineering bundles with manifest.',
        ],
        fr: [
          'Découverte multi-sources et résolution d’identité à travers Simple Icons, Devicon et Iconify.',
          'Validation automatique de l’arbre SVG/XML avec calcul de somme de contrôle SHA-256 en direct.',
          'Comparaison de fidélité et de variantes : monochrome, sombre, clair et tracés originaux.',
          'Pipeline d’exportation développeur : copie instantanée du code SVG, téléchargement unitaire et archives ZIP avec manifeste.',
        ],
        ja: [
          'Simple Icons、Devicon、Iconifyカタログを横断したマルチソース探索と識別子解決。',
          'Fast XML ParserによるSVG/XML構造の自動検証とリアルタイムSHA-256チェックサム算出。',
          '再現性とバリエーション比較：モノクロ、ダーク、ライト、オリジナルパスの並列プレビュー。',
          '開発者向け出力パイプライン：SVGコード即時コピー、単体保存、マニフェスト付きZIPバンドル生成。',
        ],
        de: [
          'Multi-Source-Erkennung und Identitätsauflösung über Simple Icons, Devicon und Iconify.',
          'Automatische SVG/XML-Strukturvalidierung mit Echtzeit-SHA-256-Prüfsummenberechnung.',
          'Fidelity- & Variantenvergleich: Monochrom-, Dunkel-, Hell- und Originalpfade im direkten Vergleich.',
          'Entwickler-Export-Pipeline: Sofortiges Kopieren von SVG-Code, Einzndownload und gezippte Bundles.',
        ],
        zh: [
          '横跨 Simple Icons、Devicon 与 Iconify 权威开源库的多源矢量发现与唯一身份标识解析。',
          '基于 Fast XML Parser 的 SVG/XML 语法树自动校验与实时 SHA-256 密码学散列验真。',
          '精度与变体对比系统：单色、暗色、亮色及原生矢量路径并排比对。',
          '工程化输出管道：原生 SVG 代码一键复制、单文件下载及包含元数据清单的 ZIP 打包。',
        ],
        ru: [
          'Мульти-источниковый поиск и разрешение идентификаторов по каталогам Simple Icons, Devicon и Iconify.',
          'Автоматическая валидация дерева SVG/XML с вычислением контрольной суммы SHA-256 в реальном времени.',
          'Сравнение вариантов: монохромные, светлые, темные и оригинальные векторные контуры.',
          'Экспорт для разработчиков: копирование сырого SVG, прямая загрузка и zip-архивы с манифестом.',
        ],
      },
      visuals: [],
      editorialQuote: {
        en: 'The interface itself is the artwork: pure typography, verified provenance, and deterministic asset fidelity.',
        fr: 'L’interface elle-même est l’œuvre : typographie pure, provenance vérifiée et fidélité déterministe des actifs.',
        ja: 'インターフェースそのものが作品：純粋なタイポグラフィ、検証された来歴、そして確定的アセット再現性。',
        de: 'Die Oberfläche selbst ist das Kunstwerk: reine Typografie, verifizierte Provenienz und deterministische Wiedergabetreue.',
        zh: '界面本身即是艺术：纯粹的版式、权威的溯源与确定性的资产高保真呈现。',
        ru: 'Сам интерфейс является арт-объектом: чистая типографика, подтвержденное происхождение и точность ассетов.',
      },
      quoteAuthor: {
        en: 'Rocky Babcock, Repository Notes',
        fr: 'Rocky Babcock, Notes de dépôt',
        ja: 'ロッキー・バブコック、リポジトリ覚書',
        de: 'Rocky Babcock, Repository-Notizen',
        zh: 'Rocky Babcock，仓库架构手记',
        ru: 'Рокки Бэбкок, Заметки репозитория',
      },
      colophon: {
        typography: 'JetBrains Mono & Cormorant Garamond',
        materials: {
          en: 'TypeScript, Fast XML Parser, Iconify API, Cryptographic Buffer',
          fr: 'TypeScript, Fast XML Parser, API Iconify, tampon cryptographique',
          ja: 'TypeScript, Fast XML Parser, Iconify API, 暗号学的バッファ',
          de: 'TypeScript, Fast XML Parser, Iconify API, Kryptografischer Puffer',
          zh: 'TypeScript, Fast XML Parser, Iconify API, 密码学二进制缓冲',
          ru: 'TypeScript, Fast XML Parser, Iconify API, криптографический буфер',
        },
        release: 'v1.2 Production',
      },
    },
  },
  {
    slug: 'rockyhomepage3D',
    number: '02',
    type: 'SPATIAL 3D WEB',
    title: {
      en: 'rockyhomepage3D / spatial frontend',
      fr: 'rockyhomepage3D / front-end spatial',
      ja: 'rockyhomepage3D / 空間フロントエンド',
      de: 'rockyhomepage3D / räumliches frontend',
      zh: 'rockyhomepage3D / 三维空间体验前端',
      ru: 'rockyhomepage3D / пространственный фронтенд',
    },
    eyebrow: {
      en: 'Spatial Web Portfolio & Interactive 3D Experience',
      fr: 'Portfolio web spatial & expérience 3D interactive',
      ja: '空間ウェブポートフォリオ・インタラクティブ3D体験',
      de: 'Räumliches Web-Portfolio & Interaktive 3D-Erfahrung',
      zh: '交互式三维空间体验与沉浸式个人工作台',
      ru: 'Пространственное веб-портфолио и интерактивный 3D-опыт',
    },
    summary: {
      en: 'An interactive 3D spatial experience built with Three.js and React Three Fiber featuring realtime lighting, smooth camera controls, and spatial navigation.',
      fr: 'Une expérience spatiale 3D interactive conçue avec Three.js et React Three Fiber, avec éclairage en temps réel et navigation spatiale.',
      ja: 'Three.jsとReact Three Fiberで構築された対話型3D空間体験。リアルタイムライティング、滑らかなカメラワーク、空間ルーティングを実装。',
      de: 'Eine interaktive räumliche 3D-Erfahrung mit Three.js und React Three Fiber mit Echtzeitbeleuchtung und geschmeidiger Kamerasteuerung.',
      zh: '基于 Three.js 与 React Three Fiber 打造的交互式三维空间体验，具备实时动态光照、惯性摄像机控制与空间化页面路由。',
      ru: 'Интерактивный пространственный 3D-опыт на базе Three.js и React Three Fiber с освещением в реальном времени и пространственной навигацией.',
    },
    description: {
      en: 'A spatial frontend artifact exploring interactive 3D web graphics, created by AI and Adrian Hajdin. Built with Three.js, React Three Fiber, and Drei, the application features an explorable 3D scene with dynamic lighting, smooth camera choreography, pointer-driven inertia, and dedicated spatial routes for about, projects, and contact.',
      fr: 'Un artefact de front-end spatial explorant les graphismes 3D interactifs pour le web, créé par IA et Adrian Hajdin. Conçu avec Three.js, React Three Fiber et Drei, il propose une scène 3D explorable avec chorégraphie de caméra et itinéraires spatiaux.',
      ja: 'AIとAdrian Hajdinによって構想された、ウェブにおける対話型3Dグラフィックスを探求する空間フロントエンド作品。Three.js、React Three Fiber、Dreiを用い、動的光源、カメラの慣性制御、About・Projects・Contactへと続く空間遷移を実装。',
      de: 'Ein räumliches Frontend-Artefakt zur Erforschung interaktiver 3D-Webgrafiken, erstellt von KI und Adrian Hajdin. Entwickelt mit Three.js, React Three Fiber und Drei mit explorierbarer 3D-Szene und räumlichen Routen.',
      zh: '由 AI 与 Adrian Hajdin 共同构想的前端三维空间技术实践。利用 Three.js、React Three Fiber 和 Drei 构建沉浸式 3D 场景，整合动态光影追踪、手势惯性转动，并在三维场景中串联 /、/about、/projects 与 /contact 空间路由。',
      ru: 'Пространственный фронтенд-артефакт интерактивной 3D-веб-графики, созданный с помощью ИИ и Адриана Хайдина. Построен на Three.js, React Three Fiber и Drei с исследуемой сценой и маршрутами.',
    },
    category: '3D',
    tags: ['Three.js', 'React Three Fiber', 'WebGL', 'Drei', 'React Spring Three', 'Spatial Audio', 'React Router'],
    year: '2024',
    status: 'Live',
    featured: true,
    colSpanDesktop: 'lg:col-span-12',
    aspectRatio: 'aspect-[21/10]',
    pigmentAccent: 'warm',
    visualMode: '3d-spatial',
    watercolorVariant: 'warm',
    watercolorIntensity: 'medium',
    layoutVariant: 'cinema-12',
    previewUrl: 'rockyhomepage3-d.vercel.app',
    handwrittenNote: {
      en: 'spatial camera choreography & r3f scene',
      fr: 'chorégraphie de caméra spatiale & scène r3f',
      ja: '空間カメラワーク＆r3fシーン',
      de: 'räumliche kamerachoreografie & r3f-szene',
      zh: 'r3f 空间摄像机编排与三维场景',
      ru: 'пространственная хореография камеры и сцена r3f',
    },
    cover: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=85',
    role: {
      en: 'Spatial Web Engineer & Creative Developer',
      fr: 'Ingénieur web spatial & développeur créatif',
      ja: '空間ウェブエンジニア・クリエイティブデベロッパー',
      de: 'Räumlicher Web-Entwickler & Creative Coder',
      zh: '三维空间前端工程师与创意开发者',
      ru: 'Разработчик пространственного веба и креативный кодер',
    },
    tools: [
      'React',
      'React Router',
      'React Three Fiber',
      'Three.js',
      'Drei',
      'React Spring Three',
      'Motion',
      'Google GenAI',
      'EmailJS',
    ],
    github: 'https://github.com/rockybuildingaiweb3-boop/rockyhomepage3D',
    demo: 'https://rockyhomepage3-d.vercel.app',
    detailedContent: {
      about: {
        en: 'Web pages have traditionally been constrained by two-dimensional planes of text boxes and cards. rockyhomepage3D challenges this orthodoxy by creating a spatial landscape where geometry, lighting, and camera inertia transform page navigation into an architectural walkthrough across discrete conceptual islands.',
        fr: 'Les pages web ont traditionnellement été confinées au plan bidimensionnel. rockyhomepage3D défie cette orthodoxie en créant un paysage spatial où la géométrie, l’éclairage et l’inertie de la caméra transforment la navigation en une déambulation architecturale.',
        ja: 'ウェブページは伝統的に2次元の平面に縛られてきました。rockyhomepage3Dはこの慣習に挑み、幾何学・ライティング・カメラの慣性を用いて、ページ遷移を島々を巡る建築的な散策へと昇華させます。',
        de: 'Webseiten waren traditionell auf zweidimensionale Flächen beschränkt. rockyhomepage3D bricht mit diesem Paradigma und schafft eine räumliche Landschaft, in der Geometrie und Licht die Navigation in einen architektonischen Rundgang verwandeln.',
        zh: '传统网页长期受限于二维平面。rockyhomepage3D 探索突破平面范式，依托立体几何造型、定向光源与惯性摄像机运动，将普通的页面跳转演进为穿梭于空间群岛之间的三维漫游体验。',
        ru: 'Веб-страницы долгое время оставались плоскими. rockyhomepage3D бросает вызов этому ограничению, создавая пространственный ландшафт с геометрией и светом, превращающий навигацию в архитектурную прогулку.',
      },
      designApproach: {
        en: [
          'Interactive 3D scene graph orchestration using Three.js and React Three Fiber with custom mesh materials.',
          'Choreographed camera paths with spring physics and damping for fluid spatial route transitions.',
          'Pointer-driven rotation and depth parallax responding directly to user cursor coordinates and touch gestures.',
          'Spatial application routing mapping standard web URLs (/, /about, /projects, /contact) directly to 3D viewpoints.',
        ],
        fr: [
          'Orchestration du graphe de scène 3D avec Three.js et React Three Fiber et matériaux de maillage personnalisés.',
          'Trajectoires de caméra chorégraphiées avec physique de ressorts pour des transitions d’itinéraires fluides.',
          'Rotation dirigée par le curseur et parallaxe de profondeur réagissant en temps réel.',
          'Routage applicatif spatial associant les URL standard (/, /about, /projects, /contact) à des points de vue 3D.',
        ],
        ja: [
          'Three.jsとReact Three Fiberによるカスタムメッシュマテリアルを備えた3Dシーングラフの制御。',
          '流麗な空間遷移を実現するスプリング物理演算とダンピングを用いたカメラ経路の振り付け。',
          'カーソル座標やタッチ操作にリアルタイムで連動するポインタ駆動の回転と深度パララックス。',
          '標準URL（/、/about、/projects、/contact）を3D空間の視点へと直結する空間ルーティング。',
        ],
        de: [
          '3D-Szenengraph-Orchestrierung mit Three.js und React Three Fiber mit benutzerdefinierten Mesh-Materialien.',
          'Choreografierte Kamerapfade mit Federphysik und Dämpfung für flüssige räumliche Übergänge.',
          'Zeigergesteuerte Rotation und Tiefen-Parallaxe, die direkt auf Cursor-Koordinaten reagieren.',
          'Räumliches Routing, das Standard-URLs (/, /about, /projects, /contact) direkt auf 3D-Blickwinkel abbildet.',
        ],
        zh: [
          '基于 Three.js 与 React Three Fiber 编排的三维场景图谱，配合自定义光照材质与低多边形网格。',
          '引入弹簧物理阻尼的摄像机运镜轨道，赋予路由切换细腻的空间位移与焦点推进。',
          '指针驱动的视角微偏与景深视差，实时响应鼠标悬停与触控拖拽。',
          '空间化路由映射：将传统 Web 路径（/、/about、/projects、/contact）无缝对齐至 3D 空间坐标。',
        ],
        ru: [
          'Оркестрация 3D-графа сцены на Three.js и React Three Fiber с кастомными материалами.',
          'Хореография движения камеры с пружинной физикой для плавных переходов между маршрутами.',
          'Интерактивное вращение и параллакс глубины, реагирующие на координаты курсора мыши.',
          'Пространственный роутинг, связывающий веб-адреса (/, /about, /projects, /contact) с ракурсами камеры.',
        ],
      },
      visuals: [],
      editorialQuote: {
        en: 'Spatial depth bridges digital abstraction and physical intuition: the viewport becomes an explorable environment rather than a static document.',
        fr: 'La profondeur spatiale comble le fossé entre abstraction numérique et intuition physique : le viewport devient un environnement explorable.',
        ja: '空間的深度はデジタルの抽象と身体的直感を架橋する：ビューポートは静的な文書から探検可能な環境へと変容する。',
        de: 'Räumliche Tiefe verbindet digitale Abstraktion mit physischer Intuition: Der Viewport wird zur explorierbaren Umgebung.',
        zh: '空间维度架起了数字抽象与物理直觉的桥梁：浏览器视口不再是冰冷的文档，而是一处可供探索的实体场域。',
        ru: 'Пространственная глубина объединяет цифровую абстракцию и физическую интуицию: вьюпорт становится исследуемой средой.',
      },
      quoteAuthor: {
        en: 'Rocky Babcock & Adrian Hajdin, 3D Architecture Notes',
        fr: 'Rocky Babcock & Adrian Hajdin, Notes d’architecture 3D',
        ja: 'ロッキー・バブコック ＆ Adrian Hajdin、3D空間設計覚書',
        de: 'Rocky Babcock & Adrian Hajdin, 3D-Architekturnotizen',
        zh: 'Rocky Babcock & Adrian Hajdin，3D空间架构笔记',
        ru: 'Рокки Бэбкок и Адриан Хайдин, Заметки о 3D-архитектуре',
      },
      colophon: {
        typography: 'Fraunces & JetBrains Mono',
        materials: {
          en: 'WebGL 2.0 Canvas, GLSL Mesh Shaders, React Three Fiber, Drei',
          fr: 'Canvas WebGL 2.0, shaders GLSL, React Three Fiber, Drei',
          ja: 'WebGL 2.0 Canvas, GLSL シェーダー, React Three Fiber, Drei',
          de: 'WebGL 2.0 Canvas, GLSL Shader, React Three Fiber, Drei',
          zh: 'WebGL 2.0 Canvas, GLSL 网格着色器, React Three Fiber, Drei',
          ru: 'Холст WebGL 2.0, шейдеры GLSL, React Three Fiber, Drei',
        },
        release: 'v1.0 Production Release',
      },
    },
  },
  {
    slug: 'melius-like',
    number: '03',
    type: 'AI PRODUCT CANVAS',
    title: {
      en: 'melius-like / ai creative canvas',
      fr: 'melius-like / canevas créatif d’ia',
      ja: 'melius-like / aiクリエイティブキャンバス',
      de: 'melius-like / ki-kreativfläche',
      zh: 'melius-like / 生成式ai多模态工作台',
      ru: 'melius-like / холст творческого ии',
    },
    eyebrow: {
      en: 'AI Creative Interface Study & Model Catalogue',
      fr: 'Étude d’interface créative pour IA & catalogue de modèles',
      ja: 'AIクリエイティブインターフェース研究・モデル目録',
      de: 'KI-Kreativ-Interface-Studie & Modellkatalog',
      zh: '生成式多模态模型圆柱形三维轮播与详情检视工作台',
      ru: 'Исследование интерфейса творческого ИИ и каталог моделей',
    },
    summary: {
      en: 'An AI creative interface prototype exploring cylindrical model carousels, multi-modal category filtering, and model detail transitions.',
      fr: 'Un prototype d’interface créative d’IA explorant un carrousel cylindrique de modèles, un filtrage multimodal et des transitions détaillées.',
      ja: '円柱形モデルカルーセル、マルチモーダル分類フィルター、詳細モーダル遷移を探求するAIクリエイティブインターフェース原型。',
      de: 'Ein KI-Kreativ-Interface-Prototyp zur Untersuchung zylindrischer Modell-Karusselle, multimodaler Filter und Detailübergänge.',
      zh: '探索圆柱三维透视轮播、多模态模型分类筛选（视频/图像/音频/动效）与模型参数深度抽屉的生成式 AI 交互原型。',
      ru: 'Прототип творческого интерфейса ИИ с цилиндрической каруселью моделей, мультимодальной фильтрацией и переходами в детализацию.',
    },
    description: {
      en: 'An experimental AI product canvas and interface study inspired by contemporary generative media suites. Features an interactive cylindrical 3D-perspective carousel showcasing generative AI models across video, image, audio, and motion categories with stateful model inspection drawers and filtering.',
      fr: 'Une étude expérimentale d’interface produit IA inspirée des suites de médias génératifs actuelles. Comprend un carrousel cylindrique en perspective 3D présentant des modèles IA génératifs dans les catégories vidéo, image, audio et mouvement.',
      ja: '現代の生成メディアツール群に着想を得た、実験的なAIプロダクトキャンバスおよびインターフェース研究。ビデオ、画像、音声、モーション各分野の生成AIモデルを立体的に俯瞰できる円柱3Dパースペクティブカルーセルと、詳細モーダルを実装。',
      de: 'Eine experimentelle KI-Produktfläche und Interfacestudie. Beinhaltet ein interaktives zylindrisches 3D-Karussell für generative KI-Modelle in Video-, Bild-, Audio- und Bewegungskategorien mit Detail-Drawern.',
      zh: '受当代多模态生成媒介系统启发的 AI 产品画布原型。核心交互为基于 CSS 3D 透视变换构建的圆柱形旋转轮播，聚合视频、图像、音频与动态运镜各模态模型，支持分类筛选、参数抽屉与模型详情浮层。',
      ru: 'Экспериментальный холст продукта ИИ и исследование интерфейсов генеративных медиа. Включает интерактивную цилиндрическую 3D-карусель моделей по категориям видео, изображений, аудио и моушна.',
    },
    category: 'AI',
    tags: ['AI Interface', 'Cylindrical Carousel', 'Multi-Modal', 'Motion', 'Vite', 'Tailwind CSS', 'Google GenAI'],
    year: '2024',
    status: 'Building',
    featured: true,
    colSpanDesktop: 'lg:col-span-12',
    aspectRatio: 'aspect-[21/10]',
    pigmentAccent: 'ochre',
    visualMode: 'ai-carousel',
    watercolorVariant: 'ochre',
    watercolorIntensity: 'medium',
    layoutVariant: 'offset-5',
    previewUrl: 'github.com/rockybuildingaiweb3-boop/melius-like',
    handwrittenNote: {
      en: 'cylindrical carousel & modal inspection',
      fr: 'carrousel cylindrique & inspection modale',
      ja: '円柱形カルーセル＆モーダル精査',
      de: 'zylindrisches karussell & modal-prüfung',
      zh: '圆柱透视轮播与模型参数模态抽屉',
      ru: 'цилиндрическая карусель и модальная инспекция',
    },
    cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=85',
    role: {
      en: 'Product Designer & Frontend Engineer',
      fr: 'Designer produit & ingénieur front-end',
      ja: 'プロダクトデザイナー・フロントエンドエンジニア',
      de: 'Produktdesigner & Frontend-Entwickler',
      zh: '产品设计师与前端开发工程师',
      ru: 'Продуктовый дизайнер и фронтенд-инженер',
    },
    tools: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Motion', 'Google GenAI'],
    github: 'https://github.com/rockybuildingaiweb3-boop/melius-like',
    detailedContent: {
      about: {
        en: 'Generative AI tools frequently overwhelm creators with chaotic lists of disconnected models and parameters. melius-like investigates how radial and cylindrical layout geometries can structure model discovery, giving users intuitive spatial cues to compare capabilities across video, image, audio, and motion synthesis models.',
        fr: 'Les outils d’IA générative submergent souvent les créateurs sous des listes chaotiques de modèles déconnectés. melius-like explore comment les géométries radiales et cylindriques peuvent structurer la découverte de modèles.',
        ja: '生成AIツールは、断片的なモデルやパラメータが乱立し、クリエイターを圧倒しがちです。melius-likeは、放射状および円柱状のレイアウト幾何学がモデル探索をどのように体系化できるかを探求し、ビデオ・画像・音声・モーションにわたる直感的な比較体験を設計しています。',
        de: 'Generative KI-Tools überfordern Kreative häufig mit unübersichtlichen Listen unzusammenhängender Modelle. melius-like untersucht, wie radiale und zylindrische Geometrien die Modellentdeckung strukturieren können.',
        zh: '生成式 AI 创作工具常常将纷杂的模型参数与功能入口粗暴堆叠。melius-like 重点探索如何借助径向圆柱透视几何来重塑模型发现体验，使用户在视频、图像、音频与运镜模态之间建立直观的空间比对感。',
        ru: 'Инструменты генеративного ИИ часто перегружают пользователей хаотичными списками. melius-like исследует, как радиальная и цилиндрическая геометрия помогает структурировать выбор моделей видео, изображений, звука и моушна.',
      },
      designApproach: {
        en: [
          'Cylindrical 3D model carousel: Perspective-transformed cards arranged radially with interactive drag, swipe, and rotation physics.',
          'Multi-modal model catalogue: Realtime category filtering across Video, Image, Audio, and Motion generation architectures.',
          'Model detail modal: Comprehensive inspection drawer featuring parameter specs, context lengths, and feature capability bars.',
          'Studio navigation ergonomics: Side menu drawer and authentication modal flows tailored for creator workspaces.',
        ],
        fr: [
          'Carrousel cylindrique de modèles 3D : Cartes avec transformation en perspective disposées radialement avec physique de glissement.',
          'Catalogue de modèles multimodaux : Filtrage par catégorie en temps réel sur les architectures Vidéo, Image, Audio et Mouvement.',
          'Modale de détail de modèle : Tiroir d’inspection complet avec spécifications de paramètres et barres de capacités.',
          'Ergonomie de navigation de studio : Tiroir de menu latéral et flux d’authentification adaptés aux espaces de travail de créateurs.',
        ],
        ja: [
          '円柱形3Dモデルカルーセル：ドラッグ＆スワイプに連動する物理演算を備えた放射状パースペクティブカード配置。',
          'マルチモーダルモデルカタログ：Video、Image、Audio、Motion各生成アーキテクチャのリアルタイム分類フィルター。',
          'モデル詳細モーダル：パラメータ仕様、コンテキスト長、機能評価バーを備えた包括的インスペクター。',
          'スタジオ操作性：クリエイターの集中を妨げないサイドメニューおよび認証モーダルフロー。',
        ],
        de: [
          'Zylindrisches 3D-Modell-Karussell: Perspektivisch transformierte Karten radial angeordnet mit intuitiver Wischphysik.',
          'Multimodaler Modellkatalog: Echtzeit-Kategoriefilterung über Video-, Bild-, Audio- und Bewegungsarchitekturen.',
          'Modell-Detail-Modal: Umfassende Spezifikationen, Kontextlängen und Funktionsleisten.',
          'Studio-Navigation: Seitenmenü und Authentifizierungsabläufe für kreative Arbeitsumgebungen.',
        ],
        zh: [
          '圆柱 3D 透视模型轮播：采用 CSS 3D 矩阵径向排布卡片，支持流畅的鼠标拖拽、滑动与旋转物理惯性。',
          '多模态模型分类系统：在视频（Video）、图像（Image）、音频（Audio）与运镜动效（Motion）之间实时筛选。',
          '模型详情抽屉浮层：包含模型拓扑参数、上下文视窗规格与功能特性评估进度条的细致检视面板。',
          '创作者工作流人体工学：配备折叠式侧栏菜单抽屉与平滑呼出的身份验证弹窗。',
        ],
        ru: [
          'Цилиндрическая 3D-карусель моделей: Радиально расположенные карточки с перспективой и физикой свайпа.',
          'Мультимодальный каталог: Фильтрация в реальном времени по категориям Video, Image, Audio и Motion.',
          'Модальное окно инспекции модели: Полные спецификации параметров, длина контекста и индикаторы возможностей.',
          'Эргономика студии: Боковое меню и модальные окна авторизации для креативных рабочих процессов.',
        ],
      },
      visuals: [],
      editorialQuote: {
        en: 'Interface layout should reflect cognitive hierarchy: rotating models in spatial radius invites continuous multi-modal exploration.',
        fr: 'La disposition de l’interface doit refléter la hiérarchie cognitive : la rotation radiale des modèles invite à une exploration fluide.',
        ja: '界面の配置は認知の階層を反映すべきである：空間的な円柱半径に沿ってモデルを巡らせることで、自然な探求が生まれる。',
        de: 'Das Interface-Layout sollte die kognitive Hierarchie widerspiegeln: Die Drehung von Modellen im räumlichen Radius lädt zur Erkundung ein.',
        zh: '界面布局应当映射认知层级：将模型沿空间半径旋转排布，赋予连续且富有探索欲的多模态审阅体验。',
        ru: 'Интерфейс должен отражать структуру восприятия: вращение моделей по кругу вдохновляет на исследование.',
      },
      quoteAuthor: {
        en: 'Rocky Babcock, Interface Study Notes',
        fr: 'Rocky Babcock, Notes d’étude d’interface',
        ja: 'ロッキー・バブコック、UIプロトタイプ研究覚書',
        de: 'Rocky Babcock, Interface-Studiennotizen',
        zh: 'Rocky Babcock，界面原型研习笔记',
        ru: 'Рокки Бэбкок, Заметки об интерфейсе',
      },
      colophon: {
        typography: 'Fraunces & JetBrains Mono',
        materials: {
          en: 'CSS 3D Transforms, Motion Engine, React 19, Tailwind CSS',
          fr: 'Transformations CSS 3D, moteur Motion, React 19, Tailwind CSS',
          ja: 'CSS 3D Transform, Motion Engine, React 19, Tailwind CSS',
          de: 'CSS 3D-Transformationen, Motion Engine, React 19, Tailwind CSS',
          zh: 'CSS 3D 矩阵变换, Motion 动效引擎, React 19, Tailwind CSS',
          ru: 'CSS 3D-трансформации, движок Motion, React 19, Tailwind CSS',
        },
        release: 'Prototype Exploration',
      },
    },
  },
];

export const getProjectLayout = (
  project: Project,
  index: number
): {
  variant: LayoutVariant;
  colSpanDesktop: string;
  aspectRatio: string;
  offsetMargin?: string;
} => {
  const cadence: { variant: LayoutVariant; colSpanDesktop: string; aspectRatio: string }[] = [
    { variant: 'lead-7', colSpanDesktop: 'lg:col-span-12', aspectRatio: 'aspect-[21/10]' },
    { variant: 'cinema-12', colSpanDesktop: 'lg:col-span-12', aspectRatio: 'aspect-[21/10]' },
    { variant: 'offset-5', colSpanDesktop: 'lg:col-span-12', aspectRatio: 'aspect-[21/10]' },
  ];

  if (project?.layoutVariant) {
    const defaultCol = 'lg:col-span-12';
    return {
      variant: project.layoutVariant,
      colSpanDesktop: project.colSpanDesktop || defaultCol,
      aspectRatio: project.aspectRatio || 'aspect-[21/10]',
      offsetMargin: project.offsetMargin,
    };
  }

  return cadence[index % cadence.length];
};

export const getDynamicLayout = (
  project: Project,
  index: number,
  _total?: number
) => getProjectLayout(project, index);

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projectsData.find((p) => p.slug === slug);
};

export const getNextProject = (currentSlug: string): Project => {
  const currentIndex = projectsData.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === projectsData.length - 1) {
    return projectsData[0];
  }
  return projectsData[currentIndex + 1];
};

export const getPreviousProject = (currentSlug: string): Project => {
  const currentIndex = projectsData.findIndex((p) => p.slug === currentSlug);
  if (currentIndex <= 0) {
    return projectsData[projectsData.length - 1];
  }
  return projectsData[currentIndex - 1];
};
