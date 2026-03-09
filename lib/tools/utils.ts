/**
 * Common utility functions used across tools
 */

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadFile(content: string, filename: string, mimeType = 'text/plain') {
  const element = document.createElement('a');
  element.setAttribute('href', `data:${mimeType};charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function validateJSON(text: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(text);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Invalid JSON',
    };
  }
}

export function formatJSON(text: string, spaces = 2): string {
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed, null, spaces);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
}

export function minifyJSON(text: string): string {
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
}

export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function encodeBase64(text: string): string {
  return Buffer.from(text).toString('base64');
}

export function decodeBase64(text: string): string {
  return Buffer.from(text, 'base64').toString('utf-8');
}

export function encodeURL(text: string): string {
  return encodeURIComponent(text);
}

export function decodeURL(text: string): string {
  return decodeURIComponent(text);
}

export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return '';
  }
}

export function getTextStats(text: string) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.trim() ? text.trim().split(/[.!?]+/).filter(s => s.trim()).length : 0;
  const paragraphs = text.trim() ? text.trim().split(/\n\n+/).filter(p => p.trim()).length : 0;
  const lines = text.trim() ? text.trim().split('\n').length : 0;
  const averageWordLength = words > 0 ? (charactersNoSpaces / words).toFixed(2) : 0;
  const readingTime = Math.ceil(words / 200); // Average reading speed is 200 words/minute

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    lines,
    averageWordLength,
    readingTime,
  };
}

export function calculateChecksum(text: string, algorithm: 'md5' | 'sha1' | 'sha256' = 'sha256'): string {
  // Note: This is a simplified version. In production, use a proper crypto library
  return `${algorithm}-checksum`;
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  } as T;
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;
  return function(this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  } as T;
}
