import type { Tool } from "@/types/tools";
import { TOOL_SEO_DATA } from "./seo-data";
import {
  // Text tools
  FileText,
  Type,
  CaseSensitive,
  Repeat,
  Scissors,
  Trash2,
  ArrowDownUp,
  FileEdit,
  Shuffle,
  Search,
  Link,

  // Developer tools
  Braces,
  CheckCircle,
  Code,
  Lock,
  Unlock,
  Globe,
  KeyRound,
  FileCode,
  Box,

  // Calculator tools
  Cake,
  Scale,
  BadgeDollarSign,
  Tag,
  Percent,
  Clock,
  CalendarDays,
  Wallet,
  Ruler,
  Thermometer,
  DollarSign,
  GraduationCap,

  // Utility tools
  Key,
  QrCode,
  Palette,
  Timer,
  Hourglass,
  Dice5,
  ShieldCheck,
  Sparkles,
  User,
  Camera,
  Hash,

  // Image tools
  Image,
  Crop,
  RefreshCcw,
  Pipette,
  ZoomIn,
  Contrast,

  // File tools
  FileSpreadsheet,
  FileArchive,
  FileImage,
  FileType,
  File,

  // SEO tools
  Map,
  BarChart3,

  // AI tools
  Bot,
  PenTool,
  Monitor,

  // New tools icons
  Database,
  Eye,
  Binary,
  Server,
  ShieldAlert,
  Network,
  Star,
  Eraser,
  ImagePlus,
  FileCog,
  FileMinus,
  FileOutput,
} from "lucide-react";

