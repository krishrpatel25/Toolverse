"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export function DateCalculator() {
  const today = new Date().toISOString().split("T")[0];

  const [date1, setDate1] = useState(today);
  const [date2, setDate2] = useState(today);

  const result = useMemo(() => {
    if (!date1 || !date2) return null;

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;

    const diff = Math.abs(d2.getTime() - d1.getTime());

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    return { days, weeks, months, years };
  }, [date1, date2]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied!");
    } catch {
      toast.error("Copy failed");
    }
  };

  const reset = () => {
    setDate1(today);
    setDate2(today);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Input Card */}
      <Card className="p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">
          Date Difference Calculator
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Date 1 */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date 1
            </label>

            <input
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Date 2 */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date 2
            </label>

            <input
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </Card>

      {/* Results */}
      <Card className="p-6 bg-accent/10 border-accent">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Results</h3>

        {result ? (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Days:</span>
              <span className="font-medium text-foreground">
                {result.days.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Weeks:</span>
              <span className="font-medium text-foreground">
                {result.weeks.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Months (approx):</span>
              <span className="font-medium text-foreground">
                {result.months.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between border-t border-border pt-3">
              <span className="text-lg font-semibold text-foreground">
                Years (approx):
              </span>
              <span className="text-lg font-bold text-accent">
                {result.years}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            Select two valid dates to calculate difference.
          </p>
        )}
      </Card>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          onClick={() => copyToClipboard(`${result?.days ?? 0} days`)}
          className="flex-1"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Result
        </Button>

        <Button onClick={reset} variant="outline" className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
