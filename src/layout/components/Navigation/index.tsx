import {
  IcRoundCategory,
  MaterialSymbolsCreditCard,
  MaterialSymbolsDashboard,
  PhPlusMinusFill,
  UilTransaction,
} from "@/assets/icons";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Divider,
  Listbox,
  Avatar,
  ListboxItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
export interface NavigationProps {}
const Navigation: FC<NavigationProps> = () => {
  const menuItems = [
    {
      name: "首页",
      icon: <MaterialSymbolsDashboard />,
      href: "/",
    },
    {
      name: "流水",
      icon: <UilTransaction />,
      href: "/transactions",
    },
    {
      name: "账户",
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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const selectedKeys = [pathname];
  return (
    <div className="h-screen  py-4 w-[220px] flex flex-col justify-between">
      <div>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="px-3 pt-2 flex gap-3 ">
              <Avatar
                src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                name="BS"
                size="md"
                isBordered
                as="button"
              ></Avatar>
              <div className="cursor-pointer flex flex-col justify-between">
                <div className="text-sm font-bold">Barry Song</div>
                <div className="text-xs text-slate-500">已经记账300天</div>
              </div>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="px-3">
          <Divider className="mt-6 mb-4 " />
        </div>

        <div className=" flex flex-col  gap-3">
          <Listbox
            aria-label="User Menu"
            variant="flat"
            color="primary"
            hideSelectedIcon
            selectedKeys={selectedKeys}
            selectionMode="single"
            itemClasses={{
              base: "data-[selected=true]:bg-primary/20 data-[selected=true]:text-primary",
            }}
          >
            {menuItems.map((item) => (
              <ListboxItem
                key={item.href}
                data-selected={pathname === item.href}
                onClick={() => {
                  navigate(item.href);
                }}
                startContent={
                  <div
                    className={
                      "flex items-center rounded-small justify-center w-7 h-7"
                    }
                  >
                    {item.icon}
                  </div>
                }
              >
                {item.name}
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      </div>

      <div className="flex justify-center px-4">
        <Select defaultSelectedKeys={["zh"]} labelPlacement="outside" size="sm">
          <SelectItem key={"zh"} value={"zh"}>
            中文
          </SelectItem>
          <SelectItem key={"en"} value={"en"}>
            English
          </SelectItem>
        </Select>
      </div>
    </div>
  );
};

export default Navigation;
