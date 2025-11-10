import { LoadingState } from "@/shared/ui/loading-state";

export default function RootLoading() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-white'>
      <LoadingState />
    </div>
  );
}
