import { FC } from "react";
import { ConfigProvider, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  MaterialSymbolsAdd,
  MaterialSymbolsExportNotesSharp,
  MdiSortAscending,
} from "@/assets/icons";
import ChartBlock from "./components/chart-block";

export interface DashboardProps {}
export const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  {
    label: "Giraffe",
    value: "giraffe",
    description: "The tallest land animal",
  },
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    value: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    value: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    value: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    value: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    value: "crocodile",
    description: "A large semiaquatic reptile",
  },
];
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool"],
  },
];
const Dashboard: FC<DashboardProps> = () => {
  return (
    <div className="flex gap-6  relative items-stretch h-full">
      <div className="flex-1 flex flex-col ">
        <div className="flex justify-between mb-4 items-center">
          <div className="flex gap-2 items-center">
            <h4 className="text-medium font-medium w-[100px]">流水数据</h4>

            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <Button
                  className="hidden text-sm h-6 w-[32px] py-1 min-w-fit sm:flex gap-0.5 bg-default-400/20 dark:bg-default-500/20"
                  // endContent={<ChevronDownIcon className="text-tiny" />}
                  radius="sm"
                  size="sm"
                  variant="flat"
                >
                  <MaterialSymbolsAdd className="text-base" />
                  <span className="text-xs">筛选</span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="NextUI versions"
                defaultSelectedKeys={["v2"]}
                selectionMode="single"
              >
                <DropdownItem key="v2">2024</DropdownItem>
                <DropdownItem key="v1">2023</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex gap-2 flex-1 justify-end">
            <Button
              className="hidden text-sm h-6 w-[12px] py-1 min-w-fit sm:flex gap-0.5 bg-default-400/20 dark:bg-default-500/20"
              // endContent={<ChevronDownIcon className="text-tiny" />}
              radius="sm"
              size="sm"
              variant="flat"
            >
              <MdiSortAscending />
            </Button>
            <Button
              className="hidden text-sm h-6 w-[12px] py-1 min-w-fit sm:flex gap-0.5 bg-default-400/20 dark:bg-default-500/20"
              radius="sm"
              size="sm"
              variant="flat"
            >
              <MaterialSymbolsExportNotesSharp />
            </Button>
          </div>
        </div>
        <Card radius="sm" className="flex-1  ">
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
            <Table pagination={false} columns={columns} dataSource={data} />
          </ConfigProvider>
        </Card>
      </div>
      <div className="flex-1 gap-4 flex flex-col ">
        <ChartBlock />
      </div>
    </div>
  );
};

export default Dashboard;
