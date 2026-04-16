/* ──────────────────────────────────────────────
   Promosat Data Proxy — content.js
   All copy, assets, and config extracted from
   the live Wix site. Future: swap to @wix/sdk
   ────────────────────────────────────────────── */

export const siteConfig = {
  name: 'Promosat de México',
  tagline: 'Espacios publicitarios en radio',
  phone: '+52 55-5250-8990',
  email: 'ventas@promosat.com',
  whatsapp: 'https://wa.me/525552508990',
  whatsappFloat: 'https://wa.me/525552508990',
  logo: 'https://static.wixstatic.com/media/45119e_dc54ee4be0d24a10aa39ca8da607c80c~mv2.png/v1/crop/x_153,y_98,w_523,h_473/fill/w_200,h_180,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/PROMOSAT%20DE%20M%C3%89XICO-01.png',
  logoWhite: 'https://static.wixstatic.com/media/45119e_3c68ef573a2748c88e4cc8760aaee02f~mv2.png/v1/crop/x_105,y_75,w_607,h_687/fill/w_200,h_226,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/PROMOSAT%20DE%20M%C3%89XICO-02.png',
  social: {
    linkedin: 'https://www.linkedin.com/in/eduardo-bedolla-093479b/',
    facebook: 'https://www.facebook.com/pages/Promosat-de-M%C3%A9xico-SA-de-CV/1530178120645929',
  },
};

export const navLinks = [
  { label: 'Nosotros', href: '/#about' },
  { label: 'Emisoras', href: '/#cobertura' },
  { label: 'Canal Continental', href: '/canal-continental' },
  { label: 'PALCCO', href: '/palcco' },
  { label: 'Promedia', href: '/promedia' },
  { label: 'Contacto', href: '/contacto' },
];

export const heroContent = {
  tagline: 'Grupo Promomedios',
  title: ['EL GRUPO', '#1 EN RADIO', 'DE MÉXICO'],
  subtitle: 'Con más de 52 años en medios de comunicación, somos el aliado estratégico con la mayor cobertura de radio a nivel nacional.',
  ctaPrimary: 'Cotizar Ahora',
  ctaSecondary: 'Conocer más',
  stats: [
    { value: '52+', label: 'Años de experiencia' },
    { value: '70+', label: 'Emisoras en todo México' },
    { value: '3', label: 'Empresas del grupo' },
    { value: '25+', label: 'Estados con cobertura' },
  ],
  bgImage: 'https://static.wixstatic.com/media/45119e_11312c5dce604bb98bf39accf9c703a0f000.jpg/v1/fill/w_1920,h_1080,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/45119e_11312c5dce604bb98bf39accf9c703a0f000.jpg',
};

export const aboutContent = {
  heading: 'Una Empresa de',
  highlight: 'Grupo Promomedios',
  description: 'Con más de 35 años como uno de los grupos líderes en la industria de la Radio local a nivel nacional, reafirmamos nuestro compromiso con nuestros clientes ofreciendo las mejores emisoras y programación para sus Anuncios en Radio.',
  companies: [
    {
      name: 'Grupo Promomedios',
      description: 'Con 52 años en medios de comunicación, aliado estratégico con instituciones y líderes con gran potencial en Branding.',
      logo: 'https://static.wixstatic.com/media/45119e_e4fafee36852408f9e3ee1e6dec03d8d~mv2.png/v1/crop/x_84,y_0,w_3085,h_2540/fill/w_200,h_165,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logotipo_GRUPO%20PROMOMEDIOS.png',
      href: null // Representa todo el grupo, no hay página separada que no sea Home o Contacto
    },
    {
      name: 'Canal Continental',
      description: 'Creamos todo el soporte operativo, producción y talento que ayuda a satisfacer el gusto Radiofónico y activaciones en locación a Nivel Local y Nacional.',
      logo: 'https://static.wixstatic.com/media/45119e_9edd1b7e5551435c97c76c80fcccdf6f~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Dise%C3%B1o%20sin%20t%C3%ADtulo%20(80).png',
      href: '/canal-continental'
    },
    {
      name: 'PALCCO',
      description: 'El Palacio de la Cultura y los Congresos es uno de los complejos más emblemáticos de la Zona Metropolitana de Guadalajara. ¡El lugar perfecto para tu EVENTO!',
      logo: 'https://static.wixstatic.com/media/45119e_6177997cea0642aeba05ad8aa1ac4bb9~mv2.png/v1/crop/x_0,y_0,w_1000,h_467/fill/w_200,h_94,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/PALCCO_ColorN.png',
      href: '/palcco'
    },
  ],
};

