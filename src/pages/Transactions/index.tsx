import { NewTransaction } from "@/components/NewTransaction";
import { ChevronDoubleRightIcon } from "@heroicons/react/outline";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Link,
  Divider,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { Icon } from "@tremor/react";
import { useState } from "react";

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export default function Transactions() {
  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const [showNew, setShowNew] = useState(false);
  return (
    <>
      <div className="space-y-1">
        <h4 className="text-medium font-medium">收支列表</h4>
      </div>
      <Divider className="my-4" />
      <div className="flex gap-3 mb-4">
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[44%]",
            inputWrapper: "border-1 h-8",
          }}
          placeholder="搜索关键词"
          size="sm"
          variant="bordered"
        />
        <Dropdown>
          <DropdownTrigger className="hidden sm:flex">
            <Button size="sm" variant="flat">
              收支
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Table Columns"
            closeOnSelect={false}
            // selectedKeys={statusFilter}
            selectionMode="multiple"
            // onSelectionChange={setStatusFilter}
          >
            {statusOptions.map((status) => (
              <DropdownItem key={status.uid} className="capitalize">
                {status.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger className="hidden sm:flex">
            <Button size="sm" variant="flat">
              账户
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Table Columns"
            closeOnSelect={false}
            // selectedKeys={statusFilter}
            selectionMode="multiple"
            // onSelectionChange={setStatusFilter}
          >
            {statusOptions.map((status) => (
              <DropdownItem key={status.uid} className="capitalize">
                {status.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger className="hidden sm:flex">
            <Button size="sm" variant="flat">
              排序
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Table Columns"
            closeOnSelect={false}
            // selectedKeys={statusFilter}
            selectionMode="multiple"
            // onSelectionChange={setStatusFilter}
          >
            {statusOptions.map((status) => (
              <DropdownItem key={status.uid} className="capitalize">
                {status.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger className="hidden sm:flex">
            <Button size="sm" variant="flat">
              分类
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Table Columns"
            closeOnSelect={false}
            // selectedKeys={statusFilter}
            selectionMode="multiple"
            // onSelectionChange={setStatusFilter}
          >
            {statusOptions.map((status) => (
              <DropdownItem key={status.uid} className="capitalize">
                {status.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button color="primary" onClick={() => setShowNew(true)} size="sm">
          新的流水
        </Button>
      </div>
      <Table
        color={"primary"}
        selectionMode="multiple"
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>流向</TableColumn>
          <TableColumn>金额</TableColumn>
          <TableColumn>简述</TableColumn>
          <TableColumn>收支</TableColumn>
          <TableColumn>日期</TableColumn>
          <TableColumn>备注</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>
              <Chip radius="sm">微信</Chip>
              <Icon size="xs" color="gray" icon={ChevronDoubleRightIcon} />
              <Chip radius="sm">饮食</Chip>
            </TableCell>
            <TableCell>12</TableCell>
            <TableCell>
              <Link underline="hover" className="cursor-pointer">
                #吃饭
              </Link>
            </TableCell>
            <TableCell>收入</TableCell>
            <TableCell>2023-12-01</TableCell>
            <TableCell>-</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <NewTransaction open={showNew} onOpenChange={setShowNew} />
    </>
  );
}