const _RAW_TOOL_DEFINITIONS: Tool[] = [
  
  // Text Tools (11)
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, and sentences in your text",
    category: "text",
    icon: FileText,
    slug: "word-counter",
    component: "WordCounter",
    tags: ["text", "count", "analysis"],
    usageCount: 0,
  },

  {
    id: "character-counter",
    name: "Character Counter",
    description: "Count characters with and without spaces",
    category: "text",
    icon: Type,
    slug: "character-counter",
    component: "CharacterCounter",
    tags: ["text", "count", "character"],
    usageCount: 0,
  },

  {
    id: "case-converter",
    name: "Case Converter",
    description: "Convert text between uppercase, lowercase, title case",
    category: "text",
    icon: CaseSensitive,
    slug: "case-converter",
    component: "CaseConverter",
    tags: ["text", "convert", "case"],
    usageCount: 0,
  },

  {
    id: "text-reverser",
    name: "Text Reverser",
    description: "Reverse text or individual words",
    category: "text",
    icon: Repeat,
    slug: "text-reverser",
    component: "TextReverser",
    tags: ["text", "reverse"],
    usageCount: 0,
  },

  {
    id: "remove-spaces",
    name: "Remove Extra Spaces",
    description: "Remove extra spaces and clean up whitespace",
    category: "text",
    icon: Scissors,
    slug: "remove-spaces",
    component: "RemoveSpaces",
    tags: ["text", "clean", "spaces"],
    usageCount: 0,
  },

  {
    id: "duplicate-remover",
    name: "Remove Duplicate Lines",
    description: "Remove duplicate lines from text",
    category: "text",
    icon: Trash2,
    slug: "duplicate-remover",
    component: "DuplicateRemover",
    tags: ["text", "duplicate", "remove"],
    usageCount: 0,
  },

  {
    id: "text-sorter",
    name: "Text Sorter",
    description: "Sort text lines alphabetically or numerically",
    category: "text",
    icon: ArrowDownUp,
    slug: "text-sorter",
    component: "TextSorter",
    tags: ["text", "sort", "organize"],
    usageCount: 0,
  },

  {
    id: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for designs",
    category: "text",
    icon: FileEdit,
    slug: "lorem-ipsum",
    component: "LoremIpsum",
    tags: ["text", "generator"],
    usageCount: 0,
  },

  {
    id: "random-text",
    name: "Random Text Generator",
    description: "Generate random text and strings",
    category: "text",
    icon: Shuffle,
    slug: "random-text",
    component: "RandomText",
    tags: ["text", "generator"],
    usageCount: 0,
  },

  {
    id: "text-compare",
    name: "Text Compare",
    description: "Compare two texts and find differences",
    category: "text",
    icon: Search,
    slug: "text-compare",
    component: "TextCompare",
    tags: ["text", "compare"],
    usageCount: 0,
  },

  {
    id: "text-to-slug",
    name: "Text to Slug",
    description: "Convert text to URL-friendly slugs",
    category: "text",
    icon: Link,
    slug: "text-to-slug",
    component: "TextToSlug",
    tags: ["text", "slug"],
    usageCount: 0,
  },

  // Developer Tools (13)
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format and validate JSON with syntax highlighting",
    category: "developer",
    icon: Braces,
    slug: "json-formatter",
    component: "JSONFormatter",
    tags: ["developer", "json"],
    usageCount: 0,
  },

  {
    id: "json-validator",
    name: "JSON Validator",
    description: "Validate JSON syntax and structure",
    category: "developer",
    icon: CheckCircle,
    slug: "json-validator",
    component: "JSONValidator",
    tags: ["developer", "json"],
    usageCount: 0,
  },

  {
    id: "xml-formatter",
    name: "XML Formatter",
    description: "Format and validate XML documents",
    category: "developer",
    icon: Code,
    slug: "xml-formatter",
    component: "XMLFormatter",
    tags: ["developer", "xml"],
    usageCount: 0,
  },

  {
    id: "base64-encoder",
    name: "Base64 Encoder",
    description: "Encode text and files to Base64",
    category: "developer",
    icon: Lock,
    slug: "base64-encoder",
    component: "Base64Encoder",
    tags: ["developer", "encode"],
    usageCount: 0,
  },

  {
    id: "base64-decoder",
    name: "Base64 Decoder",
    description: "Decode Base64 strings to text",
    category: "developer",
    icon: Unlock,
    slug: "base64-decoder",
    component: "Base64Decoder",
    tags: ["developer", "decode"],
    usageCount: 0,
  },

  {
    id: "url-encoder",
    name: "URL Encoder",
    description: "Encode text for URLs",
    category: "developer",
    icon: Globe,
    slug: "url-encoder",
    component: "URLEncoder",
    tags: ["developer", "url"],
    usageCount: 0,
  },

  {
    id: "url-shortener",
    name: "URL Shortener",
    description: "Shorten long URLs into compact links",
    category: "developer",
    icon: Globe,
    slug: "url-shortener",
    component: "URLShortener",
    tags: ["developer", "url", "shortener"],
    usageCount: 0,
  },

  {
    id: "url-decoder",
    name: "URL Decoder",
    description: "Decode URL-encoded strings",
    category: "developer",
    icon: Link,
    slug: "url-decoder",
    component: "URLDecoder",
    tags: ["developer", "url"],
    usageCount: 0,
  },

  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate unique identifiers (UUID/GUID)",
    category: "developer",
    icon: KeyRound,
    slug: "uuid-generator",
    component: "UUIDGenerator",
    tags: ["developer", "uuid"],
    usageCount: 0,
  },

  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test and debug regular expressions",
    category: "developer",
    icon: Search,
    slug: "regex-tester",
    component: "RegexTester",
    tags: ["developer", "regex"],
    usageCount: 0,
  },

  {
    id: "bsod",
    name: "Blue Screen of Death",
    description: "Fake Windows 10 BSOD for pranks",
    category: "developer",
    icon: Monitor,
    slug: "bsod",
    component: "BSOD",
    tags: ["developer", "utility", "prank"],
    usageCount: 0,
  },

  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode and inspect JWT tokens",
    category: "developer",
    icon: Lock,
    slug: "jwt-decoder",
    component: "JWTDecoder",
    tags: ["developer", "jwt"],
    usageCount: 0,
  },

  {
    id: "html-formatter",
    name: "HTML Formatter",
    description: "Format and beautify HTML code",
    category: "developer",
    icon: FileCode,
    slug: "html-formatter",
    component: "HTMLFormatter",
    tags: ["developer", "html"],
    usageCount: 0,
  },

  {
    id: "css-minifier",
    name: "CSS Minifier",
    description: "Minify CSS code to reduce file size",
    category: "developer",
    icon: Box,
    slug: "css-minifier",
    component: "CSSMinifier",
    tags: ["developer", "css"],
    usageCount: 0,
  },

  {
    id: "js-minifier",
    name: "JavaScript Minifier",
    description: "Minify JavaScript code",
    category: "developer",
    icon: Box,
    slug: "js-minifier",
    component: "JSMinifier",
    tags: ["developer", "javascript"],
    usageCount: 0,
  },

  // Calculator Tools (12)
  // Calculator Tools (12)

  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate age from date of birth",
    category: "calculator",
    icon: Cake,
    slug: "age-calculator",
    component: "AgeCalculator",
    tags: ["calculator", "age", "date"],
    usageCount: 0,
  },

  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate Body Mass Index",
    category: "calculator",
    icon: Scale,
    slug: "bmi-calculator",
    component: "BMICalculator",
    tags: ["calculator", "health", "bmi"],
    usageCount: 0,
  },

  {
    id: "loan-calculator",
    name: "Loan Calculator",
    description: "Calculate loan payments and interest",
    category: "calculator",
    icon: BadgeDollarSign,
    slug: "loan-calculator",
    component: "LoanCalculator",
    tags: ["calculator", "finance", "loan"],
    usageCount: 0,
  },

  {
    id: "discount-calculator",
    name: "Discount Calculator",
    description: "Calculate discounts and savings",
    category: "calculator",
    icon: Tag,
    slug: "discount-calculator",
    component: "DiscountCalculator",
    tags: ["calculator", "discount", "savings"],
    usageCount: 0,
  },

  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages and ratios",
    category: "calculator",
    icon: Percent,
    slug: "percentage-calculator",
    component: "PercentageCalculator",
    tags: ["calculator", "percentage", "math"],
    usageCount: 0,
  },

  {
    id: "time-calculator",
    name: "Time Calculator",
    description: "Calculate time differences and durations",
    category: "calculator",
    icon: Clock,
    slug: "time-calculator",
    component: "TimeCalculator",
    tags: ["calculator", "time", "duration"],
    usageCount: 0,
  },

  {
    id: "date-calculator",
    name: "Date Difference Calculator",
    description: "Calculate days between two dates",
    category: "calculator",
    icon: CalendarDays,
    slug: "date-calculator",
    component: "DateCalculator",
    tags: ["calculator", "date", "difference"],
    usageCount: 0,
  },

  {
    id: "tip-calculator",
    name: "Tip Calculator",
    description: "Calculate tips and split bills",
    category: "calculator",
    icon: Wallet,
    slug: "tip-calculator",
    component: "TipCalculator",
    tags: ["calculator", "tip", "bill"],
    usageCount: 0,
  },

  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert between different units of measurement",
    category: "calculator",
    icon: Ruler,
    slug: "unit-converter",
    component: "UnitConverter",
    tags: ["calculator", "unit", "convert"],
    usageCount: 0,
  },

  {
    id: "temperature-converter",
    name: "Temperature Converter",
    description: "Convert between temperature scales",
    category: "calculator",
    icon: Thermometer,
    slug: "temperature-converter",
    component: "TemperatureConverter",
    tags: ["calculator", "temperature", "convert"],
    usageCount: 0,
  },

  {
    id: "currency-converter",
    name: "Currency Converter",
    description: "Convert between different currencies",
    category: "calculator",
    icon: DollarSign,
    slug: "currency-converter",
    component: "CurrencyConverter",
    tags: ["calculator", "currency", "convert"],
    usageCount: 0,
  },

  {
    id: "gpa-calculator",
    name: "GPA Calculator",
    description: "Calculate GPA and academic performance",
    category: "calculator",
    icon: GraduationCap,
    slug: "gpa-calculator",
    component: "GPACalculator",
    tags: ["calculator", "gpa", "education"],
    usageCount: 0,
  },

  // Utility Tools (13)
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Generate secure random passwords",
    category: "utility",
    icon: Key,
    slug: "password-generator",
    component: "PasswordGenerator",
    tags: ["utility", "security", "password"],
    usageCount: 0,
  },

  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate QR codes from text or URLs",
    category: "utility",
    icon: QrCode,
    slug: "qr-code-generator",
    component: "QRCodeGenerator",
    tags: ["utility", "qr"],
    usageCount: 0,
  },

  {
    id: "color-picker",
    name: "Color Picker",
    description: "Pick and convert colors",
    category: "utility",
    icon: Palette,
    slug: "color-picker",
    component: "ColorPicker",
    tags: ["utility", "color"],
    usageCount: 0,
  },

  {
    id: "stopwatch",
    name: "Stopwatch",
    description: "Online stopwatch timer",
    category: "utility",
    icon: Timer,
    slug: "stopwatch",
    component: "Stopwatch",
    tags: ["utility", "timer"],
    usageCount: 0,
  },

  {
    id: "countdown-timer",
    name: "Countdown Timer",
    description: "Set countdown timers",
    category: "utility",
    icon: Hourglass,
    slug: "countdown-timer",
    component: "CountdownTimer",
    tags: ["utility", "timer"],
    usageCount: 0,
  },

  {
    id: "random-number-generator",
    name: "Random Number Generator",
    description: "Generate random numbers",
    category: "utility",
    icon: Dice5,
    slug: "random-number-generator",
    component: "RandomNumberGenerator",
    tags: ["utility", "random"],
    usageCount: 0,
  },

  {
    id: "password-strength",
    name: "Password Strength Checker",
    description: "Check password strength",
    category: "utility",
    icon: ShieldCheck,
    slug: "password-strength",
    component: "PasswordStrength",
    tags: ["utility", "password"],
    usageCount: 0,
  },

  {
    id: "gradient-generator",
    name: "Gradient Generator",
    description: "Generate CSS gradients visually",
    category: "utility",
    icon: Sparkles,
    slug: "gradient-generator",
    component: "GradientGenerator",
    tags: ["utility", "gradient"],
    usageCount: 0,
  },

  {
    id: "random-name-generator",
    name: "Random Name Generator",
    description: "Generate random names",
    category: "utility",
    icon: User,
    slug: "random-name-generator",
    component: "RandomNameGenerator",
    tags: ["utility", "generator"],
    usageCount: 0,
  },

  {
    id: "dice-roller",
    name: "Dice Roller",
    description: "Roll virtual dice",
    category: "utility",
    icon: Dice5,
    slug: "dice-roller",
    component: "DiceRoller",
    tags: ["utility", "dice"],
    usageCount: 0,
  },

  /* 
  {
    id: "image-to-text",
    name: "Image to Text (OCR)",
    description: "Extract text from images",
    category: "utility",
    icon: Camera,
    slug: "image-to-text",
    component: "ImageToText",
    tags: ["utility", "ocr"],
    usageCount: 0,
  },
  */

  {
    id: "markdown-preview",
    name: "Markdown Preview",
    description: "Preview markdown in real-time",
    category: "utility",
    icon: FileText,
    slug: "markdown-preview",
    component: "MarkdownPreview",
    tags: ["utility", "markdown"],
    usageCount: 0,
  },

  {
    id: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256 hashes",
    category: "utility",
    icon: Hash,
    slug: "hash-generator",
    component: "HashGenerator",
    tags: ["utility", "hash"],
    usageCount: 0,
  },
  // Image Tools (9) - Placeholder, will expand in image tools phase
  /* ---------- IMAGE TOOLS ---------- */
  // Image Tools
  {
    id: "image-compressor",
    name: "Image Compressor",
    description: "Compress images",
    category: "image",
    icon: Image,
    slug: "image-compressor",
    component: "ImageCompressor",
    tags: ["image"],
    usageCount: 0,
  },

  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize images",
    category: "image",
    icon: Image,
    slug: "image-resizer",
    component: "ImageResizer",
    tags: ["image"],
    usageCount: 0,
  },

  {
    id: "image-cropper",
    name: "Image Cropper",
    description: "Crop images",
    category: "image",
    icon: Crop,
    slug: "image-cropper",
    component: "ImageCropper",
    tags: ["image"],
    usageCount: 0,
  },

  {
    id: "image-converter",
    name: "Image Format Converter",
    description: "Convert image formats",
    category: "image",
    icon: RefreshCcw,
    slug: "image-converter",
    component: "ImageConverter",
    tags: ["image"],
    usageCount: 0,
  },

  {
    id: "image-rotator",
    name: "Image Rotator",
    description: "Rotate images",
    category: "image",
    icon: RefreshCcw,
    slug: "image-rotator",
    component: "ImageRotator",
    tags: ["image"],
    usageCount: 0,
  },

  {
    id: "image-color-extractor",
    name: "Image Color Extractor",
    description: "Extract color palette",
    category: "image",
    icon: Pipette,
    slug: "image-color-extractor",
    component: "ImageColorExtractor",
    tags: ["image"],
    usageCount: 0,
  },

  {
    id: "image-upscaler",
    name: "Image Upscaler",
    description: "Increase image resolution",
    category: "image",
    icon: ZoomIn,
    slug: "image-upscaler",
    component: "ImageUpscaler",
    tags: ["image"],
    usageCount: 0,
  },

  {
    id: "invert-image-colors",
    name: "Invert Image Colors",
    description: "Invert image colors",
    category: "image",
    icon: Contrast,
    slug: "invert-image-colors",
    component: "InvertImageColors",
    tags: ["image"],
    usageCount: 0,
  },

  {
    id: "black-and-white",
    name: "Black & White",
    description: "Convert images to grayscale",
    category: "image",
    icon: Contrast,
    slug: "black-and-white",
    component: "BlackAndWhite",
    tags: ["image"],
    usageCount: 0,
  },
  // File Tools (6)
  // File Tools
  {
    id: "csv-to-json",
    name: "CSV to JSON Converter",
    description: "Convert CSV files to JSON format",
    category: "file",
    icon: FileSpreadsheet,
    slug: "csv-to-json",
    component: "CsvToJson",
    tags: ["file", "convert", "data"],
    usageCount: 0,
  },

  {
    id: "json-to-csv",
    name: "JSON to CSV Converter",
    description: "Convert JSON data to CSV format",
    category: "file",
    icon: FileSpreadsheet,
    slug: "json-to-csv",
    component: "JsonToCsv",
    tags: ["file", "convert", "data"],
    usageCount: 0,
  },

  {
    id: "pdf-merger",
    name: "PDF Merger",
    description: "Merge multiple PDF files",
    category: "file",
    icon: FileText,
    slug: "pdf-merger",
    component: "PdfMerger",
    tags: ["file", "pdf", "merge"],
    usageCount: 0,
  },

  {
    id: "zip-extractor",
    name: "ZIP File Extractor",
    description: "Extract ZIP file contents",
    category: "file",
    icon: FileArchive,
    slug: "zip-extractor",
    component: "ZipExtractor",
    tags: ["file", "zip", "extract"],
    usageCount: 0,
  },

  {
    id: "text-to-pdf",
    name: "Text to PDF Converter",
    description: "Convert text to PDF documents",
    category: "file",
    icon: FileType,
    slug: "text-to-pdf",
    component: "TextToPdf",
    tags: ["file", "pdf", "convert"],
    usageCount: 0,
  },

  {
    id: "image-to-pdf",
    name: "Image to PDF Converter",
    description: "Convert images to PDF documents",
    category: "file",
    icon: FileImage,
    slug: "image-to-pdf",
    component: "ImageToPdf",
    tags: ["file", "pdf", "convert"],
    usageCount: 0,
  },

  // SEO Tools (5)
  // SEO Tools
  {
    id: "meta-tag-generator",
    name: "Meta Tag Generator",
    description: "Generate SEO meta tags",
    category: "seo",
    icon: Tag,
    slug: "meta-tag-generator",
    component: "MetaTagGenerator",
    tags: ["seo", "meta", "tags"],
    usageCount: 0,
  },

  {
    id: "sitemap-generator",
    name: "Sitemap Generator",
    description: "Generate XML sitemap",
    category: "seo",
    icon: Map,
    slug: "sitemap-generator",
    component: "SitemapGenerator",
    tags: ["seo", "sitemap"],
    usageCount: 0,
  },

  {
    id: "robots-txt-generator",
    name: "Robots.txt Generator",
    description: "Generate robots.txt file",
    category: "seo",
    icon: Bot,
    slug: "robots-txt-generator",
    component: "RobotsTxtGenerator",
    tags: ["seo", "robots"],
    usageCount: 0,
  },

  {
    id: "keyword-density",
    name: "Keyword Density Checker",
    description: "Analyze keyword density",
    category: "seo",
    icon: BarChart3,
    slug: "keyword-density",
    component: "KeywordDensity",
    tags: ["seo", "keyword"],
    usageCount: 0,
  },

  {
    id: "serp-preview",
    name: "SERP Preview Tool",
    description: "Preview search results",
    category: "seo",
    icon: Search,
    slug: "serp-preview",
    component: "SerpPreview",
    tags: ["seo", "serp"],
    usageCount: 0,
  },

  // AI Tools

  {
    id: "ai-text-generator",
    name: "AI Text Generator",
    description: "Generate text using AI",
    category: "ai",
    icon: Bot,
    slug: "ai-text-generator",
    component: "AITextGenerator",
    tags: ["ai", "text", "generator"],
    usageCount: 0,
  },

  {
    id: "ai-summary",
    name: "AI Text Summarizer",
    description: "Summarize long text",
    category: "ai",
    icon: FileText,
    slug: "ai-summary",
    component: "TextSummarizer",
    tags: ["ai", "summary"],
    usageCount: 0,
  },

  {
    id: "ai-grammar-checker",
    name: "AI Grammar Checker",
    description: "Check grammar using AI",
    category: "ai",
    icon: CheckCircle,
    slug: "ai-grammar-checker",
    component: "GrammarChecker",
    tags: ["ai", "grammar"],
    usageCount: 0,
  },

  {
    id: "ai-code-helper",
    name: "AI Code Helper",
    description: "Get help with coding",
    category: "ai",
    icon: Code,
    slug: "ai-code-helper",
    component: "AICodeHelper",
    tags: ["ai", "code"],
    usageCount: 0,
  },

  {
    id: "ai-content-writer",
    name: "AI Content Writer",
    description: "Write content with AI",
    category: "ai",
    icon: PenTool,
    slug: "ai-content-writer",
    component: "AIContentWriter",
    tags: ["ai", "content"],
    usageCount: 0,
  },

  // ── Image Format Converters ──────────────────────────────────────────────
  { id: "png-to-jpg",  name: "PNG to JPG Converter",  description: "Convert PNG images to JPG format",    category: "image", icon: FileImage, slug: "png-to-jpg",  component: "PngToJpg",  tags: ["image", "convert", "png", "jpg"],         usageCount: 0 },
  { id: "png-to-webp", name: "PNG to WebP Converter", description: "Convert PNG images to WebP format",   category: "image", icon: FileImage, slug: "png-to-webp", component: "PngToWebp", tags: ["image", "convert", "png", "webp"],        usageCount: 0 },
  { id: "png-to-bmp",  name: "PNG to BMP Converter",  description: "Convert PNG images to BMP format",    category: "image", icon: FileImage, slug: "png-to-bmp",  component: "PngToBmp",  tags: ["image", "convert", "png", "bmp"],         usageCount: 0 },
  { id: "jpg-to-png",  name: "JPG to PNG Converter",  description: "Convert JPG images to PNG format",    category: "image", icon: FileImage, slug: "jpg-to-png",  component: "JpgToPng",  tags: ["image", "convert", "jpg", "png"],         usageCount: 0 },
  { id: "jpg-to-webp", name: "JPG to WebP Converter", description: "Convert JPG images to WebP format",   category: "image", icon: FileImage, slug: "jpg-to-webp", component: "JpgToWebp", tags: ["image", "convert", "jpg", "webp"],        usageCount: 0 },
  { id: "jpg-to-bmp",  name: "JPG to BMP Converter",  description: "Convert JPG images to BMP format",    category: "image", icon: FileImage, slug: "jpg-to-bmp",  component: "JpgToBmp",  tags: ["image", "convert", "jpg", "bmp"],         usageCount: 0 },
  { id: "webp-to-jpg", name: "WebP to JPG Converter", description: "Convert WebP images to JPG format",   category: "image", icon: FileImage, slug: "webp-to-jpg", component: "WebpToJpg", tags: ["image", "convert", "webp", "jpg"],        usageCount: 0 },
  { id: "webp-to-png", name: "WebP to PNG Converter", description: "Convert WebP images to PNG format",   category: "image", icon: FileImage, slug: "webp-to-png", component: "WebpToPng", tags: ["image", "convert", "webp", "png"],        usageCount: 0 },
  { id: "bmp-to-jpg",  name: "BMP to JPG Converter",  description: "Convert BMP images to JPG format",    category: "image", icon: FileImage, slug: "bmp-to-jpg",  component: "BmpToJpg",  tags: ["image", "convert", "bmp", "jpg"],         usageCount: 0 },
  { id: "bmp-to-png",  name: "BMP to PNG Converter",  description: "Convert BMP images to PNG format",    category: "image", icon: FileImage, slug: "bmp-to-png",  component: "BmpToPng",  tags: ["image", "convert", "bmp", "png"],         usageCount: 0 },
  { id: "gif-to-jpg",  name: "GIF to JPG Converter",  description: "Convert GIF images to JPG format",    category: "image", icon: FileImage, slug: "gif-to-jpg",  component: "GifToJpg",  tags: ["image", "convert", "gif", "jpg"],         usageCount: 0 },
  { id: "gif-to-png",  name: "GIF to PNG Converter",  description: "Convert GIF images to PNG format",    category: "image", icon: FileImage, slug: "gif-to-png",  component: "GifToPng",  tags: ["image", "convert", "gif", "png"],         usageCount: 0 },
  { id: "gif-to-webp", name: "GIF to WebP Converter", description: "Convert GIF images to WebP format",   category: "image", icon: FileImage, slug: "gif-to-webp", component: "GifToWebp", tags: ["image", "convert", "gif", "webp"],        usageCount: 0 },

  // ── New Tools ────────────────────────────────────────────────────────────
  // Image
  { id: "image-background-remover", name: "Image Background Remover", description: "Remove background from images automatically", category: "image", icon: Eraser,     slug: "image-background-remover", component: "ImageBackgroundRemover", tags: ["image", "background", "remove", "transparent"], usageCount: 0 },
  { id: "favicon-generator",        name: "Favicon Generator",        description: "Generate favicons in all sizes from text or image",  category: "image", icon: ImagePlus, slug: "favicon-generator",        component: "FaviconGenerator",        tags: ["favicon", "icon", "image", "generator"],         usageCount: 0 },

  // File / PDF
  { id: "pdf-compressor",   name: "PDF Compressor",      description: "Reduce PDF file size while maintaining quality", category: "file", icon: FileMinus,  slug: "pdf-compressor",   component: "PDFCompressor", tags: ["pdf", "compress", "file", "size"],       usageCount: 0 },
  { id: "pdf-splitter",     name: "PDF Splitter",        description: "Split a PDF into pages or ranges",              category: "file", icon: Scissors,   slug: "pdf-splitter",     component: "PDFSplitter",   tags: ["pdf", "split", "pages", "file"],        usageCount: 0 },
  { id: "pdf-to-word",      name: "PDF to Word Converter",description: "Extract text from PDF and export to Word",     category: "file", icon: FileOutput, slug: "pdf-to-word",      component: "PDFToWord",     tags: ["pdf", "word", "convert", "text"],       usageCount: 0 },

  // Developer
  { id: "sql-formatter",           name: "SQL Formatter",             description: "Format and beautify SQL queries",                category: "developer", icon: Database,    slug: "sql-formatter",           component: "SQLFormatter",       tags: ["sql", "format", "database", "query"],              usageCount: 0 },
  { id: "json-viewer",             name: "JSON Viewer",               description: "Visualize and explore JSON data interactively",  category: "developer", icon: Eye,         slug: "json-viewer",             component: "JSONViewer",         tags: ["json", "viewer", "tree", "explorer"],              usageCount: 0 },
  { id: "unix-timestamp",          name: "Unix Timestamp Converter",  description: "Convert between Unix timestamps and human dates", category: "developer", icon: Binary,      slug: "unix-timestamp",          component: "UnixTimestampConverter", tags: ["unix", "timestamp", "date", "time"],           usageCount: 0 },
  { id: "dns-lookup",              name: "DNS Lookup Tool",           description: "Query DNS records for any domain",              category: "developer", icon: Network,     slug: "dns-lookup",              component: "DNSLookup",          tags: ["dns", "lookup", "domain", "network"],              usageCount: 0 },
  { id: "ssl-checker",             name: "SSL Certificate Checker",   description: "Check SSL certificate validity and details",    category: "developer", icon: ShieldAlert, slug: "ssl-checker",             component: "SSLChecker",         tags: ["ssl", "certificate", "https", "security"],         usageCount: 0 },
  { id: "ip-lookup",               name: "IP Address Lookup",         description: "Get detailed info about any IP address",        category: "developer", icon: Server,      slug: "ip-lookup",               component: "IPLookup",           tags: ["ip", "lookup", "geolocation", "network"],          usageCount: 0 },
  { id: "markdown-to-html",        name: "Markdown to HTML Converter",description: "Convert Markdown to HTML instantly",            category: "developer", icon: Code,        slug: "markdown-to-html",        component: "MarkdownToHTML",     tags: ["markdown", "html", "convert", "text"],             usageCount: 0 },
  { id: "html-to-markdown",        name: "HTML to Markdown Converter",description: "Convert HTML markup to Markdown format",        category: "developer", icon: FileCode,    slug: "html-to-markdown",        component: "HTMLToMarkdown",     tags: ["html", "markdown", "convert", "text"],             usageCount: 0 },
  { id: "bcrypt-generator",        name: "Bcrypt Hash Generator",     description: "Generate and verify bcrypt-style password hashes", category: "developer", icon: Lock,     slug: "bcrypt-generator",        component: "BcryptGenerator",    tags: ["bcrypt", "hash", "password", "security"],          usageCount: 0 },
  { id: "sha256-generator",        name: "SHA-256 Hash Generator",    description: "Generate SHA-256 cryptographic hashes",         category: "developer", icon: Hash,        slug: "sha256-generator",        component: "SHA256Generator",    tags: ["sha256", "hash", "crypto", "security"],            usageCount: 0 },
];

// Merge SEO content + FAQs into each tool definition
export const TOOL_DEFINITIONS: Tool[] = _RAW_TOOL_DEFINITIONS.map((tool: Tool) => ({
  ...tool,
  ...(TOOL_SEO_DATA[tool.slug] ?? {}),
}));

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOL_DEFINITIONS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return TOOL_DEFINITIONS.filter((tool) => tool.category === category);
}

export function getAllCategories() {
  return Array.from(new Set(TOOL_DEFINITIONS.map((tool) => tool.category)));
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return TOOL_DEFINITIONS.filter(
    (tool) =>
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(q)),
  );
}
