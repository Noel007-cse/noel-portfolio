<div align="center">

<img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Next.js-14+-000000?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/TailwindCSS-3+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />

<br /><br />

# 👋 Noel J Cherian — Portfolio

### *Building at the intersection of Web, AI, and IoT.*

**My personal portfolio website — showcasing projects, experience, and skills as a Computer Science undergraduate specializing in full-stack development and IoT.**

[About](#-about) • [Projects](#-projects) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Structure](#-project-structure) • [Contact](#-contact)

</div>

---

## 🧑‍💻 About

This repository contains the source code for my personal portfolio website — a single place to explore my work in web development, IoT, AI, and blockchain. The site highlights my experience as a Software Developer Intern, my hackathon-winning projects, and the tools I use to bring ideas to life.

> *Motivated Computer Science undergraduate passionate about integrating AI and IoT to solve real-world problems.*

---

## ✨ Features

- **Hero / Intro section** — quick summary, role, and call-to-action links (resume, GitHub, LinkedIn)
- **About Me** — background, current role, and interests
- **Experience timeline** — internship and work history
- **Projects showcase** — filterable cards with tech stack tags, live links, and GitHub repos
- **Skills grid** — languages, frameworks, tools, and concepts grouped by category
- **Achievements** — hackathon wins and certifications
- **Contact section** — email, phone, and social links
- **Dark / light mode** toggle
- **Fully responsive** — optimized for mobile, tablet, and desktop
- **Smooth scroll & scroll-triggered animations**

---

## 🚀 Projects

| Project | Description | Tech |
|---|---|---|
| **[LexCheck](https://lexcheck.vercel.app)** | Judgment-free, privacy-first legal awareness app helping Indian teens understand cybercrime and juvenile law risks via a RAG pipeline | Flutter, Claude/GPT-4o, RAG, Pinecone/ChromaDB |
| **[Aaroha](https://github.com/Sreehari-P-S-10/hackquest)** | De-addiction support app for Kerala with an AI companion, live map of recovery centres, and breathwork tools | Flutter, Riverpod, Groq LLaMA, OpenStreetMap |
| **[SecurePulse](https://securepulse-frontend.onrender.com)** | Unified AI-powered security scanning platform for websites, apps, and GitHub repos with real-time threat monitoring | React, Node.js, Python, Groq LLaMA, PostgreSQL |
| **IoT Water Quality Monitor** | Real-time monitoring of salinity, pH, ORP, and temperature to prevent White Spot Virus in prawn farming | ESP32, Sensors, Cloud |
| **Emotion Detection App** | Real-time facial emotion recognition using ML classification models | Python, OpenCV |
| **Mini Projects Collection** | Smart Study Planner, Spacebook, Ethereum To-Do List, AI Interviewer, and more | Solidity, Web3.js, Python, MediaPipe, Flutter |

> Full project details are pulled from `data/projects.ts` (or a CMS, if connected) and rendered dynamically on the Projects page.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Deployment** | Vercel |
| **Forms** | Resend / EmailJS (contact form) |
| **Analytics** | Vercel Analytics (privacy-friendly) |

> Update this table to match your actual stack once finalized (e.g. if using React + Vite instead of Next.js).

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm / yarn / pnpm

### 1. Clone the repository

```bash
git clone https://github.com/Noel007-cse/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=your_resend_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the site locally.

### 5. Build for production

```bash
npm run build
npm start
```

---

## 🏗 Project Structure

```
portfolio/
├── app/
│   ├── page.tsx                # Home / landing page
│   ├── projects/page.tsx       # Projects showcase
│   ├── about/page.tsx          # About page
│   └── layout.tsx              # Root layout
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── ProjectCard.tsx
│   ├── SkillsGrid.tsx
│   ├── Achievements.tsx
│   ├── Contact.tsx
│   └── Navbar.tsx
├── data/
│   ├── projects.ts             # Project details (title, tech, links)
│   ├── experience.ts           # Work experience entries
│   └── skills.ts               # Skills grouped by category
├── public/
│   ├── resume.pdf
│   └── images/
└── styles/
    └── globals.css
```

---

## 🎓 Education

**B.Tech Computer Science & Engineering** — GEC Thrissur (2023 – Present) · CGPA: 9.09

## 🏆 Achievements

- 🥈 2nd Prize — Hack@Arch 4.0, National Level Hackathon (HackQuest), GEC Thrissur
- 🥈 2nd Prize — Takedown 2.0, State Level Hackathon (IEDC TechFest), Universal Engineering College, Thrissur
- 📜 NPTEL — Internet of Things (Online Certification)

---

## 📬 Contact

- **Email:** noeljcherian07@gmail.com
- **Phone:** 7593954770
- **Location:** Thrissur, Kerala, India
- **LinkedIn:** [linkedin.com/in/noeljcherian](#)
- **GitHub:** [github.com/Noel007-cse](https://github.com/Noel007-cse)

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

**Designed & built by Noel J Cherian**

</div>