export const marqueeItems = [
  'Publicidad en Radio',
  'Cobertura Nacional',
  '70+ Emisoras',
  '52 Años de Experiencia',
  'Grupo Promomedios',
  'PALCCO Guadalajara',
  'Canal Continental',
  'Branding & Audiencia',
];

export const advantages = [
  {
    icon: '📡',
    title: 'Amplia Audiencia',
    description: 'La radio con amplia audiencia ofrece un alcance masivo y accesible, siendo portátil y capaz de transmitir información en tiempo real.',
  },
  {
    icon: '🎯',
    title: 'Capacidad de Segmentación',
    description: 'Las emisoras segmentadas a menudo pueden establecer una conexión más profunda con su comunidad objetivo.',
  },
  {
    icon: '🌎',
    title: 'Cobertura Geográfica',
    description: 'La radio es un medio de comunicación de masas, esto permite llegar incluyendo a aquellos que pueden no tener acceso a otros medios.',
  },
  {
    icon: '👥',
    title: 'Equipo Profesional',
    description: 'Nuestro equipo además de estar altamente capacitado cuenta con más de 30 años de experiencia en publicidad de Radio.',
  },
  {
    icon: '💰',
    title: 'Precio Competitivo',
    description: 'En comparación con otros medios de comunicación, el costo por impacto puede ser más económico y más efectivo.',
  },
  {
    icon: '🎵',
    title: 'Tecnología y Contenidos',
    description: 'La radio ofrece una amplia gama de contenidos, lo cual permite atraer a diversos grupos de oyentes con diferentes intereses.',
  },
];

/* ──────────────────────────────────────────────
   STATIONS — Only the 8 best (home emisoras)
   ────────────────────────────────────────────── */

