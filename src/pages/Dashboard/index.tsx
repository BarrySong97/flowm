import { FC } from "react";
import { Card, Tabs, Tab, Divider } from "@nextui-org/react";
import {
  Metric,
  Text,
  Flex,
  BadgeDelta,
  Grid,
  TabGroup,
  TabPanels,
  TabPanel,
  TabList,
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

  return (
    <>
      <div className="space-y-1">
        <h4 className="text-medium font-medium">首页</h4>
      </div>
      <Divider className="my-4" />
      <Grid numItemsSm={2} numItemsLg={4} className="gap-6 mb-4">
        {categories.map((item) => (
          <Card key={item.title} className="p-4">
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
      <Tabs aria-label="Dynamic tabs">
        <Tab title="消费">
          <div className="grid grid-cols-4 gap-6">
            <LineCharts />
            <DashDonutChart />
          </div>
        </Tab>
        <Tab title="收入">
          <div className="grid grid-cols-4 gap-6">
            <LineCharts />
            <DashDonutChart />
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default Dashboard;
