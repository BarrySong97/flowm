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
  TabGroup,
  TabPanels,
  TabPanel,
  TabList,
  Tab,
} from "@tremor/react";
import LineCharts from "./components/line-chart";
import DashDonutChart from "./components/bar-chart";
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
      title: "消费",
      metric: "12,699",
      metricPrev: "9,456",
      delta: "34.3%",
      deltaType: "moderateIncrease",
    },
    {
      title: "收入",
      metric: "40,598",
      metricPrev: "45,564",
      delta: "10.9%",
      deltaType: "moderateDecrease",
    },
    {
      title: "总资产",
      metric: "1,072",
      metricPrev: "856",
      delta: "25.3%",
      deltaType: "moderateIncrease",
    },
    {
      title: "总负债",
      metric: "1,072",
      metricPrev: "856",
      delta: "25.3%",
      deltaType: "moderateDecrease",
    },
  ];
  const data = [
    {
      Month: "Jan 21",
      Sales: 2890,
    },
    {
      Month: "Feb 21",
      Sales: 1890,
    },
    // ...
    {
      Month: "Jan 22",
      Sales: 3890,
    },
    {
      Month: "Jan 22",
      Sales: 3890,
    },
    {
      Month: "Jan 22",
      Sales: 3890,
    },
    {
      Month: "Jan 22",
      Sales: 3890,
    },
    {
      Month: "Jan 22",
      Sales: 3890,
    },
    {
      Month: "Jan 22",
      Sales: 3890,
    },
  ];

  return (
    <>
      <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
        {categories.map((item) => (
          <Card key={item.title}>
            <Text>{item.title}</Text>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="truncate space-x-3"
            >
              <Metric>{item.metric}</Metric>
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
      <TabGroup>
        <TabList variant="solid" className="mt-8">
          <Tab>消费</Tab>
          <Tab>收入</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="mt-4 grid grid-cols-4 gap-6">
              <LineCharts />
              <DashDonutChart />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-4 grid grid-cols-4 gap-6">
              <LineCharts />
              <DashDonutChart />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
};

export default Dashboard;
