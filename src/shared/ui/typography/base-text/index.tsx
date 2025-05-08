import { ReactNode } from "react";

const BaseText = ({
  cssOption,
  children,
}: {
  cssOption?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={`subpixel-antialiased text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-lg ${cssOption}`}
    >
      {children}
    </div>
  );
};

export default BaseText;
