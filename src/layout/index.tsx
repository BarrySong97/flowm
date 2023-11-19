import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { useAtom } from "jotai";
import { LocaleAtom } from "@/Atoms";
import Navigation from "./components/Navigation";
import { Separator } from "@/components/Seperator";
export const LocaleList: Array<{ label: string; value: LocalType }> = [
  { value: "en", label: "English" },
  { value: "zh", label: "中文" },
];
export type LocalType = "zh" | "en";
const AppLayout = () => {
  const [_Locale] = useAtom(LocaleAtom);

  return (
    <ErrorBoundary fallback={<div>error</div>}>
      <div className="flex">
        <nav>
          <Navigation />
        </nav>
        <Separator orientation="vertical" className="h-screen" />
        <main>
          <Outlet />
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default AppLayout;
