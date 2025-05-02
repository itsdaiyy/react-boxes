// 4-3 一般會員-歷史積分紀錄列表
import DataTable from "react-data-table-component";
import { customStyles, paginationComponentOptions } from "@/data/constants";
import { useMemberTransactionRecords } from "@/hooks/transactions/useBoxTransactions";
import { formatUTCTimestamp } from "@/utils/helpers";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";
import EmptyDataMessage from "@/components/EmptyDataMessage";

const MemberInfoPointTable = () => {
  const { records, isLoadingRecords, recordsError } =
    useMemberTransactionRecords();
  // 欄位

  if (isLoadingRecords) <Spinner />;
  if (recordsError) <ErrorMessage errorMessage={recordsError.message} />;

  const columns = [
    {
      name: "交易時間",
      selector: (row) => formatUTCTimestamp(row.created_at),
    },
    {
      name: "交易內容",
      selector: (row) => `${row.transaction_type} ${row.boxes.length} 紙箱`,
    },
    {
      name: "交易站點",
      selector: (row) => row.station_name_snapshot,
    },
    {
      name: "積分變化",
      selector: (row) => row.earned_points - row.points_cost,
      cell: (row) => (
        <span
          style={{
            color: row.earned_points - row.points_cost > 0 ? "green" : "red",
          }}
        >
          {row.earned_points - row.points_cost > 0
            ? `+${row.earned_points - row.points_cost}`
            : `${row.earned_points - row.points_cost}`}
        </span>
      ),
    },
    {
      name: "積分總計",
      selector: (row) => row.total_points,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={records}
      pagination
      customStyles={customStyles}
      paginationComponentOptions={paginationComponentOptions}
      noDataComponent={<EmptyDataMessage message="目前沒有積分記錄" />}
    />
  );
};

export default MemberInfoPointTable;
