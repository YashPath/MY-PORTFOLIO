// ─────────────────────────────────────────────────────────────
// ALL site content lives here. Edit this file only — no need
// to touch components. Anything marked ADD is a placeholder.
// Set a value to null to hide that link/button automatically.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Yash Pathak',
  role: 'AI/ML Engineer & Full-Stack Developer',
  tagline: 'I build websites, apps and AI tools that solve real problems.',
  location: 'Dehradun, Uttarakhand, India',
  education: {
    degree: 'B.Tech in Computer Science & Engineering (AI/ML specialization)',
    college: 'Graphic Era Hill University, Dehradun',
    year: '3rd year',
    graduation: null, // ADD: expected graduation year, e.g. '2028'
    cgpa: null, // ADD: CGPA if you want to show it, e.g. '8.4'
  },
}

export const contact = {
  email: 'yashpathak221103@gmail.com',
  whatsappNumber: '+91 9555281682',
  whatsappLink: 'https://wa.me/919555281682',
  github: 'https://github.com/YashPath',
  linkedin: 'https://www.linkedin.com/in/yash-pathak-74908227a/',
  resume: '/assets/Yash_Pathak_Resume.pdf', // ADD: put your PDF in public/assets/
}

export const skills = [
  { group: 'Languages', items: ['C++', 'Python', 'JavaScript', 'SQL', 'PHP'] },
  { group: 'Frontend', items: ['React', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'SQLite', 'REST APIs'] },
  {
    group: 'AI/ML',
    items: ['Transformers (BERT, DistilBERT)', 'NLP', 'Streamlit', 'Google Colab', 'AI agents / multi-agent systems'],
  },
  { group: 'Mobile', items: ['Android app development'] },
  {
    group: 'Other',
    items: ['Competitive programming (C++, DSA)', 'Git & GitHub', 'Render / Netlify deployment', 'Blender (3D)'],
  },
]

// Short labels for the orbiting 3D skill cloud (taken from the list above).
export const skillsOrbit = [
  ['C++', 'Python', 'JavaScript', 'SQL', 'PHP', 'React'],
  ['Tailwind CSS', 'Node.js', 'Express', 'SQLite', 'REST APIs', 'Android', 'Git'],
  ['NLP', 'BERT', 'Streamlit', 'AI Agents', 'DSA', 'Blender', 'Colab'],
]

// github: only set for PUBLIC repos. null = button hidden.
export const featuredProjects = [
  {
    id: 'spices',
    title: 'Spices of Yash',
    subtitle: 'Full-Stack E-commerce Store',
    description:
      'Online spice store with product catalogue, cart, checkout flow, order management, admin panel with admin authentication, and UPI-based payment preference. Separate customer and admin routing.',
    tech: ['Node.js', 'Express', 'SQLite', 'JavaScript'],
    live: 'https://spices-of-yash-store.onrender.com',
    github: 'https://github.com/YashPath/spices-of-yash-store',
  },
  {
    id: 'battery',
    title: 'Electrochemical Battery Simulator',
    subtitle: 'Interactive simulator',
    description: 'Interactive Python/Streamlit simulator for electrochemical battery behaviour.',
    tech: ['Python', 'Streamlit'],
    live: 'https://electrochemicalsimula-b7waas5d5abbdpiuayuxpp.streamlit.app/',
    github: null,
  },
  {
    id: 'solar',
    title: 'Tandem Solar Cell Simulator',
    subtitle: 'Interactive simulator',
    description: 'Streamlit-based simulator for tandem solar cell performance.',
    tech: ['Python', 'Streamlit'],
    live: 'https://tandom-solar-cell-6av2cprgm4euxwzhdnpnff.streamlit.app/',
    github: null,
  },
  {
    id: 'camshield',
    title: 'CamShield',
    subtitle: 'Hidden Camera Detector (Android)',
    description:
      'Android app that helps users detect hidden cameras. Focus on no ads, beginner-friendly UI, and wired camera detection.',
    tech: ['Android'],
    live: null, // ADD: Play Store link / APK
    github: null, // ADD: GitHub if public
  },
]