export const stationsGDL = [
  {
    name: 'Fiesta Mexicana',
    slug: 'fiesta-mexicana',
    freq: 'XHBIO-FM',
    dial: '92.3 FM',
    city: 'Guadalajara, Jalisco',
    logo: 'https://static.wixstatic.com/media/45119e_936135f85e0b42a5887b6da2983754ce~mv2.png/v1/fill/w_168,h_160,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logotipo_FIESTA%20MEXICANA.png',
    tuneinUrl: 'https://tunein.com/radio/Fiesta-Mexicana-XHBIO-923-s2996/',
    tuneinEmbed: 'https://tunein.com/embed/player/s2996/',
    genre: 'Regional Mexicana',
    description: 'La estación líder en música regional mexicana en Guadalajara. Con los mejores corridos, banda, norteño y rancheras que hacen vibrar a toda la ciudad. Fiesta Mexicana es la voz del pueblo, la estación que acompaña las celebraciones y la vida cotidiana de los jaliscienses.',
    schedule: 'Transmisión 24/7 · Programas en vivo de 6:00 AM a 10:00 PM',
    audience: '500,000+ oyentes mensuales',
    accentColor: '#D03B44',
    videoId: null,
  },
  {
    name: 'Zona Tres',
    slug: 'zona-tres',
    freq: 'XHGEO-FM',
    dial: '91.5 FM',
    city: 'Guadalajara, Jalisco',
    logo: 'https://static.wixstatic.com/media/45119e_d2e5dbf3320442fd9722c4a1e58560c1~mv2.png/v1/fill/w_160,h_160,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Zona%20Tres%2091_5_.png',
    tuneinUrl: 'https://tunein.com/radio/Zona-3-915-s2972/',
    tuneinEmbed: 'https://tunein.com/embed/player/s2972/',
    genre: 'Pop / Top 40',
    description: 'La estación de hits y tendencias musicales en Guadalajara. Zona Tres transmite lo mejor del pop en español e inglés, manteniendo a su audiencia conectada con los éxitos del momento y las nuevas tendencias musicales globales.',
    schedule: 'Transmisión 24/7 · Shows matutinos y vespertinos en vivo',
    audience: '350,000+ oyentes mensuales',
    accentColor: '#6C3CE0',
    videoId: 'zona-tres',
  },
  {
    name: 'Radio Mujer',
    slug: 'radio-mujer',
    freq: 'XHEAAA-FM',
    dial: '92.7 FM',
    city: 'Guadalajara, Jalisco',
    logo: 'https://static.wixstatic.com/media/45119e_610d3b220f3f411b9688f85dfd92ec3c~mv2.png/v1/fill/w_160,h_160,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Radio%20Mujer%2092_7_.png',
    tuneinUrl: 'https://tunein.com/radio/Radio-Mujer-927-FM-s2815/',
    tuneinEmbed: 'https://tunein.com/embed/player/s2815/',
    genre: 'Adulto Contemporáneo',
    description: 'La estación dedicada a la mujer contemporánea. Con una programación que combina música suave, talk shows sobre lifestyle, bienestar y empoderamiento femenino. Radio Mujer conecta con la audiencia femenina más activa de Guadalajara.',
    schedule: 'Transmisión 24/7 · Programas especiales para la mujer moderna',
    audience: '280,000+ oyentes mensuales',
    accentColor: '#E84393',
    videoId: 'radio-mujer',
  },
  {
    name: 'Milenio',
    slug: 'milenio',
    freq: 'XHBIO-FM',
    dial: '105.1 FM',
    city: 'Guadalajara, Jalisco',
    logo: 'https://static.wixstatic.com/media/45119e_9975ee270a914e679f551fca4b0217d9~mv2.png/v1/fill/w_160,h_160,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Millenium%20contorno.png',
    tuneinUrl: 'https://tunein.com/radio/Milenio-Bella-M%C3%BAsica-1051-s128078/',
    tuneinEmbed: 'https://tunein.com/embed/player/s128078/',
    genre: 'Bella Música / Easy Listening',
    description: 'La estación de la bella música en Guadalajara. Milenio ofrece una selección cuidadosa de música instrumental, jazz suave, bossa nova y clásicos contemporáneos para una audiencia sofisticada que busca elegancia y relajación en su día a día.',
    schedule: 'Transmisión 24/7 · Música las 24 horas sin interrupciones',
    audience: '200,000+ oyentes mensuales',
    accentColor: '#2E86AB',
    videoId: null,
  },
  {
    name: 'La Grande',
    slug: 'la-grande',
    freq: 'XHELG-FM',
    dial: '95.5 FM',
    city: 'León, Guanajuato',
    logo: 'https://static.wixstatic.com/media/45119e_283c665a1fb64d15b15376f9821eb3f3~mv2.png/v1/fill/w_160,h_160,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/La%20Grande%2095_5.png',
    tuneinUrl: 'https://tunein.com/radio/XHELG-La-Grande-955-s91217/',
    tuneinEmbed: 'https://tunein.com/embed/player/s91217/',
    genre: 'Grupera / Regional',
    description: 'La estación grupera más grande del Bajío mexicano. La Grande llena de música, diversión y energía las calles de León y toda la región con los mejores éxitos del momento en música grupera, banda y regional.',
    schedule: 'Transmisión 24/7 · Shows en vivo y eventos regionales',
    audience: '400,000+ oyentes mensuales',
    accentColor: '#E74C3C',
    videoId: 'leon',
  },
  {
    name: 'La Prima',
    slug: 'la-prima',
    freq: 'XHLEO-FM',
    dial: '105.1 FM',
    city: 'León, Guanajuato',
    logo: 'https://static.wixstatic.com/media/45119e_9e5b05234b304d6eaa5b401251a0b02c~mv2.png/v1/fill/w_160,h_160,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/La%20rancherita.png',
    tuneinUrl: 'https://tunein.com/radio/LA-RANCHERITA-1051-s350001/',
    tuneinEmbed: 'https://tunein.com/embed/player/s350001/',
    genre: 'Ranchera / Regional Mexicana',
    description: 'La estación ranchera del corazón del Bajío. La Prima trae lo mejor de la música ranchera, norteña y de banda con la calidez y autenticidad que caracteriza a la región de Guanajuato. Tu compañera fiel todo el día.',
    schedule: 'Transmisión 24/7 · Música ranchera las 24 horas',
    audience: '250,000+ oyentes mensuales',
    accentColor: '#F39C12',
    videoId: null,
  },
  {
    name: 'Blu FM 92.3',
    slug: 'blu-fm',
    freq: 'XHOI-FM',
    dial: '92.3 FM',
    city: 'León, Guanajuato',
    logo: 'https://static.wixstatic.com/media/45119e_3db6c7a3866544ef86f3cb75eaca88e8~mv2.png/v1/fill/w_160,h_160,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Blu%20FM%2092_3.png',
    tuneinUrl: 'https://tunein.com/radio/BLU-FM-923-s350002/',
    tuneinEmbed: 'https://tunein.com/embed/player/s350002/',
    genre: 'Pop / Urbano',
    description: 'La estación más fresca de León. Blu FM trae los mejores hits del pop internacional, urbano y electrónica para una audiencia joven y dinámica. Música que marca tendencia en el Bajío.',
    schedule: 'Transmisión 24/7 · DJs en vivo y mezclas exclusivas',
    audience: '180,000+ oyentes mensuales',
    accentColor: '#3498DB',
    videoId: null,
  },
  {
    name: 'U | Ultra',
    slug: 'ultra',
    freq: 'XHLG-FM',
    dial: '98.3 FM',
    city: 'León, Guanajuato',
    logo: 'https://static.wixstatic.com/media/45119e_ee2ec4b594e14d39a219484561797c62~mv2.png/v1/fill/w_160,h_160,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Ultra%2098_3_.png',
    tuneinUrl: 'https://tunein.com/radio/ULTRA-983-s350000/',
    tuneinEmbed: 'https://tunein.com/embed/player/s350000/',
    genre: 'Rock / Alternativo',
    description: 'La estación de rock y alternativo en León. Ultra transmite lo mejor del rock en español e inglés, indie, alternativo y las nuevas bandas que están definiendo el sonido de una generación.',
    schedule: 'Transmisión 24/7 · Rock sin parar',
    audience: '150,000+ oyentes mensuales',
    accentColor: '#9B59B6',
    videoId: null,
  },
];

