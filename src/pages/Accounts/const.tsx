import {
  SolarChatRoundMoneyBold,
  SolarReciveSquareBold,
  SolarSendSquareBold,
  SolarSortBold,
} from "@/assets/icons";

export enum AccountType {
  ASSETS = "assets",
  LIABILITIES = "liabilities",
  EXPENSE = "expense",
  INCOME = "income",
}
export const AccountList = [
  {
    label: "资产",
    value: "assets",
    labelIcon: <SolarChatRoundMoneyBold />,
    key: AccountType.ASSETS,
    className: "rounded-md",
    level: 0,
    color: "#17C964",
  },
  {
    label: "收入",
    value: "income",
    labelIcon: <SolarReciveSquareBold />,
    color: "#F5A524",
    level: 0,
    key: AccountType.INCOME,
  },
  {
    label: "消费",
    value: "expenses",
    labelIcon: <SolarSendSquareBold />,
    color: "#71717A",
    level: 0,
    key: AccountType.EXPENSE,
  },
  {
    label: "负债",
    value: "liabilities",
    level: 0,
    labelIcon: <SolarSortBold />,
    color: "#F31260",
    key: AccountType.LIABILITIES,
  },
];
