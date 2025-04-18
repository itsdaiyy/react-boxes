// 5-2-4 最新紙箱交易紀錄、5-5 回收站點管理者後台 - 紙箱交易紀錄
// React Data Table Component
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { customStyles, paginationComponentOptions } from "@/data/constants";
// react query
import { useAdminTransactionRecords } from "@/hooks/transactions/useBoxTransactions";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";
import { formatUTCTimestamp } from "@/utils/helpers";

const AdminTradeHistoryTable = () => {
  // 取得可認領紙箱資料
  const { records, isLoadingRecords, recordsError } =
    useAdminTransactionRecords();

  if (isLoadingRecords) return <Spinner />;
  if (recordsError) return <ErrorMessage errorMessage={recordsError.message} />;

  const expendedData = records.flatMap((transaction) =>
    transaction.boxes.map((box) => ({
      created_at: transaction.created_at,
      box_id: box.box_id,
      size: box.size,
      condition: box.condition,
      user_id: transaction.user_id,
      transaction_type: transaction.transaction_type,
      user_name_snapshot: transaction.user_name_snapshot,
    })),
  );

  // 欄位
  const columns = [
    {
      name: "交易時間",
      selector: (row) => formatUTCTimestamp(row.created_at),
      sortable: true,
    },
    {
      name: "紙箱編號",
      selector: (row) => row.box_id || `-`,
      sortable: true,
    },
    { name: "紙箱大小", selector: (row) => row.size, sortable: true },
    {
      name: "紙箱保存等級",
      selector: (row) => row.condition,
      sortable: true,
    },
    {
      name: "會員姓名",
      selector: (row) => row?.user_name_snapshot,
    },
    {
      name: "交易方式",
      selector: (row) => row.transaction_type,
    },
    {
      name: "支付方式",
      selector: (row) =>
        row.transaction_type === "回收" || row.transaction_type === "兌換"
          ? "積分"
          : "現金",
    },
  ];

  return (
    <div className="px-3">
      <h4 className="mb-4 text-main-600">紙箱交易紀錄</h4>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <DataTable
          columns={columns}
          data={expendedData}
          pagination
          customStyles={customStyles}
          paginationComponentOptions={paginationComponentOptions}
        />
      </StyleSheetManager>
    </div>
  );
};

export default AdminTradeHistoryTable;
