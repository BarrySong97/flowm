import { AccountTreeDataDto } from "@/api/models/AccountTreeDataDto";
import { CsvContent } from "@/lib/csv-adaper";
import NewAccount from "@/pages/Accounts/components/new";
import { AccountType } from "@/pages/Accounts/const";
import { Cascader, Select, Typography } from "@douyinfe/semi-ui";
import { Checkbox, useDisclosure } from "@nextui-org/react";
import { ConfigProvider, Table, message } from "antd";
import { Button as SemiButton } from "@douyinfe/semi-ui";
import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQueryClient } from "react-query";
import ConfirmTable from "./confirm-table";
export interface ImportTableProps {
  csvContent?: CsvContent;
  steps: number;
  importSource: string;
  setSteps: Dispatch<SetStateAction<number>>;
}
export type ExpandableType = {
  transType: string;
  transTo: string;
  data: any;
};
export type ExpandableMapType = Record<
  string,
  {
    from: string[]; // 从账户
    to: string[]; // 到账户
    type: string; //收支 in | out
  }
>;
const ImportTable: FC<ImportTableProps> = ({
  csvContent,
  steps,
  setSteps,
  importSource,
}) => {
  const { Title, Text } = Typography;
  // 用来定义下面的数据的type
  const [typeMap, setTypeMap] = useState<ExpandableMapType>({});
  const typeMapRef = useRef<ExpandableMapType>({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // 数据自己的type
  const [dataMap, setDataMap] = useState<ExpandableMapType>({});
  const queryClient = useQueryClient();
  const accountData: AccountTreeDataDto | undefined =
    queryClient.getQueryData("accountTreeData");
  const treeData = [
    {
      label: "资产",
      value: AccountType.ASSETS,
      children: [
        ...(accountData?.assets.map((item) => ({
          label: item.title,
          value: item.id,
        })) ?? []),
      ],
    },
    {
      label: "收入",
      value: AccountType.INCOME,
      children: [
        ...(accountData?.income.map((item) => ({
          label: item.title,
          value: item.id,
        })) ?? []),
      ],
    },
    {
      label: "消费",
      value: AccountType.EXPENSE,
      children: [
        ...(accountData?.expense.map((item) => ({
          label: item.title,
          value: item.id,
        })) ?? []),
      ],
    },
    {
      label: "负债",
      value: AccountType.LIABILITIES,
      children: [
        ...(accountData?.liabilities.map((item) => ({
          label: item.title,
          value: item.id,
        })) ?? []),
      ],
    },
  ];
  const transferColumns = [
    {
      dataIndex: "index",
      width: 100,
      title: "行数",
      render: (_, record: any, index: number) => {
        return index;
      },
    },
    {
      dataIndex: "transType",
      title: "交易类型",
    },
    {
      dataIndex: "transTo",
      title: "交易对方",
    },
    {
      dataIndex: "from",
      title: "从账户",
      render: (_, record: ExpandableType) => {
        return (
          <Cascader
            bottomSlot={
              <div style={slotStyle}>
                <Text>找不到相关选项？</Text>
                <Text link onClick={onOpen}>
                  去新建
                </Text>
              </div>
            }
            onChange={(v) => {
              setTypeMap((old) => {
                const key = `${record.transType}-${record.transTo}`;
                let item = old[key];
                if (item) {
                  item.from = v as string[];
                } else {
                  old[key] = {
                    from: v as string[],
                    to: [],
                    type: "",
                  };
                }
                item = old[key];
                if (item?.to.length && item?.from.length) {
                  let inOrOut = "invalid";
                  // 消费
                  if (item?.from[0] === "assets" && item?.to[0] === "expense") {
                    inOrOut = "out";
                  }
                  // 收入
                  if (item?.from[0] === "income" && item?.to[0] === "assets") {
                    inOrOut = "in";
                  }
                  // 负债
                  if (
                    item?.from[0] === "liabilities" &&
                    item?.to[0] === "expense"
                  ) {
                    inOrOut = "loan";
                  }
                  // 还款
                  if (
                    item?.from[0] === "assets" &&
                    item?.to[0] === "liabilities"
                  ) {
                    inOrOut = "repayment";
                  }
                  old[key].type = inOrOut;
                  if (inOrOut === "invalid") {
                    message.error("无效的交易类型，请重新选择");
                  }
                }
                return {
                  ...old,
                };
              });
            }}
            treeData={treeData}
            placeholder="选择匹配账户"
          />
        );
      },
    },
    {
      dataIndex: "to",
      title: "到账户",
      render: (_, record: ExpandableType) => {
        return (
          <Cascader
            bottomSlot={
              <div style={slotStyle}>
                <Text>找不到相关选项？</Text>
                <Text link onClick={onOpen}>
                  去新建
                </Text>
              </div>
            }
            onChange={(v) => {
              setTypeMap((old) => {
                const key = `${record.transType}-${record.transTo}`;
                let item = old[key];
                if (item) {
                  item.to = v as string[];
                } else {
                  old[key] = {
                    to: v as string[],
                    from: [],
                    type: "",
                  };
                }
                item = old[key];
                if (item.to.length && item.from.length) {
                  let inOrOut = "invalid";
                  // 消费
                  if (item?.from[0] === "assets" && item?.to[0] === "expense") {
                    inOrOut = "out";
                  }
                  // 收入
                  if (item?.from[0] === "income" && item?.to[0] === "assets") {
                    inOrOut = "in";
                  }
                  // 负债
                  if (
                    item?.from[0] === "liabilities" &&
                    item?.to[0] === "expense"
                  ) {
                    inOrOut = "loan";
                  }
                  // 还款
                  if (
                    item?.from[0] === "assets" &&
                    item?.to[0] === "liabilities"
                  ) {
                    inOrOut = "repayment";
                  }
                  old[key].type = inOrOut;
                  if (inOrOut === "invalid") {
                    message.error("无效的交易类型，请重新选择");
                  }
                }
                return {
                  ...old,
                };
              });
            }}
            treeData={treeData}
            placeholder="选择匹配账户"
          />
        );
      },
    },
    {
      dataIndex: "type",
      title: "收/支",
      render: (_, record: ExpandableType) => {
        const key = `${record.transType}-${record.transTo}`;
        const item = typeMap[key];
        let inOrOut = "out";
        // 消费
        if (item?.from[0] === "assets" && item?.to[0] === "expense") {
          inOrOut = "out";
        }
        // 收入
        if (item?.from[0] === "income" && item?.to[0] === "assets") {
          inOrOut = "in";
        }
        // 负债
        if (item?.from[0] === "liabilities" && item?.to[0] === "expense") {
          inOrOut = "loan";
        }
        // 还款
        if (item?.from[0] === "assets" && item?.to[0] === "liabilities") {
          inOrOut = "repayment";
        }
        return (
          <Select
            disabled
            onChange={(v) => {
              setTypeMap((old) => {
                const key = `${record.transType}-${record.transTo}`;
                const item = old[key];
                if (item) {
                  item.type = v as string;
                } else {
                  old[key] = {
                    to: [],
                    from: [],
                    type: v as string,
                  };
                }
                return {
                  ...old,
                };
              });
            }}
            style={{ width: 120 }}
            value={inOrOut}
          >
            <Select.Option value="in">收入</Select.Option>
            <Select.Option value="out">支出</Select.Option>
            <Select.Option value="loan">借贷</Select.Option>
            <Select.Option value="repayment">还款</Select.Option>
          </Select>
        );
      },
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  useEffect(() => {
    typeMapRef.current = typeMap;
  }, [typeMap]);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 32,
    columnTitle: (node: ReactNode) => {
      return (
        <Checkbox
          isIndeterminate={node?.props?.indeterminate}
          onChange={node?.props?.onChange}
          isSelected={node?.props?.checked}
          size="md"
          radius="md"
        ></Checkbox>
      );
    },
    renderCell: (
      _checked: boolean,
      _record: any,
      _index: number,
      node: ReactNode
    ) => {
      return (
        <Checkbox
          onChange={node?.props?.onChange}
          onClick={node?.props?.onClick}
          isSelected={node?.props?.checked}
          size="md"
          radius="md"
        ></Checkbox>
      );
    },
  };
  const slotStyle = {
    height: "36px",
    display: "flex",
    padding: "0 32px",
    alignItems: "center",
    cursor: "pointer",
    borderTop: "1px solid var(--semi-color-border)",
  };
  const expandedRowRender = (record: ExpandableType) => {
    const columns = csvContent?.tableColumns.slice();
    columns?.splice(
      4,
      0,
      ...[
        {
          dataIndex: "from",
          title: "从账户",
          width: 200,
          render: (text: string, record: any) => {
            const keys = Object.keys(record);
            return (
              <Cascader
                onChange={(v) => {
                  setDataMap((old) => {
                    const key = `${record[keys[0]]}`;
                    const item = old[key];
                    const parentTypeKey = `${record.transType}-${record.transTo}`;
                    const parentType = typeMapRef.current[parentTypeKey];
                    if (item) {
                      item.from = v as string[];
                    } else {
                      old[key] = {
                        to: parentType?.to,
                        from: v as string[],
                        type: "",
                      };
                    }
                    return {
                      ...old,
                    };
                  });
                }}
                style={{ width: 150 }}
                value={text}
                bottomSlot={
                  <div style={slotStyle}>
                    <Text>找不到相关选项？</Text>
                    <Text
                      link
                      onClick={() => {
                        onOpen();
                      }}
                    >
                      去新建
                    </Text>
                  </div>
                }
                treeData={treeData}
                placeholder="选择匹配账户"
              />
            );
          },
        },
        {
          dataIndex: "to",
          title: "到账户",
          width: 200,
          render: (text: string, record: any) => {
            const keys = Object.keys(record);
            return (
              <Cascader
                bottomSlot={
                  <div style={slotStyle}>
                    <Text>找不到相关选项？</Text>
                    <Text link>去新建</Text>
                  </div>
                }
                onChange={(v) => {
                  setDataMap((old) => {
                    const key = `${record[keys[0]]}`;
                    const item = old[key];
                    const parentTypeKey = `${record.transType}-${record.transTo}`;
                    const parentType = typeMapRef.current[parentTypeKey];

                    if (item) {
                      item.to = v as string[];
                    } else {
                      old[key] = {
                        from: parentType?.from,
                        to: v as string[],
                        type: "",
                      };
                    }
                    let inOrOut = "out";
                    // 消费
                    if (
                      item?.from[0] === "assets" &&
                      item?.to[0] === "expense"
                    ) {
                      inOrOut = "out";
                    }
                    // 收入
                    if (
                      item?.from[0] === "income" &&
                      item?.to[0] === "assets"
                    ) {
                      inOrOut = "in";
                    }
                    // 负债
                    if (
                      item?.from[0] === "liabilities" &&
                      item?.to[0] === "expense"
                    ) {
                      inOrOut = "loan";
                    }
                    // 还款
                    if (
                      item?.from[0] === "assets" &&
                      item?.to[0] === "liabilities"
                    ) {
                      inOrOut = "repayment";
                    }
                    old[key].type = inOrOut;
                    return {
                      ...old,
                    };
                  });
                }}
                style={{ width: 150 }}
                treeData={treeData}
                value={text}
                placeholder="选择匹配账户"
              />
            );
          },
        },
      ]
    );

    return (
      <Table
        columns={columns}
        dataSource={record?.data}
        rowKey={"id"}
        // rowSelection={rowSelection}
        scroll={{ y: 200 }}
        pagination={false}
      />
    );
  };
  const getExpandleData = () => {
    const transType = csvContent?.transactionType;
    if (transType) {
      const transTypeKeys = Object.keys(transType);
      const showTablData: ExpandableType[] = [];
      transTypeKeys.forEach((transTypeKey) => {
        const transToKeys = Object.keys(transType[transTypeKey]);
        transToKeys.forEach((transToKey) => {
          const data = transType[transTypeKey][transToKey];
          const key = `${transTypeKey}-${transToKey}`;
          const item = typeMap[key];
          data.forEach((v) => {
            const keys = Object.keys(v);
            const selfTypeData = dataMap[v[keys[0]]];

            v["to"] = selfTypeData?.to ? selfTypeData.to : item?.to;
            v["from"] = selfTypeData?.from ? selfTypeData.from : item?.from;
            v["type"] = item?.type ?? selfTypeData?.type;
            v["amount"] = v["金额(元)"].replace("￥", "") || v["金额"];
          });
          const res = {
            transType: transTypeKey,
            transTo: transToKey,
            data,
          };
          showTablData.push(res);
        });
      });
      return showTablData;
    }
  };
  const expandableData = getExpandleData();
  const ref = useRef<any>(null);
  const isAllAccount = () => {
    let parentIndex = -1;

    for (let i = 0; i < (expandableData?.length ?? 0); i++) {
      const item = expandableData?.[i];
      const flag = item?.data.every((s: any) => {
        return s.to && s.from && s.type;
      });
      if (!flag) {
        parentIndex = i;
        break;
      }
    }
    if (parentIndex !== -1) {
      message.warning(`第 ${parentIndex + 1} 条数据集没有匹配到对应的账户`);
      ref.current.scrollTo({ index: parentIndex });
    }
    return parentIndex === -1;
  };
  return (
    <>
      <div className="mb-4 flex items-end gap-2">
        <Title type="secondary" heading={5}>
          {"数据展示"}
        </Title>
        <Text type="secondary">共 {csvContent?.data?.length} 条</Text>
      </div>
      {steps === 1 ? (
        <>
          <div className="mt-4 flex gap-4">
            <Table
              ref={ref}
              rowKey={"transTo"}
              scroll={{ x: 1500, y: 500 }}
              pagination={false}
              expandable={{ expandedRowRender, columnWidth: 50 }}
              columns={transferColumns}
              dataSource={expandableData}
            />
          </div>
          <NewAccount onOpenChange={onOpenChange} isOpen={isOpen} />
          <div className="mt-4 justify-center flex gap-4">
            <SemiButton
              onClick={() => {
                setSteps((step) => {
                  return step - 1;
                });
              }}
              type="primary"
            >
              上一步
            </SemiButton>
            <SemiButton
              onClick={() => {
                const flag = isAllAccount();
                if (flag) {
                  setSteps(2);
                }
              }}
              type="primary"
            >
              确认数据
            </SemiButton>
          </div>
        </>
      ) : (
        <ConfirmTable dataSource={expandableData} />
      )}
    </>
  );
};

export default ImportTable;
