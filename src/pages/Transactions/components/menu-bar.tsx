import { FC, useState } from "react";
import {
  SortAscendingOutlined,
  FilterOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { SortableList } from "./SortableList";
export interface MenuBarProps {}
function getMockItems() {
  return createRange(50, (index) => ({ id: index + 1 }));
}
export function createRange<T>(
  length: number,
  initializer: (index: number) => T
): T[] {
  return [...new Array(length)].map((_, index) => initializer(index));
}
const MenuBar: FC<MenuBarProps> = () => {
  const [items, setItems] = useState(getMockItems);

  const menuItems = [
    {
      name: "字段设置",
      icon: <SettingOutlined />,
      href: "/",
      content: (
        <div
          style={{
            maxWidth: 400,
            height: 300,
            overflow: "scroll",
          }}
          className=" p-6"
        >
          <SortableList
            items={items}
            onChange={setItems}
            renderItem={(item) => (
              <SortableList.Item id={item.id}>
                {item.id}
                <SortableList.DragHandle />
              </SortableList.Item>
            )}
          />
        </div>
      ),
    },
    {
      name: "筛选",
      icon: <FilterOutlined />,
      href: "/",
    },
    {
      name: "排序",
      icon: <SortAscendingOutlined />,
      href: "/",
    },
  ];
  return (
    <>
      {menuItems.map((item) => (
        <Popover
          key={item.name}
          placement="bottom"
          radius="sm"
          showArrow={true}
        >
          <PopoverTrigger>
            <Button
              startContent={item.icon}
              size="sm"
              radius="sm"
              variant="flat"
            >
              {item.name}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="relative">{item.content}</PopoverContent>
        </Popover>
      ))}
    </>
  );
};

export default MenuBar;
