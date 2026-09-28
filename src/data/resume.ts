// ---------------------------------------------------------------------------
// Single source of truth for every piece of CV content on the site.
// Edit here only — components read from this file, never hardcode copy.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Sayan Hazra',
  initials: 'SH',
  roles: [
    'Senior ML Engineer',
    'Multi-Agent Systems Architect',
    'RAG Pipeline Engineer',
    'AI Team Lead',
  ],
  kicker: 'The Journey So Far',
  bridgeLine:
    'From simulating Indian airspace for ISRO and IISc to architecting the multi-agent AI systems that run in production today.',
  summary:
    'Senior AI Engineer and Project Lead with over 5.3 years of experience specializing in the end-to-end delivery of production-grade Generative AI systems. Expert in designing multi-agent architectures, advanced RAG pipelines, and scalable AI microservices. Proven track record of translating complex business requirements into high-throughput AI solutions that drive measurable KPIs.',
  location: 'Bengaluru, India',
  placeOfBirth: 'Kolkata, India',
  dateOfBirth: '29 October 1996',
  nationality: 'Indian',
  photo: 'profile.jpg',
  cv: 'Sayan_Hazra_CV.pdf',
} as const

export const contact = {
  email: 'sayan.hazra.applications@outlook.com',
  phone: '+91 7003996450',
  phoneHref: '+917003996450',
  linkedin: 'https://www.linkedin.com/in/sayan-hazra-b52204181',
  linkedinLabel: 'linkedin.com/in/sayan-hazra',
  github: 'https://github.com/Sayan2919',
  githubLabel: 'github.com/Sayan2919',
} as const

export type Stat = {
  value: number
  suffix: string
  label: string
}

export const stats: Stat[] = [
  { value: 5.3, suffix: '+', label: 'Years of Experience' },
  { value: 70, suffix: '%', label: 'Data Throughput Increase' },
  { value: 80, suffix: '%+', label: 'Accuracy Improvement' },
  { value: 60, suffix: '%', label: 'Turnaround Time Reduction' },
  { value: 15, suffix: '%', label: 'Lead Generation Increase' },
]

export type ExperienceEntry = {
  id: string
  chapter: string
  role: string
  org: string
  orgUrl?: string
  start: string
  end: string
  current?: boolean
  location: string
  department: string
  sector: string
  highlights: { label: string; detail: string }[]
  tags: string[]
  narrative: string
}

