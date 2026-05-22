/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  FolderOpen, 
  HelpCircle, 
  Info, 
  ListFilter, 
  Sparkles, 
  BookOpen, 
  Github, 
  Terminal,
  Layers,
  Heart,
  ChevronRight
} from 'lucide-react';

import { PDFDocument } from './types';
import { initialDocuments } from './data';
import DocumentListItem from './components/DocumentListItem';
import UploadDocumentArea from './components/UploadDocumentArea';
import ViewerPanel from './components/ViewerPanel';
import DeployGuide from './components/DeployGuide';

export default function App() {
  const [documents, setDocuments] = useState<PDFDocument[]>(initialDocuments);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showGuide, setShowGuide] = useState(false);

  // Filter and search computation
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = 
        selectedCategory === 'All' || 
        doc.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [documents, searchQuery, selectedCategory]);

  const activeDocument = useMemo(() => {
    return documents.find(doc => doc.id === selectedDocId) || null;
  }, [documents, selectedDocId]);

  const handleAddDocument = (newDoc: PDFDocument) => {
    setDocuments(prev => [newDoc, ...prev]);
    setSelectedDocId(newDoc.id); // Automatically focus search view on the uploaded PDF
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    if (selectedDocId === id) {
      setSelectedDocId(null);
    }
  };

  const handleSelectSample = () => {
    const deploymentManual = documents.find(doc => doc.id === '1');
    if (deploymentManual) {
      setSelectedDocId(deploymentManual.id);
    }
  };

  const categories = ['All', 'Resume', 'Proposal', 'Tutorial', 'Uploaded', 'Other'];

  return (
    <div id="app-root-container" className="min-h-screen bg-[#f5f5f0] text-charcoal selection:bg-[#5a5a40]/20 selection:text-charcoal font-sans">
      
      {/* Header Bar */}
      <header id="app-header" className="sticky top-0 z-40 bg-white/50 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand text-brand-light rounded-full flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-mono text-3xs uppercase tracking-widest text-brand/75 font-semibold leading-none block">
                Document Archive
              </span>
              <h1 className="font-serif font-bold text-base text-charcoal tracking-tight leading-normal">
                PDF Library & Viewer
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className={`p-2.5 rounded-xl text-xs font-sans font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                showGuide 
                  ? 'bg-brand border-brand text-white shadow-xs' 
                  : 'bg-[#fafaf7] border-brand-border hover:border-brand-border-hover text-charcoal/70 hover:text-charcoal'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Deployment Guide</span>
            </button>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl border border-brand-border hover:border-brand-border-hover text-charcoal/70 hover:text-charcoal bg-[#fafaf7] transition-all text-xs font-sans font-semibold flex items-center gap-1.5 hidden xs:flex"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Grid View */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 lg:py-8">
        
        {/* Dual pane section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left panel: Catalog, filters, guides (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Deployment Instructions Banner */}
            <AnimatePresence>
              {showGuide && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <DeployGuide />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Document Catalog Controls */}
            <div className="bg-[#fafaf7] border border-brand-border rounded-2xl p-5 shadow-xs">
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4.5 h-4.5 text-brand" />
                  <h3 className="font-serif font-bold text-sm text-charcoal tracking-tight">
                    Document Collections ({filteredDocuments.length})
                  </h3>
                </div>
                
                <span className="text-3xs font-mono text-brand/70 bg-brand/5 px-2 py-0.5 rounded border border-brand-border">
                  Total stored: {documents.length}
                </span>
              </div>

              {/* Search Bar Input */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 text-brand/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search PDFs by title, keywords or tags..."
                  className="w-full text-xs font-sans pl-9 pr-4 py-2.5 border border-brand-border hover:border-brand-border-hover focus:border-brand rounded-xl focus:outline-none focus:ring-1 focus:ring-brand bg-[#f1f1e9]/50 text-charcoal placeholder-charcoal/40"
                />
              </div>

              {/* Category selector pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-1">
                <ListFilter className="w-3.5 h-3.5 text-brand/50 shrink-0 mr-1" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-2xs font-medium font-sans px-2.5 py-1 rounded-lg border transition-all cursor-pointer shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-brand border-brand text-white'
                        : 'bg-white border-brand-border hover:border-brand-border-hover text-charcoal/70 hover:text-charcoal'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Document Catalog Grid/List */}
            <div id="catalog-list" className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <DocumentListItem
                    key={doc.id}
                    doc={doc}
                    isSelected={selectedDocId === doc.id}
                    onSelect={(d) => setSelectedDocId(d.id)}
                    onDelete={handleDeleteDocument}
                  />
                ))
              ) : (
                <div className="text-center py-10 bg-brand-sidebar border border-brand-border rounded-xl">
                  <FolderOpen className="w-8 h-8 text-brand/40 mx-auto mb-2" />
                  <p className="text-xs font-medium text-charcoal/80 font-sans">No matching PDFs found</p>
                  <p className="text-3xs text-charcoal/50 font-sans mt-1">Try resetting search filters or file queries.</p>
                </div>
              )}
            </div>

            {/* Inline Upload Form */}
            <UploadDocumentArea onAddDocument={handleAddDocument} />

          </div>

          {/* Right panel: Static high-contrast PDF viewport (Span 7) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 h-[450px] sm:h-[600px] lg:h-[calc(100vh-120px)]">
            <ViewerPanel 
              doc={activeDocument} 
              onSelectSample={handleSelectSample}
            />
          </div>

        </div>

      </main>

      {/* Footer copyright */}
      <footer id="app-footer" className="mt-20 border-t border-brand-border bg-brand-sidebar py-10 select-none text-charcoal-light">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand/60" />
            <span>&copy; 2026 PDF Library and Viewer. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1.5 text-2xs">
            <span>Crafted for portfolio showcasing</span>
            <Heart className="w-3 h-3 text-brand fill-current" />
            <span>and zero-compile Netlify hosting</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