export const moreProjects = [
  {
    id: 'orchestra',
    title: 'AI Orchestra',
    subtitle: 'Multi-Agent System',
    description:
      'A main orchestrator agent that splits a task (like building a website) among specialist sub-agents (frontend, backend, security, deployment), asks for approval after each step, and delivers tested output. Agents are named after figures from Hindu philosophy. Working demo mode built.',
    tech: ['AI agents', 'Multi-agent systems'],
    live: null, // ADD: screenshot / video link
    github: null,
  },
  {
    id: 'neuralpath',
    title: 'Neural Path Academy',
    subtitle: 'AI Learning Dashboard',
    description:
      'React-based dark-themed AI learning dashboard with Node.js/Python backend: quizzes, chat, progress tracking, certificates.',
    tech: ['React', 'Node.js', 'Python'],
    live: null,
    github: null,
  },
  {
    id: 'sentinel',
    title: 'On-device Privacy Sentinel',
    subtitle: 'Snapdragon AI Lab Challenge entry',
    description:
      "Entry for Qualcomm's Snapdragon AI Lab Build & Present Challenge. Webcam-based, on-device AI that detects shoulder-surfing, a second face, or unauthorized screen recording.",
    tech: ['On-device AI', 'Computer vision'],
    live: null,
    github: null,
  },
  {
    id: 'watch',
    title: '3D Watch Store',
    subtitle: 'E-commerce with 3D viewer',
    description: 'Premium watch e-commerce site with an interactive 3D product viewer.',
    tech: ['3D', 'Web'],
    live: null, // ADD: link when live
    github: null,
  },
]

export const services = {
  items: [
    { title: 'Websites', price: 'from ₹3,999', options: ['Landing Page', 'Business Website', 'Online Store'] },
    { title: 'Android Apps', price: 'from ₹5,999', options: ['Web-to-App', 'Business App', 'Store/Booking App'] },
    { title: 'AI Add-ons', price: 'Quote on request', options: ['Chatbots', 'Automation for businesses'] },
  ],
  priceList: '/assets/price-list.pdf', // ADD: put your PDF in public/assets/
}

// ── "Your business, my demo": each business type opens a real project ──
// project: id of an item in `showcase`. points: what that business's customers get.
export const clientDemos = {
  startingPrice: 'Websites from ₹3,999 · Android apps from ₹5,999',
  types: [
    {
      id: 'bakery',
      label: 'Bakery / Café',
      noun: 'bakery',
      project: 'bakery',
      points: ['Menu with prices, eggless filter and allergens', 'Pickup orders in 30-minute slots', 'Custom cake enquiries with a live price estimate', 'Staff dashboard to manage orders and sold-out items'],
    },
    {
      id: 'gym',
      label: 'Gym / Fitness',
      noun: 'gym',
      project: 'gym',
      points: ['Programs, coaches, timings and plans', 'Scroll animations that make you stand out', 'BMI calculator and FAQ', 'Join form plus a WhatsApp button'],
    },
    {
      id: 'shop',
      label: 'Shop / Grocery',
      noun: 'shop',
      project: 'spices',
      points: ['Product catalogue with search and filters', 'Cart, checkout and UPI QR payment', 'New-order alerts on Telegram', 'Admin panel for stock, orders and coupons'],
    },
    {
      id: 'premium',
      label: 'Premium brand',
      noun: 'brand',
      project: 'watch',
      points: ['Products shown as interactive 3D models', 'Search in plain words', 'Card payments through Stripe, plus cash on delivery', 'Customer accounts, cart and wishlist'],
    },
  ],
}

export const beyondCode = [
  {
    title: 'TheSimpleDiaryofYash',
    text: 'My YouTube channel: motivational and mountain/travel Shorts.',
    link: null, // ADD: channel link
  },
  { title: 'Blender 3D', text: 'I make 3D art in Blender.', link: null },
]

