// 5-7 回收站點管理者後台 - 售出紙箱流程
import { useState } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { useBoxesForSelling } from "@/hooks/useBoxes";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";

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
      position: "sticky",
      left: 0,
      zIndex: 2, // 確保它不會被其他內容蓋住
    },
  },
  rows: {
    style: {
      "&:hover": {
        backgroundColor: "#F3F3F3",
      },
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

const AdminTradeTable = () => {
  // 資料
  const { boxes, isLoadingBoxes, boxesError } = useBoxesForSelling(16);
  const data = boxes;

  // 欄位
  const columns = [
    {
      name: "新增時間",
      selector: (row) => row.updated_at?.replace("T", " ").slice(0, 16),
      sortable: true,
    },
    {
      name: "紙箱編號",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "紙箱大小",
      selector: (row) => row.size,
      sortable: true,
    },
    {
      name: "紙箱保存等級",
      selector: (row) => row.condition,
      sortable: true,
    },
    {
      name: "保留天數",
      selector: (row) => row.retention_days,
      sortable: true,
    },
    {
      name: "保留到期日",
      selector: (row) => row.size,
      sortable: true,
    },
    {
      name: "狀態",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "現金",
      selector: (row) => row.cash_value,
      sortable: true,
    },
    {
      name: "積分",
      selector: (row) => row.point_value,
      sortable: true,
    },
  ];

  // 篩選搜尋資料
  // const [filterText, setFilterText] = useState("");

  if (isLoadingBoxes) return <Spinner />;
  if (boxesError) return <ErrorMessage errorMessage={boxesError.message} />;

  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        selectableRows
        fixedHeader
        fixedHeaderScrollHeight="350px"
      />
    </StyleSheetManager>
  );
};

export default AdminTradeTable;
