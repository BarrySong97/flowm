import { Header } from "antd/es/layout/layout";
import clsx from "clsx";
import { FC } from "react";
import styles from "./index.module.scss";
import Logo from "@/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import LangSelect from "@/components/LangSelect";
import { Avatar, Badge, Button, Dropdown, MenuProps } from "antd";
import { useAuth } from "@/pages/Auth";
import { useTranslation } from "react-i18next";
import { BellOutlined, SmileOutlined } from "@ant-design/icons";
export interface HeaderProps {}
const AppHeader: FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuth();
  const { user } = auth || {};
  const headerClassname = clsx(
    "sticky  w-full top-0 z-50  ",
    "flex justify-between items-center",
    styles.header
  );
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          已欠费
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          即将到期
        </a>
      ),
    },
  ];
  return (
    <Header className={headerClassname}>
      <Link to="/" className="flex items-center">
        <img src={Logo} className="w-[100px]"></img>
      </Link>
      <div className="flex items-center gap-4">
        <LangSelect />
        <Dropdown menu={{ items }}>
          <Badge size="small" count={99}>
            <Button shape="circle" type="text" icon={<BellOutlined />}></Button>
          </Badge>
        </Dropdown>

        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <a
                    onClick={() => {
                      auth.signout(() => {
                        navigate("/login");
                      });
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("layout.header.logout")}
                  </a>
                ),
              },
            ],
          }}
        >
          <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
            {user?.name.charAt(0)}
          </Avatar>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
