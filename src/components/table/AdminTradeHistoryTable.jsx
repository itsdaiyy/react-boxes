// 5-2-4 最新紙箱交易紀錄、5-5 回收站點管理者後台 - 紙箱交易紀錄
// React Data Table Component
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { customStyles, paginationComponentOptions } from "@/data/constants";
// react query
import { useAdminTransactionRecords } from "@/hooks/useBoxTransactions";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";

const AdminTradeHistoryTable = () => {
  // 取得可認領紙箱資料
  const { records, isLoadingRecords, recordsError } =
    useAdminTransactionRecords(16);
  if (isLoadingRecords) return <Spinner />;
  if (recordsError) return <ErrorMessage errorMessage={recordsError.message} />;
  // 欄位
  const columns = [
    {
      name: "交易時間",
      selector: (row) => row.created_at?.replace("T", " ").slice(0, 16),
      sortable: true,
    },
    {
      name: "紙箱編號",
      selector: (row) => row.id,
      sortable: true,
    },
    { name: "紙箱大小", selector: (row) => row.size, sortable: true },
    {
      name: "紙箱保存等級",
      selector: (row) => row.condition,
      sortable: true,
    },
    {
      name: "會員編號",
      selector: (row) => row.user_id,
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
  const data = [...records];

  return (
    <>
      <h4 className="mb-4 text-main-600">紙箱交易紀錄</h4>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <DataTable
          columns={columns}
          data={data}
          pagination
          customStyles={customStyles}
          paginationComponentOptions={paginationComponentOptions}
          subHeader
          subHeaderComponent={
            <div className="mb-4 flex w-full justify-between">
              <input
                type="text"
                placeholder="搜尋紙箱編號"
                className="rounded border p-2 placeholder:text-[#B7B7B7] focus-within:border focus-within:border-main-500 focus-visible:outline-none"
              />
            </div>
          }
        />
      </StyleSheetManager>
    </>
  );
};

export default AdminTradeHistoryTable;