/* Map video file names from drive to station slugs */
export const stationVideos = {
  'leon': '/videos/PROMO_LEON.mp4',
  'zona-tres': '/videos/Video_IDENTIDAD_ZONA_TRES.mp4',
  'radio-mujer': '/videos/Video_Radio_Mujer.mp4',
};

export const statHighlight = {
  value: 35,
  suffix: '%',
  description: 'es el porcentaje que aumenta el Awareness en anuncios cuando se combinan con anuncios en Radio.',
};

export const partnerLogos = [
  'https://static.wixstatic.com/media/45119e_97c8d3586c3044a0929bdefecd3b4a59~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_97c8d3586c3044a0929bdefecd3b4a59~mv2.png',
  'https://static.wixstatic.com/media/45119e_21c797fb79264dc4ac7e03814798e899~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_21c797fb79264dc4ac7e03814798e899~mv2.png',
  'https://static.wixstatic.com/media/45119e_c5a23d77c63e47d4ac54cf0cc29a2b9a~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_c5a23d77c63e47d4ac54cf0cc29a2b9a~mv2.png',
  'https://static.wixstatic.com/media/45119e_bd43974384fe44e58e2337ff1c069505~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_bd43974384fe44e58e2337ff1c069505~mv2.png',
  'https://static.wixstatic.com/media/45119e_caec9f7895594d209e289680d2b22eea~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_caec9f7895594d209e289680d2b22eea~mv2.png',
  'https://static.wixstatic.com/media/45119e_e89f75284f9545fca31acfeeddb629a0~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_e89f75284f9545fca31acfeeddb629a0~mv2.png',
  'https://static.wixstatic.com/media/45119e_06e766701f984026a8c3652c8f6375fd~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_06e766701f984026a8c3652c8f6375fd~mv2.png',
  'https://static.wixstatic.com/media/45119e_8321a47275f94c5a9c92fac422ba809a~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_8321a47275f94c5a9c92fac422ba809a~mv2.png',
  'https://static.wixstatic.com/media/45119e_ee1b83d744124ad6802c1c85ea36bf93~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_ee1b83d744124ad6802c1c85ea36bf93~mv2.png',
  'https://static.wixstatic.com/media/45119e_de5c9d3bee584e11a7250d7b129ac3e1~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_de5c9d3bee584e11a7250d7b129ac3e1~mv2.png',
  'https://static.wixstatic.com/media/45119e_f406a6acd44e472b92bbbc0d69f33ef2~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_f406a6acd44e472b92bbbc0d69f33ef2~mv2.png',
  'https://static.wixstatic.com/media/45119e_5806f800f4694ac5ae9d44023f923123~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_5806f800f4694ac5ae9d44023f923123~mv2.png',
  'https://static.wixstatic.com/media/45119e_3582eab5967249a793395cf3fa8364d0~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_3582eab5967249a793395cf3fa8364d0~mv2.png',
  'https://static.wixstatic.com/media/45119e_570c4aa05e02444d8da5f4ba4f8f0f8f~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_570c4aa05e02444d8da5f4ba4f8f0f8f~mv2.png',
  'https://static.wixstatic.com/media/45119e_75a928b810ed42b7a4455a3df7a24f4b~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_75a928b810ed42b7a4455a3df7a24f4b~mv2.png',
  'https://static.wixstatic.com/media/45119e_3c1bc5032e9a4ddeb95a9cf8e83a686f~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_3c1bc5032e9a4ddeb95a9cf8e83a686f~mv2.png',
  'https://static.wixstatic.com/media/45119e_c087a0eefa954432bf780ae87048e135~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_c087a0eefa954432bf780ae87048e135~mv2.png',
  'https://static.wixstatic.com/media/45119e_ee186643ce424d42bc37d94806c8c2b1~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_ee186643ce424d42bc37d94806c8c2b1~mv2.png',
  'https://static.wixstatic.com/media/45119e_ac918014f035498bbbe502127c561f2f~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_ac918014f035498bbbe502127c561f2f~mv2.png',
  'https://static.wixstatic.com/media/45119e_c7ae484d050e4d51ad97a54aab9a5764~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_c7ae484d050e4d51ad97a54aab9a5764~mv2.png',
  'https://static.wixstatic.com/media/45119e_3795f8d1635d434486b9257a6a9e410c~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/45119e_3795f8d1635d434486b9257a6a9e410c~mv2.png',
];

