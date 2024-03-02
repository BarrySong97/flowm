import { AccountTreeDataDto } from "@/api/models/AccountTreeDataDto";
import { CreateTransactionDto } from "@/api/models/CreateTransactionDto";
import { AccountType } from "@/pages/Accounts/const";
import AutoSizer from "react-virtualized-auto-sizer";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { FC } from "react";
import { useQueryClient } from "react-query";
export interface ConfirmTableProps {
  dataSource?: CreateTransactionDto[];
}
const ConfirmTable: FC<ConfirmTableProps> = ({ dataSource }) => {
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
      case "in":
        return "收入";
      case "out":
        return "支出";
      case "loan":
        return "借贷";
      case "repayment":
        return "还款";
    }
  };
  const columns: ColumnsType<any> = [
    {
      title: "交易时间",
      dataIndex: "transactionDate",
    },
    {
      title: "从账户",
      dataIndex: ["from", "name"],
      render: (_, record) => {
        return getAccountName(record.from);
      },
    },
    {
      title: "到账户",
      dataIndex: ["to", "name"],
      render: (_, record) => {
        return getAccountName(record.to);
      },
    },
    {
      title: "内容",
      dataIndex: "detail",
      render: (_, record) => {
        return getAccountName(record.from);
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
      title: "备注",
      align: "center",
      dataIndex: "desc",
    },
  ];
  return (
    <AutoSizer>
      {({ height, width }) => (
        <div style={{ height, width }}>
          <Table
            rowKey={"transactionDate"}
            scroll={{ x: 1200, y: height }}
            pagination={false}
            columns={columns}
            dataSource={dataSource}
          />
        </div>
      )}
    </AutoSizer>
  );
};

export default ConfirmTable;
