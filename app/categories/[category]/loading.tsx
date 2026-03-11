import { ToolGridSkeleton } from "@/components/ui/tool-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function CategoryLoading() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12 md:pt-26">
          <div className="mb-12">
            <Skeleton className="h-10 w-48 mb-4" />
            <Skeleton className="h-6 w-32" />
          </div>
          <ToolGridSkeleton count={6} />
        </div>
      </main>
      <Footer />
    </>
  );
}
