import { FC } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  Link,
  NavbarContent,
  NavbarItem,
  Select,
  SelectItem,
  User,
} from "@nextui-org/react";
import {
  IcRoundCategory,
  MaterialSymbolsCreditCard,
  MaterialSymbolsDashboard,
  PhPlusMinusFill,
  UilTransaction,
} from "@/assets/icons";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
export interface NavbarProps {}
const Year = dayjs(new Date()).year();
const AppNavbar: FC<NavbarProps> = () => {
  const Years = [
    {
      label: "2024",
      value: "2024",
    },
    {
      label: "2023",
      value: "2023",
    },
  ];
  const menuItems = [
    {
      name: "看板",
      icon: <MaterialSymbolsDashboard />,
      href: "/",
    },
    {
      name: "流水",
      icon: <UilTransaction />,
      href: "/transactions",
    },
    {
      name: "资产",
      icon: <MaterialSymbolsCreditCard />,
      href: "/accounts",
    },
    {
      name: "分类",
      icon: <IcRoundCategory />,
      href: "/category",
    },
    {
      name: "负债",
      icon: <PhPlusMinusFill />,
      href: "/debets",
    },
  ];
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <Navbar
      isBordered
      className="bg-white"
      classNames={{
        wrapper: "!max-w-[100%] ",
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
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default AppNavbar;
