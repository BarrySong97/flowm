import { AccountTreeDataDto } from "@/api/models/AccountTreeDataDto";
import { CreateTransactionDto } from "@/api/models/CreateTransactionDto";
import { AccountType } from "@/pages/Accounts/const";
import {
  IllustrationSuccess,
  IllustrationSuccessDark,
} from "@douyinfe/semi-illustrations";
import {
  Descriptions,
  Empty,
  Input,
  Button as SemiButton,
} from "@douyinfe/semi-ui";
import AutoSizer from "react-virtualized-auto-sizer";
import { Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useQueryClient } from "react-query";
import {
  Button,
  Checkbox,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { TransactionType } from "@/constant";
import { SolarDocumentTextBold } from "@/assets/icons";
import ImportLoadingModal from "./import-loading-modal";
import { TransactionsService } from "@/api/services/TransactionsService";
import dayjs from "dayjs";
export interface ConfirmTableProps {
  dataSource?: CreateTransactionDto[];
  setSteps: Dispatch<SetStateAction<number>>;
}
const ConfirmTable: FC<ConfirmTableProps> = ({ setSteps, dataSource }) => {
  const [ignoredIndex, setignoredIndex] = useState<boolean[]>([]);
  const [detailList, setDetailList] = useState<string[]>([]);
  const [descriptionList, setDescriptionList] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOepn] = useState(false);
  const queryClient = useQueryClient();
  const accountData: AccountTreeDataDto | undefined =
    queryClient.getQueryData("accountTreeData");
  const getAccountName = (account: string[]) => {
    return accountData?.[account[0] as AccountType]?.find(
      (item) => item.id === account[1]
    )?.title;
  };
  const getType = (v: string) => {
    switch (v) {
      case TransactionType.IN:
        return "收入";
      case TransactionType.OUT:
        return "支出";
      case TransactionType.LOAN:
        return "借贷";
      case TransactionType.REPAYMENT:
        return "还款";
      case TransactionType.TRANSFER:
        return "转账";
    }
  };
  const columns: ColumnsType<any> = [
    {
      dataIndex: "ignore",
      width: 100,
      title: "是否忽略",
      render: (text: boolean, record, index) => {
        return (
          <Checkbox
            onChange={(e) => {
              ignoredIndex[index] = e.target.checked;
              setignoredIndex([...ignoredIndex]);
            }}
            isSelected={ignoredIndex[index]}
          />
        );
      },
    },
    {
      title: "交易时间",
      dataIndex: "transactionDate",
      render(_, record) {
        return dayjs(record.transactionDate).format("YYYY-MM-DD HH:mm");
      },
    },
    {
      title: "从账户",
      dataIndex: "account",
      render: (_, record) => {
        return getAccountName(record.account[1]);
      },
    },
    {
      title: "到账户",
      dataIndex: "account",
      render: (_, record) => {
        return getAccountName(record.account[1]);
      },
    },
    {
      title: "内容",
      dataIndex: "detail",
      render(text, record, index) {
        return (
          <Input
            onChange={(value) => {
              detailList[index] = value;
              setDetailList([...detailList]);
            }}
            value={detailList[index] ?? text}
          />
        );
      },
    },
    {
      title: "金额",
      dataIndex: "amount",
    },
    {
      title: "收支",
      dataIndex: "type",
      render: (_, record) => {
        return getType(record.type);
      },
    },
    {
      title: "补充信息",
      dataIndex: "extra",
      render(text) {
        const data = JSON.parse(text);
        delete data.id;
        delete data.to;
        delete data.from;
        delete data.type;
        delete data.amount;
        delete data.ignore;
        const keys = Object.keys(data);
        const obj = keys.reduce((acc, key) => {
          acc.push({ key: key, value: data[key] });
          return acc;
        }, [] as any);
        return (
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button
                isIconOnly
                size="sm"
                radius="sm"
                color="primary"
                variant="light"
              >
                <SolarDocumentTextBold className="text-large" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold mb-2">补充信息</div>
                <Descriptions data={obj} />
              </div>
            </PopoverContent>
          </Popover>
        );
      },
    },
    {
      title: "备注",
      align: "center",
      dataIndex: "desc",
      render(text, record, index) {
        return (
          <Input
            onChange={(value) => {
              descriptionList[index] = value;
              setDescriptionList([...descriptionList]);
            }}
            value={descriptionList[index] ?? text}
          />
        );
      },
    },
  ];
  const getImportData = () => {
    return dataSource
      ?.filter((item, index) => !ignoredIndex[index])
      .map((item, index) => {
        delete item.ignore;
        return {
          ...item,
          detail: detailList[index] ?? item.detail,
          desc: descriptionList[index] ?? item.desc,
          account: undefined,
          fromAccountId: item.account[0][1],
          toAccountId: item.account[1][1],
        };
      });
  };
  const onImport = async () => {
    const data = getImportData();
    if (data) {
      try {
        setOepn(true);
        await TransactionsService.transactionControllerImport({
          requestBody: data,
        });
        setIsSuccess(true);
        queryClient.invalidateQueries("transactions");
        message.success("导入成功");
      } catch (error) {
        setIsSuccess(false);
      } finally {
        setOepn(false);
      }
    }
  };

  return (
    <>
      <AutoSizer>
        {({ height, width }) => (
          <div style={{ height: height - 200, width }}>
            {isSuccess ? (
              <Empty
                title={"导入成功"}
                image={
                  <IllustrationSuccess style={{ width: 150, height: 150 }} />
                }
                darkModeImage={
                  <IllustrationSuccessDark
                    style={{ width: 150, height: 150 }}
                  />
                }
                layout="horizontal"
                description="这是一段很长的描述文本，当文本过长的时候推荐使用这种布局形式。这是一段很长的描述文本，当文本过长的时候推荐使用这种布局形式。这是一段很长的描述文本，当文本过长的时候推荐使用这种布局形式。"
                style={{ width: 800, margin: "0 auto" }}
              >
                <SemiButton
                  type="primary"
                  style={{ padding: "6px 24px" }}
                  className="mr-2"
                >
                  再次导入
                </SemiButton>
                <SemiButton
                  type="primary"
                  theme="solid"
                  style={{ padding: "6px 24px" }}
                >
                  关闭
                </SemiButton>
              </Empty>
            ) : (
              <>
                <Table
                  rowKey={"transactionDate"}
                  scroll={{ x: 1200, y: height - 200 }}
                  pagination={false}
                  columns={columns}
                  dataSource={dataSource}
                />
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
                      onImport();
                    }}
                    theme="solid"
                    type="primary"
                  >
                    确认导入
                  </SemiButton>
                </div>
              </>
            )}
          </div>
        )}
      </AutoSizer>
      <ImportLoadingModal isOpen={open} onOpenChange={setOepn} />
    </>
  );
};

export default ConfirmTable;
