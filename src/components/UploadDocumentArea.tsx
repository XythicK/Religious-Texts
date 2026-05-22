/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Upload, X, FilePlus, ChevronDown, Sparkles } from 'lucide-react';
import { PDFDocument } from '../types';

interface UploadDocumentAreaProps {
  onAddDocument: (doc: PDFDocument) => void;
}

export default function UploadDocumentArea({ onAddDocument }: UploadDocumentAreaProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<PDFDocument['category']>('Uploaded');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (selectedFile: File) => {
    setError(null);
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      // Pre-fill Title with a cleaned up version of the filename
      const cleanedTitle = selectedFile.name
        .replace(/\.[^/.]+$/, "") // remove extension
        .replace(/[_-]/g, " ")    // replace dashes and underscores with spaces
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setTitle(cleanedTitle);
      setShowConfig(true);
    } else {
      setError("Invalid file format. Please render an actual PDF (.pdf) file.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 1;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setCategory('Uploaded');
    setDescription('');
    setTagsInput('');
    setShowConfig(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    // Create a local safe temporary URL
    const fileUrl = URL.createObjectURL(file);
    const sizeStr = formatFileSize(file.size);
    const dateStr = new Date().toISOString().split('T')[0];
    const tagsArray = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newDoc: PDFDocument = {
      id: `custom_${Date.now()}`,
      title: title || file.name,
      filename: file.name,
      url: fileUrl,
      size: sizeStr,
      category: category,
      description: description || `Uploaded file: ${file.name}`,
      dateAdded: dateStr,
      tags: tagsArray.length > 0 ? tagsArray : ['My Files'],
      isCustomUploaded: true
    };

    onAddDocument(newDoc);
    resetForm();
  };

  return (
    <div id="upload-panel-container" className="bg-[#fafaf7] border border-brand-border rounded-2xl p-5 mb-5 shadow-xs">
      <div className="flex items-center gap-2 mb-3">
        <Upload className="w-4 h-4 text-brand" />
        <h3 className="font-serif font-bold text-sm text-charcoal">
          Upload PDF File To View
        </h3>
      </div>

      <p className="text-xs text-charcoal-light/75 mb-4 leading-normal font-sans">
        Test your own PDFs in this live reader. Added files run safely entirely in your browser memory.
      </p>

      {error && (
        <div className="bg-rose-50 border border-rose-100 text-rose-700 text-xs px-3.5 py-2 rounded-lg mb-4 flex items-center justify-between">
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)} className="text-rose-500 hover:text-rose-800 font-bold ml-2 text-sm shrink-0 leading-none">
            &times;
          </button>
        </div>
      )}

      {!file ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? 'border-brand bg-brand/10 scale-[0.99]'
              : 'border-brand-border/60 hover:border-brand-border-hover hover:bg-brand-sidebar bg-white'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="p-3 bg-brand-light rounded-lg text-brand mb-2 border border-brand-border/40 shadow-3xs">
            <Upload className="w-5 h-5 text-brand" />
          </div>
          <span className="text-xs font-semibold text-charcoal font-sans text-center">
            Drag & Drop your PDF document here
          </span>
          <span className="text-3xs text-charcoal-light/60 font-sans mt-1 text-center">
            Or Click to browse local folders
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start justify-between bg-brand-sidebar rounded-lg p-3 border border-brand-border">
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-1.5 bg-brand/10 text-brand rounded-md">
                <FilePlus className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-mono text-charcoal truncate font-semibold">
                  {file.name}
                </p>
                <p className="text-3xs text-[#5a5a40]/60 font-mono">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={resetForm}
              className="text-[#5a5a40]/50 hover:text-charcoal p-1 hover:bg-[#5a5a40]/5 rounded-md transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-3xs font-semibold text-[#5a5a40]/60 uppercase tracking-wider mb-1 font-sans">
                Document Title
              </label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. My Custom Statement"
                className="w-full text-xs font-sans px-3 py-2 border border-brand-border rounded-lg bg-white text-charcoal focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-3xs font-semibold text-[#5a5a40]/60 uppercase tracking-wider mb-1 font-sans">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as PDFDocument['category'])}
                    className="w-full text-xs font-sans px-3 py-2 border border-brand-border rounded-lg bg-white text-charcoal focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand appearance-none"
                  >
                    <option value="Uploaded">Uploaded</option>
                    <option value="Resume">Resume</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-[#5a5a40]/60 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-3xs font-semibold text-[#5a5a40]/60 uppercase tracking-wider mb-1 font-sans">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. Work, Invoice"
                  className="w-full text-xs font-sans px-3 py-2 border border-brand-border rounded-lg bg-white text-charcoal focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                />
              </div>
            </div>

            <div>
              <label className="block text-3xs font-semibold text-[#5a5a40]/60 uppercase tracking-wider mb-1 font-sans">
                Short Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this document..."
                rows={2}
                className="w-full text-xs font-sans px-3 py-2 border border-brand-border rounded-lg bg-white text-charcoal focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand hover:bg-[#4a4a35] text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current text-white" />
            Add to Document Catalog
          </button>
        </form>
      )}
    </div>
  );
}
