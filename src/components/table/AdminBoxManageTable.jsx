// 5-3 回收站點管理者後台 - 待認領／自用紙箱列表
import { useState } from "react";
// React Data Table Component
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
// react query
import { useBoxesForAdminManaging } from "../..//hooks/useBoxes";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";
// react icons
import { FaFolderPlus, FaCashRegister } from "react-icons/fa";
// 更新紙箱、刪除紙箱資料表單元件
import UpdateBoxDialog from "../dialog/UpdateBoxDialog";
import DeleteBoxDialog from "../dialog/DeleteBoxDialog";

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

const AdminBoxManageTable = () => {
  // 篩選搜尋資料
  const [filterText, setFilterText] = useState("");
  // const filteredData = pointsData.filter(
  //   item => Object.values(item).some(
  //     val => val.toString().toLowerCase().includes(filterText.toLowerCase())
  //   )
  // );

  // 取得可認領紙箱資料
  const { boxes, isLoadingBoxes, boxesError } = useBoxesForAdminManaging(16);
  if (isLoadingBoxes) return <Spinner />;
  if (boxesError) return <ErrorMessage errorMessage={boxesError.message} />;

  // 欄位
  const columns = [
    { name: "紙箱編號", selector: (row) => row.id, sortable: true },
    {
      name: "新增時間",
      selector: (row) => row.created_at?.replace("T", " ").slice(0, 16),
      sortable: true,
      width: "140px",
    },
    {
      name: "更新時間",
      selector: (row) => row.updated_at?.replace("T", " ").slice(0, 16),
      sortable: true,
      width: "140px",
    },
    { name: "紙箱大小", selector: (row) => row.size, sortable: true },
    {
      name: "紙箱保存等級",
      selector: (row) => row.condition,
      sortable: true,
      width: "130px",
    },
    {
      name: "紙箱保留天數",
      selector: (row) => row.retention_days,
      sortable: true,
      width: "130px",
    },
    { name: "紙箱狀態", selector: (row) => row.status, sortable: true },
    { name: "對應現金", selector: (row) => row.cash_value, sortable: true },
    { name: "對應積分", selector: (row) => row.point_value, sortable: true },
    {
      name: "編輯",
      selector: (row) => (
        <div className="flex gap-2">
          <UpdateBoxDialog row={row} />
          <DeleteBoxDialog row={row} />
        </div>
      ),
    },
  ];

  const data = [...boxes];

  return (
    <>
      <h4 className="mb-4 text-main-600">可認領紙箱列表</h4>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          subHeader
          subHeaderComponent={
            <div className="mb-4 flex w-full justify-between">
              <input
                type="text"
                placeholder="搜尋紙箱編號"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="rounded border p-2 placeholder:text-[#B7B7B7] focus-within:border focus-within:border-main-500 focus-visible:outline-none"
              />
              <div className="flex gap-5">
                <button className="btn flex items-center gap-1 border p-2">
                  <FaFolderPlus /> 新增紙箱
                </button>
                <button className="btn flex items-center gap-1 border p-2">
                  <FaCashRegister /> 交易紙箱
                </button>
              </div>
            </div>
          }
        />
      </StyleSheetManager>
    </>
  );
};

export default AdminBoxManageTable;