export const blogPosts = [
  {
    title: 'Cómo la Radio Impulsa el Turismo',
    image: 'https://static.wixstatic.com/media/45119e_0bf58505a12c49adb609076e0ecdf938~mv2.jpg/v1/fill/w_600,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/45119e_0bf58505a12c49adb609076e0ecdf938~mv2.jpg',
    href: 'https://www.promosat.com/post/c%C3%B3mo-la-radio-impulsa-el-turismo',
  },
  {
    title: 'Publicidad en Radio: La Fórmula para Captar la Atención en 30 Segundos',
    image: 'https://static.wixstatic.com/media/45119e_fa45b847f1dc4884a705470714f112a9~mv2.jpg/v1/fill/w_600,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/45119e_fa45b847f1dc4884a705470714f112a9~mv2.jpg',
    href: 'https://www.promosat.com/post/publicidad-en-radio-la-f%C3%B3rmula-para-captar-la-atenci%C3%B3n-en-30-segundos',
  },
  {
    title: 'Cómo Crear un Programa de Radio Atractivo: Consejos para Locutores y Productores',
    image: 'https://static.wixstatic.com/media/45119e_9957a31051af43eea8950b94a5b67801~mv2.jpg/v1/fill/w_600,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/45119e_9957a31051af43eea8950b94a5b67801~mv2.jpg',
    href: 'https://www.promosat.com/post/c%C3%B3mo-crear-un-programa-de-radio-atractivo-consejos-para-locutores-y-productores',
  },
];

export const offices = [
  {
    name: 'Matriz CDMX',
    address: 'Polanco, Av. Homero 538, Polanco V Secc, Miguel Hidalgo, 11560 Ciudad de México, CDMX',
    mapLink: 'https://maps.app.goo.gl/JwL2yCF7BeF24V6F6',
  },
  {
    name: 'Oficina Guadalajara',
    address: 'Av. Mariano Otero No. 3405 Fracc. Verde Valle, C.P. 45060 Guadalajara, Jalisco, México',
    mapLink: '#',
  },
];

/* ──────────────────────────────────────────────
   PROMEDIA — Podcast & Digital Content House
   ────────────────────────────────────────────── */

