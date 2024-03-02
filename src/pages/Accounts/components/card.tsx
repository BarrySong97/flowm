import {
  IcOutlineAddCard,
  SolarTrashBinMinimalistic2Bold,
} from "@/assets/icons";
import { Card, CardBody, MenuProps, useDisclosure } from "@nextui-org/react";
import { Grid } from "@tremor/react";
import { FC } from "react";
import NewAccount from "./new";
import { AccountDto } from "@/api/models/AccountDto";
import { AccountType } from "../const";
import { Dropdown, message } from "antd";
import { AccountsService } from "@/api/services/AccountsService";
import { useQueryClient } from "react-query";
import { Typography } from "@douyinfe/semi-ui";
export interface CardViewProps {
  type: AccountType;
  data?: AccountDto[];
  loading: boolean;
}
const CardView: FC<CardViewProps> = ({ data, type, loading }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const items = [
    {
      label: "删除",
      key: "delete",
      icon: <SolarTrashBinMinimalistic2Bold />,
    },
  ];
  const queryClient = useQueryClient();
  const onDeleteAccount = async (id: string) => {
    await AccountsService.accountsControllerDelete({
      id,
    });
    message.success("删除成功");
    queryClient.setQueryData(["account", type], (data?: AccountDto[]) => {
      if (data) {
        return data.filter((item) => item.id !== id);
      }
      return [];
    });
  };
  const { Title } = Typography;

  return (
    <>
      <Grid numItemsSm={1} numItemsLg={3} className="gap-6">
        <Card
          isFooterBlurred
          radius="lg"
          isPressable
          onClick={onOpen}
          style={{
            height: "200px",
          }}
        >
          <CardBody className="flex justify-center items-center font-bold text-slate-600">
            <div className="flex items-center gap-2">
              <IcOutlineAddCard />
              新账户
            </div>
          </CardBody>
        </Card>
        {data?.map((item) => (
          <Dropdown
            menu={{
              items,
              onClick: (key) => {
                if (key.key === "delete") {
                  onDeleteAccount(item.id);
                }
              },
            }}
            trigger={["contextMenu"]}
          >
            <Card
              isFooterBlurred
              radius="lg"
              className={"bg-gradient-to-tr from-[#FFB457] to-[#FF705B]"}
              style={{
                height: "200px",
              }}
            >
              <CardBody className="flex flex-col">
                <Title heading={4} style={{ color: "white" }}>
                  {item.title}
                </Title>
                <div className="flex-1 flex justify-center items-center">
                  <Title heading={2} style={{ color: "white" }}>
                    ¥ 300
                  </Title>
                </div>
              </CardBody>
            </Card>
          </Dropdown>
        ))}
      </Grid>
      <NewAccount type={type} isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default CardView;
