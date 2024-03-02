import { SolarImportBold } from "@/assets/icons";
import { CsvContent, alipay, wechat } from "@/lib/csv-adaper";
import { Steps, TabPane, Tabs, Typography, Upload } from "@douyinfe/semi-ui";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Button as SemiButton } from "@douyinfe/semi-ui";
import { ConfigProvider, message } from "antd";
import { FC, useState } from "react";
import ImportTable from "./import-table";
export interface ImportBtnProps {}
const ImportBtn: FC<ImportBtnProps> = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [importSource, setImportSource] = useState<string>("wechat");
  const [csvContent, setCsvContent] = useState<CsvContent>();
  const [steps, setSteps] = useState<number>(0);
  const { Title } = Typography;
  return (
    <>
      <Button
        startContent={<SolarImportBold />}
        size="sm"
        onClick={onOpen}
        radius="sm"
        variant="flat"
      >
        导入
      </Button>
      <Modal
        size="full"
        backdrop="blur"
        isOpen={isOpen}
        isDismissable={false}
        // scrollBehavior="inside"
        onOpenChange={(open) => {
          onOpenChange();
          if (!open) {
            setCsvContent(undefined);
            setSteps(0);
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>导入CSV文件</ModalHeader>
              <ModalBody>
                <Steps
                  type="basic"
                  current={steps}
                  // onChange={(i) => {
                  //   if (i === 0) {
                  //     // setCsvContent(undefined);
                  //     setSteps(i);
                  //   }
                  //   if (i === 1 || i === 2) {
                  //     if (csvContent) {
                  //       setSteps(i);
                  //     } else {
                  //       message.warning("请先上传文件");
                  //     }
                  //   }
                  // }}
                >
                  <Steps.Step title="选择导入源" description="只支持.csv文件" />
                  <Steps.Step
                    title="匹配导入"
                    description="匹配数据源到对应分类账户"
                  />
                  <Steps.Step title="确认数据" description="导入数据到系统" />
                </Steps>
                <div>
                  {!steps ? (
                    <div>
                      <div className="mb-4">
                        <Title type="secondary" heading={5}>
                          导入来源
                        </Title>
                      </div>
                      <Tabs
                        type="button"
                        onChange={setImportSource}
                        activeKey={importSource}
                      >
                        <TabPane tab="微信" itemKey="wechat"></TabPane>
                        <TabPane tab="支付宝" itemKey="alipay"></TabPane>
                      </Tabs>
                    </div>
                  ) : null}
                  <div>
                    <div className="mb-4">
                      {steps ? (
                        <ConfigProvider
                          theme={{
                            components: {
                              Table: {
                                headerBg:
                                  "hsl(var(--nextui-default-100)/var(--nextui-default-100-opacity,var(--tw-bg-opacity)))",
                              },
                            },
                          }}
                        >
                          <ImportTable
                            importSource={importSource}
                            steps={steps}
                            setSteps={setSteps}
                            csvContent={csvContent}
                          />
                        </ConfigProvider>
                      ) : (
                        <>
                          <div className="mb-4 ">
                            <Title type="secondary" heading={5}>
                              {"上传文件"}
                            </Title>
                          </div>
                          <Upload
                            fileList={[]}
                            accept=".csv"
                            onFileChange={(file) => {
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  if (e.target && e.target.result) {
                                    const content = e.target.result.toString();
                                    try {
                                      switch (importSource) {
                                        case "wechat":
                                          const wechatData = wechat(content);
                                          console.log(wechatData);

                                          setCsvContent(wechatData);
                                          break;
                                        case "alipay":
                                          const aliData = alipay(content);
                                          setCsvContent(aliData);
                                          break;
                                      }
                                      setSteps(1);
                                    } catch (error) {
                                      message.error("文件读取失败");
                                    }
                                  }
                                };
                                switch (importSource) {
                                  case "wechat":
                                    reader.readAsText(file?.[0], "gbk");
                                    break;
                                  case "alipay":
                                    reader.readAsText(file?.[0], "gbk");
                                    break;
                                }
                                reader.onerror = (e) => {};
                              }
                            }}
                            draggable={true}
                            dragMainText={"点击导入文件或拖拽文件到这里"}
                            dragSubText="支持csv类型"
                          ></Upload>
                          <div className="mt-4 justify-center flex gap-4">
                            <SemiButton
                              onClick={() => {
                                if (csvContent) {
                                  setSteps(1);
                                }
                              }}
                              disabled={!csvContent}
                              type="primary"
                            >
                              下一步
                            </SemiButton>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </ModalBody>
              {/* <ModalFooter></ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImportBtn;
