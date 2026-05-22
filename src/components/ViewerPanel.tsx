/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PDFDocument } from '../types';
import { 
  FileText, 
  ExternalLink, 
  Download, 
  Compass, 
  Sparkles, 
  BookOpen, 
  Layers, 
  Eye, 
  Info, 
  Calendar, 
  Tag, 
  AlertCircle 
} from 'lucide-react';

interface ViewerPanelProps {
  doc: PDFDocument | null;
  onSelectSample: () => void;
}

export default function ViewerPanel({ doc, onSelectSample }: ViewerPanelProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'pdf'>('preview');

  if (!doc) {
    return (
      <div id="viewer-empty-state" className="h-full flex flex-col items-center justify-center p-8 bg-brand-sidebar border border-dashed border-brand-border rounded-2xl relative overflow-hidden">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 bg-radial-gradient from-brand/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-md text-center shrink-0 z-10 flex flex-col items-center animate-fade-in">
          <div className="p-4 bg-white rounded-2xl border border-brand-border text-brand shadow-sm mb-5 relative">
            <BookOpen className="w-8 h-8 text-brand animate-pulse" />
            <div className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand/40 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand"></span>
            </div>
          </div>

          <h3 className="font-serif font-bold text-xl text-charcoal tracking-tight leading-tight mb-2">
            No Document Selected
          </h3>
          <p className="text-sm text-charcoal-light/80 mb-6 leading-relaxed font-sans">
            Choose any document from your library list on the left to load the native reader, or drag & drop and upload a custom file.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <button
              onClick={onSelectSample}
              className="bg-brand hover:bg-[#4a4a35] text-white text-xs font-semibold py-2.5 px-5 rounded-xl shadow-xs hover:shadow-sm transition-all focus:outline-none flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              Load Interactive Manual
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mt-12 w-full z-10">
          <div className="bg-white p-4 border border-brand-border rounded-xl">
            <h4 className="font-serif font-bold text-xs text-charcoal flex items-center gap-2 mb-1.5 uppercase tracking-wide">
              <span className="p-1.5 bg-[#f0f0e8] text-brand rounded">
                <Layers className="w-3.5 h-3.5" />
              </span>
              Native Rendering
            </h4>
            <p className="text-2xs text-charcoal-light/75 leading-relaxed font-sans">
              Leverages your browser's highly efficient native PDF parser for sub-millisecond scrolling, instant zoom, searching, and drawing functionality.
            </p>
          </div>

          <div className="bg-white p-4 border border-brand-border rounded-xl">
            <h4 className="font-serif font-bold text-xs text-charcoal flex items-center gap-2 mb-1.5 uppercase tracking-wide">
              <span className="p-1.5 bg-brand/10 text-brand rounded">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              Drag & Drop Testing
            </h4>
            <p className="text-2xs text-charcoal-light/75 leading-relaxed font-sans">
              Verify layout compatibility with custom client-side PDF blobs instantly before putting files into Github folders.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Generate fallback sections for custom uploaded files without pre-existing content schemas
  const activeSections = doc.sections || [
    {
      title: "CUSTOM FILE LOADED",
      content: [
        `You have successfully loaded the custom document: ${doc.filename}`,
        "This file is processed entirely in your browser's sandboxed local RAM as a secure virtual Blob stream. The interface has indexed its metadata automatically."
      ]
    },
    {
      title: "SANDBOX PREVIEW DETAILS",
      content: [
        `📁  Filename: ${doc.filename}`,
        `⚖️  File Size: ${doc.size}`,
        `🏷️  Core Category: ${doc.category}`,
        `📅  Ingested At: ${doc.dateAdded}`,
        `📄  Short Summary: ${doc.description || "No current summary defined."}`
      ]
    },
    {
      title: "PERSISTENT ARCHIVE CONFIGURATION",
      content: [
        "To bypass sandboxed iframe restrictions and embed this custom document permanently with full sectional text previews, reference its details inside the static configuration file:",
        "📍  Target Location: src/data.ts",
        "Simply upload the document file to your public folder inside the project and define high-fidelity content structures to enable luxurious paper mockups!"
      ]
    }
  ];

  return (
    <div id="viewer-container" className="h-full flex flex-col bg-[#2c2c2c] text-white rounded-2xl border border-brand-border/40 overflow-hidden shadow-lg shadow-brand/10 select-none">
      
      {/* File Action Topbar toolbar */}
      <div className="px-5 py-4 bg-[#23231e] border-b border-brand-border/20 flex flex-col lg:flex-row lg:items-center justify-between gap-4 select-none shrink-0">
        
        {/* Info detail block */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2.5 bg-[#181814] text-brand rounded-xl border border-brand-border/20 grow-0 shrink-0">
            <FileText className="w-5 h-5 text-brand" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-bold text-sm text-brand-light truncate tracking-tight">
                {doc.title}
              </h2>
              <span className={`text-4xs font-sans font-semibold uppercase px-1.5 py-0.5 rounded tracking-wider border shrink-0 bg-[#181814] text-brand border-brand-border/30`}>
                {doc.category}
              </span>
            </div>
            <p className="text-3xs font-mono text-brand-light/50 truncate mt-0.5">
              {doc.filename} &bull; {doc.size}
            </p>
          </div>
        </div>

        {/* Dynamic Mode Controller & Global Actions */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Dual-Mode Selector Segment */}
          <div className="flex bg-[#181814] p-1 rounded-xl border border-brand-border/10">
            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-4xs font-bold font-sans uppercase tracking-widest transition-all cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-brand text-white shadow-xs'
                  : 'text-brand-light/50 hover:text-brand-light'
              }`}
              title="View clean web document preview (Fail-Safe)"
            >
              <Eye className="w-3 h-3" />
              Web Preview
            </button>
            <button
              onClick={() => setViewMode('pdf')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-4xs font-bold font-sans uppercase tracking-widest transition-all cursor-pointer ${
                viewMode === 'pdf'
                  ? 'bg-[#2c2c2c] text-brand-light border border-brand-border/20 shadow-xs'
                  : 'text-brand-light/50 hover:text-brand-light'
              }`}
              title="View native frame embed"
            >
              <FileText className="w-3 h-3" />
              PDF Embed
            </button>
          </div>

          {/* Separation line */}
          <div className="w-[1px] h-6 bg-brand-border/20 hidden xs:block" />

          {/* Actions Block */}
          <div className="flex items-center gap-1.5">
            <a
              href={doc.url}
              target="_blank"
              rel="noreferrer"
              className="text-2xs font-sans font-semibold bg-[#181814] hover:bg-[#2c2c2c] border border-brand-border/20 text-[#fafaf7] px-3.5 py-2.5 rounded-xl transition-all shadow-3xs flex items-center gap-1.5 cursor-pointer"
              title="Open genuine document in top-level browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-brand" />
              <span className="hidden leading-none xs:inline">Open in Tab</span>
            </a>

            <a
              href={doc.url}
              download={doc.filename}
              className="text-2xs font-sans font-semibold bg-brand hover:bg-[#4a4a35] border border-brand/20 text-white px-3.5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              title="Download PDF to device"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span className="hidden leading-none xs:inline">Download</span>
            </a>
          </div>
        </div>

      </div>

      {/* Frame Container */}
      <div className="flex-1 bg-[#1a1a15] overflow-y-auto p-3 md:p-6 relative select-text">
        {viewMode === 'preview' ? (
          /* Web Document Desk Viewport */
          <div className="w-full flex flex-col items-center">
            
            {/* The Paper sheet */}
            <div className="w-full max-w-[680px] bg-white text-charcoal rounded-sm shadow-2xl border border-brand-border/25 p-8 md:p-14 mb-8 relative flex flex-col gap-8 transition-all duration-300 transform animate-fade-in select-text">
              
              {/* Header block Accent */}
              <div className="flex justify-between items-start border-b border-brand-border/20 pb-6 select-none">
                <div className="w-24 h-1 bg-brand" />
                <span className="text-[10px] font-mono tracking-widest text-brand/50 uppercase leading-none">
                  Doc Code: AS-{doc.id} / ARCHIVE-{doc.category}
                </span>
              </div>

              {/* Title Section */}
              <div className="space-y-3">
                <h1 className="text-2xl md:text-3xl leading-snug font-serif font-bold text-charcoal tracking-tight">
                  {doc.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 pt-2 text-2xs text-brand/70 font-sans border-b border-brand-border/15 pb-4 select-none">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand/50" />
                    Indexed: {doc.dateAdded}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-brand/50" />
                    Scope: {doc.category}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-brand/50" />
                    Size: {doc.size}
                  </span>
                </div>
              </div>

              {/* Body Paragraphs Sections mapping */}
              <div className="space-y-8 select-text">
                {activeSections.map((sec, sIdx) => (
                  <section key={sIdx} className="space-y-3 group/section">
                    <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-brand border-l-2 border-brand/40 pl-2.5 leading-none mb-4 select-all">
                      {sec.title}
                    </h2>
                    <div className="space-y-3 text-xs text-charcoal-light/95 leading-relaxed font-sans">
                      {sec.content.map((pText, pIdx) => (
                        <p key={pIdx} className="indent-0 select-all">
                          {pText}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {/* Page Footer rule */}
              <div className="mt-10 pt-6 border-t border-brand-border/20 flex justify-between items-center text-[10px] font-mono text-brand/40 uppercase select-none">
                <span>PDF Portfolio Library &bull; Page 1 of 1</span>
                <span>Encrypted Client Schema</span>
              </div>
            </div>

            {/* Hint Notice */}
            <div className="w-full max-w-[680px] bg-brand-light/35 border border-brand-border/30 rounded-xl p-4 flex gap-3 text-2xs text-[#fafaf7]/70 font-sans leading-relaxed select-text">
              <Info className="w-4 h-4 text-brand shrink-0 mt-0.5" />
              <div className="space-y-1 text-brand-light/90">
                <p className="font-semibold text-brand-light">Interactive Web Preview active</p>
                <p className="text-brand-light/75">Our Fail-Safe Viewer renders documents securely using high-contrast typography. You can switch to the <strong className="text-brand underline decoration-brand/60 cursor-pointer" onClick={() => setViewMode('pdf')}>PDF Embed</strong> mode to render raw static bytes inside a browser plugin format.</p>
              </div>
            </div>

          </div>
        ) : (
          /* Native Chromium layout embed */
          <div className="w-full h-full flex flex-col gap-4">
            
            {/* Warning Header */}
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-200/90 rounded-xl p-4 flex gap-3 text-2xs font-sans leading-relaxed shrink-0">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <p className="font-semibold text-amber-200">Are you seeing a "Blocked" page or missing plugin error?</p>
                <p className="text-amber-200/70 mt-0.5">
                  Secure browser sandboxes (such as AI Studio's previews) often block active PDF extensions inside iframe components of third-party domains. Click <strong className="text-amber-200 underline">Open in Tab</strong> inside the top toolbar to view the document directly in unrestricted fullscreen context, or use <strong className="text-amber-200 underline cursor-pointer" onClick={() => setViewMode('preview')}>Web Preview</strong> mode on the left.
                </p>
              </div>
            </div>

            {/* Frame Embed */}
            <div className="flex-1 rounded-xl overflow-hidden relative border border-brand-border/30">
              <iframe
                key={doc.id} // Re-mount iframe when document changes to force refresh/prevent visual leaks
                id="pdf-render-frame"
                src={`${doc.url}#toolbar=1&navpanes=0`}
                className="w-full h-full bg-white shadow-inner"
                title={doc.title}
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Helper Advice Footer */}
      <div className="px-5 py-2.5 bg-[#23231e] border-t border-brand-border/25 flex justify-between items-center text-4xs font-mono text-brand-light/40 uppercase shrink-0">
        <span>Display Engine: Native Chromium</span>
        <span className="hidden sm:inline text-[#fafaf7]/50">Use hover overlay toolbar inside frame to paginate, print or rotate</span>
      </div>
    </div>
  );
}
