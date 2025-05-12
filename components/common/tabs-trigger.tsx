import { ReactNode } from "react";
import { TabsTrigger } from "../ui/tabs";

export function CustomTabTrigger({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  return (
    <TabsTrigger
      value={value}
      className='
            data-[state=active]:bg-primary
            data-[state=active]:text-white
            hover:bg-secondary
            hover:text-white
            transition-colors
          '
    >
      {children}
    </TabsTrigger>
  );
}
