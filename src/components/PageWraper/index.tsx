import React, { FC } from "react";
export interface PageWrapperProps {
  children: React.ReactNode;
}
const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return (
    <div
      className="p-6 overflow-y-auto"
      style={{
        height: "calc(100vh - 64px)",
      }}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
