"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function GrammarChecker() {
  const [text, setText] = useState("");
  const [issues, setIssues] = useState<string[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const check = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text");
      return;
    }

    setIsLoading(true);
    setHasChecked(false);

    try {
      // Use LanguageTool free API
      const response = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          text: text,
          language: "en-US",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to check grammar");
      }

      const data = await response.json();

      const errors = data.matches.map((match: any) => {
        const replacements = match.replacements.slice(0, 3).map((r: any) => r.value).join(", ");

        let msg = match.message;
        if (replacements) {
          msg += ` (Suggestions: ${replacements})`;
        }
        return msg;
      });

      setIssues(errors);
      setHasChecked(true);
      toast.success("Grammar check complete");
    } catch (error) {
      toast.error("Failed to check grammar. The service might be temporarily unavailable.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">AI Grammar Checker</h2>
        <div className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setHasChecked(false);
            }}
            className="h-40"
            placeholder="Type or paste your text here..."
            disabled={isLoading}
          />

          <Button onClick={check} className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking Grammar...
              </>
            ) : (
              "Check Grammar"
            )}
          </Button>

          {hasChecked && (
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-medium">Results:</h3>
              {issues.length === 0 ? (
                <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 p-3 rounded-md">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>No grammar issues or typos found! Your text looks great.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {issues.map((issue, index) => (
                    <div key={index} className="flex items-start gap-2 text-amber-500 bg-amber-500/10 p-3 rounded-md text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