export const promediaContent = {
  tagline: '¡El mundo se volvió Pod!',
  title: 'Promedia',
  subtitle: 'Somos profesionales en contenidos para redes sociales y creemos que todo mundo tiene una historia que merece ser escuchada.',
  description: 'Sabemos que con la estrategia creativa correcta podemos potenciar a individuales y marcas a conectar de manera auténtica y relevante con su mercado objetivo.',
  services: [
    'Estrategia Creativa',
    'Planeación de Contenidos',
    'Realización de Contenidos de Valor',
    'Podcast, Series, Conciertos, Cápsulas, Documentales, Streaming',
    'Incubación, Distribución y Monetización de Productos Audiovisuales',
    'Asesoría en Identidad Visual para Empresas y Podcasters',
    'Producción Escénica para Eventos',
    'Diseño Gráfico & Curación de Visuales',
    'Marketing Digital & Engagement Booster',
    'Revisión de Analíticas',
  ],
  whyPodcast: {
    title: '¿Por qué el Podcasting la está Rompiendo?',
    reasons: [
      'Acceso rápido y fácil a dispositivos móviles',
      'Promover sin que se note',
      'Voces auténticas y personales',
      'Potencial para crear comunidad y necesidad',
    ],
  },
  podcastTypes: [
    { type: 'Contar Historias', desc: 'De ficción o de la vida real' },
    { type: 'Audio Dramas', desc: 'Producciones especiales dramatizadas' },
    { type: 'Entrevistas', desc: 'Directo a tu mente' },
    { type: 'Edu-tainment', desc: 'Aprende mientras lo pasas bien' },
  ],
  production: [
    { title: 'Producción y Dirección', desc: 'De la idea al producto final' },
    { title: 'Pro Video', desc: 'De alta calidad' },
    { title: 'Audio', desc: 'Música original, voces, jingles' },
    { title: 'Postproducción', desc: 'Audio y video' },
    { title: 'Escenografía', desc: 'Construcción de set' },
    { title: 'Distribución', desc: 'Estrategias de distribución digital' },
    { title: 'Marketing', desc: 'Estrategias de Marketing digital' },
  ],
  podcasts: [
    {
      name: 'Va a Doler!',
      hosts: 'La Güera y El Callado',
      category: 'Humor',
      target: 'Hombres y Mujeres de 18 a 54',
      description: 'La pareja consentida de la radio en Guadalajara dispuesta a conquistar el mundo con su Podcast de Ellas vs Ellos. Escuchan comentarios del auditorio acerca de temas candentes de situaciones de pareja y discuten si son las Mujeres o los Hombres quienes mejor resuelven sus diferencias.',
      stats: { followers: '370K', youtube: '10K vistas', instagram: '30K vistas' },
    },
    {
      name: '+Bonitas que Canijas',
      hosts: 'Myriam Castellanos y Rocío Barragán',
      category: 'Vida y Estilo',
      target: 'Mujeres de 18 a 54',
      description: 'Son Mamás Jóvenes que viven lo que expresan en sus contenidos, con un lenguaje fresco y sin poses, que exponen sus dudas a los invitados y comparten sus experiencias de una manera sencilla, sincera y honesta.',
      stats: { followers: '130K+', instagram: '170K vistas', tiktok: '200K vistas' },
    },
    {
      name: 'Bolillito pa\'l Susto',
      hosts: 'El Ñero Tuitero y Jeez',
      category: 'Comedia / Paranormal',
      target: 'Hombres y Mujeres de 18 a 54',
      description: 'Un Podcast donde se mezcla lo paranormal y la comedia en una dosis perfecta. Historias reales enviadas por la audiencia, leyendas urbanas y anécdotas de miedo, contadas con el toque único de los conductores que convierten el terror en risas.',
      stats: { followers: '69K+', youtube: '120K vistas', instagram: '1M+ vistas' },
    },
    {
      name: 'La Banda F.C.',
      hosts: 'Equipo La Banda',
      category: 'Deportes',
      target: 'Hombres y Mujeres de 15 a 54',
      description: 'Una comunidad digital para amantes del fútbol y otros deportes. Informamos, comunicamos y divertimos en un formato de videos cortos con: Historia del fútbol, datos curiosos, actualidades y mucho más.',
      stats: { followers: '4.5K+', youtube: '2M+ vistas', tiktok: '2.5M vistas' },
    },
  ],
};
