"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";

interface LoadingStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export const LoadingState = ({
  title,
  message,
  className,
}: LoadingStateProps) => {
  const t = useTranslations("common.loading");
  const resolvedTitle = title ?? t("title");
  const resolvedMessage = message ?? t("message");
  const statusLabel = t("label");

  return (
    <div
      className={clsx(
        "mx-auto flex w-full max-w-2xl flex-col items-center rounded-3xl border border-white/10 bg-slate-950/60 px-6 py-10 sm:px-10 sm:py-16 text-center text-slate-200 shadow-xl shadow-slate-500/5 backdrop-blur",
        className
      )}
      role='status'
      aria-live='polite'
    >
      <div className='flex items-center gap-4 text-slate-300'>
        <span className='inline-flex h-3 w-3 animate-ping rounded-full bg-slate-400' />
        <span className='text-sm font-medium uppercase tracking-wide'>
          {statusLabel}
        </span>
      </div>
      <h1 className='mt-6 text-2xl font-semibold text-white'>{resolvedTitle}</h1>
      <p className='mt-3 text-sm text-slate-400'>{resolvedMessage}</p>
    </div>
  );
};
