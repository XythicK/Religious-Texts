/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldAlert, Code, Copy, Check, Info, FilePlus, ChevronDown, BookOpen } from 'lucide-react';

export default function UploadDocumentArea() {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // Form states for the visual code builder
  const [docTitle, setDocTitle] = useState('My New Document');
  const [filename, setFilename] = useState('my-document.pdf');
  const [category, setCategory] = useState<'Resume' | 'Proposal' | 'Tutorial' | 'Other'>('Resume');
  const [description, setDescription] = useState('An elegant professional overview of key specifications.');
  const [tagsInput, setTagsInput] = useState('Resume, Work');

  const formattedTags = tagsInput
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0);

  // Generate date matching the current local year logic
  const dateStr = new Date().toISOString().split('T')[0];

  // Dynamically build the typescript code block they can copy
  const generatedCode = `  {
    id: '${Math.floor(Math.random() * 1000 + 5)}',
    title: '${docTitle.replace(/'/g, "\\'")}',
    filename: '${filename.trim()}',
    url: '/${filename.trim()}',
    size: '220 KB',
    category: '${category}',
    description: '${description.replace(/'/g, "\\'")}',
    dateAdded: '${dateStr}',
    tags: ${JSON.stringify(formattedTags)},
    fileType: '${filename.toLowerCase().endsWith('.epub') ? 'epub' : 'pdf'}',
    sections: [
      {
        title: '1. EXECUTIVE CORE',
        content: [
          "This is a custom content paragraph for your document web preview reader.",
          "Add structured text records inside this array to enable high-fidelity typographic preview sheets."
        ]
      }
    ]
  }`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="private-ingestion-panel" className="bg-[#fafaf7] border border-brand-border rounded-2xl p-5 mb-5 shadow-xs">
      
      {/* Admin Security Banner */}
      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-brand-border/40 select-none">
        <ShieldAlert className="w-5 h-5 text-brand" />
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-brand uppercase block leading-none">
            Security Control
          </span>
          <h3 className="font-serif font-bold text-sm text-charcoal">
            Private Library Access Only
          </h3>
        </div>
      </div>

      <div className="bg-brand/5 border border-brand-border/50 rounded-xl p-3 mb-4 text-2xs text-[#5a5a40]/90 leading-relaxed font-sans select-text">
        <p className="font-semibold text-brand mb-1">🛡️ Public Uploads Disabled</p>
        <p>
          This portfolio is compiled as a robust static SPA. Standard visitors <strong>cannot upload or override</strong> your permanent shelf library. Only you, the repository owner, can add documents securely in code, keeping your site fully secure.
        </p>
      </div>

      <div className="mb-4">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center text-3xs font-mono font-bold text-charcoal/70 uppercase tracking-wider hover:text-charcoal transition-colors cursor-pointer select-none"
        >
          <span className="flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5 text-brand" />
            Interactive Ingestion Code builder
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-brand/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="space-y-4 pt-1">
          <p className="text-3xs text-charcoal-light/80 leading-relaxed font-sans">
            Need to add your own files? Put your PDF or EPUB in your project's <code className="font-mono bg-[#f0f0e8] text-brand px-1 py-0.5 rounded">/public/</code> folder, then use the builder below to instant-generate your catalog code:
          </p>

          <div className="space-y-3 p-3.5 bg-white border border-brand-border rounded-xl">
            {/* Input fields */}
            <div>
              <label className="block text-3xs font-semibold text-[#5a5a40]/60 uppercase tracking-wider mb-1 font-sans">
                Document Title
              </label>
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                placeholder="e.g. My Private Portfolio"
                className="w-full text-xs font-sans px-3 py-1.5 border border-brand-border rounded-lg bg-[#fafaf7] text-charcoal focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-3xs font-semibold text-[#5a5a40]/60 uppercase tracking-wider mb-1 font-sans">
                  Filename
                </label>
                <input
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder="e.g. portfolio.pdf"
                  className="w-full text-xs font-sans px-3 py-1.5 border border-brand-border rounded-lg bg-[#fafaf7] text-charcoal focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-3xs font-semibold text-[#5a5a40]/60 uppercase tracking-wider mb-1 font-sans">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full text-xs font-sans px-3 py-1.5 border border-brand-border rounded-lg bg-[#fafaf7] text-charcoal focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand appearance-none"
                  >
                    <option value="Resume">Resume</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-[#5a5a40]/60 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-3xs font-semibold text-[#5a5a40]/60 uppercase tracking-wider mb-1 font-sans">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. Resume, Design"
                  className="w-full text-xs font-sans px-3 py-1.5 border border-brand-border rounded-lg bg-[#fafaf7] text-charcoal focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-3xs font-semibold text-[#5a5a40]/60 uppercase tracking-wider mb-1 font-sans">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description of pages..."
                  rows={2}
                  className="w-full text-xs font-sans px-3 py-1.5 border border-brand-border rounded-lg bg-[#fafaf7] text-charcoal focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand resize-none"
                />
              </div>
            </div>
          </div>

          {/* Generated Code Preview Block */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <span className="text-4xs font-mono text-brand/70 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Code className="w-3 h-3" /> Auto-Generated Array Record
              </span>
              <button
                onClick={handleCopyCode}
                className="text-brand/60 hover:text-brand bg-brand/5 border border-brand/10 hover:border-brand-border-hover p-1.5 px-3 rounded-lg text-4xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Copy record to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    COPIED
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    COPY BLOCK
                  </>
                )}
              </button>
            </div>

            <div className="bg-[#f0f0e8] border border-brand-border rounded-xl p-3 overflow-hidden relative">
              <pre className="text-4xs font-mono text-charcoal overflow-x-auto max-h-[160px] whitespace-pre select-all leading-normal">
                {generatedCode}
              </pre>
            </div>
          </div>

          <div className="bg-[#f0f0e8]/50 rounded-xl p-3 border border-brand-border flex gap-2 items-start select-text leading-relaxed">
            <Info className="w-4 h-4 text-brand shrink-0 mt-0.5" />
            <div className="text-3xs font-sans text-charcoal-light/80">
              <strong className="text-brand">Final Step:</strong> Paste this block inside the main array in <code className="font-mono bg-white px-1 py-0.2 rounded border border-brand-border">src/data.ts</code>. Commit and push to GitHub so your Netlify pipeline deploys it immediately!
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
