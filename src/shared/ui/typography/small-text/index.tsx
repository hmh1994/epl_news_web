import { ReactNode } from "react";

const SmallText = ({
  cssOption,
  children,
}: {
  cssOption?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={`subpixel-antialiased text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm  ${cssOption}`}
    >
      {children}
    </div>
  );
};

export default SmallText;
