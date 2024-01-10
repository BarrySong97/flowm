import { FC } from "react";
import { ConfigProvider, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

import {
  Button,
  Card,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import {
  Metric,
  Text,
  Flex,
  BadgeDelta,
  Grid,
  Title,
  AreaChart,
} from "@tremor/react";
import LineCharts from "./components/line-chart";
import DashDonutChart from "./components/pie-chart";
import SankeyCahart from "./components/sankey-chart";
import { AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/outline";
import {
  MaterialSymbolsAdd,
  MaterialSymbolsExportNotesSharp,
  MdiSortAscending,
} from "@/assets/icons";
import { AppArea } from "./components/area-chart";
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
  const colors = {
    increase: "emerald",
    moderateIncrease: "emerald",
    unchanged: "orange",
    moderateDecrease: "rose",
    decrease: "rose",
  };

  const categories = [
    {
      title: "12月消费",
      metric: "12,699",
      metricPrev: "9,456",
      delta: "34.3%",
      deltaType: "moderateIncrease",
    },
    {
      title: "12月收入",
      metric: "40,598",
      metricPrev: "45,564",
      delta: "10.9%",
      deltaType: "moderateDecrease",
    },
    {
      title: "总负债",
      metric: "40,598",
      metricPrev: "45,564",
      delta: "10.9%",
      deltaType: "moderateDecrease",
    },
    {
      title: "总资产",
      metric: "40,598",
      metricPrev: "45,564",
      delta: "10.9%",
      deltaType: "moderateDecrease",
    },
  ];
  const chartdata = [
    {
      date: "Jan 22",
      SemiAnalysis: 2890,
      "The Pragmatic Engineer": 2338,
    },
    {
      date: "Feb 22",
      SemiAnalysis: 2756,
      "The Pragmatic Engineer": 2103,
    },
    {
      date: "Mar 22",
      SemiAnalysis: 3322,
      "The Pragmatic Engineer": 2194,
    },
    {
      date: "Apr 22",
      SemiAnalysis: 3470,
      "The Pragmatic Engineer": 2108,
    },
    {
      date: "May 22",
      SemiAnalysis: 3475,
      "The Pragmatic Engineer": 1812,
    },
    {
      date: "Jun 22",
      SemiAnalysis: 3129,
      "The Pragmatic Engineer": 1726,
    },
  ];
  return (
    <div className="flex gap-6  relative items-stretch h-full">
      <div className="flex-1 gap-4 flex flex-col justify-between">
        {categories.map((item) => (
          <Card radius="sm" key={item.title} className=" h-full">
            <AppArea />
          </Card>
        ))}
      </div>
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
    </div>
  );
};

export default Dashboard;
