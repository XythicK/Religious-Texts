/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Copy, Check, FileCode, Globe, Github, Info } from 'lucide-react';

export default function DeployGuide() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const steps = [
    {
      title: 'Store Your PDFs',
      description: 'Move your own PDF documents into the /public/ folder of this project directory. For example, save public/resume.pdf. It will be served at the root URL path.',
      badge: 'Step 1'
    },
    {
      title: 'Initialize Git & GitHub Repo',
      description: 'Initialize a new git repository, commit all files, and push them to your newly created GitHub repository.',
      badge: 'Step 2'
    },
    {
      title: 'Deploy to Netlify',
      description: 'Log in to Netlify, select "Import from Git", connect your repository, and set standard build commands.',
      badge: 'Step 3'
    }
  ];

  const commands = [
    {
      label: 'Initialize and commit codebase',
      code: 'git init\ngit add .\ngit commit -m "feat: custom pdf library"'
    },
    {
      label: 'Associate remote & push to GitHub',
      code: 'git branch -M main\ngit remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git\ngit push -u origin main'
    },
    {
      label: 'Netlify Build Settings (auto-detected)',
      code: 'Build Command:     npm run build\nPublish Directory: dist'
    }
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div id="deploy-guide-container" className="bg-[#fafaf7] border border-brand-border rounded-2xl p-5 mb-6 text-charcoal">
      <div className="flex items-center gap-2 mb-4">
        <Globe id="globe-icon" className="w-5 h-5 text-brand" />
        <h3 id="deploy-guide-title" className="font-serif font-bold text-base text-charcoal tracking-tight">
          How to Deploy on Netlify & GitHub
        </h3>
      </div>

      <p className="text-xs text-charcoal-light/80 mb-5 leading-relaxed font-sans">
        You can easily load your own collections of PDF files into this portfolio repository and host it for free on Netlify with automated continuous integration from GitHub.
      </p>

      {/* Steps List */}
      <div className="space-y-4 mb-6">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <span className="flex-none bg-brand/10 text-brand text-2xs font-semibold px-2 py-0.5 rounded border border-brand/20">
              {step.badge}
            </span>
            <div>
              <h4 className="font-serif font-bold text-sm text-charcoal leading-tight mb-1">
                {step.title}
              </h4>
              <p className="text-xs text-charcoal-light/75 leading-relaxed font-sans">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Terminal Block */}
      <div className="space-y-3">
        <span className="text-3xs font-mono text-brand/70 font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5" /> Direct Workspace Commands
        </span>

        {commands.map((cmd, idx) => (
          <div key={idx} className="bg-[#f0f0e8] rounded-xl p-3.5 border border-brand-border relative group overflow-hidden">
            <div className="flex justify-between items-center mb-1.5 select-none">
              <span className="text-3xs font-sans text-brand font-bold uppercase tracking-wider">
                {cmd.label}
              </span>
              <button
                onClick={() => copyToClipboard(cmd.code, idx)}
                className="text-brand/50 hover:text-brand p-1 rounded hover:bg-brand/10 transition-all cursor-pointer"
                title="Copy commands"
              >
                {copiedIndex === idx ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <pre className="text-xs font-mono text-charcoal overflow-x-auto whitespace-pre leading-relaxed select-all">
              {cmd.code}
            </pre>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2 items-start bg-brand/5 rounded-xl p-3 border border-brand-border/40">
        <Info className="w-4 h-4 text-brand shrink-0 mt-0.5" />
        <p className="text-2xs font-sans text-charcoal-light/80 leading-relaxed">
          <strong className="text-brand">Pro Tip:</strong> To change files in the view permanently, update the static configuration file <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-brand-border/40">src/data.ts</code> with your files' metadata matching your uploaded structures.
        </p>
      </div>
    </div>
  );
}
