import { FC, useState } from "react";
import { Card, Tab, Tabs } from "@nextui-org/react";
import { AppArea } from "./area-chart";
import { BadgeDelta, Flex, Grid, Metric, Text } from "@tremor/react";
import { AppTreemap } from "./tree-chart";
import {
  MaterialSymbolsDashboard,
  MdiChartAreasplineVariant,
} from "@/assets/icons";
export interface ChartBlockProps {}
const ChartBlock: FC<ChartBlockProps> = () => {
  const categories = [
    {
      title: "12月消费 ",
      metric: "+12,699",
      metricPrev: "9,456",
      delta: "34.3%",
      deltaType: "moderateIncrease",
    },
  ];

  const categories2 = [
    {
      title: "总消费",
      metric: "$ 12,699",
      metricPrev: "$ 9,456",
      delta: "34.3%",
      deltaType: "moderateIncrease",
    },
    {
      title: "总资产",
      metric: "$ 40,598",
      metricPrev: "$ 45,564",
      delta: "10.9%",
      deltaType: "moderateDecrease",
    },
    {
      title: "总负债",
      metric: "1,072",
      metricPrev: "856",
      delta: "25.3%",
      deltaType: "moderateIncrease",
    },
  ];
  const [view, setView] = useState("area");
  return (
    <>
      {categories.map((item) => (
        <div className="h-full flex flex-col gap-6 ">
          <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
            {categories2.map((item) => (
              <Card key={item.title} className="p-6">
                <Flex alignItems="start">
                  <Text>{item.title}</Text>
                  <BadgeDelta deltaType={item.deltaType}>
                    {item.delta}
                  </BadgeDelta>
                </Flex>
                <Flex
                  justifyContent="start"
                  alignItems="baseline"
                  className="truncate space-x-3"
                >
                  <Metric>{item.metric}</Metric>
                  <Text className="truncate">from {item.metricPrev}</Text>
                </Flex>
              </Card>
            ))}
          </Grid>
          <Tabs
            aria-label="Options"
            color="primary"
            variant="underlined"
            classNames={{
              tabList:
                "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full ",
              panel: "pb-0 flex-1",
              tab: "max-w-fit px-0 h-12",
            }}
          >
            <Tab key="expense" title={"消费"}>
              <Card radius="sm" key={item.title} className="h-full">
                <div className="flex justify-between items-center p-6 pb-0">
                  <div>
                    <Text>{item.title}</Text>

                    <Metric>{item.metric}</Metric>
                  </div>
                  <Tabs
                    selectedKey={view}
                    onSelectionChange={(e) => setView(e as string)}
                    size="sm"
                    radius="sm"
                    aria-label="Options"
                  >
                    <Tab
                      key="area"
                      title={
                        <div className="flex items-center space-x-2">
                          <MdiChartAreasplineVariant className="text-base" />
                          <span>折线面积</span>
                        </div>
                      }
                    ></Tab>
                    <Tab
                      key="tree"
                      title={
                        <div className="flex items-center space-x-2">
                          <MaterialSymbolsDashboard className="text-base" />
                          <span>矩阵树图</span>
                        </div>
                      }
                    ></Tab>
                  </Tabs>
                </div>
                {view === "area" ? <AppArea /> : null}
                {view === "tree" ? <AppTreemap /> : null}
              </Card>
            </Tab>
            <Tab key="income" title={"收入"}>
              <Card radius="sm" key={item.title} className="h-full">
                <div className="flex justify-between items-center p-6 pb-0">
                  <div>
                    <Text>{item.title}</Text>

                    <Metric>{item.metric}</Metric>
                  </div>
                  <Tabs
                    selectedKey={view}
                    onSelectionChange={(e) => setView(e as string)}
                    size="sm"
                    radius="sm"
                    aria-label="Options"
                  >
                    <Tab
                      key="area"
                      title={
                        <div className="flex items-center space-x-2">
                          <MdiChartAreasplineVariant className="text-base" />
                          <span>折线面积</span>
                        </div>
                      }
                    ></Tab>
                    <Tab
                      key="tree"
                      title={
                        <div className="flex items-center space-x-2">
                          <MaterialSymbolsDashboard className="text-base" />
                          <span>矩阵树图</span>
                        </div>
                      }
                    ></Tab>
                  </Tabs>
                </div>
                {view === "area" ? <AppArea /> : null}
                {view === "tree" ? <AppTreemap /> : null}
              </Card>
            </Tab>
          </Tabs>
        </div>
      ))}
    </>
  );
};

export default ChartBlock;
