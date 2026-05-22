/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PDFDocumentSection {
  title: string;
  content: string[];
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
}
