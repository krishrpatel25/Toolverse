'use client';

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Copy, Download, Trash2, RotateCcw, FileJson, FileSpreadsheet, Sparkles, FileText, Merge, FileArchive, ImageIcon } from 'lucide-react';
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
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">CSV Input</h3>
              <p className="text-sm text-neutral-400">Paste your CSV content below</p>
            </div>
          </div>
          {csv && (
            <Button 
              variant="outline" 
              onClick={() => { setCsv(''); setJson(''); }}
              className="border-white/10 hover:bg-red-400/5 hover:text-red-400 rounded-xl h-10 px-4"
            >
              <Trash2 size={16} className="mr-2" />
              Clear
            </Button>
          )}
        </div>

        <Textarea
          placeholder="Paste CSV here (e.g. name,age\nJohn,30)"
          className="min-h-[200px] bg-white/[0.03] border-white/10 rounded-2xl p-6 font-mono text-sm focus:border-emerald-500/50 transition-colors"
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
        />

        <Button 
          onClick={convert} 
          disabled={!csv || isProcessing}
          className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl h-14 shadow-lg shadow-emerald-500/10"
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
            <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                    <FileJson className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">JSON Result</h3>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleCopy}
                    className="border-white/10 hover:bg-white/5 rounded-xl h-10"
                  >
                    <Copy size={16} className="mr-2" />
                    Copy
                  </Button>
                  <Button 
                    onClick={downloadJson}
                    className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20 rounded-xl h-10 px-4"
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              <Textarea
                readOnly
                className="min-h-[300px] bg-black/40 border-emerald-500/20 rounded-2xl p-6 font-mono text-sm text-emerald-500/90"
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
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <FileJson className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">JSON Input</h3>
              <p className="text-sm text-neutral-400">Paste your JSON content below</p>
            </div>
          </div>
          {json && (
            <Button 
              variant="outline" 
              onClick={() => { setJson(''); setCsv(''); }}
              className="border-white/10 hover:bg-red-400/5 hover:text-red-400 rounded-xl h-10 px-4"
            >
              <Trash2 size={16} className="mr-2" />
              Clear
            </Button>
          )}
        </div>

        <Textarea
          placeholder='Paste JSON array here (e.g. [{"name": "John", "age": 30}])'
          className="min-h-[200px] bg-white/[0.03] border-white/10 rounded-2xl p-6 font-mono text-sm focus:border-emerald-500/50 transition-colors"
          value={json}
          onChange={(e) => setJson(e.target.value)}
        />

        <Button 
          onClick={convert} 
          disabled={!json || isProcessing}
          className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl h-14 shadow-lg shadow-emerald-500/10"
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
            <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                    <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">CSV Result</h3>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleCopy}
                    className="border-white/10 hover:bg-white/5 rounded-xl h-10"
                  >
                    <Copy size={16} className="mr-2" />
                    Copy
                  </Button>
                  <Button 
                    onClick={downloadCsv}
                    className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20 rounded-xl h-10 px-4"
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              <Textarea
                readOnly
                className="min-h-[300px] bg-black/40 border-emerald-500/20 rounded-2xl p-6 font-mono text-sm text-emerald-500/90"
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
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Merge className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">PDF Merger</h2>
              <p className="text-sm text-neutral-400">Combine multiple PDF files into one</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <label className="block border-2 border-dashed border-white/10 hover:border-emerald-500/50 bg-white/[0.02] rounded-[2rem] p-12 text-center cursor-pointer transition-all hover:bg-emerald-500/[0.02] group">
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
            <div className="p-4 bg-emerald-500/10 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-emerald-500" />
            </div>
            <p className="text-lg font-medium text-white mb-1">
              {files.length > 0 ? `${files.length} files selected` : 'Click to upload PDF files'}
            </p>
            <p className="text-sm text-neutral-500">Only PDF files are supported</p>
          </label>
          
          {files.length > 0 && (
             <div className="space-y-4">
               <div className="grid gap-2">
                 {files.map((f, i) => (
                   <div key={i} className="flex items-center justify-between p-3 bg-white/[0.03] border border-white/5 rounded-xl text-sm text-neutral-300">
                     <span className="truncate max-w-[80%]">{f.name}</span>
                     <span className="text-[10px] text-neutral-600 font-mono">{(f.size / 1024).toFixed(0)} KB</span>
                   </div>
                 ))}
               </div>
               <Button 
                 onClick={mergePdfs} 
                 disabled={isProcessing} 
                 className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl h-14"
               >
                 {isProcessing ? 'Merging Document...' : 'Merge & Download PDF'}
                 {!isProcessing && <Sparkles size={16} className="ml-2" />}
               </Button>
             </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export function ZipExtractor() {
  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <FileArchive className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">ZIP Extractor</h2>
              <p className="text-sm text-neutral-400">Extract files from compressed archives</p>
            </div>
          </div>
        </div>

        <label className="block border-2 border-dashed border-white/10 hover:border-emerald-500/50 bg-white/[0.02] rounded-[2rem] p-12 text-center cursor-pointer transition-all hover:bg-emerald-500/[0.02] group">
          <input type="file" accept=".zip" className="hidden" onChange={(e) => {
            if (e.target.files?.length) {
              toast.success(`Loaded ${e.target.files[0].name} for extraction (Supported in future)`);
            }
          }} />
          <div className="p-4 bg-emerald-500/10 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-emerald-500" />
          </div>
          <p className="text-lg font-medium text-white mb-2">Upload ZIP file</p>
          <p className="text-sm text-neutral-500">Unpack .zip archives directly in your browser</p>
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
      toast.error('Please enter some text');
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
      link.download = 'document.pdf';
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
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <FileText className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Text to PDF</h2>
              <p className="text-sm text-neutral-400">Save written text as a PDF document</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Textarea
            placeholder="Type or paste the text you want to save as PDF..."
            className="min-h-[250px] bg-white/[0.03] border-white/10 rounded-2xl p-6 font-mono text-sm focus:border-emerald-500/50 transition-colors"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button 
            onClick={convertToPdf} 
            disabled={isProcessing || !text} 
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl h-14"
          >
            {isProcessing ? 'Generating PDF...' : 'Download PDF'}
            {!isProcessing && <Download size={16} className="ml-2" />}
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
          continue; 
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
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <ImageIcon className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Image to PDF</h2>
              <p className="text-sm text-neutral-400">Convert pictures to PDF pages</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <label className="block border-2 border-dashed border-white/10 hover:border-emerald-500/50 bg-white/[0.02] rounded-[2rem] p-12 text-center cursor-pointer transition-all hover:bg-emerald-500/[0.02] group">
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
            <div className="p-4 bg-emerald-500/10 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-emerald-500" />
            </div>
            <p className="text-lg font-medium text-white mb-2">
              {files.length > 0 ? `${files.length} images selected` : 'Upload Images'}
            </p>
            <p className="text-sm text-neutral-500">Supports JPG, PNG formats</p>
          </label>
          
          {files.length > 0 && (
             <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                   {files.map((f, i) => (
                      <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] p-1 relative group">
                        <img src={URL.createObjectURL(f)} className="w-full h-full object-cover rounded-xl" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <span className="text-[10px] text-white font-bold truncate px-2">{f.name}</span>
                        </div>
                      </div>
                   ))}
                </div>
                <Button 
                  onClick={convertToPdf} 
                  disabled={isProcessing} 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl h-14"
                >
                  {isProcessing ? 'Converting Images...' : 'Convert to PDF'}
                  {!isProcessing && <Sparkles size={16} className="ml-2" />}
                </Button>
             </div>
          )}
        </div>
      </Card>
    </div>
  );
}
