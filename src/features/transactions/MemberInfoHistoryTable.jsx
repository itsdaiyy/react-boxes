// 4-4 一般會員 - 歷史回收記錄列表
import DataTable from "react-data-table-component";
import { customStyles, paginationComponentOptions } from "@/data/constants";
import { useMemberTransactionRecords } from "@/hooks/boxes/useBoxTransactions";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";

const MemberInfoHistoryTable = () => {
  const { records, isLoadingRecords, recordsError } =
    useMemberTransactionRecords();

  if (isLoadingRecords) return <Spinner />;
  if (recordsError) return <ErrorMessage errorMessage={recordsError.message} />;

  const expendedData = records.flatMap((transaction) =>
    transaction.boxes.map((box) => ({
      created_at: transaction.created_at,
      size: box.size,
      condition: box.condition,
      station_name_snapshot: transaction.station_name_snapshot,
      transaction_type: transaction.transaction_type,
      points_cost: transaction.points_cost,
      earned_points: box.point_value,
      total_earned_points: transaction.earned_points,
      boxes_counts: transaction.boxes.length,
    })),
  );

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
      selector: (row) =>
        row.transaction_type === "回收"
          ? `+${row.earned_points}`
          : row.transaction_type === "購買"
            ? `+${row.total_earned_points / row.boxes_counts}`
            : `${row.total_earned_points - row.points_cost}`,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={expendedData}
      pagination
      customStyles={customStyles}
      paginationComponentOptions={paginationComponentOptions}
    />
  );
};

export default MemberInfoHistoryTable;
