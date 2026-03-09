"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ToolWrapper } from "@/components/tools/tool-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
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
} from "@/components/tools/seo-tools";
import {
  FileConverter,
  FileCompressor,
  FileToBase64,
} from "@/components/tools/file-tools";
import {
  AITextGenerator,
  TextSummarizer,
  GrammarChecker,
  AICodeHelper,
  AIContentWriter,
  SentimentAnalyzer,
} from "@/components/tools/ai-tools";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { ImageUpscaler } from "@/components/tools/image/image-upscaler";

// Tool component mapping
const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  // Text Tools (11)
  WordCounter: WordCounter,
  CharacterCounter: CharacterCounter,
  CaseConverter: CaseConverter,
  TextReverser: TextReverser,
  RemoveSpaces: RemoveSpaces,
  DuplicateRemover: DuplicateRemover,
  TextSorter: TextSorter,
  LoremIpsum: LoremIpsum,
  RandomText: RandomText,
  TextCompare: TextCompare,
  TextToSlug: TextToSlug,
  // Developer Tools (13)
  JSONFormatter: JSONFormatter,
  JSONValidator: JSONValidator,
  XMLFormatter: XMLFormatter,
  Base64Encoder: Base64Encoder,
  Base64Decoder: Base64Decoder,
  URLEncoder: URLEncoder,
  URLDecoder: URLDecoder,
  RegexTester: RegexTester,
  JWTDecoder: JWTDecoder,
  HTMLFormatter: HTMLFormatter,
  CSSMinifier: CSSMinifier,
  JSMinifier: JSMinifier,
  UUIDGenerator: UUIDGenerator,
  // Calculator Tools (12)
  AgeCalculator: AgeCalculator,
  BMICalculator: BMICalculator,
  LoanCalculator: LoanCalculator,
  DiscountCalculator: DiscountCalculator,
  PercentageCalculator: PercentageCalculator,
  TimeCalculator: TimeCalculator,
  DateCalculator: DateCalculator,
  TipCalculator: TipCalculator,
  UnitConverter: UnitConverter,
  TemperatureConverter: TemperatureConverter,
  CurrencyConverter: CurrencyConverter,
  GPACalculator: GPACalculator,
  // Utility Tools (13)
  PasswordGenerator: PasswordGenerator,
  QRCodeGenerator: QRCodeGenerator,
  ColorPicker: ColorPicker,
  Stopwatch: Stopwatch,
  CountdownTimer: CountdownTimer,
  RandomNumberGenerator: RandomNumberGenerator,
  PasswordStrength: PasswordStrength,
  GradientGenerator: GradientGenerator,
  RandomNameGenerator: RandomNameGenerator,
  DiceRoller: DiceRoller,
  MarkdownPreview: MarkdownPreview,
  HashGenerator: HashGenerator,
  // Image Tools (9)
  // Image Tools
  ImageCompressor: ImageCompressor,
  ImageResizer: ImageResizer,
  ImageCropper: ImageCropper,
  ImageConverter: ImageConverter,
  ImageRotator: ImageRotator,
  ImageUpscaler: ImageUpscaler,
  ImageColorExtractor: ImageColorExtractor,
  InvertImageColors: InvertImageColors,
  BlackAndWhite: BlackAndWhite,
  // File Tools (3)
  FileConverter: FileConverter,
  FileCompressor: FileCompressor,
  FileToBase64: FileToBase64,
  // SEO Tools (2)
  MetaTagGenerator: MetaTagGenerator,
  OpenGraphGenerator: OpenGraphGenerator,
  // AI Tools (4)
  AITextGenerator: AITextGenerator,
  TextSummarizer: TextSummarizer,
  GrammarChecker: GrammarChecker,
  AICodeHelper: AICodeHelper,
  AIContentWriter: AIContentWriter,
  SentimentAnalyzer: SentimentAnalyzer,
};

export default function ToolPage() {
  const params = useParams();
  const toolSlug = params.toolId as string;
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
                The tool you're looking for doesn't exist.
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

  // SAFE COMPONENT LOADING (FIX)
  const ToolComponent =
    TOOL_COMPONENTS[tool.component as keyof typeof TOOL_COMPONENTS];

  if (!ToolComponent) {
    console.error("Missing tool component:", tool.component);

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
    (t) => t.category === tool.category && t.id !== tool.id,
  ).slice(0, 3);
  const safeTool = tool;
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/tools"
            className="text-accent hover:text-accent/80 transition-colors mb-6 inline-flex items-center"
          >
            ← Back to Tools
          </Link>

          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          ) : (
            <ToolWrapper tool={safeTool}>
              <ToolComponent />
            </ToolWrapper>
          )}
          {relatedTools.length > 0 && (
            <div className="mt-16 space-y-6">
              <div>
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
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
