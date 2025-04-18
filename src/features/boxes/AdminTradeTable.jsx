// 5-7 回收站點管理者後台 - 售出紙箱流程
import { useEffect, useState } from "react";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import DataTable from "react-data-table-component";

import { useBoxesTotalForSelling } from "@/hooks/boxes/useBoxes";
import { formatUTCTimestamp } from "@/utils/helpers";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";

// 表格內客製化樣式 (或建立style.css覆蓋樣式)
const customStyles = {
  table: {
    style: {
      border: "1px solid #d9d9d9",
      borderRadius: "12px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      padding: "8px",
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
import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";

const AdminTradeTable = ({ handleSelectChange }) => {
  // 資料
  const { boxes, isLoadingBoxes, boxesError } = useBoxesTotalForSelling();

  // 篩選搜尋資料
  const [originData, setOriginData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (boxes?.length || 0 > 0) {
      // 若boxes回傳為undefined則無法計算length會報錯，加?避免錯誤
      setOriginData(boxes);
      setFilteredData(boxes);
    }
  }, [boxes]);

  // 搜尋欄、原始資料變動時觸發
  useEffect(() => {
    let tempData = [...originData];
    if (filterText) {
      tempData = originData.filter(
        (item) =>
          item.id.toString().includes(filterText) ||
          item.size.includes(filterText) ||
          item.condition.includes(filterText),
      );
    }
    setFilteredData(tempData);
  }, [filterText, originData]);

  // 欄位
  const columns = [
    {
      name: "新增時間",
      selector: (row) => formatUTCTimestamp(row.updated_at).slice(0, 10),
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

  if (isLoadingBoxes) return <Spinner />;
  if (boxesError) return <ErrorMessage errorMessage={boxesError.message} />;

  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      {/* 搜尋框 */}
      <div className="mb-3 flex w-full justify-start">
        <Input
          type="text"
          placeholder="請輸入關鍵字搜尋"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-72 border border-neutral-400 focus:border-main-400 focus-visible:outline-none focus-visible:ring-0"
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        customStyles={customStyles}
        selectableRows
        onSelectedRowsChange={handleSelectChange}
        fixedHeader
        fixedHeaderScrollHeight="350px"
        noDataComponent="沒有紙箱TAT"
      />
    </StyleSheetManager>
  );
};

AdminTradeTable.propTypes = {
  handleSelectChange: PropTypes.func.isRequired,
};

export default AdminTradeTable;
