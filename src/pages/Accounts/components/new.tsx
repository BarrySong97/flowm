import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { AccountList, AccountType } from "../const";
import { AccountsService } from "@/api/services/AccountsService";
import { message } from "antd";
import { useQueryClient } from "react-query";
import { AccountDto } from "@/api/models/AccountDto";
import { AccountTreeDataDto } from "@/api/models/AccountTreeDataDto";
export interface NewAccountProps {
  type?: AccountType;
  isOpen: boolean;
  onOpenChange: () => void;
}
const NewAccount: FC<NewAccountProps> = ({ type, isOpen, onOpenChange }) => {
  const [selectType, setSelectType] = useState<AccountType>();
  const [title, setTitle] = useState<string>();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const createAccount = async () => {
    if (!title || !selectType) {
      return;
    }

    const body = {
      title,
      type: selectType,
    };
    setLoading(true);
    try {
      const res = await AccountsService.accountsControllerCreate({
        requestBody: body,
      });
      queryClient.setQueryData(
        ["account", selectType],
        (data?: AccountDto[]) => {
          return [...(data ?? []), res];
        }
      );
      queryClient.setQueryData(
        ["accountTreeData"],
        (data?: AccountTreeDataDto) => {
          if (data) {
            data?.[selectType].push(res);
            return {
              ...data,
            };
          }
          return {
            assets: [],
            liabilities: [],
            expense: [],
            income: [],
          };
        }
      );
      message.success("创建成功");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setSelectType(type);
  }, [type]);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">创建账户</ModalHeader>
            <ModalBody>
              <Select
                label="选择账户类型"
                onSelectionChange={(e: any) => {
                  setSelectType(e.currentKey as AccountType);
                }}
                selectedKeys={[selectType!]}
              >
                {AccountList.map((v) => (
                  <SelectItem
                    startContent={
                      <span style={{ color: v.color }}>{v.labelIcon}</span>
                    }
                    key={v.key}
                    value={v.key}
                  >
                    {v.label}
                  </SelectItem>
                ))}
              </Select>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                label="输入账户名称"
              />
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                取消
              </Button>
              <Button
                isLoading={loading}
                disabled={!title}
                color="primary"
                onPress={async () => {
                  await createAccount();
                  onClose();
                }}
              >
                创建
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewAccount;
