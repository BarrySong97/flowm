import {
  MaterialSymbolsAdd,
  MaterialSymbolsExportNotesSharp,
  MdiSortAscending,
} from "@/assets/icons";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { NewTransaction } from "@/components/NewTransaction";
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import { useMemo, useRef, useState } from "react";
import { useVirtual } from "react-virtual";
export type Transactions = {
  from: string;
  to: string;
  number: number;
  desc: string;
  flow: string;
  date: string;
};
export default function Transactions() {
  const [showNew, setShowNew] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const columns = useMemo<ColumnDef<Transactions>[]>(
    () => [
      {
        accessorKey: "flow",
        cell: (info) => info.getValue(),
        header: () => <span>Flow</span>,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: "age",
        header: () => "Age",
        size: 50,
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        size: 80,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: (info) => info.getValue<Date>().toLocaleString(),
      },
    ],
    []
  );
  return (
    <>
      <table
        aria-label="Example static collection table"
        role="grid"
        aria-describedby=""
        style={{ height: 300, overflow: "auto", border: "1px solid" }}
        className="min-w-full  w-full p-0 shadow-md"
      >
        <thead role="rowgroup">
          <tr
            role="row"
            className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
          >
            <th
              data-key="$.0"
              role="columnheader"
              id="react-aria1254617425-:rs:-$.0"
              className="rounded-t-md group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold  last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 "
            >
              流向
            </th>
            <th
              data-key="$.1"
              role="columnheader"
              id="react-aria1254617425-:rs:-$.1"
              className="group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 !rounded-none"
            >
              金额
            </th>
            <th
              data-key="$.2"
              role="columnheader"
              id="react-aria1254617425-:rs:-$.2"
              className="group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 !rounded-none"
            >
              简述
            </th>
            <th
              data-key="$.3"
              role="columnheader"
              id="react-aria1254617425-:rs:-$.3"
              className="group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 !rounded-none"
            >
              收支
            </th>
            <th
              data-key="$.4"
              role="columnheader"
              id="react-aria1254617425-:rs:-$.4"
              className="group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 !rounded-none"
            >
              日期
            </th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          <tr
            data-first="true"
            data-last="true"
            style={{ height: 60 }}
            role="row"
            data-key="0"
            aria-labelledby="react-aria1254617425-:rs:-0-$.0"
            className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-b border-slate-200"
          >
            <td
              data-key="0.0"
              role="rowheader"
              id="react-aria1254617425-:rs:-0-$.0"
              className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-primary/20 data-[selected=true]:text-primary first:before:rounded-l-lg last:before:rounded-r-lg flex items-center"
            >
              <div className="relative max-w-fit inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-6 text-tiny rounded-small bg-default text-default-foreground">
                <span className="flex-1 text-inherit font-normal px-1">
                  微信
                </span>
              </div>
              <span className="tremor-Icon-root inline-flex flex-shrink-0 items-center text-gray-500 px-1.5 py-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="tremor-Icon-icon shrink-0 h-3 w-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  ></path>
                </svg>
              </span>
              <div className="relative max-w-fit inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-6 text-tiny rounded-small bg-default text-default-foreground">
                <span className="flex-1 text-inherit font-normal px-1">
                  饮食
                </span>
              </div>
            </td>
            <td
              data-key="0.1"
              role="gridcell"
              className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-primary/20 data-[selected=true]:text-primary first:before:rounded-l-lg last:before:rounded-r-lg"
            >
              <span>12</span>
            </td>
            <td
              data-key="0.2"
              role="gridcell"
              className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-primary/20 data-[selected=true]:text-primary first:before:rounded-l-lg last:before:rounded-r-lg"
            >
              <a
                className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary hover:underline hover:opacity-80 active:opacity-disabled transition-opacity underline-offset-4 cursor-pointer"
                tabindex="0"
                role="link"
              >
                #吃饭
              </a>
            </td>
            <td
              data-key="0.3"
              role="gridcell"
              className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-primary/20 data-[selected=true]:text-primary first:before:rounded-l-lg last:before:rounded-r-lg"
            >
              <div className="relative max-w-fit inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-6 text-tiny rounded-small bg-default text-default-foreground">
                <span className="flex-1 text-inherit font-normal px-1">
                  收入
                </span>
              </div>
            </td>
            <td
              data-key="0.4"
              role="gridcell"
              className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-primary/20 data-[selected=true]:text-primary first:before:rounded-l-lg last:before:rounded-r-lg"
            >
              <span>2023-12-01</span>
            </td>
          </tr>
        </tbody>
      </table>
      <NewTransaction open={showNew} onOpenChange={setShowNew} />
    </>
  );
}
