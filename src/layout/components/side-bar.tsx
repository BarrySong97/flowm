import React from "react";
import {
  IcRoundCategory,
  MaterialSymbolsCreditCard,
  MaterialSymbolsDashboard,
  PhPlusMinusFill,
  UilTransaction,
} from "@/assets/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const SideBar: React.FC = () => {
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

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const selectedKeys = [pathname];
  const items: MenuProps["items"] = menuItems.map((v) => {
    return getItem(v.name, v.href, v.icon);
  });
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["/"]}
      selectedKeys={selectedKeys}
      onSelect={({ key }) => {
        navigate(key);
      }}
      theme="light"
      items={items}
    />
  );
};

export default SideBar;
