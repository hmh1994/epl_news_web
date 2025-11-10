"use client";

import { useEffect } from "react";
import { ErrorState } from "@/shared/ui/error-state";

interface RootErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: RootErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-white'>
      <ErrorState
        message='잠시 후 다시 시도해주세요. 문제가 계속되면 운영팀에 문의 부탁드립니다.'
        onRetry={reset}
        footer={
          error.digest ? (
            <span className='font-mono text-xs text-slate-500'>
              오류 코드: {error.digest}
            </span>
          ) : null
        }
      />
    </div>
  );
}
