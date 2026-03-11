import { ToolGridSkeleton } from "@/components/ui/tool-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function ToolsLoading() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-12 pb-12 md:pt-26">
          <div className="mb-12">
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-6 w-64" />
          </div>
          
          <div className="mb-8">
            <Skeleton className="w-full h-14 rounded-lg" />
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            <aside className="lg:w-56 space-y-4">
              <Skeleton className="h-6 w-24 hidden lg:block" />
              <div className="flex flex-row lg:flex-col gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-24 lg:w-full" />
                ))}
              </div>
            </aside>
            <div className="flex-1">
              <ToolGridSkeleton count={9} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
