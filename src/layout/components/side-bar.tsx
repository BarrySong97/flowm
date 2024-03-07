import React, { ReactNode, useState } from "react";
import {
  SolarAddFolderBold,
  SolarChatRoundMoneyBold,
  SolarLayersBoldDuotone,
  SolarReciveSquareBold,
  SolarSendSquareBold,
  SolarSortBold,
  SolarSquareTransferHorizontalBold,
  UilTransaction,
} from "@/assets/icons";
import { Tree } from "@douyinfe/semi-ui";

import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { AccountTreeDataDto } from "@/api/models/AccountTreeDataDto";
import { AccountsService } from "@/api/services/AccountsService";

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const selectedKeys = [pathname];
  const [selectKey, setSelectKey] = useState<string>("-1");
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const [currentOptions, setCurrentOptions] = useState<string>();
  const getLabel = (
    label: string,
    icon: ReactNode,
    isFirstLevel: boolean,
    amount: number,
    color?: string,
    showOptions?: boolean,
    value?: string
  ) => {
    return (
      <div className="flex py-2 pr-4 justify-between items-center account_item">
        <div className="flex gap-2 items-center">
          <div className="text-lg" style={{ color }}>
            {icon}
          </div>
          <div style={{ color: value === selectKey ? "#006FEE" : "" }}>
            {label}
          </div>
        </div>
        <div className="flex items-center &:hover:text-red-500">
          {showOptions ? <div style={{ color }}>{amount}</div> : null}
          {/* {showOptions ? (
            <Dropdown
              onOpenChange={(value) => {
                if (!value) {
                  setCurrentOptions(undefined);
                }
              }}
            >
              <DropdownTrigger>
                <Button
                  className={label !== currentOptions ? "account_options" : ""}
                  size="small"
                  type="text"
                  onClick={() => setCurrentOptions(label)}
                  icon={<MoreOutlined />}
                />
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with description"
              >
                {isFirstLevel ? (
                  <DropdownItem
                    key="new"
                    description={`新${label}项`}
                    startContent={<AddNoteIcon className={iconClasses} />}
                  >
                    New file
                  </DropdownItem>
                ) : (
                  <DropdownItem className="hidden" key="new"></DropdownItem>
                )}
                <DropdownItem
                  key="edit"
                  showDivider
                  description={`编辑${label}`}
                  startContent={<EditDocumentIcon className={iconClasses} />}
                >
                  Edit file
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  description={`删除${label}`}
                  startContent={
                    <DeleteDocumentIcon
                      className={cn(iconClasses, "text-danger")}
                    />
                  }
                >
                  Delete file
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : null} */}
        </div>
      </div>
    );
  };

  const { data: accountdata, isLoading } = useQuery<AccountTreeDataDto, Error>(
    ["accountTreeData"],
    () => AccountsService.accountsControllerGetTreeData(),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  const treeData = [
    {
      label: "仪表盘",
      value: "dashboard",
      key: "-1",
      labelIcon: <SolarLayersBoldDuotone />,
      className: "rounded-md",
      level: -1,
      color: "#006FEE",
    },
    {
      label: "流水",
      value: "transactions",
      key: "-2",
      labelIcon: <SolarSquareTransferHorizontalBold />,
      className: "rounded-md",
      level: -1,
      color: "#7828C8",
    },
    {
      label: "账户管理",
      value: "accounts",
      key: "-3",
      labelIcon: <SolarAddFolderBold />,
      className: "rounded-md",
      level: -1,
      color: "#71717A",
    },
    {
      label: "资产",
      value: "assets",
      labelIcon: <SolarChatRoundMoneyBold />,
      key: "0",
      className: "rounded-md",
      amount: accountdata?.assets.reduce((a, b) => a + b.amount, 0),
      level: 0,
      color: "#17C964",
      children: [
        ...(accountdata?.assets.map((item) => ({
          label: item.title,
          color: "#17C964",
          value: item.title,
          amount: item.amount,
          key: item.id,
        })) ?? []),
      ],
    },
    {
      label: "收入",
      value: "income",
      amount: accountdata?.income.reduce((a, b) => a + b.amount, 0),
      labelIcon: <SolarReciveSquareBold />,
      color: "#F5A524",
      level: 0,
      key: "1",
      children: [
        ...(accountdata?.income.map((item) => ({
          label: item.title,
          color: "#F5A524",
          value: item.title,
          amount: item.amount,
          key: item.id,
        })) ?? []),
      ],
    },
    {
      label: "消费",
      value: "expenses",
      labelIcon: <SolarSendSquareBold />,
      color: "#71717A",
      level: 0,
      amount: accountdata?.expense.reduce((a, b) => a + b.amount, 0),
      key: "2",
      children: [
        ...(accountdata?.expense.map((item) => ({
          label: item.title,
          color: "#71717A",
          value: item.title,
          key: item.id,
          amount: item.amount,
        })) ?? []),
      ],
    },
    {
      label: "负债",
      value: "liabilities",
      level: 0,
      labelIcon: <SolarSortBold />,
      color: "#F31260",
      key: "3",
      amount: accountdata?.liabilities.reduce((a, b) => a + b.amount, 0),
      children: [
        ...(accountdata?.liabilities.map((item) => ({
          label: item.title,
          color: "#F31260",
          amount: item.amount,
          value: item.title,
          key: item.id,
        })) ?? []),
      ],
    },
  ];
  return (
    <>
      {/* <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        style={{ height: "100%", borderRight: 0 }}
        items={treeData.map((v) => ({
          label: v.label,
          key: v.key,
          icon: (
            <span
              style={{
                color: v.color,
              }}
            >
              {v.labelIcon}
            </span>
          ),
        }))}
      /> */}

      <Tree
        defaultValue={selectKey}
        onChange={(value) => {
          setSelectKey(value as string);
          if (
            ["dashboard", "transactions", "accounts"].includes(value as string)
          ) {
            switch (value) {
              case "dashboard":
                navigate("/");
                break;
              default:
                navigate("/" + value);
                break;
            }
          }
        }}
        renderLabel={(_, treeNodeData) => {
          return getLabel(
            (treeNodeData?.label as string) ?? "",
            treeNodeData?.labelIcon ?? null,
            treeNodeData?.level === 0,
            treeNodeData?.amount,
            treeNodeData?.color,
            treeNodeData?.level !== -1,
            treeNodeData?.value as string
          );
        }}
        treeData={treeData}
      />
    </>
  );
};

export default SideBar;
