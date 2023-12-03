import {
  IonHelp,
  MaterialSymbolsCreditCard,
  MaterialSymbolsDashboard,
  PhPlusMinusFill,
  UilTransaction,
} from "@/assets/icons";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Listbox, Avatar, ListboxItem } from "@nextui-org/react";
export interface NavigationProps {}
const Navigation: FC<NavigationProps> = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const menuItems = [
    {
      name: "首页",
      icon: <MaterialSymbolsDashboard />,
      href: "/",
    },
    {
      name: "收支",
      icon: <UilTransaction />,
      href: "/transactions",
    },
    {
      name: "账户",
      icon: <MaterialSymbolsCreditCard />,
      href: "/accounts",
    },
    {
      name: "负债",
      icon: <PhPlusMinusFill />,
      href: "/debets",
    },
  ];
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className="h-screen  py-4 w-[220px] flex flex-col justify-between">
      <div>
        <div className="px-3 pt-2 flex gap-3 ">
          <Avatar
            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
            size="md"
          />
          <div className="flex flex-col justify-between">
            <div className="text-sm font-bold">Barry Song</div>
            <div className="text-xs text-slate-500">已经记账300天</div>
          </div>
        </div>
        <div className="px-3">
          <Divider className="mt-6 mb-4 " />
        </div>

        <div className=" flex flex-col  gap-3">
          <Listbox
            aria-label="User Menu"
            variant="flat"
            color="primary"
            disallowEmptySelection
            autoFocus
            hideSelectedIcon
            defaultSelectedKeys={["/"]}
            selectedKeys={[pathname]}
            selectionMode="single"
          >
            {menuItems.map((item) => (
              <ListboxItem
                key={item.href}
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

      {/* <div className="flex justify-start">
        <Button
          className="rounded-full h-8 w-8 p-2"
          size={"sm"}
          variant={"outline"}
        >
          <IonHelp className="text-sm " />
        </Button>
      </div> */}
    </div>
  );
};

export default Navigation;
