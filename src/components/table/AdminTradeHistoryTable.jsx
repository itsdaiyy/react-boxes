// 5-2-4 最新紙箱交易紀錄、5-5 回收站點管理者後台 - 紙箱交易紀錄
// React Data Table Component
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
// react query
import { useTransactionRecords } from "@/hooks/useBoxTransactions";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";
// 表格內客製化樣式 (或建立style.css覆蓋樣式)
const customStyles = {
  table: {
    style: {
      border: "1px solid #d9d9d9",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#F5F1E8",
      borderBottomColor: "#d9d9d9",
      fontWeight: "bold",
      color: "#3d3d3d",
    },
  },
  rows: {
    style: {
      "&:hover": {
        backgroundColor: "#F3F3F3",
      },
    },
  },
  pagination: {
    style: {
      borderBottomLeftRadius: "8px",
      borderBottomRightRadius: "8px",
      backgroundColor: "#F5F1E8",
      border: "1px solid #d9d9d9",
      borderTop: "0px",
    },
  },
  subHeader: {
    style: {
      border: "1px solid #d9d9d9",
      borderBottom: "0px",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
      backgroundColor: "#F5F1E8",
      paddingTop: "24px",
    },
  },
};

// 客製化分頁元件
const paginationComponentOptions = {
  rowsPerPageText: "每頁顯示筆數",
  rangeSeparatorText: "共",
  selectAllRowsItem: true,
  selectAllRowsItemText: "全部",
};

const AdminTradeHistoryTable = () => {
  // 取得可認領紙箱資料
  const { records, isLoadingRecords, recordsError } = useTransactionRecords(16);
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
