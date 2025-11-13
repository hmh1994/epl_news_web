"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import { ReactNode } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface ErrorStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onRetry?: () => void;
  footer?: ReactNode;
  className?: string;
}

export const ErrorState = ({
  title,
  message,
  actionLabel,
  onRetry,
  footer,
  className,
}: ErrorStateProps) => {
  const t = useTranslations("common.error");
  const resolvedTitle = title ?? t("title");
  const resolvedMessage = message ?? t("message");
  const resolvedAction = actionLabel ?? t("action");
  return (
    <div
      className={clsx(
        "mx-auto flex w-full max-w-2xl flex-col items-center rounded-3xl border border-white/10 bg-slate-950/80 px-10 py-14 text-center text-slate-100 shadow-2xl shadow-emerald-500/5 backdrop-blur-xl",
        className
      )}
    >
      <div className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-300'>
        <AlertTriangle className='h-8 w-8' />
      </div>
      <h1 className='text-2xl font-semibold text-white'>{resolvedTitle}</h1>
      <p className='mt-3 text-sm text-slate-400'>{resolvedMessage}</p>

      {onRetry && (
        <button
          type='button'
          onClick={onRetry}
          className='mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-emerald-400/40 hover:text-white'
        >
          <RefreshCcw className='h-4 w-4' />
          {resolvedAction}
        </button>
      )}

      {footer && <div className='mt-6 text-xs text-slate-500'>{footer}</div>}
    </div>
  );
};
