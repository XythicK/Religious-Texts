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
    fileType: 'pdf',
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
    fileType: 'pdf',
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
    fileType: 'pdf',
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
  },
  {
    id: '4',
    title: 'The Art of Swiss Minimal Design',
    filename: 'minimal-design-essentials.epub',
    url: '/minimal-design-essentials.epub',
    size: '180 KB',
    category: 'Tutorial',
    description: 'An inspirational mini eBook handbook on Swiss typography, modular grids, negative ratios, and eye-comfort systems.',
    dateAdded: '2026-05-23',
    tags: ['eBook', 'EPUB', 'Design', 'Swiss'],
    fileType: 'epub',
    epubChapters: [
      {
        title: 'Introduction: The Swiss Legacy',
        paragraphs: [
          'Design is not the addition of heavy ornamentation, but the relentless pursuit of order, balance, and visual comfort.',
          'The mid-20th century saw pioneering Swiss typographers craft high-contrast, perfectly tracked layouts that remain the gold standard of readable human-machine communication.',
          'In this digital eBook anthology, we explore how negative space and humble natural palettes interact on paper.'
        ]
      },
      {
        title: 'Chapter I: The Magic of Negative Space',
        paragraphs: [
          'Negative space is never empty space. It is the active matrix that frames critical information and lets the user\'s eyes breathe.',
          'When desktop applications clutter their interfaces with endless status badges, system telemetry logs, or credit tags, they generate extreme cognitive drift.',
          'Keep your layout frames honest. By strictly prioritizing clean charcoal content headers on soft ivory canvases, you command attention instantly.'
        ]
      },
      {
        title: 'Chapter II: Natural Tone Palettes',
        paragraphs: [
          'Extreme high-contrast true black and white screens generate eye fatigue during prolonged research or document auditing.',
          'Subtle organic variations of slate, warm olive (#5a5a40), and soft gray-canvases mimic the physical texture of premium paper books.',
          'By utilizing cohesive light and dark color schemas, digital documents achieve a timeless, offline aesthetics feel.'
        ]
      }
    ]
  },
  {
    id: '5',
    title: 'The Holy Bible - NKJV Edition',
    filename: 'NKJV.pdf',
    url: 'https://dl.dropboxusercontent.com/scl/fi/x1xs02jfxvljm1kvbwzjd/NKJV.pdf?rlkey=7lqc7r2ba6zz62e0ikyhoj60v&st=fagorpzj&raw=1',
    size: '34.2 MB',
    category: 'Other',
    description: 'The New King James Version (NKJV) translation of the Holy Scriptures. Hosted on Dropbox cloud, fully indexable and annotated.',
    dateAdded: '2026-05-22',
    tags: ['Scripture', 'Bible', 'NKJV', 'Dropbox-Cloud'],
    fileType: 'pdf',
    sections: [
      {
        title: 'PREFACE & TRANSLATION NOTES',
        content: [
          'Welcome to your personal digital copy of the Holy Scriptures, New King James Version (NKJV), safely stored in the cloud.',
          'To bypass physical size limitations (such as GitHub\'s 25MB threshold), this catalog dynamically routes text layers directly from your custom Dropbox storage repository.',
          'This failsafe text preview enables you to leverage active digital annotations, marginal comments, and highlight markers on standard desktop or mobile viewing dimensions.'
        ]
      },
      {
        title: 'THE BOOK OF GENESIS',
        content: [
          'In the beginning God created the heavens and the earth.',
          'The earth was without form, and void; and darkness was on the face of the deep. And the Spirit of God was hovering over the face of the waters.',
          'Then God said, "Let there be light"; and there was light. And God saw the light, that it was good; and God divided the light from the darkness.',
          'God called the light Day, and the darkness He called Night. So the evening and the morning were the first day.'
        ]
      },
      {
        title: 'THE BOOK OF PSALMS (Selected)',
        content: [
          'The Lord is my shepherd; I shall not want.',
          'He makes me to lie down in green pastures; He leads me beside the still waters. He restores my soul; He leads me in the paths of righteousness for His name\'s sake.',
          'Your word is a lamp to my feet and a light to my path.'
        ]
      },
      {
        title: 'CLOUD-STORAGE INFRASTRUCTURE BENEFITS',
        content: [
          'Integrating direct file sharing structures allows you to coordinate multiple massive volumes above 25MB without bloating local repository files.',
          'Simply change the end parameters of any secure Dropbox shared link to "raw=1" to feed clean, native document byte streams into our customized, high-density reader layout.'
        ]
      }
    ]
  }
];
