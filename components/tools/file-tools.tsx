'use client';

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Copy, Download, Trash2, RotateCcw, FileJson, FileSpreadsheet, Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { copyToClipboard, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { PDFDocument } from 'pdf-lib';

export function CsvToJson() {
  const [csv, setCsv] = useState('');
  const [json, setJson] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const convert = () => {
    try {
      if (!csv) return;
      setIsProcessing(true);
      const lines = csv.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      const result = [];
      for (let i = 1; i < lines.length; i++) {
        const obj: any = {};
        const currentline = lines[i].split(',');
        if (currentline.length === headers.length) {
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]?.trim();
          }
          result.push(obj);
        }
      }
      setJson(JSON.stringify(result, null, 2));
      setIsProcessing(false);
      toast.success('Successfully converted to JSON');
    } catch (e) {
      toast.error('Invalid CSV format');
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(json);
    if (success) toast.success('JSON copied to clipboard');
    else toast.error('Failed to copy');
  };

  const downloadJson = () => {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.json';
    a.click();
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 border-white/10 bg-white/[0.02] space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-white">CSV Input</h3>
          </div>
          {csv && (
            <Button 
              variant="ghost" 
              onClick={() => { setCsv(''); setJson(''); }}
              className="text-neutral-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl h-9"
            >
              <Trash2 size={16} className="mr-2" />
              Clear
            </Button>
          )}
        </div>

        <Textarea
          placeholder="Paste CSV here (e.g. name,age\nJohn,30)"
          className="min-h-[200px] bg-white/[0.03] border-white/10 rounded-2xl p-4 font-mono text-sm focus:border-emerald-500/50 transition-colors"
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
        />

        <Button 
          onClick={convert} 
          disabled={!csv || isProcessing}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-xl h-12"
        >
          {isProcessing ? "Converting..." : "Convert to JSON"}
          {!isProcessing && <Sparkles size={16} className="ml-2" />}
        </Button>
      </Card>

      <AnimatePresence>
        {json && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="p-6 border-white/10 bg-white/[0.02] space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <FileJson className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white">JSON Result</h3>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    onClick={handleCopy}
                    className="text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl h-9"
                  >
                    <Copy size={16} className="mr-2" />
                    Copy
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={downloadJson}
                    className="text-emerald-500 hover:bg-emerald-500/10 rounded-xl h-9"
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              <Textarea
                readOnly
                className="min-h-[300px] bg-black/40 border-emerald-500/20 rounded-2xl p-4 font-mono text-sm text-emerald-500/90"
                value={json}
              />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function JsonToCsv() {
  const [json, setJson] = useState('');
  const [csv, setCsv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const convert = () => {
    try {
      if (!json) return;
      setIsProcessing(true);
      const arr = JSON.parse(json);
      if (!Array.isArray(arr) || arr.length === 0) {
        toast.error('Please provide a valid JSON array of objects');
        setIsProcessing(false);
        return;
      }
      const headers = Object.keys(arr[0]).join(',');
      const rows = arr.map(obj => Object.values(obj).join(',')).join('\n');
      setCsv(`${headers}\n${rows}`);
      setIsProcessing(false);
      toast.success('Successfully converted to CSV');
    } catch (e) {
      toast.error('Invalid JSON format');
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(csv);
    if (success) toast.success('CSV copied to clipboard');
    else toast.error('Failed to copy');
  };

  const downloadCsv = () => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.csv';
    a.click();
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 border-white/10 bg-white/[0.02] space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <FileJson className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-white">JSON Input</h3>
          </div>
          {json && (
            <Button 
              variant="ghost" 
              onClick={() => { setJson(''); setCsv(''); }}
              className="text-neutral-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl h-9"
            >
              <Trash2 size={16} className="mr-2" />
              Clear
            </Button>
          )}
        </div>

        <Textarea
          placeholder='Paste JSON array here (e.g. [{"name": "John", "age": 30}])'
          className="min-h-[200px] bg-white/[0.03] border-white/10 rounded-2xl p-4 font-mono text-sm focus:border-emerald-500/50 transition-colors"
          value={json}
          onChange={(e) => setJson(e.target.value)}
        />

        <Button 
          onClick={convert} 
          disabled={!json || isProcessing}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-xl h-12"
        >
          {isProcessing ? "Converting..." : "Convert to CSV"}
          {!isProcessing && <Sparkles size={16} className="ml-2" />}
        </Button>
      </Card>

      <AnimatePresence>
        {csv && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="p-6 border-white/10 bg-white/[0.02] space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white">CSV Result</h3>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    onClick={handleCopy}
                    className="text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl h-9"
                  >
                    <Copy size={16} className="mr-2" />
                    Copy
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={downloadCsv}
                    className="text-emerald-500 hover:bg-emerald-500/10 rounded-xl h-9"
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              <Textarea
                readOnly
                className="min-h-[300px] bg-black/40 border-emerald-500/20 rounded-2xl p-4 font-mono text-sm text-emerald-500/90"
                value={csv}
              />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PdfMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const mergePdfs = async () => {
    if (files.length < 2) {
      toast.error('Please select at least 2 PDF files');
      return;
    }

    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged-document.pdf';
      link.click();
      
      toast.success('PDFs merged successfully');
    } catch (error) {
      toast.error('Error merging PDFs');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">PDF Merger</h2>
        <p className="text-muted-foreground mb-4">Select multiple PDF files to merge them into a single document.</p>
        <div className="space-y-4">
          <label className="block border-2 border-dashed border-muted-foreground hover:border-accent rounded-lg p-8 text-center cursor-pointer transition">
            <input 
              type="file" 
              multiple 
              accept=".pdf" 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files) {
                  setFiles(Array.from(e.target.files));
                }
              }} 
            />
            <Upload className="w-12 h-12 text-accent mx-auto mb-4" />
            <p className="font-medium mb-2">
              {files.length > 0 ? `${files.length} files selected` : 'Click to select PDF files'}
            </p>
          </label>
          
          {files.length > 0 && (
            <Button onClick={mergePdfs} disabled={isProcessing} className="w-full">
              {isProcessing ? 'Merging...' : 'Merge and Download PDF'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

export function ZipExtractor() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">ZIP Extractor</h2>
        <p className="text-muted-foreground mb-4">Upload a ZIP file to extract its contents directly in your browser.</p>
        <label className="block border-2 border-dashed border-muted-foreground hover:border-accent rounded-lg p-8 text-center cursor-pointer transition">
          <input type="file" accept=".zip" className="hidden" onChange={(e) => {
            if (e.target.files?.length) {
              toast.success(`Loaded ${e.target.files[0].name} for extraction (Mock UI)`);
            }
          }} />
          <Upload className="w-12 h-12 text-accent mx-auto mb-4" />
          <p className="font-medium mb-2">Upload ZIP file</p>
        </label>
      </Card>
    </div>
  );
}

export function TextToPdf() {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const convertToPdf = async () => {
    if (!text) {
      toast.error('Enter some text first');
      return;
    }

    setIsProcessing(true);
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      
      page.drawText(text, {
        x: 50,
        y: height - 50,
        size: 12,
        maxWidth: width - 100,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'text-document.pdf';
      link.click();
      
      toast.success('PDF generated successfully');
    } catch (error) {
      toast.error('Error generating PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Text to PDF Converter</h2>
        <div className="space-y-4">
          <Textarea
            placeholder="Type or paste the text you want to save as PDF..."
            className="h-48"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={convertToPdf} disabled={isProcessing} className="w-full">
            {isProcessing ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export function ImageToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const convertToPdf = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    setIsProcessing(true);
    try {
      const pdfDoc = await PDFDocument.create();
      
      for (const file of files) {
        const imageBytes = await file.arrayBuffer();
        let image;
        
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(imageBytes);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(imageBytes);
        } else {
          continue; // Skip unsupported types for now
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'images-to-pdf.pdf';
      link.click();
      
      toast.success('PDF generated successfully');
    } catch (error) {
      toast.error('Error generating PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Image to PDF Converter</h2>
        <p className="text-muted-foreground mb-4">Upload images to convert them into a PDF document.</p>
        <div className="space-y-4">
          <label className="block border-2 border-dashed border-muted-foreground hover:border-accent rounded-lg p-8 text-center cursor-pointer transition">
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files) {
                  setFiles(Array.from(e.target.files));
                }
              }} 
            />
            <Upload className="w-12 h-12 text-accent mx-auto mb-4" />
            <p className="font-medium mb-2">
              {files.length > 0 ? `${files.length} images selected` : 'Upload Images'}
            </p>
          </label>
          
          {files.length > 0 && (
            <Button onClick={convertToPdf} disabled={isProcessing} className="w-full">
              {isProcessing ? 'Converting...' : 'Convert to PDF and Download'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
