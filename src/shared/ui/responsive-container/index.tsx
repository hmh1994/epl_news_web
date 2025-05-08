import React, { ReactNode } from "react";

const ResponsiveContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className='
        mx-auto
        xs:w-[320px]
        sm:w-[480px]
        md:w-[768px]
        lg:w-[1024px]
        xl:w-[1280px]
        2xl:w-[1536pxs]
        gap-4
    '
    >
      {children}
    </div>
  );
};
export default ResponsiveContainer;
