// 4-4 一般會員 - 歷史回收記錄列表
import DataTable from "react-data-table-component";
import { customStyles, paginationComponentOptions } from "@/data/constants";
import { useMemberTransactionRecords } from "@/hooks/useBoxTransactions";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";

const MemberInfoHistoryTable = () => {
  // 欄位
  const columns = [
    {
      name: "交易時間",
      selector: (row) => row.created_at.replace("T", " ").slice(0, 16),
    },
    {
      name: "交易形式",
      selector: (row) => row.transaction_type,
    },
    {
      name: "交易站點",
      selector: (row) => row.station_name_snapshot,
    },
    {
      name: "紙箱大小",
      selector: (row) => row.size,
    },
    {
      name: "紙箱保存等級",
      selector: (row) => row.condition,
    },
    {
      name: "換算積分",
      selector: (row) => {
        if (
          row.transaction_type === "回收" ||
          row.transaction_type === "購買"
        ) {
          return "+" + row.earned_points;
        } else {
          return "-" + row.points_cost;
        }
      },
    },
  ];
  const { records, isLoadingRecords, recordsError } =
    useMemberTransactionRecords("8b9acdef-b856-4c78-ac16-36d199737957");
  console.log(records);
  if (isLoadingRecords) return <Spinner />;
  if (recordsError) return <ErrorMessage errorMessage={recordsError.message} />;
  return (
    <DataTable
      columns={columns}
      data={records}
      pagination
      customStyles={customStyles}
      paginationComponentOptions={paginationComponentOptions}
    />
  );
};

export default MemberInfoHistoryTable;
