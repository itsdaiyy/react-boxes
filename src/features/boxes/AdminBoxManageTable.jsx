// 5-3 回收站點管理者後台 - 待認領／自用紙箱列表
import { useEffect, useState } from "react";
// React Data Table Component
import { StyleSheetManager } from "styled-components";
import { customStyles, paginationComponentOptions } from "@/data/constants";
import DataTable from "react-data-table-component";
import isPropValid from "@emotion/is-prop-valid";
// react query
import { useBoxesForAdminManaging } from "@/hooks/boxes/useBoxes";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";
// react icons
import { FaFolderPlus, FaCashRegister } from "react-icons/fa";
import { FaRecycle } from "react-icons/fa";
// 更新紙箱、刪除紙箱資料表單元件
import { useNavigate } from "react-router-dom";
import { formatUTCTimestamp } from "@/utils/helpers";
import UpdateBoxDialog from "@/features/boxes/UpdateBoxDialog";
import DeleteBoxDialog from "@/features/boxes/DeleteBoxDialog";
import EmptyDataMessage from "@/components/EmptyDataMessage";

const AdminBoxManageTable = () => {
  const navigate = useNavigate();
  // 取得可認領紙箱資料
  const { boxes, isLoadingBoxes, boxesError } = useBoxesForAdminManaging();

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

  useEffect(() => {
    const filtered = originData.filter((item) =>
      item.id.toString().includes(filterText),
    );
    setFilteredData(filtered);
  }, [filterText, originData]);
  // 搜尋欄、原始資料變動時觸發

  // 欄位
  const columns = [
    {
      name: "編號",
      selector: (row) => row.id,
      sortable: true,
      width: "90px",
    },
    {
      name: "紙箱照片",
      selector: (row) => (
        <div className="overflow-hidden">
          <img
            src={row.image_url}
            alt="box-image"
            className="h-[70px] w-[70px] object-cover transition-transform duration-300 hover:scale-150"
          />
        </div>
      ),
    },
    {
      name: "新增時間",
      selector: (row) => formatUTCTimestamp(row.created_at),
      sortable: true,
      width: "135px",
    },
    {
      name: "更新時間",
      selector: (row) => formatUTCTimestamp(row.updated_at),
      sortable: true,
      width: "135px",
    },
    {
      name: "紙箱大小",
      selector: (row) => row.size,
      sortable: true,
      width: "110px",
    },
    {
      name: "保存等級",
      selector: (row) => row.condition,
      sortable: true,
      width: "110px",
    },
    {
      name: "保留天數",
      selector: (row) => row.retention_days,
      sortable: true,
      width: "110px",
    },
    {
      name: "紙箱狀態",
      selector: (row) => row.status,
      sortable: true,
      width: "110px",
    },
    {
      name: "現金",
      selector: (row) => row.cash_value,
      sortable: true,
      width: "90px",
    },
    {
      name: "積分",
      selector: (row) => row.point_value,
      sortable: true,
      width: "90px",
    },
    {
      name: "編輯",
      selector: (row) => (
        <div className="flex gap-2">
          <UpdateBoxDialog row={row} />
          <DeleteBoxDialog row={row} icons={<FaRecycle />} />
        </div>
      ),
    },
  ];

  if (isLoadingBoxes) return <Spinner />;
  if (boxesError) return <ErrorMessage errorMessage={boxesError.message} />;

  return (
    <div className="px-3">
      <h4 className="mb-4 text-main-600">可認領紙箱列表</h4>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={customStyles}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          subHeader
          noDataComponent={<EmptyDataMessage message="目前沒有可認領紙箱" />}
          subHeaderComponent={
            <div className="mb-4 flex w-full flex-col justify-between gap-3 md:flex-row">
              <input
                type="text"
                placeholder="搜尋紙箱編號"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="order-3 rounded border p-2 placeholder:text-[#B7B7B7] focus-within:border focus-within:border-main-500 focus-visible:outline-none md:order-1"
              />
              <div className="order-2 flex justify-end gap-5">
                <button
                  className="btn flex items-center gap-1 border p-2"
                  onClick={() => {
                    navigate("/member/admin/addBoxes");
                  }}
                >
                  <FaFolderPlus /> 新增紙箱
                </button>
                <button
                  className="btn flex items-center gap-1 border p-2"
                  onClick={() => {
                    navigate("/member/admin/tradeBoxes");
                  }}
                >
                  <FaCashRegister /> 交易紙箱
                </button>
              </div>
            </div>
          }
        />
      </StyleSheetManager>
    </div>
  );
};

export default AdminBoxManageTable;
