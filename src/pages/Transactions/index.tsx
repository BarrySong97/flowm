import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
  Icon,
} from "@tremor/react";
import {
  ArrowRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";

const salesPeople = [
  {
    name: "Peter Doe",
    leads: 45,
    sales: "1,000,000",
    quota: "1,200,000",
    variance: "low",
    region: "Region A",
    delta: "overperforming",
    deltaType: "moderateIncrease",
  },
  {
    name: "Lena Whitehouse",
    leads: 35,
    sales: "900,000",
    quota: "1,000,000",
    variance: "low",
    region: "Region B",
    delta: "average",
    deltaType: "unchanged",
  },
  {
    name: "Phil Less",
    leads: 52,
    sales: "930,000",
    quota: "1,000,000",
    variance: "medium",
    region: "Region C",
    delta: "underperforming",
    deltaType: "moderateDecrease",
  },
  {
    name: "John Camper",
    leads: 22,
    sales: "390,000",
    quota: "250,000",
    variance: "low",
    region: "Region A",
    delta: "overperforming",
    deltaType: "increase",
  },
  {
    name: "Max Balmoore",
    leads: 49,
    sales: "860,000",
    quota: "750,000",
    variance: "low",
    region: "Region B",
    delta: "overperforming",
    deltaType: "increase",
  },
  {
    name: "Peter Moore",
    leads: 82,
    sales: "1,460,000",
    quota: "1,500,000",
    variance: "low",
    region: "Region A",
    delta: "average",
    deltaType: "unchanged",
  },
  {
    name: "Joe Sachs",
    leads: 49,
    sales: "1,230,000",
    quota: "1,800,000",
    variance: "medium",
    region: "Region B",
    delta: "underperforming",
    deltaType: "moderateDecrease",
  },
];

export default function Transactions() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>流向</TableHeaderCell>
          <TableHeaderCell>简述</TableHeaderCell>
          <TableHeaderCell>金额</TableHeaderCell>
          <TableHeaderCell>日期</TableHeaderCell>
          <TableHeaderCell>备注</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {salesPeople.map((item) => (
          <TableRow key={item.name} className="hover:bg-accent cursor-pointer">
            <TableCell className="p-2 flex gap-1">
              <Badge size={"xs"} className="!rounded-sm">
                微信
              </Badge>
              <Icon size="xs" color="gray" icon={ChevronDoubleRightIcon} />
              <Badge size={"xs"} className="!rounded-sm">
                餐饮
              </Badge>
            </TableCell>
            <TableCell className="p-2">{item.name}</TableCell>
            <TableCell className="p-2">${item.leads}</TableCell>
            <TableCell className="p-2">2023-12-02</TableCell>
            <TableCell className="p-2">-</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