// ── 3D scroll showcase: one full-screen section per project ──
// scene: which 3D object shows ('spices' | 'bakery' | 'gym' | 'watch')
// image / imageMobile / video: files in src/assets/projects/ (null = placeholder)
export const showcase = [
  {
    id: 'spices',
    scene: 'spices',
    image: '/projects/spices.webp',
    imageMobile: '/projects/spices-mobile.webp',
    video: '/projects/spices.mp4',
    number: '01',
    title: 'Spices of Yash',
    subtitle: 'Full-Stack E-commerce Store',
    description:
      'Retail and wholesale spice store with a full admin side: browse, cart, checkout with UPI QR, and order management, running on SQLite or Postgres.',
    features: [
      'Search, category filters, quick view and saved cart',
      'Checkout with UPI QR, delivery fee and free-delivery threshold',
      'Admin dashboard: orders, stock alerts, coupons, reports',
      'New-order alerts on Telegram',
      'Product photos auto-resized to WebP',
      '18 API tests + Playwright e2e, run by GitHub Actions',
    ],
    tech: ['Node.js', 'Express', 'SQLite', 'PostgreSQL', 'Playwright', 'GitHub Actions'],
    accent: '#F5A524',
    live: 'https://spices-of-yash-store.onrender.com',
    github: 'https://github.com/YashPath/spices-of-yash-store',
  },
  {
    id: 'bakery',
    scene: 'bakery',
    image: '/projects/bakery.webp',
    imageMobile: '/projects/bakery-mobile.webp',
    video: '/projects/bakery.mp4',
    number: '02',
    title: 'Bloom Bakery',
    subtitle: 'Patisserie Ordering Website',
    description:
      'Patisserie website with real pickup ordering, custom cake enquiries and a counter dashboard for shop staff. Plain HTML, CSS and JS on an Express + PostgreSQL backend.',
    features: [
      'Menu with categories, eggless filter, allergens and live sold-out status',
      'Pickup ordering in 30-minute slots that follow shop hours (India time)',
      'Custom cake enquiry with live price estimate and 48-hour notice rule',
      'Staff dashboard: order queue, cake enquiries, mark items sold out',
      'Admin login with signed HTTP-only cookie',
      '10 API tests, runs on Postgres or PGlite',
    ],
    tech: ['Node.js', 'Express', 'PostgreSQL', 'PGlite', 'JavaScript'],
    accent: '#F4A7B9',
    live: 'https://bloom-bakery-prd4.onrender.com',
    github: 'https://github.com/YashPath/Bloom_Bakery',
  },
  {
    id: 'gym',
    scene: 'gym',
    image: '/projects/gym.webp',
    imageMobile: '/projects/gym-mobile.webp',
    video: '/projects/gym.mp4',
    number: '03',
    title: 'ASH GYM',
    subtitle: 'Scroll-Animated Gym Website',
    description:
      'A scroll-driven story for a fictional gym brand: the page heats up from cold ash to ember orange as you scroll, and photos warm from grey to colour.',
    features: [
      'Pinned barbell that loads plate by plate up to 170 kg',
      'Horizontal-scroll program cards with looping video',
      'Ember particle hero on Canvas 2D',
      'BMI calculator with an animated SVG gauge',
      'Join form with in-browser validation',
      'Lighter animations on phones, reduced-motion support',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'ScrollTrigger', 'Canvas 2D', 'SVG'],
    accent: '#FF6A2B',
    live: 'https://ash-gym.netlify.app/',
    github: 'https://github.com/YashPath/ASH-GYM',
  },
  {
    id: 'watch',
    scene: 'watch',
    image: '/projects/watch.webp',
    imageMobile: '/projects/watch-mobile.webp',
    video: '/projects/watch.mp4',
    number: '04',
    title: 'ASH_ Watches',
    subtitle: 'Full-Stack 3D Watch Store',
    description:
      'Watch store where every watch is an interactive 3D model that can be taken apart, with hybrid natural-language search and Stripe or cash-on-delivery checkout.',
    features: [
      'Interactive 3D watches with an exploded view of every part',
      'Hybrid search: ChromaDB vectors + Postgres full-text, fused with RRF',
      'Stripe Checkout with idempotent webhooks, plus cash on delivery',
      'argon2id passwords, rotating refresh tokens, TOTP MFA for admins',
      'Admin dashboard for products, orders, reviews and stats',
      'Docker Compose stack with nginx and GitHub Actions CI',
    ],
    tech: ['Next.js 15', 'React Three Fiber', 'Express', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis', 'ChromaDB', 'Stripe'],
    accent: '#D8B26E',
    live: 'https://ash-watches-seven.vercel.app',
    github: 'https://github.com/YashPath/ASH_WATCHES',
  },
]

export const nav = [
  { id: 'top', label: 'Home' },
  { id: 'spices', label: 'Spices' },
  { id: 'bakery', label: 'Bakery' },
  { id: 'gym', label: 'ASH GYM' },
  { id: 'watch', label: 'Watches' },
  { id: 'hire', label: 'Hire Me' },
  { id: 'contact', label: 'Contact' },
]
