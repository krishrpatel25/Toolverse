"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ToolWrapper } from "@/components/tools/tool-wrapper";
import { getToolBySlug, TOOL_DEFINITIONS } from "@/lib/tools/definitions";
import { WordCounter } from "@/components/tools/word-counter";
import { CharacterCounter } from "@/components/tools/character-counter";
import { CaseConverter } from "@/components/tools/case-converter";
import { TextReverser } from "@/components/tools/text-reverser";
import { RemoveSpaces } from "@/components/tools/remove-spaces";
import { DuplicateRemover } from "@/components/tools/duplicate-remover";
import { TextSorter } from "@/components/tools/text-sorter";
import { LoremIpsum } from "@/components/tools/lorem-ipsum";
import { RandomText } from "@/components/tools/random-text";
import { TextCompare } from "@/components/tools/text-compare";
import { TextToSlug } from "@/components/tools/text-to-slug";
import { JSONFormatter } from "@/components/tools/json-formatter";
import { JSONValidator } from "@/components/tools/json-validator";
import { Base64Encoder } from "@/components/tools/base64-encoder";
import { Base64Decoder } from "@/components/tools/base64-decoder";
import { URLEncoder } from "@/components/tools/url-encoder";
import { URLDecoder } from "@/components/tools/url-decoder";
import { XMLFormatter } from "@/components/tools/xml-formatter";
import { RegexTester } from "@/components/tools/regex-tester";
import { HTMLFormatter } from "@/components/tools/html-formatter";
import { CSSMinifier } from "@/components/tools/css-minifier";
import { JSMinifier } from "@/components/tools/js-minifier";
import { JWTDecoder } from "@/components/tools/jwt-decoder";
import { UUIDGenerator } from "@/components/tools/uuid-generator";
import { AgeCalculator } from "@/components/tools/age-calculator";
import { BMICalculator } from "@/components/tools/bmi-calculator";
import { LoanCalculator } from "@/components/tools/loan-calculator";
import { PercentageCalculator } from "@/components/tools/percentage-calculator";
import { PasswordGenerator } from "@/components/tools/password-generator";
import { QRCodeGenerator } from "@/components/tools/qr-code-generator";
import { ColorPicker } from "@/components/tools/color-picker";
import { MarkdownPreview } from "@/components/tools/markdown-preview";
import { DiscountCalculator } from "@/components/tools/discount-calculator";
import { TimeCalculator } from "@/components/tools/time-calculator";
import { DateCalculator } from "@/components/tools/date-calculator";
import { TipCalculator } from "@/components/tools/tip-calculator";
import { UnitConverter } from "@/components/tools/unit-converter";
import { TemperatureConverter } from "@/components/tools/temperature-converter";
import { CurrencyConverter } from "@/components/tools/currency-converter";
import { GPACalculator } from "@/components/tools/gpa-calculator";
import { Stopwatch } from "@/components/tools/stopwatch";
import { CountdownTimer } from "@/components/tools/countdown-timer";
import { RandomNumberGenerator } from "@/components/tools/random-number-generator";
import { PasswordStrength } from "@/components/tools/password-strength";
import { GradientGenerator } from "@/components/tools/gradient-generator";
import { DiceRoller } from "@/components/tools/dice-roller";
import { RandomNameGenerator } from "@/components/tools/random-name-generator";
import { HashGenerator } from "@/components/tools/hash-generator";
import {
  ImageCompressor,
  ImageResizer,
  ImageCropper,
  ImageConverter,
  ImageRotator,
  ImageColorExtractor,
  InvertImageColors,
  BlackAndWhite,
} from "@/components/tools/image-tools-complete";
import {
  MetaTagGenerator,
  OpenGraphGenerator,
  SitemapGenerator,
  RobotsTxtGenerator,
  KeywordDensity,
  SerpPreview,
} from "@/components/tools/seo-tools";
import {
  CsvToJson,
  JsonToCsv,
  PdfMerger,
  ZipExtractor,
  TextToPdf,
  ImageToPdf,
} from "@/components/tools/file-tools";
import {
  AITextGenerator,
  TextSummarizer,
  GrammarChecker,
  AICodeHelper,
  AIContentWriter,
  SentimentAnalyzer,
} from "@/components/tools/ai-tools";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { ImageUpscaler } from "@/components/tools/image/image-upscaler";
import { URLShortener } from "@/components/tools/url-shortener";
import { BSOD } from "@/components/tools/bsod";
import {
  PngToJpg, PngToWebp, PngToBmp,
  JpgToPng, JpgToWebp, JpgToBmp,
  WebpToJpg, WebpToPng,
  BmpToJpg, BmpToPng,
  GifToJpg, GifToPng, GifToWebp,
} from "@/components/tools/image/image-format-converter";
import {
  SQLFormatter, JSONViewer, UnixTimestampConverter,
  DNSLookup, IPLookup, SSLChecker,
  MarkdownToHTML, HTMLToMarkdown,
  SHA256Generator, BcryptGenerator,
} from "@/components/tools/developer-tools2";
import {
  PDFCompressor, PDFSplitter, PDFToWord,
} from "@/components/tools/pdf-tools2";
import {
  ImageBackgroundRemover, FaviconGenerator,
} from "@/components/tools/image-utility-tools";

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  WordCounter,
  CharacterCounter,
  CaseConverter,
  TextReverser,
  RemoveSpaces,
  DuplicateRemover,
  TextSorter,
  LoremIpsum,
  RandomText,
  TextCompare,
  TextToSlug,
  JSONFormatter,
  JSONValidator,
  XMLFormatter,
  Base64Encoder,
  Base64Decoder,
  URLEncoder,
  URLDecoder,
  URLShortener,
  RegexTester,
  JWTDecoder,
  HTMLFormatter,
  CSSMinifier,
  JSMinifier,
  UUIDGenerator,
  BSOD,
  AgeCalculator,
  BMICalculator,
  LoanCalculator,
  DiscountCalculator,
  PercentageCalculator,
  TimeCalculator,
  DateCalculator,
  TipCalculator,
  UnitConverter,
  TemperatureConverter,
  CurrencyConverter,
  GPACalculator,
  PasswordGenerator,
  QRCodeGenerator,
  ColorPicker,
  Stopwatch,
  CountdownTimer,
  RandomNumberGenerator,
  PasswordStrength,
  GradientGenerator,
  RandomNameGenerator,
  DiceRoller,
  MarkdownPreview,
  HashGenerator,
  ImageCompressor,
  ImageResizer,
  ImageCropper,
  ImageConverter,
  ImageRotator,
  ImageUpscaler,
  ImageColorExtractor,
  InvertImageColors,
  BlackAndWhite,
  CsvToJson,
  JsonToCsv,
  PdfMerger,
  ZipExtractor,
  TextToPdf,
  ImageToPdf,
  MetaTagGenerator,
  OpenGraphGenerator,
  SitemapGenerator,
  RobotsTxtGenerator,
  KeywordDensity,
  SerpPreview,
  AITextGenerator,
  TextSummarizer,
  GrammarChecker,
  AICodeHelper,
  AIContentWriter,
  SentimentAnalyzer,
  // Image Format Converters
  PngToJpg, PngToWebp, PngToBmp,
  JpgToPng, JpgToWebp, JpgToBmp,
  WebpToJpg, WebpToPng,
  BmpToJpg, BmpToPng,
  GifToJpg, GifToPng, GifToWebp,
  // Developer Tools 2
  SQLFormatter, JSONViewer, UnixTimestampConverter,
  DNSLookup, IPLookup, SSLChecker,
  MarkdownToHTML, HTMLToMarkdown,
  SHA256Generator, BcryptGenerator,
  // PDF Tools 2
  PDFCompressor, PDFSplitter, PDFToWord,
  // Image Utility Tools
  ImageBackgroundRemover, FaviconGenerator,
};

