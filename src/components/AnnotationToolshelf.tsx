/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FileAnnotation } from '../types';
import { Bookmark, Check, Trash2, X, MessageSquare } from 'lucide-react';

interface AnnotationToolshelfProps {
  documentId: string;
  sectionIndex: number;
  paragraphIndex: number;
  text: string;
  existingAnn: FileAnnotation | undefined;
  onSave: (color: FileAnnotation['color'], note: string) => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function AnnotationToolshelf({
  existingAnn,
  onSave,
  onDelete,
  onClose
}: AnnotationToolshelfProps) {
  const [color, setColor] = useState<FileAnnotation['color']>('olive');
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    if (existingAnn) {
      setColor(existingAnn.color);
      setNoteText(existingAnn.note || '');
    } else {
      setColor('olive');
      setNoteText('');
    }
  }, [existingAnn]);

  const colorThemes = {
    olive: { label: 'Soft Olive', dotBg: 'bg-[#5a5a40]', darkText: 'text-[#4a4a35]' },
    amber: { label: 'Amber Gold', dotBg: 'bg-amber-400', darkText: 'text-amber-800' },
    rose: { label: 'Blush Rose', dotBg: 'bg-rose-400', darkText: 'text-rose-800' },
    slate: { label: 'Slate Gray', dotBg: 'bg-slate-500', darkText: 'text-slate-800' }
  };

  return (
    <div className="bg-[#2c2c2c] text-white border border-[#3e3e35] rounded-xl p-3.5 my-2 animate-fade-in flex flex-col gap-3 shadow-md select-none">
      <div className="flex justify-between items-center pb-2 border-b border-[#3e3e35]">
        <span className="text-[10px] font-mono tracking-widest text-[#cfcfc5] uppercase flex items-center gap-1">
          <Bookmark className="w-3 h-3 text-brand" />
          SCHOLARLY TOOLS
        </span>
        <button 
          onClick={onClose}
          className="text-[#cfcfc5]/60 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div>
        <label className="block text-[9px] font-mono text-[#b0b0a5] uppercase mb-1.5">
          Select Highlight shade
        </label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(colorThemes) as Array<FileAnnotation['color']>).map((colKey) => {
            const isSelected = color === colKey;
            return (
              <button
                key={colKey}
                type="button"
                onClick={() => setColor(colKey)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-4xs font-sans font-bold uppercase transition-all border cursor-pointer ${
                  isSelected 
                    ? 'bg-[#181814] text-white border-brand' 
                    : 'bg-[#23231e] text-[#cfcfc5]/70 border-transparent hover:border-[#3e3e35]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${colorThemes[colKey].dotBg}`} />
                {colorThemes[colKey].label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-[9px] font-mono text-[#b0b0a5] uppercase">
            Marginal comment or Quote citation
          </label>
          <span className="text-[9px] font-mono text-[#8f8f85]">Optional</span>
        </div>
        <div className="relative">
          <MessageSquare className="w-3.5 h-3.5 text-[#cfcfc5]/50 absolute left-3 top-3" />
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Type quote reflections or review annotations here..."
            rows={2}
            className="w-full text-2xs bg-[#23231e] border border-[#3e3e35] rounded-lg pl-9 pr-3 py-2 text-white placeholder-[#cfcfc5]/40 focus:outline-none focus:border-brand resize-none font-sans"
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-1">
        {existingAnn && (
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-1 text-4xs font-sans font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer mr-auto"
            title="Remove highlight and deleted annotation"
          >
            <Trash2 className="w-3 h-3" />
            DELETE
          </button>
        )}

        <button
          type="button"
          onClick={() => onSave(color, noteText)}
          className="flex items-center gap-1 bg-brand hover:bg-[#4a4a35] text-white text-4xs font-sans font-bold px-4 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" />
          SAVE MARK
        </button>
      </div>
    </div>
  );
}
