import { ReactNode } from "react";

const ColorWrapper = ({
  children,
  cssOption,
}: {
  children: ReactNode;
  cssOption: string;
}) => {
  return <div className={`w-full ${cssOption}`}>{children}</div>;
};

export default ColorWrapper;
