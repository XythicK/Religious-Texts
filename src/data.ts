/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PDFDocument } from './types';

export const initialDocuments: PDFDocument[] = [
  {
    id: '1',
    title: 'Deployment & Storage Manual',
    filename: 'deployment-guide.pdf',
    url: '/deployment-guide.pdf',
    size: '1.4 KB',
    category: 'Tutorial',
    description: 'A quick setup setup manual to host your custom PDF Shelf website on Netlify and link it with GitHub.',
    dateAdded: '2026-05-22',
    tags: ['Hosting', 'Netlify', 'GitHub', 'CI-CD'],
    sections: [
      {
        title: '1. PROJECT REQUIREMENTS',
        content: [
          "This application compiled via Vite provides entirely static production assets in the 'dist/' directory.",
          "This output is 100% compatible with modern high-speed static hosts such as Netlify, Vercel, and GitHub Pages.",
          "No database or long-running Node processes are required to serve the frontend bundle."
        ]
      },
      {
        title: '2. STORING YOUR OWN FILES',
        content: [
          "Simply save any genuine PDF file you want inside the '/public/' folder of your source project directory.",
          "For example, you can save your file as 'public/my-resume.pdf'.",
          "Once compiled and deployed, this document will reside at your website's root URL path (e.g., yourwebsite.com/my-resume.pdf) and will load instantly inside standard embeds.",
          "Next, add its metadata records to the 'src/data.ts' catalogue array file to list it permanently in the sidebar navigator."
        ]
      },
      {
        title: '3. GIT & GITHUB LINKING CONFIGURATIONS',
        content: [
          "Initialize your local git registry:  👉  git init",
          "Add current workspace files and create a baseline revision:  👉  git add . && git commit -m \"feat: first commit\"",
          "Create your empty repository on github.com, then associate the remote pointer in your console:",
          "👉  git remote add origin https://github.com/USERNAME/REPO",
          "Publish your main branch upstream:  👉  git push -u origin main"
        ]
      },
      {
        title: '4. NETLIFY 1-CLICK DEPLOYMENT',
        content: [
          "Sign in to your free Netlify administration console and click 'Add new site' -> 'Import from an existing project'.",
          "Authorize Netlify to connect to your GitHub account and choose this active repository from your collection list.",
          "Verify the default Build Settings:",
          "🔨  Build Command: npm run build",
          "📁  Publish Directory: dist",
          "Click 'Deploy site'. Your continuous delivery pipeline is now fully operational! Every future git push will automatically build and publish live updates within seconds."
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Developer Portfolio / Resume',
    filename: 'portfolio-resume.pdf',
    url: '/portfolio-resume.pdf',
    size: '1.3 KB',
    category: 'Resume',
    description: 'An elegant professional developer resume layout showcasing skills, experience, and contact details.',
    dateAdded: '2026-05-20',
    tags: ['Resume', 'React', 'Tailwind'],
    sections: [
      {
        title: 'ALEX RIDER - SENIOR SOFTWARE DESIGNER & DEVELOPER',
        content: [
          "✉️  alex.rider@example.com   |   💻  github.com/alexrider   |   🌐  alexrider.dev",
          "Location: San Francisco, CA   |   A passionate and detail-oriented engineer dedicated to minimalist design guidelines."
        ]
      },
      {
        title: 'PROFESSIONAL SUMMARY',
        content: [
          "Creative, highly focused Software Engineer with 4+ years of professional history developing elite web programs.",
          "Strong specialization in responsive single-page applications, functional component structures, state managers, and fast client-side rendering pipelines.",
          "A solid proponent of natural, high-performance typography and eye-saving color schemes."
        ]
      },
      {
        title: 'CHRONOLOGICAL WORK EXPERIENCES',
        content: [
          "💼  Senior Frontend Developer  -  TechCorp (2024 - Present)",
          "- Engineered core responsive interface modules for an enterprise-grade analytics dashboard using React and Tailwind CSS v4.",
          "- Improved client-side listing and rendering performance by 35% through structured lazy loading, useMemo hooks, and granular state memoization.",
          "💼  Frontend Engineer  -  StartupLabs (2022 - 2024)",
          "- Developed an immersive, fully custom real-time audio analysis canvas visualization platform.",
          "- Handcrafted reusable Tailwind class design structures to guarantee perfect fluidity on multi-device formats."
        ]
      },
      {
        title: 'TECHNICAL EXPERIENCE & ACADEMICS',
        content: [
          "🛠️  Primary Frameworks: React, TypeScript, Next.js, Tailwind CSS, Express Node.js, Git, CI/CD",
          "🎓  B.S. in Computer Science & Applied Software Systems"
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Project Proposal: Lite PDF Shelf',
    filename: 'project-proposal.pdf',
    url: '/project-proposal.pdf',
    size: '1.3 KB',
    category: 'Proposal',
    description: 'Detailed project specifications, architectural milestones, and tech stack choices.',
    dateAdded: '2026-05-21',
    tags: ['Proposal', 'Design', 'Specs'],
    sections: [
      {
        title: '1. EXECUTIVE SUMMARY',
        content: [
          "The Lite PDF Shelf is a highly polished client-side workspace designed to index, store, and view portable formats.",
          "By implementing efficient browser memory management alongside clean static assets, the site delivers high-impact, zero-latency document access.",
          "This layout represents an operational paradigm shift in developer-focused document shelves."
        ]
      },
      {
        title: '2. PRIMARY PROJECT OBJECTIVES',
        content: [
          "⚡  Offline Capabilities: Provide reliable browser-native local caching options without the overhead and complexity of standard persistent server-side database servers.",
          "🎨  Design Elegance: Ensure high visual appeal using organic natural design tones that comfort the eyes during long research sessions.",
          "🚀  Zero Friction: Implement rapid copy-paste command logs to reduce human error when pushing code to Netlify production targets."
        ]
      },
      {
        title: '3. ARCHITECTURAL TECHNOLOGY STACK',
        content: [
          "🟢  Core Engine: React 19 and Vite 6 framework utilizing fully static index compilation.",
          "☘️  Visual Structure: Tailwind CSS v4 featuring organic tone palettes and custom typography integrations.",
          "☁️  Continuous Integration: GitHub webhook endpoints linking instantly with Netlify automation."
        ]
      },
      {
        title: '4. MILESTONES & IMPLEMENTATION ROADMAP',
        content: [
          "📅  Phase 1: Active state mapping, file indexing, text searching parameters, and category catalog filtering.",
          "📅  Phase 2: Typographic document preview canvas layers and customizable drag-and-drop ingestion protocols."
        ]
      }
    ]
  }
];
