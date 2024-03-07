import { FC, useState } from "react";
import { Card, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { AppArea } from "./area-chart";
import { BadgeDelta, Flex, Grid, Metric, Text } from "@tremor/react";
import { AppTreemap } from "./tree-chart";
import {
  MaterialSymbolsDashboard,
  MdiChartAreasplineVariant,
  SolarQuestionCircleLinear,
} from "@/assets/icons";
import dayjs from "dayjs";
import { TabPane, Tabs } from "@douyinfe/semi-ui";
import { useQueryClient } from "react-query";
import { AccountTreeDataDto } from "@/api/models/AccountTreeDataDto";
const month = dayjs(new Date()).month() + 1;
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

  const queryClient = useQueryClient();
  const accountData: AccountTreeDataDto | undefined =
    queryClient.getQueryData("accountTreeData");
  const categories2 = [
    {
      title: "总资产",
      metric: `¥${accountData?.assets.reduce((a, b) => a + b.amount, 0)}`,
      tooltip: "总资产 = 净资产(资产账户初始金额)  + 总收入 - 总消费 - 总负债",
    },
    {
      title: "总消费",
      metric: `¥${accountData?.expense.reduce((a, b) => a + b.amount, 0)}`,
    },
    {
      title: "总收入",
      metric: `¥${accountData?.income.reduce((a, b) => a + b.amount, 0)}`,
    },
    {
      title: "总负债",
      metric: `¥${accountData?.liabilities.reduce((a, b) => a + b.amount, 0)}`,
    },
  ];
  const Months = new Array(12)
    .fill(0)
    .map((_, index) => ({ label: `${index + 1}月`, value: index + 1 }));
  const [view, setView] = useState("area");
  const [checked, setChecked] = useState<number>(0);
  return (
    <>
      {categories.map((item) => (
        <div className="h-full flex flex-col gap-6 ">
          <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
            {categories2.map((item, index) => {
              const isChecked = checked === index;
              return (
                <Card
                  key={item.title}
                  className={`p-6 ${
                    isChecked ? "border-2 border-blue-500" : ""
                  }`}
                  isPressable
                  onPress={() => setChecked(index)}
                >
                  <Flex alignItems="start">
                    <Text className="flex items-center gap-1">
                      {item.title}
                      {item.tooltip ? (
                        <Tooltip content={item.tooltip}>
                          <div>
                            <SolarQuestionCircleLinear />
                          </div>
                        </Tooltip>
                      ) : null}
                    </Text>
                    {/* <BadgeDelta deltaType={item.deltaType}>
                      {item.delta}
                    </BadgeDelta> */}
                  </Flex>
                  <Flex
                    justifyContent="start"
                    alignItems="baseline"
                    className="truncate space-x-3"
                  >
                    <Metric>{item.metric}</Metric>
                  </Flex>
                </Card>
              );
            })}
          </Grid>
          <Card radius="sm" key={item.title}>
            <div className="flex justify-between items-center p-6 pb-0">
              <div>
                {/* <Select
                  size="sm"
                  radius="sm"
                  defaultSelectedKeys={[month]}
                  labelPlacement="outside"
                  className="w-[140px]"
                >
                  {Months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </Select> */}
              </div>
              <Tabs type="button">
                <TabPane tab="1月" itemKey="1"></TabPane>
                <TabPane tab="3月" itemKey="2"></TabPane>
                <TabPane tab="6月" itemKey="3"></TabPane>
                <TabPane tab="1年" itemKey="4"></TabPane>
                <TabPane tab="3年" itemKey="5"></TabPane>
                <TabPane tab="所有" itemKey="6"></TabPane>
              </Tabs>
            </div>
            <div className="h-[400px]">
              <AppArea />
            </div>
          </Card>
        </div>
      ))}
    </>
  );
};

export default ChartBlock;
