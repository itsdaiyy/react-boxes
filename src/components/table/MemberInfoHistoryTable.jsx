// 4-4 一般會員 - 歷史回收記錄列表
import DataTable from "react-data-table-component";
import { customStyles, paginationComponentOptions } from "@/data/constants";
import { useMemberTransactionRecords } from "@/hooks/useBoxTransactions";

// 串接資料

const MemberInfoHistoryTable = () => {
  // 欄位
  const columns = [
    {
      name: "交易時間",
      selector: (row) => row.time,
    },
    {
      name: "交易形式",
      selector: (row) => row.content,
    },
    {
      name: "交易站點",
      selector: (row) => row.site,
    },
    {
      name: "紙箱大小",
      selector: (row) => row.site,
    },
    {
      name: "紙箱保存等級",
      selector: (row) => row.site,
    },
    {
      name: "換算積分",
      selector: (row) => row.pointChange,
      cell: (row) => (
        <span
          style={{
            color: row.pointChange.startsWith("+") ? "green" : "red",
          }}
        >
          {row.pointChange}
        </span>
      ),
    },
  ];
  const { records, isLoadingRecords, recordsError } =
    useMemberTransactionRecords("8b9acdef-b856-4c78-ac16-36d199737957");
  console.log(records);
  return (
    <DataTable
      columns={columns}
      // data={member}
      pagination
      customStyles={customStyles}
      paginationComponentOptions={paginationComponentOptions}
    />
  );
};

export default MemberInfoHistoryTable;
