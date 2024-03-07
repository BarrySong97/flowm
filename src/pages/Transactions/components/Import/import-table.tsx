import { AccountTreeDataDto } from "@/api/models/AccountTreeDataDto";
import { CsvContent } from "@/lib/csv-adaper";
import AutoSizer from "react-virtualized-auto-sizer";
import NewAccount from "@/pages/Accounts/components/new";
import { AccountType } from "@/pages/Accounts/const";
import { Cascader, Select, Typography } from "@douyinfe/semi-ui";
import { Checkbox, useDisclosure } from "@nextui-org/react";
import { Table, message } from "antd";
import { Button as SemiButton } from "@douyinfe/semi-ui";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQueryClient } from "react-query";
import ConfirmTable from "./confirm-table";
import { CreateTransactionDto } from "@/api/models/CreateTransactionDto";
export interface ImportTableProps {
  csvContent?: CsvContent;
  steps: number;
  importSource: string;
  setSteps: Dispatch<SetStateAction<number>>;
}
export type ExpandableType = {
  transType: string; // 原本数据的交易类型
  transTo: string; // 原本数据的交易对方
  ignore: boolean; // 是否忽略
  data: any; // 原本数据
};
export type ExpandableMapType = Record<
  string,
  {
    from: string[]; // 从账户
    to: string[]; // 到账户
    ignore?: boolean; // 是否忽略该数据
    type: string; //收支 in | out
  }
