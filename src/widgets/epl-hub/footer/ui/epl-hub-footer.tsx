"use client";

import { useTranslations } from "next-intl";

export const EplHubFooter = () => {
  const t = useTranslations("eplHub.footer");

  return (
    <footer className='bg-gradient-to-r from-slate-900 via-emerald-900/20 to-slate-900 border-t border-white/10 mt-20'>
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='text-center'>
          <div className='flex items-center justify-center space-x-3 mb-6'>
            <div className='w-12 h-12 bg-gradient-to-br from-[#169976] via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center text-2xl'>
              ⚽
            </div>
            <span className='text-3xl font-black bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent'>
              {t("title")}
            </span>
          </div>
          <p className='text-slate-400 mb-8 max-w-2xl mx-auto'>
            {t("description")}
          </p>
          <div className='text-sm text-slate-500'>{t("copyright")}</div>
        </div>
      </div>
    </footer>
  );
};
