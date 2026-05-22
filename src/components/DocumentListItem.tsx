/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PDFDocument } from '../types';
import { FileText, Calendar, HardDrive, Trash2, Tag, ArrowRight } from 'lucide-react';

interface DocumentListItemProps {
  key?: string;
  doc: PDFDocument;
  isSelected: boolean;
  onSelect: (doc: PDFDocument) => void;
  onDelete?: (id: string) => void;
}

export default function DocumentListItem({ doc, isSelected, onSelect, onDelete }: DocumentListItemProps) {
  const categoryColors = {
    Resume: 'bg-emerald-50/80 text-emerald-800 border-emerald-100',
    Proposal: 'bg-indigo-50/80 text-indigo-800 border-indigo-100',
    Tutorial: 'bg-amber-50/80 text-amber-800 border-amber-100',
    Uploaded: 'bg-brand/10 text-brand border-brand/20',
    Other: 'bg-slate-100/85 text-slate-705 border-slate-200',
  };

  const getCategoryTheme = (cat: typeof doc.category) => {
    return categoryColors[cat] || categoryColors.Other;
  };

  return (
    <div
      onClick={() => onSelect(doc)}
      id={`doc-item-${doc.id}`}
      className={`group relative flex flex-col p-4 rounded-xl border transition-all duration-250 cursor-pointer ${
        isSelected
          ? 'bg-[#fafaf7] border-brand ring-1 ring-brand/50 shadow-sm shadow-brand/5 text-charcoal'
          : 'bg-white border-brand-border hover:border-brand-border-hover hover:bg-brand-sidebar text-charcoal/90'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Document Icon & Title Info */}
        <div className="flex gap-3">
          <div
            className={`p-2 rounded-lg transition-colors shrink-0 ${
              isSelected ? 'bg-brand text-white' : 'bg-brand-light text-brand group-hover:bg-brand/10'
            }`}
          >
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-semibold text-sm leading-snug tracking-tight text-charcoal group-hover:text-black">
              {doc.title}
            </h4>
            <p className="text-2xs font-mono text-charcoal-light/80 mt-1 uppercase tracking-wide">
              {doc.filename}
            </p>
          </div>
        </div>

        {/* Delete Button for User Uploaded Documents */}
        {doc.isCustomUploaded && onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(doc.id);
            }}
            className="text-[#5a5a40]/50 hover:text-rose-650 p-1 rounded-md hover:bg-rose-50 transition-colors"
            title="Remove document"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="text-xs text-charcoal-light/75 mt-2.5 line-clamp-2 leading-relaxed">
        {doc.description || 'No description provided.'}
      </p>

      {/* Metadata Badges Footer */}
      <div className="flex flex-wrap items-center gap-1.5 mt-3.5 pt-3 border-t border-brand-border group-hover:border-brand-border-hover">
        <span className={`text-2xs font-sans font-medium px-2 py-0.5 rounded border ${getCategoryTheme(doc.category)}`}>
          {doc.category}
        </span>

        <span className="flex items-center gap-1 text-2xs text-brand/60 font-mono">
          <HardDrive className="w-3 h-3" />
          {doc.size}
        </span>

        <span className="flex items-center gap-1 text-brand/60 font-mono ml-auto">
          <Calendar className="w-3 h-3" />
          {doc.dateAdded}
        </span>
      </div>

      {doc.tags && doc.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {doc.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-0.5 text-3xs font-medium font-sans text-brand/65 bg-brand-light px-1.5 py-0.5 rounded border border-brand-border"
            >
              <Tag className="w-2.5 h-2.5 text-brand/40" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Hover action indicator */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 hidden md:block select-none">
        <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-brand' : 'text-brand/55'}`} />
      </div>
    </div>
  );
}
