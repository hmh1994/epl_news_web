import { ReactNode } from "react";

const TitleText = ({
  cssOption,
  children,
}: {
  cssOption?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={`subpixel-antialiased text-zinc-900 dark:text-zinc-100 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl ${cssOption}`}
    >
      {children}
    </div>
  );
};

export default TitleText;
