import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { useAtom } from "jotai";
import { LocaleAtom } from "@/Atoms";
import { Separator } from "@/components/Seperator";
import PageWrapper from "@/components/PageWraper";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  User,
} from "@nextui-org/react";
import {
  IcRoundCategory,
  MaterialSymbolsCreditCard,
  MaterialSymbolsDashboard,
  PhPlusMinusFill,
  UilTransaction,
} from "@/assets/icons";
export const LocaleList: Array<{ label: string; value: LocalType }> = [
  { value: "en", label: "English" },
  { value: "zh", label: "中文" },
];
export type LocalType = "zh" | "en";
const AppLayout = () => {
  const [_Locale] = useAtom(LocaleAtom);

  const menuItems = [
    {
      name: "看板",
      icon: <MaterialSymbolsDashboard />,
      href: "/",
    },
  ];
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <ErrorBoundary fallback={<div>error</div>}>
      <Navbar
        isBordered
        classNames={{
          wrapper: "!max-w-[100%]",
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
          brand: "!flex-[0]",
        }}
      >
        <NavbarBrand>
          <p className="font-bold text-inherit">FlowM</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4 ">
          {menuItems.map((item) => (
            <NavbarItem key={item.href} isActive={pathname === item.href}>
              <Link
                onClick={() => {
                  navigate(item.href);
                }}
                color={pathname === item.href ? "primary" : "foreground"}
                className="flex gap-2"
                href="#"
              >
                {item.icon}
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User
                name="Jane Doe"
                description="Product Designer"
                avatarProps={{
                  isBordered: true,
                  as: "button",
                  className: "transition-transform",
                  color: "secondary",
                  size: "sm",
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <div
        className="overflow-auto "
        style={{
          height: "calc(100vh - 65px)",
        }}
      >
        <main className="h-full">
          <PageWrapper>
            <Outlet />
          </PageWrapper>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default AppLayout;
