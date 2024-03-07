import {
  Button,
  Card,
  Checkbox,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { ConfigProvider, Table, Tag } from "antd";

import { ColumnsType } from "antd/es/table";
import { FC, ReactNode, useState } from "react";
import MenuBar from "./components/menu-bar";
import ImportBtn from "./components/Import";
import { useQuery } from "react-query";
import { TransactionDto } from "@/api/models/TransactionDto";
import { SolarDocumentTextBold } from "@/assets/icons";
import { Descriptions } from "@douyinfe/semi-ui";
import { TransactionsService } from "@/api/services/TransactionsService";
import { TransactionType } from "@/constant";
import dayjs from "dayjs";
export interface SimpleTrancProps {}

const Tranc: FC<SimpleTrancProps> = () => {
  const { data, isLoading } = useQuery<TransactionDto[], Error>(
    ["transactions"],
    () => TransactionsService.transactionControllerFindAll(),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const getType = (v: string) => {
    switch (v) {
      case TransactionType.IN:
        return (
          <Tag bordered={false} className="bg-green-500 text-white">
            收入
          </Tag>
        );
      case TransactionType.OUT:
        return (
          <Tag bordered={false} className="bg-warning text-white">
            支出
          </Tag>
        );
      case TransactionType.LOAN:
        return (
          <Tag bordered={false} className="bg-danger text-white">
            贷款
          </Tag>
        );
      case TransactionType.REPAYMENT:
        return <Tag bordered={false}>还款</Tag>;
      case TransactionType.TRANSFER:
        return <Tag bordered={false}>转账</Tag>;
    }
  };
  const columns: ColumnsType<TransactionDto> = [
    {
      title: "交易时间",
      dataIndex: "transactionDate",
      width: 150,
      render(_, record) {
        return dayjs(record.transactionDate).format("YYYY-MM-DD HH:mm");
      },
    },
    {
      title: "从账户",
      dataIndex: ["from", "title"],
      width: 100,
      render(text) {
        return <Tag bordered={false}>{text}</Tag>;
      },
    },
    {
      title: "到账户",
      dataIndex: ["to", "title"],
      width: 100,
      render(text) {
        return <Tag bordered={false}>{text}</Tag>;
      },
    },
    {
      title: "内容",
      dataIndex: "detail",
      render(text) {
        return text ?? "-";
      },
    },
    {
      title: "金额",
      dataIndex: "amount",
      render(_, record) {
        switch (record.type) {
          case TransactionType.IN:
            return `+¥${record.amount}`;
          case TransactionType.OUT:
            return `-¥${record.amount}`;
          case TransactionType.LOAN:
            return `¥${record.amount}`;
          case TransactionType.REPAYMENT:
            return `-¥${record.amount}`;
          case TransactionType.TRANSFER:
            return `¥${record.amount}`;
        }
      },
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
        const keys = Object.keys(data);
        const obj = keys.reduce((acc, key) => {
          acc.push({ key: key, value: data[key] });
          return acc;
        }, [] as any);
        return (
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button isIconOnly size="sm" radius="sm" variant="light">
                <SolarDocumentTextBold className="text-large text-default-500" />
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
      render(text) {
        return text ?? "-";
      },
    },
    {
      title: "创建时间",
      width: 150,
      dataIndex: "createdAt",
      render(_, record) {
        return dayjs(record.createdAt).format("YYYY-MM-DD HH:mm");
      },
    },
    {
      title: "更新时间",
      width: 150,
      dataIndex: "updatedAt",
      render(_, record) {
        return dayjs(record.updatedAt).format("YYYY-MM-DD HH:mm");
      },
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

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
  return (
    <div
      className=" flex-col "
      style={{
        height: "calc(100vh - 120px)",
      }}
    >
      <div className="flex gap-2 mb-4 items-center">
        <h4 className="text-medium font-medium ">流水数据</h4>
        <div className="flex gap-2">
          <ImportBtn />
          <MenuBar />
        </div>
      </div>
      <Card radius="sm">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg:
                  "hsl(var(--nextui-default-100)/var(--nextui-default-100-opacity,var(--tw-bg-opacity)))",
              },
            },
          }}
        >
          <Table
            rowSelection={rowSelection}
            rowKey={"id"}
            pagination={false}
            columns={columns}
            dataSource={data}
          />
        </ConfigProvider>
      </Card>
    </div>
  );
};

export default Tranc;
