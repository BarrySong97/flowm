import {
  AreaChart,
  Card,
  Metric,
  TabList,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
  Title,
} from "@tremor/react";

const data = [
  {
    Month: "Jan 22",
    Visitors: 289,
    "Page Views": 1012,
    "Bounce Rate": 0.5,
  },
  //...
  {
    Month: "Jan 23",
    Visitors: 389,
    "Page Views": 1232,
    "Bounce Rate": 0.51,
  },
];

const numberFormatter = (value) =>
  Intl.NumberFormat("us").format(value).toString();

const percentageFormatter = (value) =>
  `${Intl.NumberFormat("us")
    .format(value * 100)
    .toString()}%`;

function sumArray(array, metric) {
  return array.reduce(
    (accumulator, currentValue) => accumulator + currentValue[metric],
    0
  );
}

export default function LineCharts() {
  return (
    <Card className="col-span-3">
      <Title>12月消费趋势</Title>
      <AreaChart
        className="h-40 mt-6 "
        data={data}
        index="Month"
        categories={["Visitors"]}
        colors={["blue"]}
        valueFormatter={numberFormatter}
        showLegend={false}
        yAxisWidth={50}
      />
    </Card>
  );
}
