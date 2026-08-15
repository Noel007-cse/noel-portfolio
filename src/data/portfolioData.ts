export const identity = {
  name: 'Noel J Cherian',
  role: 'Full-Stack · IoT · ML',
  pitch:
    'Computer Science undergraduate building responsive web apps and IoT systems — currently exploring where AI meets embedded hardware.',
}

export const projects = [
  {
    id: 'lexcheck',
    name: 'LexCheck',
    tags: ['Flutter', 'RAG', 'Claude/GPT-4o'],
    pitch:
      'A judgment-free legal awareness app helping Indian teens understand cybercrime and juvenile law risks, grounded in real case law.',
    url: 'https://lexcheck.vercel.app',
    repo: 'https://github.com/abhinav-e-p-b/LexCheck',
  },
  {
    id: 'aaroha',
    name: 'Aaroha',
    tags: ['Flutter', 'Riverpod', 'Groq LLaMA'],
    pitch:
      'A recovery companion app for Kerala — AI chat support, a live map of de-addiction centers, and community tools for individuals, families, and NGOs.',
    url: '',
    repo: 'https://github.com/Noel007-cse/hackquest_hackathon',
  },
  {
    id: 'securepulse',
    name: 'SecurePulse',
    tags: ['React', 'Node.js', 'Groq LLaMA'],
    pitch:
      'A unified AI-powered security scanner for websites, apps, and GitHub repos, with real-time threat monitoring and a one-click Chrome extension.',
    url: 'https://securepulse-frontend.onrender.com',
    repo: 'https://github.com/Noel007-cse/Securepulse',
  },
  {
    id: 'qflow',
    name: 'QFlow',
    tags: ['React', 'Flutter', 'Prisma'],
    pitch:
      'A production-grade multi-domain queue management platform — real-time queue logic across web and mobile, built during my internship at Exalture.',
    url: '',
    repo: 'https://github.com/Noel007-cse/qflow-mobile',
  },
  {
    id: 'water-monitor',
    name: 'IoT Water Quality Monitor',
    tags: ['ESP32', 'Sensors', 'Cloud'],
    pitch:
      'Real-time monitoring of salinity, pH, ORP and temperature to prevent White Spot Virus in prawn farming.',
    url: 'https://prawn-farming.vercel.app',
    repo: 'https://github.com/Noel007-cse',
  },
  {
    id: 'emotion-detection',
    name: 'Emotion Detection App',
    tags: ['Python', 'OpenCV'],
    pitch: 'Real-time facial emotion recognition using ML classification models.',
    url: '',
    repo: 'https://github.com/jeffmathew4545/FER_with_model_creation',
  },
] as const

export const experience = [
  {
    id: 'exalture',
    role: 'Software Developer Intern',
    org: 'Exalture Software Labs Pvt Ltd',
    period: 'May 2026 – June 2026',
    detail:
      'Cross-platform frontend developer on QFlow, a multi-domain queue management platform — built UI across React web and Flutter mobile, fixed bugs, and integrated real-time backend data.',
  },
  {
    id: 'hackarch',
    role: '2nd Prize — Hack@Arch 4.0',
    org: 'National Level Hackathon, GEC Thrissur',
    period: '2025',
    detail: 'Built HackQuest / Aaroha as part of a national-level hackathon team.',
  },
  {
    id: 'takedown',
    role: '2nd Prize — Takedown 2.0',
    org: 'State Level Hackathon, IEDC TechFest',
    period: '2025',
    detail: 'State-level hackathon win at Universal Engineering College, Thrissur.',
  },
  {
    id: 'nptel',
    role: 'NPTEL — Internet of Things',
    org: 'Online Certification',
    period: '2024',
    detail: 'Embedded systems, communication protocols, sensor integration, cloud IoT.',
  },
  {
    id: 'education',
    role: 'B.Tech, Computer Science & Engineering',
    org: 'GEC Thrissur',
    period: '2023 – Present',
    detail: 'CGPA: 9.09',
  },
] as const

export const stack = {
  Frontend: ['React.js', 'TypeScript', 'JavaScript', 'HTML/CSS'],
  Backend: ['Node.js', 'PostgreSQL', 'Prisma', 'MongoDB'],
  IoT: ['ESP32', 'IoT Sensors', 'Cloud Integration'],
  ML: ['Python', 'OpenCV', 'MediaPipe'],
  Other: ['Flutter', 'Solidity', 'Web3.js', 'Git'],
} as const

export const contact = {
  email: 'noeljcherian07@gmail.com',
  github: 'https://github.com/Noel007-cse',
  linkedin: 'https://linkedin.com/in/noel-j-cherian',
  instagram: 'https://instagram.com/noel_j_cherian', // replace with your real handle
}