/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PDFDocument, FileAnnotation } from '../types';
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
  AlertCircle,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  MessageSquare
} from 'lucide-react';
import AnnotationToolshelf from './AnnotationToolshelf';

interface ViewerPanelProps {
  doc: PDFDocument | null;
  onSelectSample: () => void;
}

export default function ViewerPanel({ doc, onSelectSample }: ViewerPanelProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'pdf'>('preview');
  const [viewerTheme, setViewerTheme] = useState<'light' | 'dark' | 'sepia'>('light');
  const [epubChapterIdx, setEpubChapterIdx] = useState(0);
  const [activeParagraph, setActiveParagraph] = useState<{ sectionIndex: number; paragraphIndex: number } | null>(null);
  const [pdfInverted, setPdfInverted] = useState(false);
  
  // Local state for local annotations loaded dynamically
  const [annotations, setAnnotations] = useState<FileAnnotation[]>([]);

  // Load annotations from localStorage inside client-side sandbox
  useEffect(() => {
    try {
      const saved = localStorage.getItem('library_annotations');
      if (saved) {
        setAnnotations(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Local storage read error: ", e);
    }
  }, []);

  // Sync state on document modifications or changes to prevent spillover
  useEffect(() => {
    setEpubChapterIdx(0);
    setActiveParagraph(null);
  }, [doc?.id]);

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
            No eBook or PDF Loaded
          </h3>
          <p className="text-sm text-charcoal-light/80 mb-6 leading-relaxed font-sans">
            Choose any document from your library listing, test simulated EPUB chapters, or drag & drop custom files to activate highlights & annotations.
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
              EPUB & PDF Reader
            </h4>
            <p className="text-2xs text-charcoal-light/75 leading-relaxed font-sans">
              Seamlessly swap between high-fidelity Web previews, paginated eBook formats, and raw native browser PDF sandboxes.
            </p>
          </div>

          <div className="bg-white p-4 border border-brand-border rounded-xl">
            <h4 className="font-serif font-bold text-xs text-charcoal flex items-center gap-2 mb-1.5 uppercase tracking-wide">
              <span className="p-1.5 bg-brand/10 text-brand rounded">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              Saved Annotations
            </h4>
            <p className="text-2xs text-charcoal-light/75 leading-relaxed font-sans">
              Double-click or tap any paragraph node to write structural review margins, highlights, and quote bookmarks preserved directly in your browser.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Generate fallback sections for custom non-formatted files
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

  // Colors mapping for highlights on text nodes
  const getHighlightClass = (color: FileAnnotation['color']) => {
    switch (color) {
      case 'olive': return 'bg-[#5a5a40]/25 text-inherit border-l-4 border-[#5a5a40] pl-1.5 pr-1 py-0.5 rounded-sm';
      case 'amber': return 'bg-yellow-500/20 text-inherit border-l-4 border-amber-500 pl-1.5 pr-1 py-0.5 rounded-sm';
      case 'rose': return 'bg-rose-500/20 text-inherit border-l-4 border-rose-500 pl-1.5 pr-1 py-0.5 rounded-sm';
      case 'slate': return 'bg-slate-500/25 text-inherit border-l-4 border-slate-500 pl-1.5 pr-1 py-0.5 rounded-sm';
      default: return '';
    }
  };

  // Persistent localStorage helper functions
  const handleSaveAnnotation = (color: FileAnnotation['color'], note: string) => {
    if (activeParagraph === null) return;
    const { sectionIndex, paragraphIndex } = activeParagraph;
    
    // Parse text
    let paragraphText = "";
    if (doc.fileType === 'epub' && doc.epubChapters) {
      paragraphText = doc.epubChapters[sectionIndex]?.paragraphs[paragraphIndex] || "";
    } else {
      paragraphText = activeSections[sectionIndex]?.content[paragraphIndex] || "";
    }

    // Filter existing
    const cleanList = annotations.filter(
      a => !(a.documentId === doc.id && a.sectionIndex === sectionIndex && a.paragraphIndex === paragraphIndex)
    );

    const newAnn: FileAnnotation = {
      id: `ann_${Date.now()}`,
      documentId: doc.id,
      sectionIndex,
      paragraphIndex,
      text: paragraphText,
      type: 'highlight',
      color,
      note: note.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    const updated = [...cleanList, newAnn];
    setAnnotations(updated);
    try {
      localStorage.setItem('library_annotations', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    setActiveParagraph(null);
  };

  const handleDeleteAnnotation = () => {
    if (activeParagraph === null) return;
    const { sectionIndex, paragraphIndex } = activeParagraph;

    const updated = annotations.filter(
      a => !(a.documentId === doc.id && a.sectionIndex === sectionIndex && a.paragraphIndex === paragraphIndex)
    );
    setAnnotations(updated);
    try {
      localStorage.setItem('library_annotations', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    setActiveParagraph(null);
  };

  // Multi-theme layout mapping for reader sheets
  const themeStyles = {
    light: {
      outerBg: 'bg-[#1a1a15]',
      sheetBg: 'bg-white text-charcoal border-brand-border/25',
      title: 'text-charcoal',
      pText: 'text-charcoal-light/95',
      sectionHeading: 'text-brand border-brand/40',
      tagBadge: 'bg-[#181814] text-brand border-brand-border/30',
      metaLabel: 'text-brand/70',
      helpBox: 'bg-brand-light/35 border-brand-border/30 text-brand-light',
      footerLine: 'border-brand-border/20 text-brand/40',
      accentLine: 'bg-brand',
      epubBtn: 'bg-[#fafaf7] text-charcoal border-brand-border hover:bg-brand-sidebar'
    },
    dark: {
      outerBg: 'bg-[#12120e]',
      sheetBg: 'bg-[#21211b] text-[#efefe9] border-brand-border/10',
      title: 'text-[#efefe9]',
      pText: 'text-[#cfcfc5]',
      sectionHeading: 'text-brand border-brand-light/25',
      tagBadge: 'bg-[#12120e] text-brand border-[#3a3a31]',
      metaLabel: 'text-brand-light/80',
      helpBox: 'bg-[#2a2a22] border-brand-border/15 text-brand-light/70',
      footerLine: 'border-brand-border/10 text-brand-light/30',
      accentLine: 'bg-brand',
      epubBtn: 'bg-[#2a2a22] text-[#efefe9] border-[#3a3a31] hover:bg-[#34342a]'
    },
    sepia: {
      outerBg: 'bg-[#dfcead]/60',
      sheetBg: 'bg-[#f4ebd0] text-[#3e311f] border-[#dacfa3]',
      title: 'text-[#3e311f]',
      pText: 'text-[#56432b]',
      sectionHeading: 'text-[#875c1a] border-[#d4be83]',
      tagBadge: 'bg-[#eedfa8] text-[#875c1a] border-[#dacfa5]',
      metaLabel: 'text-[#875c1a]/85',
      helpBox: 'bg-[#ebdcb4] border-[#dfce8b] text-[#6a5330]',
      footerLine: 'border-[#dfce8b] text-[#875c1a]/55',
      accentLine: 'bg-[#875c1a]',
      epubBtn: 'bg-[#eedfa8] text-[#3e311f] border-[#dfce8b] hover:bg-[#ebdca6]'
    }
  };

  const activeTheme = themeStyles[viewerTheme];
  const isEpubType = doc.fileType === 'epub';

  return (
    <div id="viewer-container" className="h-full flex flex-col bg-[#2c2c2c] text-white rounded-2xl border border-brand-border/40 overflow-hidden shadow-lg shadow-brand/10 select-none">
      
      {/* File Action Topbar toolbar */}
      <div className="px-5 py-4 bg-[#23231e] border-b border-brand-border/20 flex flex-col xl:flex-row xl:items-center justify-between gap-4 select-none shrink-0">
        
        {/* Info detail block */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2.5 bg-[#181814] text-brand rounded-xl border border-brand-border/20 grow-0 shrink-0">
            {isEpubType ? (
              <BookOpen className="w-5 h-5 text-brand" />
            ) : (
              <FileText className="w-5 h-5 text-brand" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-bold text-sm text-brand-light truncate tracking-tight">
                {doc.title}
              </h2>
              <span className={`text-4xs font-sans font-semibold uppercase px-1.5 py-0.5 rounded tracking-wider border shrink-0 bg-[#181814] text-brand border-brand-border/30`}>
                {isEpubType ? 'EPUB' : doc.category}
              </span>
            </div>
            <p className="text-3xs font-mono text-brand-light/50 truncate mt-0.5">
              {doc.filename} &bull; {doc.size}
            </p>
          </div>
        </div>

        {/* Dynamic Theme selection, View Switchers, & Actions */}
        <div className="flex flex-wrap items-center gap-4">
          
          {/* E-Reader Theme Pickers */}
          <div className="flex items-center gap-2 bg-[#181814] p-1 rounded-xl border border-brand-border/10">
            <span className="text-[9px] font-mono uppercase tracking-wider text-brand-light/40 px-2 pl-2">Theme:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setViewerTheme('light')}
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                  viewerTheme === 'light' ? 'bg-[#2c2c2c] text-white border border-[#4a4a3a]' : 'text-brand-light/55 hover:text-white'
                }`}
                title="Sleek Light Contrast (Paper)"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewerTheme('dark')}
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                  viewerTheme === 'dark' ? 'bg-[#2c2c2c] text-[#fafaf2] border border-[#4a4a3a]' : 'text-brand-light/55 hover:text-white'
                }`}
                title="Composed Dark Midnight"
              >
                <Moon className="w-3.5 h-3.5 text-yellow-300" />
              </button>
              <button
                onClick={() => setViewerTheme('sepia')}
                className={`text-4xs font-serif font-bold w-6 h-6 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                  viewerTheme === 'sepia' ? 'bg-[#dfcead] text-[#432f14] border border-[#bfa472]' : 'text-orange-200/50 hover:text-orange-100'
                }`}
                title="Warm Ergonomic Sepia"
              >
                S
              </button>
            </div>
          </div>

          {/* Mode Selector Segment (Only relevant for genuine files / pdf embeddings) */}
          <div className="flex bg-[#181814] p-1 rounded-xl border border-brand-border/10">
            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-4xs font-bold font-sans uppercase tracking-widest transition-all cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-brand text-white shadow-xs'
                  : 'text-brand-light/50 hover:text-brand-light'
              }`}
              title="View fail-safe interactive web text layer (Annotations supported!)"
            >
              <Eye className="w-3 h-3" />
              {isEpubType ? 'EPUB Book' : 'Web Preview'}
            </button>
            
            {!isEpubType && (
              <button
                onClick={() => setViewMode('pdf')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-4xs font-bold font-sans uppercase tracking-widest transition-all cursor-pointer ${
                  viewMode === 'pdf'
                    ? 'bg-[#2c2c2c] text-brand-light border border-brand-border/20 shadow-xs'
                    : 'text-brand-light/50 hover:text-brand-light'
                }`}
                title="View native frame PDF plug-in"
              >
                <FileText className="w-3 h-3" />
                PDF Embed
              </button>
            )}
          </div>

          {/* Separation line */}
          <div className="w-[1px] h-6 bg-brand-border/20 hidden screen-sm:block" />

          {/* Actions Block */}
          <div className="flex items-center gap-1.5">
            <a
              href={doc.url}
              target="_blank"
              rel="noreferrer"
              className="text-2xs font-sans font-semibold bg-[#181814] hover:bg-[#2c2c2c] border border-brand-border/20 text-[#fafaf7] px-3.5 py-2.5 rounded-xl transition-all shadow-3xs flex items-center gap-1.5 cursor-pointer"
              title="Open document in unrestricted upper browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-brand" />
              <span className="hidden bg-transparent screen-md:inline">Open in Tab</span>
            </a>

            {!doc.isCustomUploaded && (
              <a
                href={doc.url}
                download={doc.filename}
                className="text-2xs font-sans font-semibold bg-brand hover:bg-[#4a4a35] border border-brand/20 text-white px-3.5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                title="Download file to device desktop"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                <span className="hidden bg-transparent screen-md:inline">Download</span>
              </a>
            )}
          </div>
        </div>

      </div>

      {/* Frame Container */}
      <div className={`flex-1 ${activeTheme.outerBg} overflow-y-auto p-3 md:p-6 relative select-text transition-colors duration-200`}>
        {viewMode === 'preview' ? (
          /* Web Document Desk Viewport (PDF summaries and paginated EPUBs) */
          <div className="w-full flex flex-col items-center">
            
            {/* The Paper sheet */}
            <div className={`w-full max-w-[680px] ${activeTheme.sheetBg} rounded-sm shadow-2xl border p-6 md:p-14 mb-8 relative flex flex-col gap-6 transition-all duration-300 transform animate-fade-in select-text`}>
              
              {/* Header block Accent */}
              <div className="flex justify-between items-start border-b border-brand-border/10 pb-4 select-none">
                <div className={`w-24 h-1 ${activeTheme.accentLine}`} />
                <span className={`text-[10px] font-mono tracking-widest uppercase leading-none ${activeTheme.metaLabel}/50`}>
                  {isEpubType ? `CHAPTER ${epubChapterIdx + 1} OF ${doc.epubChapters?.length}` : `CODE: AS-${doc.id}`}
                </span>
              </div>

              {/* Title Section */}
              <div className="space-y-3">
                <h1 className={`text-xl md:text-2xl leading-snug font-serif font-bold tracking-tight ${activeTheme.title}`}>
                  {isEpubType && doc.epubChapters 
                    ? doc.epubChapters[epubChapterIdx]?.title 
                    : doc.title
                  }
                </h1>
                
                {/* Meta block */}
                <div className={`flex flex-wrap items-center gap-3 pt-1 text-4xs font-sans border-b border-brand-border/10 pb-3 select-none ${activeTheme.metaLabel}`}>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-brand/60" />
                    Indexed: {doc.dateAdded}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-brand/60" />
                    Format: {isEpubType ? 'EPUB' : doc.category}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3 text-brand/60" />
                    Size: {doc.size}
                  </span>
                </div>
              </div>

              {/* Dynamic Pages / Chapters controls for EPUB ebooks */}
              {isEpubType && doc.epubChapters && (
                <div className="flex items-center justify-between pb-4 border-b border-brand-border/10 mb-2 select-none">
                  <span className="text-3xs font-mono font-medium tracking-wide uppercase opacity-70">
                    Book Chapters Index
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={epubChapterIdx === 0}
                      onClick={() => {
                        setEpubChapterIdx(prev => prev - 1);
                        setActiveParagraph(null);
                      }}
                      className={`p-1.5 rounded-lg border transition-colors flex items-center justify-center cursor-pointer ${activeTheme.epubBtn} ${
                        epubChapterIdx === 0 ? 'opacity-30 cursor-not-allowed' : ''
                      }`}
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-3xs font-mono font-bold">
                      {epubChapterIdx + 1} / {doc.epubChapters.length}
                    </span>
                    <button
                      disabled={epubChapterIdx === doc.epubChapters.length - 1}
                      onClick={() => {
                        setEpubChapterIdx(prev => prev + 1);
                        setActiveParagraph(null);
                      }}
                      className={`p-1.5 rounded-lg border transition-colors flex items-center justify-center cursor-pointer ${activeTheme.epubBtn} ${
                        epubChapterIdx === doc.epubChapters.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
                      }`}
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Body Texts Sections with unified highlights & comments */}
              <div className="space-y-6 select-text">
                {isEpubType && doc.epubChapters ? (
                  /* Render eBook layout */
                  <div className="space-y-4">
                    {doc.epubChapters[epubChapterIdx]?.paragraphs.map((paragraphsTxt, pIdx) => {
                      const ann = annotations.find(
                        a => a.documentId === doc.id && a.sectionIndex === epubChapterIdx && a.paragraphIndex === pIdx
                      );
                      const isSelected = activeParagraph?.sectionIndex === epubChapterIdx && activeParagraph?.paragraphIndex === pIdx;

                      return (
                        <div key={pIdx} className="space-y-2 select-text">
                          <p
                            onClick={() => setActiveParagraph({ sectionIndex: epubChapterIdx, paragraphIndex: pIdx })}
                            className={`text-xs md:text-sm font-sans leading-relaxed p-1.5 rounded transition-colors cursor-pointer select-all ${
                              ann ? getHighlightClass(ann.color) : 'hover:bg-brand/5'
                            } ${activeTheme.pText}`}
                            title="Click passage to Highlight or Memorize"
                          >
                            {paragraphsTxt}
                          </p>

                          {ann && ann.note && (
                            <div className="mx-2 p-3 bg-brand-light/10 border-l-2 border-brand/50 rounded-r-lg text-4xs italic flex items-start gap-2 select-all relative">
                              <MessageSquare className="w-3 h-3 text-brand shrink-0 mt-0.5" />
                              <div className="space-y-0.5 min-w-0">
                                <span className="font-sans font-bold not-italic text-[9px] text-brand/80 uppercase tracking-widest block">Review Note:</span>
                                <p className="opacity-90">{ann.note}</p>
                              </div>
                            </div>
                          )}

                          {isSelected && (
                            <AnnotationToolshelf
                              documentId={doc.id}
                              sectionIndex={epubChapterIdx}
                              paragraphIndex={pIdx}
                              text={paragraphsTxt}
                              existingAnn={ann}
                              onSave={handleSaveAnnotation}
                              onDelete={handleDeleteAnnotation}
                              onClose={() => setActiveParagraph(null)}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Render structured Document web preview layout */
                  activeSections.map((sec, sIdx) => (
                    <section key={sIdx} className="space-y-3 group/section">
                      <h2 className={`text-xs font-sans font-bold uppercase tracking-wider border-l-2 pl-2.5 leading-none mb-3 select-all ${activeTheme.sectionHeading}`}>
                        {sec.title}
                      </h2>
                      <div className="space-y-3">
                        {sec.content.map((pText, pIdx) => {
                          const ann = annotations.find(
                            a => a.documentId === doc.id && a.sectionIndex === sIdx && a.paragraphIndex === pIdx
                          );
                          const isSelected = activeParagraph?.sectionIndex === sIdx && activeParagraph?.paragraphIndex === pIdx;

                          return (
                            <div key={pIdx} className="space-y-2 select-text">
                              <p
                                onClick={() => setActiveParagraph({ sectionIndex: sIdx, paragraphIndex: pIdx })}
                                className={`text-xs md:text-sm font-sans leading-relaxed p-1.5 rounded transition-colors cursor-pointer select-all ${
                                  ann ? getHighlightClass(ann.color) : 'hover:bg-brand/5'
                                } ${activeTheme.pText}`}
                                title="Click text block to Highlight or Memorize"
                              >
                                {pText}
                              </p>

                              {ann && ann.note && (
                                <div className="mx-2 p-3 bg-brand-light/10 border-l-2 border-brand/50 rounded-r-lg text-4xs italic flex items-start gap-2 select-all relative">
                                  <MessageSquare className="w-3 h-3 text-brand shrink-0 mt-0.5" />
                                  <div className="space-y-0.5 min-w-0">
                                    <span className="font-sans font-bold not-italic text-[9px] text-brand/80 uppercase tracking-widest block">Review Note:</span>
                                    <p className="opacity-90">{ann.note}</p>
                                  </div>
                                </div>
                              )}

                              {isSelected && (
                                <AnnotationToolshelf
                                  documentId={doc.id}
                                  sectionIndex={sIdx}
                                  paragraphIndex={pIdx}
                                  text={pText}
                                  existingAnn={ann}
                                  onSave={handleSaveAnnotation}
                                  onDelete={handleDeleteAnnotation}
                                  onClose={() => setActiveParagraph(null)}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  ))
                )}
              </div>

              {/* Page Footer rule */}
              <div className={`mt-8 pt-4 border-t flex justify-between items-center text-[10px] font-mono uppercase select-none ${activeTheme.footerLine}`}>
                <span>{isEpubType ? "Scholarly eBook Navigator" : "PDF Modular Shelf Schema"} &bull; Ref Log AS-{doc.id}</span>
                <span>Active local cache</span>
              </div>
            </div>

            {/* Hint Notice */}
            <div className={`w-full max-w-[680px] rounded-xl p-4 flex gap-3 text-2xs font-sans leading-relaxed select-text ${activeTheme.helpBox}`}>
              <Info className="w-4 h-4 text-brand shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">{isEpubType ? 'EPUB Reader Mode' : 'Interactive Web Preview Mode'}</p>
                <p className="opacity-80">
                  {isEpubType 
                    ? "Renders clean virtual page layers natively with precise modular spacing. Click on any block quote or paragraph to paint colors, add highlights, or write marginal review citations."
                    : "For reading ease, annotations map directly to text blocks. You can view or toggle layouts using the top-bar switchers."
                  }
                </p>
              </div>
            </div>

          </div>
        ) : (
          /* Native Chromium layout embed */
          <div className="w-full h-full flex flex-col gap-4">
            
            {/* Warning Header & Dark Inverter Toggle */}
            <div className="bg-[#2a2a22] border border-brand-border/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex gap-3 text-2xs font-sans leading-relaxed select-text">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-brand-light">Using Native PDF Frame Mode?</p>
                  <p className="text-brand-light/60 mt-0.5">
                    If browser plugins are restricted or blocked inside sandbox panels, switch to raw <strong className="text-brand underline cursor-pointer" onClick={() => setViewMode('preview')}>Web Preview</strong> or click <strong className="text-brand underline">Open in Tab</strong>.
                  </p>
                </div>
              </div>

              {/* Inversion Trigger */}
              <button
                onClick={() => setPdfInverted(!pdfInverted)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-4xs font-bold font-sans uppercase tracking-widest transition-colors cursor-pointer ${
                  pdfInverted 
                    ? 'bg-brand text-white' 
                    : 'bg-[#1e1e19] text-brand-light border border-white/5 hover:border-white/10'
                }`}
                title="Inverts native PDF styling to deliver a magnificent late-night reader experience!"
              >
                <Moon className="w-3 h-3 text-yellow-100" />
                {pdfInverted ? 'NORMAL PDF' : 'INVERT DARK PDF'}
              </button>
            </div>

            {/* Frame Embed with conditional hardware CSS inversion */}
            <div 
              className="flex-1 rounded-xl overflow-hidden relative border border-brand-border/30 transition-all duration-300"
              style={{ filter: pdfInverted ? 'invert(90%) hue-rotate(180deg)' : 'none' }}
            >
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
      <div className="px-5 py-2.5 bg-[#23231e] border-t border-brand-border/25 flex justify-between items-center text-4xs font-mono text-brand-light/30 uppercase shrink-0">
        <span>Display Engine: CLIENT SANDBOX MODULES</span>
        <span className="hidden sm:inline text-[#fafaf7]/40">Click text nodes to review annotations &middot; Toggle Light/Dark/Sepia themes at top</span>
      </div>
    </div>
  );
}