>;
const ImportTable: FC<ImportTableProps> = ({
  importSource,
  csvContent,
  steps,
  setSteps,
}) => {
  const { Title, Text } = Typography;
  // 用来定义下面的数据的type
  const [typeMap, setTypeMap] = useState<ExpandableMapType>({});
  const typeMapRef = useRef<ExpandableMapType>({}); //一级类型,使用transtype和transto当key，映射类型
  const dataMapRef = useRef<ExpandableMapType>({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // 数据自己的type //具体到二级数据的自己选择的类型,使用时间作为key来映射类型
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
      title: "是否忽略",
      render: (_, record: any, index: number) => {
        const ignore = record.data.every((v: any) => !!v.ignore);
        const isIndeterminate = record.data.some((v: any) => !!v.ignore);
        if (index === 1) {
          console.log(record.data, ignore, isIndeterminate);
        }
        return (
          <Checkbox
            isIndeterminate={!ignore && isIndeterminate}
            isSelected={ignore}
            onChange={(e) => {
              setTypeMap((old) => {
                const key = `${record.transType}-${record.transTo}`;
                let item = old[key];
                if (item) {
                  item.ignore = e.target.checked;
                  record.data.forEach((v) => {
                    const keys = Object.keys(v);
                    const selfTypeData = dataMap[v[keys[0]]];
                    dataMap[v[keys[0]]] = {
                      ...selfTypeData,
                      ignore: undefined,
                    };
                  });
                } else {
                  old[key] = {
                    from: [],
                    ignore: e.target.checked,
                    to: [],
                    type: "",
                  };
                }
                return {
                  ...old,
                };
              });
            }}
          />
        );
      },
    },
    {
      dataIndex: "index",
      width: 100,
      title: "行数",
      render: (_, record: any, index: number) => {
        return index + 1;
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
      render: (text, record: ExpandableType) => {
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
            value={text}
            treeData={treeData}
            placeholder="选择匹配账户"
          />
        );
      },
    },
    {
      dataIndex: "to",
      title: "到账户",
      render: (text, record: ExpandableType) => {
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
                  if (item?.from[0] === "assets" && item?.to[0] === "assets") {
                    inOrOut = "transfer";
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
            value={text}
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
        let inOrOut = "invalid";
        // 消费
        if (item?.from[0] === "assets" && item?.to[0] === "expense") {
          inOrOut = "out";
        }
        if (item?.from[0] === "assets" && item?.to[0] === "assets") {
          inOrOut = "transfer";
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
        console.log(item);
        return (
          <Select disabled style={{ width: 120 }} value={inOrOut}>
            <Select.Option value="in">收入</Select.Option>
            <Select.Option value="out">支出</Select.Option>
            <Select.Option value="loan">借贷</Select.Option>
            <Select.Option value="transfer">转账</Select.Option>
            <Select.Option value="repayment">还款</Select.Option>
            <Select.Option value="invalid">-</Select.Option>
          </Select>
        );
      },
    },
  ];
  useEffect(() => {
    typeMapRef.current = typeMap;
  }, [typeMap]);
  useEffect(() => {
    dataMapRef.current = dataMap;
  }, [dataMap]);
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
    columns?.unshift({
      dataIndex: "ignore",
      width: 100,
      title: "是否忽略",
      render: (text: boolean, record: any) => {
        return (
          <Checkbox
            isSelected={text}
            onChange={(e) => {
              const keys = Object.keys(record);
              setDataMap((old) => {
                const key = `${record[keys[0]]}`;
                const item = old[key];
                const parentTypeKey = `${record.transType}-${record.transTo}`;
                const parentType = typeMapRef.current[parentTypeKey];

                if (item) {
                  item.ignore = e.target.checked;
                } else {
                  old[key] = {
                    from: parentType?.from,
                    ignore: e.target.checked,
                    to: parentType?.to,
                    type: "",
                  };
                }
                return {
                  ...old,
                };
              });
            }}
          />
        );
      },
    });
    return (
      <Table
        columns={columns}
        dataSource={record?.data}
        rowKey={"id"}
        scroll={{ y: 200, x: 1800 }}
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
          const item = typeMap[key] || typeMapRef.current[key];
          data.forEach((v) => {
            const keys = Object.keys(v);
            const selfTypeData = dataMap[v[keys[0]]];

            v["to"] = selfTypeData?.to ? selfTypeData.to : item?.to;
            v["from"] = selfTypeData?.from ? selfTypeData.from : item?.from;
            v["type"] = item?.type ?? selfTypeData?.type;
            v["ignore"] =
              selfTypeData?.ignore !== undefined
                ? selfTypeData.ignore
                : item?.ignore;
            v["amount"] = v["金额(元)"].replace("￥", "") || v["金额"];
          });
          const res = {
            id: key,
            ignore: item?.ignore ?? false,
            from: item?.from,
            to: item?.to,
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
  const expandableData = useMemo(
    () => getExpandleData(),
    [csvContent, dataMap, typeMap]
  );

  const ref = useRef<any>(null);
  const isAllAccount = () => {
    let parentIndex = -1;

    for (let i = 0; i < (expandableData?.length ?? 0); i++) {
      const item = expandableData?.[i];
      let invalid = false;
      if (item?.ignore) {
        continue;
      }
      const flag = item?.data.every((s: any) => {
        if (s.type === "invalid") {
          invalid = true;
          message.warning(`第 ${i + 1} 条数据集有无效数据`);
          return false;
        }
        return s.to && s.from && s.type;
      });
      if (!flag && !invalid) {
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
  const [confirmData, setConfirmData] = useState<CreateTransactionDto[]>();
  const getConfirmData = () => {
    switch (importSource) {
      case "wechat":
        const res: CreateTransactionDto[] = [];
        expandableData?.forEach((item) => {
          const data = item?.data.map((v: any) => {
            const keys = Object.keys(v);
            const transactionDate = v[keys[0]];
            const detail = v[keys[2]];
            const account = [v["from"], v["to"]]; // 从那个账户
            const amount = v["amount"]; // 金额
            const type = v["type"]; // 收支类型
            const ignore = v["ignore"]; // 收支类型
            delete v.id;
            delete v.to;
            delete v.from;
            delete v.type;
            delete v.amount;
            delete v.ignore;
            const extra = JSON.stringify(v);
            return {
              transactionDate,
              detail,
              ignore,
              account,
              amount,
              type,
              extra,
            };
          });
          res.push(...data.filter((v: any) => !v.ignore));
        });
        return res;
      default:
        break;
    }
  };

  return (
    <>
      <div className="mb-4 flex items-end gap-2">
        <Title type="secondary" heading={5}>
          {"数据展示"}
        </Title>
        <Text type="secondary">共 {csvContent?.data?.length} 条</Text>
      </div>
      <div
        style={{
          height: "calc(100vh - 200px)",
        }}
      >
        {steps === 1 ? (
          <AutoSizer>
            {({ height, width }) => {
              return (
                <div style={{ height, width }} className="w-full">
                  <Table
                    ref={ref}
                    rowKey={"id"}
                    scroll={{ x: 1000, y: height - 100 }}
                    pagination={false}
                    expandable={{ expandedRowRender, columnWidth: 50 }}
                    columns={transferColumns}
                    dataSource={expandableData}
                  />
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
                          const res = getConfirmData();
                          setConfirmData(res);
                        }
                      }}
                      type="primary"
                    >
                      确认数据
                    </SemiButton>
                  </div>
                </div>
              );
            }}
          </AutoSizer>
        ) : (
          <>
            <ConfirmTable
              importSource={importSource}
              setSteps={setSteps}
              dataSource={confirmData}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ImportTable;
