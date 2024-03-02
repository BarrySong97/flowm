import { Outlet, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useAtom } from "jotai";
import { LocaleAtom } from "@/Atoms";
import "./index.css";
import PageWrapper from "@/components/PageWraper";
import SideBar from "./components/side-bar";
import { Layout } from "antd";
import AppNavbar from "./components/nav-bar";
import { NextUIProvider } from "@nextui-org/react";
export const LocaleList: Array<{ label: string; value: LocalType }> = [
  { value: "en", label: "English" },
  { value: "zh", label: "中文" },
];
const { Content, Sider } = Layout;

export type LocalType = "zh" | "en";
const AppLayout = () => {
  const [_Locale] = useAtom(LocaleAtom);
  const navigate = useNavigate();
  return (
    <ErrorBoundary fallback={<div>error</div>}>
      <NextUIProvider navigate={navigate}>
        <Layout style={{ height: "100vh" }}>
          <div className="h-full overflow-auto bg-white">
            <Sider
              // collapsible
              className="border-divider border-r h-full"
              width={260}
              theme="light"
            >
              <SideBar />
            </Sider>
          </div>
          <Layout style={{ height: "100vh", backgroundColor: "#FBFBFC" }}>
            <Content className="h-screen">
              <AppNavbar />
              <PageWrapper>
                <Outlet />
              </PageWrapper>
            </Content>
          </Layout>
        </Layout>
      </NextUIProvider>
    </ErrorBoundary>
  );
};

export default AppLayout;