export default function ToolClientPage({ toolSlug }: { toolSlug: string }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const tool = getToolBySlug(toolSlug);

  if (!tool) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Tool Not Found
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                The tool you&apos;re looking for doesn&apos;t exist.
              </p>
              <Button asChild>
                <Link href="/tools">Back to All Tools</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const ToolComponent =
    TOOL_COMPONENTS[tool.component as keyof typeof TOOL_COMPONENTS];

  if (!ToolComponent) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Tool Not Available
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                This tool component is not properly configured.
              </p>
              <Button asChild>
                <Link href="/tools">Back to All Tools</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const relatedTools = TOOL_DEFINITIONS.filter(
    (t) => t.category === tool.category && t.id !== tool.id
  ).slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <Link
            href={`/tools?category=${tool.category}`}
            className="text-accent hover:text-accent/80 transition-colors mb-6 inline-flex items-center"
          >
            ← Back to Tools
          </Link>

          {isLoading ? (
            <div className="space-y-8 animate-pulse">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-lg bg-white/5" />
                <div className="flex-1 space-y-3">
                  <div className="h-8 w-1/3 bg-white/5 rounded-lg" />
                  <div className="h-4 w-2/3 bg-white/5 rounded-lg" />
                </div>
              </div>
              <div className="h-[400px] w-full rounded-[2rem] bg-white/5 border border-white/5" />
            </div>
          ) : (
            <ToolWrapper tool={tool}>
              <ToolComponent />
            </ToolWrapper>
          )}

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div className="mt-16 space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Related Tools
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedTools.map((relatedTool) => (
                  <Link
                    key={relatedTool.id}
                    href={`/tools/${relatedTool.slug}`}
                  >
                    <Card className="tool-card h-full cursor-pointer">
                      <div className="flex items-start justify-between mb-4 relative z-10 w-full">
                        <div className="tool-icon-wrapper">
                          {relatedTool.icon && (
                            <relatedTool.icon className="tool-icon" />
                          )}
                        </div>
                      </div>
                      <div className="relative z-10 flex flex-col flex-1 h-full">
                        <h3 className="font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                          {relatedTool.name}
                        </h3>
                        <p className="text-sm text-neutral-400 font-light mb-4 flex-grow">
                          {relatedTool.description}
                        </p>
                        <div className="flex items-center text-emerald-400 text-sm group-hover:translate-x-1 transition-transform mt-auto">
                          Try It <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