// Stored chronologically (oldest -> newest) so the journey spine reads as a
// story arriving at "today", the reverse of the CV's reverse-chron listing.
export const experience: ExperienceEntry[] = [
  {
    id: 'isro',
    chapter: '01',
    role: 'Data Scientist Intern',
    org: 'ISRO',
    start: 'Dec 2019',
    end: 'Jul 2020',
    location: 'Hyderabad, India',
    department: 'National Remote Sensing Centre (NRSC)',
    sector: 'Professional, scientific and technical activities',
    highlights: [
      {
        label: 'Specialized method',
        detail:
          'Formulated a vector pruning method with shapefiles to crop satellite data for a region, improving accuracy by 30%.',
      },
      {
        label: 'Algorithm design',
        detail: 'Developed a temporal interpolation algorithm to align satellite data with ground FTIR data.',
      },
      {
        label: 'Modelling',
        detail: 'Developed a forecasting model using multivariate LSTMs to forecast satellite data in temporal and spatial index.',
      },
      {
        label: 'Data observability',
        detail: 'Created an end-to-end logging and data visualization dashboard using the ELK stack.',
      },
    ],
    tags: ['LSTM', 'Time-Series Forecasting', 'ELK Stack', 'Python', 'Satellite Data'],
    narrative:
      'Chasing signals across satellite grids taught me to trust data pipelines before trusting conclusions — a discipline that never left.',
  },
  {
    id: 'iisc',
    chapter: '02',
    role: 'Project Associate I',
    org: 'Indian Institute of Science',
    start: 'Dec 2020',
    end: 'Jun 2023',
    location: 'Bengaluru, India',
    department: 'Aerospace Systems Lab (ASL)',
    sector: 'Professional, scientific and technical activities',
    highlights: [
      {
        label: 'Airspace simulator',
        detail:
          'Developed a predictive air traffic management tool for optimal management of Indian airspace, in collaboration with the Airport Authorities of India (AAI) and Honeywell.',
      },
      {
        label: 'Optimization & simulation',
        detail:
          'Formulated dynamic airspace sub-sectorization using Particle Swarm Optimization and built an air traffic simulation tool for scenario testing.',
      },
      {
        label: 'Deployment',
        detail: 'Deployed the application on an in-house private server, maintaining security standards.',
      },
      {
        label: 'System design',
        detail: 'Designed a responsive system using server-client architecture and RESTful API designs.',
      },
    ],
    tags: ['Particle Swarm Optimization', 'Simulation', 'REST APIs', 'Server-Client Architecture'],
    narrative:
      'Simulating thousands of aircraft in real time was my first lesson in systems that have to be both intelligent and unbreakable.',
  },
  {
    id: 'miles',
    chapter: '03',
    role: 'Associate AI/ML Engineer',
    org: 'Miles Education Pvt Ltd.',
    start: 'Jul 2023',
    end: 'Sep 2024',
    location: 'Bengaluru, India',
    department: 'AI Labs',
    sector: 'Education',
    highlights: [
      {
        label: 'Specialized teaching agents',
        detail:
          'Developed a React Agent bot using Gemini and LangChain, leveraging Chain-of-Thought (CoT) reasoning to create a virtual assistant for mentors.',
      },
      {
        label: 'Enterprise RAG integration',
        detail: 'Reduced turnaround time (TAT) by 60% by implementing an advanced RAG-based information extractor for complex PDF documents.',
      },
      {
        label: 'LLM fine-tuning',
        detail: 'Conducted R&D on aligning open-source LLMs using QLoRA and BitsAndBytes configurations for domain-specific company data.',
      },
      {
        label: 'Product ownership',
        detail: 'Acted as de facto product owner for internal AI tools, driving a chatbot implementation that increased leads by 15%.',
      },
      {
        label: 'Website support bot',
        detail: 'Developed a support bot live on the company website, helping resolve user queries.',
      },
    ],
    tags: ['LangChain', 'Gemini', 'RAG', 'QLoRA', 'Chain-of-Thought', 'Chatbots'],
    narrative: 'This was the pivot — from simulating physical systems to building agents that reason in language. The shift stuck.',
  },
  {
    id: 'acuity',
    chapter: '04',
    role: 'Senior ML Engineer | Team Lead',
    org: 'Acuity Analytics',
    start: 'Oct 2024',
    end: 'Present',
    current: true,
    location: 'Bengaluru, India',
    department: 'BEAT',
    sector: 'Financial and insurance activities',
    highlights: [
      {
        label: 'Agentic extraction systems',
        detail:
          'Designed and deployed LLM-powered extraction systems using multi-agent architectures (AutoGen) to automate complex tax-form data mapping, achieving >60% initial accuracy.',
      },
      {
        label: 'Scalable AI architecture',
        detail: 'Orchestrated a high-throughput, event-driven processing system using AWS Step Functions and Lambda, increasing data throughput by 70%.',
      },
      {
        label: 'Advanced RAG development',
        detail: 'Implemented an end-to-end RAG system featuring automated web scraping, hybrid search retrieval, and markdown-based API delivery.',
      },
      {
        label: 'Performance optimization',
        detail: 'Spearheaded a human-in-the-loop feedback mechanism for extraction services, boosting subsequent processing accuracy by more than 80%.',
      },
      {
        label: 'MLOps & observability',
        detail: 'Built automated CI/CD pipelines using AWS SAM and Docker while implementing centralized monitoring via CloudWatch for distributed AI services.',
      },
      {
        label: 'Architecture migration',
        detail: 'Migrated the extraction project and used Temporal IO to orchestrate the flow.',
      },
      {
        label: 'Proof of concept',
        detail: 'Designed and deployed LLM-powered extraction and analysis systems using agent-based architectures (AutoGen, A2A POCs) for real-world business KPIs.',
      },
    ],
    tags: ['AutoGen', 'AWS Step Functions', 'Lambda', 'Temporal IO', 'RAG', 'Docker', 'CloudWatch', 'A2A'],
    narrative:
      'Now leading the charge — architecting the multi-agent systems that turn language models into dependable teammates.',
  },
]

