"use client";

import { useEffect } from "react";
import { ErrorState } from "@/shared/ui/error-state";
import { useTranslations } from "next-intl";

interface RootErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: RootErrorProps) {
  const t = useTranslations("errors.root");
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-white'>
      <ErrorState
        message={t("message")}
        onRetry={reset}
        footer={
          error.digest ? (
            <span className='font-mono text-xs text-slate-500'>
              {t("codeLabel")}: {error.digest}
            </span>
          ) : null
        }
      />
    </div>
  );
}
