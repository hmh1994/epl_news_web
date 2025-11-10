import clsx from "clsx";

interface LoadingStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export const LoadingState = ({
  title = "데이터를 불러오는 중",
  message = "최신 정보를 준비하고 있으니 잠시만 기다려주세요.",
  className,
}: LoadingStateProps) => {
  return (
    <div
      className={clsx(
        "mx-auto flex w-full max-w-2xl flex-col items-center rounded-3xl border border-white/10 bg-slate-950/60 px-10 py-16 text-center text-slate-200 shadow-xl shadow-emerald-500/5 backdrop-blur",
        className
      )}
    >
      <div className='flex items-center gap-4 text-emerald-300'>
        <span className='inline-flex h-3 w-3 animate-ping rounded-full bg-emerald-400' />
        <span className='text-sm font-medium uppercase tracking-wide'>
          Loading
        </span>
      </div>
      <h1 className='mt-6 text-2xl font-semibold text-white'>{title}</h1>
      <p className='mt-3 text-sm text-slate-400'>{message}</p>
    </div>
  );
};
