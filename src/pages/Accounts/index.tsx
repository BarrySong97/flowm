import { Tabs, Tab } from "@nextui-org/react";
import CardView from "./components/card";
import { AccountList, AccountType } from "./const";
import { useState } from "react";
import { useQuery } from "react-query";
import { AccountDto } from "@/api/models/AccountDto";
import { AccountsService } from "@/api/services/AccountsService";
export default function Example() {
  const [selectKey, setSelectKey] = useState<AccountType>(AccountType.ASSETS);
  const { data, isLoading } = useQuery<AccountDto[], Error>(
    ["account", selectKey],
    () =>
      AccountsService.accountsControllerFindAll({
        type: selectKey,
      }),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <>
      <Tabs
        onSelectionChange={(value) => setSelectKey(value as AccountType)}
        selectedKey={selectKey}
        aria-label="Dynamic tabs"
        className="mb-4"
      >
        {AccountList.map((item) => (
          <Tab
            key={item.key}
            title={
              <div className="flex items-center space-x-2">
                <span style={{ color: item.color }}>{item.labelIcon}</span>
                <span>{item.label}</span>
              </div>
            }
          ></Tab>
        ))}
      </Tabs>
      <CardView type={selectKey} data={data} loading={isLoading} />
    </>
  );
}
