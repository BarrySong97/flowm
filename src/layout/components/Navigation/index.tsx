import {
  IcRoundSearch,
  IonHelp,
  MaterialSymbolsCreditCard,
  MaterialSymbolsDashboard,
  MaterialSymbolsEditSquareOutlineRounded,
  PhPlusMinusFill,
  UilTransaction,
} from "@/assets/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { NewTransaction } from "@/components/NewTransaction";
import { FC, useEffect, useState } from "react";
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
      name: "Dashboard",
      icon: <MaterialSymbolsDashboard />,
    },
    {
      name: "Transactions",
      icon: <UilTransaction />,
    },
    {
      name: "Accounts",
      icon: <MaterialSymbolsCreditCard />,
    },
    {
      name: "Debets",
      icon: <PhPlusMinusFill />,
    },
  ];
  return (
    <div className="h-screen px-3 py-4 w-[220px] flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between ">
          <div className="flex px-2 py-1 flex-1 gap-2 items-center">
            <Avatar className="rounded-md w-[18px]   h-[18px] ">
              <AvatarFallback className=" bg-sky-500 text-white rounded-sm text-[0.6875rem]">
                BA
              </AvatarFallback>
            </Avatar>

            <span className="text-sm">Barry Song</span>
          </div>
          <Button variant={"ghost"} className="h-8 px-2 py-1 justify-start">
            <Avatar className=" w-[18px]   h-[18px] ">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
          </Button>
        </div>
        <div className="flex justify-between gap-2">
          <Button
            className="h-8 gap-2 px-2 py-1 flex-1 justify-between"
            variant={"outline"}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            <div className="flex items-center leading-6 gap-2">
              <MaterialSymbolsEditSquareOutlineRounded className="text-base" />
              New
            </div>
            <div>
              <NewTransaction open={open} onOpenChange={setOpen} />
            </div>
          </Button>
          <Button className="h-8 px-2 py-1" variant={"outline"}>
            <IcRoundSearch />
          </Button>
        </div>
        <div className=" flex flex-col  gap-3">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              className="h-8 px-2 py-1 justify-start "
              variant={"ghost"}
            >
              <div className="flex items-center  gap-2">
                <div className="text-base">{item.icon}</div>
                <div className="leading-6	">{item.name}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className="flex justify-start">
        <Button
          className="rounded-full h-8 w-8 p-2"
          size={"sm"}
          variant={"outline"}
        >
          <IonHelp className="text-sm " />
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
