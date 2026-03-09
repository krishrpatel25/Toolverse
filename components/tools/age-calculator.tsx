"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const age = useMemo(() => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const todayDate = new Date();

    let years = todayDate.getFullYear() - birth.getFullYear();
    let months = todayDate.getMonth() - birth.getMonth();
    let days = todayDate.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        0,
      );
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const diff = todayDate.getTime() - birth.getTime();

    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    return { years, months, days, totalDays, weeks, hours, minutes };
  }, [birthDate]);

  const nextBirthdayDays = useMemo(() => {
    if (!birthDate) return null;

    const todayDate = new Date();
    const birth = new Date(birthDate);

    let nextBirthday = new Date(
      todayDate.getFullYear(),
      birth.getMonth(),
      birth.getDate(),
    );

    if (nextBirthday < todayDate) {
      nextBirthday = new Date(
        todayDate.getFullYear() + 1,
        birth.getMonth(),
        birth.getDate(),
      );
    }

    const diff = nextBirthday.getTime() - todayDate.getTime();

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [birthDate]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Date of Birth</label>

        <Input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          max={today}
          className="py-6 text-base"
        />
      </div>

      {age && (
        <div className="space-y-4">
          {/* Main Cards */}
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            {/* Years */}
            <Card
              className="border bg-secondary/30 p-4 cursor-pointer hover:border-accent transition-colors"
              onClick={() => handleCopy(age.years.toString())}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Years</p>
                  <p className="text-3xl font-bold">{age.years}</p>
                </div>
                <Copy className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>

            {/* Detailed Age */}
            <Card
              className="border bg-secondary/30 p-4 cursor-pointer hover:border-accent transition-colors"
              onClick={() =>
                handleCopy(
                  `${age.years} years, ${age.months} months, ${age.days} days`,
                )
              }
            >
              <p className="text-sm text-muted-foreground">Detailed Age</p>
              <p className="text-lg font-mono font-bold">
                {age.years}y {age.months}m {age.days}d
              </p>
            </Card>

            {/* Days */}
            <Card
              className="border bg-secondary/30 p-4 cursor-pointer hover:border-accent transition-colors"
              onClick={() => handleCopy(age.totalDays.toString())}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Days</p>
                  <p className="text-2xl font-bold">
                    {age.totalDays.toLocaleString()}
                  </p>
                </div>
                <Copy className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>

            {/* Hours */}
            <Card
              className="border bg-secondary/30 p-4 cursor-pointer hover:border-accent transition-colors"
              onClick={() => handleCopy(age.hours.toString())}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hours</p>
                  <p className="text-2xl font-bold">
                    {age.hours.toLocaleString()}
                  </p>
                </div>
                <Copy className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>
          </div>

          {/* Extra Info */}
          <Card className="border bg-secondary/30 p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Weeks</p>
                <p className="text-lg font-bold">
                  {age.weeks.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Minutes</p>
                <p className="text-lg font-bold">
                  {age.minutes.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Next Birthday</p>
                <p className="text-lg font-bold text-accent">
                  in {nextBirthdayDays} days 🎉
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {!age && birthDate && (
        <Card className="border bg-secondary/30 p-4">
          <p className="text-sm text-muted-foreground">
            Enter a valid birth date to see age calculations
          </p>
        </Card>
      )}
    </div>
  );
}