export type EducationEntry = {
  id: string
  degree: string
  institution: string
  start: string
  end: string
  location: string
  eqf: number
  techniques: string[]
}

// Chronological (oldest -> newest), mirroring the experience spine.
export const education: EducationEntry[] = [
  {
    id: 'bsc',
    degree: 'B.Sc in Computer Science',
    institution: 'University of Calcutta',
    start: 'May 2015',
    end: 'Jun 2018',
    location: 'Kolkata, India',
    eqf: 6,
    techniques: ['Coding', 'OOP Concepts', 'Data Structures', 'System Architecture'],
  },
  {
    id: 'msc',
    degree: 'M.Sc in Computer Science',
    institution: 'Pondicherry University',
    start: 'Jul 2018',
    end: 'Jun 2020',
    location: 'Pondicherry, India',
    eqf: 7,
    techniques: [
      'AI Model Training',
      'Classification & Regression',
      'AI Systems Architecture',
      'Backend Engineering',
      'Clean Coding',
    ],
  },
]

export type SkillCategory = {
  id: string
  title: string
  icon: 'sparkles' | 'layers' | 'brain' | 'database' | 'cloud' | 'code'
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'genai',
    title: 'Generative AI & Agents',
    icon: 'sparkles',
    skills: [
      'Multi-Agent Systems (AutoGen, LangGraph)',
      'Tool-use / Function Calling',
      'A2A Framework',
      'RAG (Advanced Retrieval, Hybrid Search)',
      'Prompt Engineering',
    ],
  },
  {
    id: 'frameworks',
    title: 'LLM Frameworks',
    icon: 'layers',
    skills: ['LangChain', 'LlamaIndex', 'Hugging Face', 'MCP', 'CrewAI', 'VertexAI', 'OpenAI'],
  },
  {
    id: 'core-ml',
    title: 'Core AI/ML',
    icon: 'brain',
    skills: ['ANN / CNN / RNN & Transformers', 'LSTM', 'GRU', 'Machine Learning & Classification', 'Regression'],
  },
  {
    id: 'data',
    title: 'Data & Vector Stores',
    icon: 'database',
    skills: ['OpenSearch', 'ChromaDB', 'FAISS', 'PostgreSQL', 'Elastic Search', 'MongoDB'],
  },
  {
    id: 'cloud',
    title: 'Cloud & Orchestration',
    icon: 'cloud',
    skills: ['AWS (Lambda, ECS, EKS, S3, API Gateway)', 'Docker', 'Temporal IO', 'Git', 'Jenkins'],
  },
  {
    id: 'programming',
    title: 'Programming & APIs',
    icon: 'code',
    skills: ['Python', 'FastAPI', 'Robyn', 'Django', 'C++'],
  },
]

export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export type LanguageEntry = {
  id: string
  name: string
  isMotherTongue?: boolean
  listening?: CefrLevel
  reading?: CefrLevel
  spokenProduction?: CefrLevel
  spokenInteraction?: CefrLevel
  writing?: CefrLevel
}

export const languages: LanguageEntry[] = [
  { id: 'bengali', name: 'Bengali', isMotherTongue: true },
  {
    id: 'english',
    name: 'English',
    listening: 'C1',
    reading: 'C1',
    spokenProduction: 'C1',
    spokenInteraction: 'C1',
    writing: 'C1',
  },
  {
    id: 'german',
    name: 'German',
    listening: 'A2',
    reading: 'A2',
    spokenProduction: 'A2',
    spokenInteraction: 'A2',
    writing: 'A2',
  },
]

export const cefrScale: Record<CefrLevel, number> = {
  A1: 100 / 6,
  A2: 200 / 6,
  B1: 300 / 6,
  B2: 400 / 6,
  C1: 500 / 6,
  C2: 100,
}

export const navLinks = [
  { id: 'hero', label: 'Prologue' },
  { id: 'origins', label: 'Origins' },
  { id: 'journey', label: 'Journey' },
  { id: 'arsenal', label: 'Arsenal' },
  { id: 'contact', label: 'Contact' },
] as const
