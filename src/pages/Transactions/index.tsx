import { Card, Checkbox } from "@nextui-org/react";
import { ConfigProvider, Table } from "antd";
import AutoSizer from "react-virtualized-auto-sizer";

import { ColumnsType } from "antd/es/table";
import { FC, ReactNode, useState } from "react";
import MenuBar from "./components/menu-bar";
export interface SimpleTrancProps {}

const Tranc: FC<SimpleTrancProps> = () => {
  const columns: ColumnsType<any> = [
    {
      title: "从账户",
      dataIndex: ["from", "name"],
    },
    {
      title: "到账户",
      dataIndex: ["to", "name"],
    },
    {
      title: "金额",
      dataIndex: "amount",
    },
    {
      title: "流水",
      dataIndex: "transacs",
    },
    {
      title: "备注",
      align: "center",
      dataIndex: "desc",
    },
    {
      title: "操作",
      dataIndex: "options",
    },
  ];

  const data = new Array(10000).fill(null).map((_, index) => ({
    transacs: "支出",
    id: index + "",
    amount: 100,
    from: {
      name: "微信",
      id: "123",
    },
    to: {
      name: "支付宝",
      id: "123",
    },
    desc: "-",
  }));

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 32,
    columnTitle: (node: ReactNode) => {
      console.log(node?.props);

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
          <MenuBar />
        </div>
      </div>
      {/* <AutoSizer>
        {({ height, width }) => {
          console.log(height, width);
          return (
            <Card radius="sm" style={{ height: height - 40, width: width }}>
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
                  virtual
                  rowKey={"id"}
                  scroll={{ x: width, y: height }}
                  pagination={false}
                  columns={columns}
                  dataSource={data}
                />
              </ConfigProvider>
            </Card>
          );
        }}
      </AutoSizer> */}
    </div>
  );
};

export default Tranc;
