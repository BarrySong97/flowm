import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useAtom } from "jotai";
import { LocaleAtom } from "@/Atoms";
import PageWrapper from "@/components/PageWraper";
import SideBar from "./components/side-bar";
import { Layout } from "antd";
import AppNavbar from "./components/nav-bar";
export const LocaleList: Array<{ label: string; value: LocalType }> = [
  { value: "en", label: "English" },
  { value: "zh", label: "中文" },
];
const { Content, Sider } = Layout;

export type LocalType = "zh" | "en";
const AppLayout = () => {
  const [_Locale] = useAtom(LocaleAtom);
  return (
    <ErrorBoundary fallback={<div>error</div>}>
      <Layout style={{ height: "100vh" }}>
        <Sider defaultCollapsed={false} theme="light" collapsible>
          <SideBar />
        </Sider>
        <Layout style={{ height: "100vh" }}>
          <Content className="h-screen">
            <AppNavbar />
            <PageWrapper>
              <Outlet />
            </PageWrapper>
          </Content>
        </Layout>
      </Layout>
    </ErrorBoundary>
  );
};

export default AppLayout;
