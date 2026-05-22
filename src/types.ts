/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PDFDocumentSection {
  title: string;
  content: string[];
}

export interface FileAnnotation {
  id: string;
  documentId: string;
  sectionIndex: number;
  paragraphIndex: number;
  text: string;
  type: 'highlight' | 'quote';
  color: 'olive' | 'amber' | 'rose' | 'slate';
  note?: string;
  createdAt: string;
}

export interface PDFDocument {
  id: string;
  title: string;
  filename: string;
  url: string;
  size: string;
  category: 'Resume' | 'Proposal' | 'Tutorial' | 'Other' | 'Uploaded';
  description: string;
  dateAdded: string;
  tags: string[];
  isCustomUploaded?: boolean;
  sections?: PDFDocumentSection[];
  fileType?: 'pdf' | 'epub';
  epubChapters?: { title: string; paragraphs: string[] }[];
}
