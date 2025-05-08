import { ReactNode } from "react";

const SubtitleText = ({
  cssOption,
  children,
}: {
  cssOption?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={`subpixel-antialiased text-zinc-900 dark:text-zinc-100 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl ${cssOption}`}
    >
      {children}
    </div>
  );
};

export default SubtitleText;
