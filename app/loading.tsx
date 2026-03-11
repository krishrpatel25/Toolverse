import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#020202] flex flex-col">
      {/* Skeleton Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Skeleton className="h-8 w-32 bg-white/10" />
          <div className="flex gap-4">
            <Skeleton className="h-8 w-20 bg-white/5" />
            <Skeleton className="h-8 w-20 bg-white/5" />
          </div>
        </div>
      </header>

      <main className="flex-1 pt-32 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Skeleton Hero Section */}
          <div className="text-center space-y-6">
            <Skeleton className="h-24 w-3/4 mx-auto bg-white/5" />
            <Skeleton className="h-12 w-1/2 mx-auto bg-white/5" />
            <Skeleton className="h-14 w-48 mx-auto rounded-full bg-white/10" />
          </div>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-[2rem]" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
