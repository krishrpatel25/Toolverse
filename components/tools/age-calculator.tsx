"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("1995-01-01");

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
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Age Calculator</h2>
            <p className="text-sm text-neutral-400 mt-1">Determine your exact age and next birthday</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <Calendar className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Date of Birth</label>
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={today}
            className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-medium"
          />
        </div>
      </Card>

      {age && (
        <div className="space-y-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card 
              className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem] cursor-pointer hover:border-emerald-500/30 transition-all group"
              onClick={() => handleCopy(`${age.years} Years`)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Age in Years</p>
                  <p className="text-5xl font-bold text-white tracking-tighter">{age.years}</p>
                  <p className="text-sm text-neutral-400 mt-2">{age.months} months, {age.days} days</p>
                </div>
                <Copy className="text-neutral-600 group-hover:text-emerald-400 transition-colors" size={20} />
              </div>
            </Card>

            <Card className="p-8 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem]">
              <p className="text-xs font-bold text-emerald-500/60 uppercase tracking-widest mb-2">Next Birthday</p>
              <p className="text-5xl font-bold text-emerald-400 tracking-tighter">
                {nextBirthdayDays} <span className="text-2xl font-medium">Days</span>
              </p>
              <p className="text-sm text-neutral-400 mt-2">Time to celebrate! 🎉</p>
            </Card>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { label: 'Total Days', value: age.totalDays.toLocaleString() },
               { label: 'Total Weeks', value: age.weeks.toLocaleString() },
               { label: 'Total Hours', value: age.hours.toLocaleString() },
               { label: 'Total Minutes', value: age.minutes.toLocaleString() },
             ].map((stat) => (
               <Card key={stat.label} className="p-6 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
               </Card>
             ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={() => setBirthDate('')} className="rounded-2xl border-white/10 hover:bg-white/5 h-12">
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear Date
        </Button>
      </div>
    </div>
  );
}
