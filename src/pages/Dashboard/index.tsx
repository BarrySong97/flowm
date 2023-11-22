import { FC } from "react";
import {
  Card,
  Metric,
  Text,
  Flex,
  BadgeDelta,
  Grid,
  Title,
  BarChart,
} from "@tremor/react";

export interface DashboardProps {}
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
      title: "Sales",
      metric: "$ 12,699",
      metricPrev: "$ 9,456",
      delta: "34.3%",
      deltaType: "moderateIncrease",
    },
    {
      title: "Profit",
      metric: "$ 40,598",
      metricPrev: "$ 45,564",
      delta: "10.9%",
      deltaType: "moderateDecrease",
    },
    {
      title: "Customers",
      metric: "1,072",
      metricPrev: "856",
      delta: "25.3%",
      deltaType: "moderateIncrease",
    },
  ];
  const data = [
    {
      Month: "Jan 21",
      Sales: 2890,
      Profit: 2400,
    },
    {
      Month: "Feb 21",
      Sales: 1890,
      Profit: 1398,
    },
    // ...
    {
      Month: "Jan 22",
      Sales: 3890,
      Profit: 2980,
    },
  ];

  const valueFormatter = (number) =>
    `$${Intl.NumberFormat("us").format(number).toString()}`;
  return (
    <>
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {categories.map((item) => (
          <Card key={item.title}>
            <Text>{item.title}</Text>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="truncate space-x-3"
            >
              <Metric>{item.metric}</Metric>
              <Text className="truncate">from {item.metricPrev}</Text>
            </Flex>
            <Flex justifyContent="start" className="space-x-2 mt-4">
              <BadgeDelta deltaType={item.deltaType} />
              <Flex justifyContent="start" className="space-x-1 truncate">
                <Text color={colors[item.deltaType]}>{item.delta}</Text>
                <Text className="truncate">to previous month</Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Grid>
      <div className="mt-6">
        <Card>
          <Title>Performance</Title>
          <Text>Comparison between Sales and Profit</Text>
          <BarChart
            className="mt-4 h-80"
            data={data}
            index="Month"
            categories={["Sales", "Profit"]}
            colors={["indigo", "fuchsia"]}
            stack={false}
            yAxisWidth={60}
            valueFormatter={valueFormatter}
          />
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
