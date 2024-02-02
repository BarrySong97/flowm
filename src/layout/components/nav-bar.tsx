import { FC } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Select,
  SelectItem,
  User,
} from "@nextui-org/react";
import dayjs from "dayjs";
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

  return (
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
        <Select
          size="sm"
          radius="sm"
          defaultSelectedKeys={[Year.toString()]}
          labelPlacement="outside"
          className="w-[140px]"
        >
          {Years.map((year) => (
            <SelectItem key={year.value} value={year.value}>
              {year.label}
            </SelectItem>
          ))}
        </Select>
      </NavbarBrand>
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
