export type CsvDataCategory = Record<
  string,
  Record<string, Array<Record<string, any>>>
>;

export type CsvContent = {
  data: Array<Record<string, any>>; // 真实数据
  tableColumns: Array<Record<string, any>>; // tablecolumn
  transactionType: CsvDataCategory; // 原本里面的交易类型
};
export function wechat(content: string) {
  const lines = content.split("\n").slice(17); // 从第18行开始读取
  const tableColumnLines = content.split("\n").slice(16, 18); // 从第18行开始读取
  const tableColumns = tableColumnLines[0].split(",").map((v) => ({
    dataIndex: v,
    title: v,
    ellipsis: true,
  }));

  // 交易类型
  const transactionType: CsvDataCategory = {};
  const newData = lines.map((line: string) => {
    const columns = line.split(","); // 假设CSV文件以逗号分隔
    // 根据CSV文件的列定义对象的属性并返回对象
    const length = columns.length;
    const obj: Record<string, any> = {};
    if (!columns[0]) {
      return;
    }
    for (let i = 0; i < length; i++) {
      obj[tableColumns[i].dataIndex] = columns[i];
    }

    obj["id"] = columns[0];
    // 交易类型
    const type = columns[1];
    // 交易对方
    const to = columns[2];

    if (transactionType[type]) {
      if (transactionType[type][to]) {
        transactionType[type][to].push(obj);
      } else {
        transactionType[type][to] = [obj];
      }
    } else {
      transactionType[type] = {
        [to]: [obj],
      };
    }
    return obj;
  });

  return {
    data: newData,
    tableColumns: tableColumns,
    transactionType: transactionType,
  };
}

export function alipay(content: string) {
  const lines = content.split("\n").slice(25);
  const tableColumnLines = content.split("\n").slice(24, 25);
  console.log(tableColumnLines);

  const tableColumns = tableColumnLines[0].split(",").map((v) => ({
    dataIndex: v,
    title: v,
    ellipsis: true,
  }));

  const newData = lines.map((line: string) => {
    const columns = line.split(","); // 假设CSV文件以逗号分隔
    // 根据CSV文件的列定义对象的属性并返回对象
    const length = columns.length;
    const obj: Record<string, any> = {};
    for (let i = 0; i < length; i++) {
      obj[tableColumns[i].dataIndex] = columns[i];
    }
    obj["id"] = new Date().getTime();
    return obj;
  });

  return {
    data: newData,
    tableColumns: tableColumns,
  };
}
