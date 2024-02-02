import React, { FC } from "react";
export interface PageWrapperProps {
  children: React.ReactNode;
}
const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return <div className="p-6  ">{children}</div>;
};

export default PageWrapper;
