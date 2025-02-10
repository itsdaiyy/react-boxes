// 5-4 待回收紙箱列表（報廢）
import { useState } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import { useBoxesForScraping } from "../..//hooks/useBoxes";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// 表格內客製化樣式 (或建立style.css覆蓋樣式)
const customStyles = {
  table: {
    style: {
      borderRadius: "8px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#f3f4f6",
      borderBottomColor: "#e5e7eb",
      fontWeight: "bold",
    },
  },
  rows: {
    style: {
      "&:hover": {
        backgroundColor: "#f9fafb",
      },
    },
  },
  pagination: {
    style: {
      backgroundColor: "#f3f4f6",
      borderTopColor: "#e5e7eb",
    },
  },
  subHeader: {
    style: {
      flex: "flex",
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

const style = {
  selectContainer: "mb-4 flex items-center justify-between",
  select:
    "fs-6 w-2/3 rounded-sm border p-1 text-black placeholder:text-[#B7B7B7] focus-visible:outline-none",
};

const AdminDeprecatedTable = () => {
  // 篩選搜尋資料
  const [filterText, setFilterText] = useState("");
  // const filteredData = pointsData.filter(
  //   item => Object.values(item).some(
  //     val => val.toString().toLowerCase().includes(filterText.toLowerCase())
  //   )
  // );

  // 取得紙箱資廖
  const { boxes, isLoadingBoxes, boxesError } = useBoxesForScraping();
  if (isLoadingBoxes) return <Spinner />;
  if (boxesError) return <ErrorMessage error={boxesError} />;

  // 欄位
  const columns = [
    { name: "紙箱編號", selector: (row) => row.id, sortable: true },
    {
      name: "新增時間",
      selector: (row) => row.created_at.replace("T", " ").slice(0, 16),
      sortable: true,
      width: "140px",
    },
    {
      name: "更新時間",
      selector: (row) => row.updated_at.replace("T", " ").slice(0, 16),
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
          <Dialog>
            <DialogTrigger className="rounded-md bg-main-600 p-2 text-white hover:bg-main-500 focus-visible:outline-none">
              <FaPen />
            </DialogTrigger>
            <DialogContent>
              <div className="flex gap-4">
                <img
                  src={row.image_url}
                  alt="照片"
                  className="h-[100px] w-[100px]"
                />
                <div>
                  <p>
                    新增時間： {row.created_at.replace("T", " ").slice(0, 16)}
                  </p>
                  <p>回收會員： {row.user_id}</p>
                  <p>紙箱編號： {row.id}</p>
                </div>
              </div>
              <form>
                <div className={style.selectContainer}>
                  <label htmlFor="size">紙箱大小</label>
                  <select id="size" className={style.select} value={row.size}>
                    <option value="特大">特大</option>
                    <option value="大">大</option>
                    <option value="中">中</option>
                    <option value="小">小</option>
                  </select>
                </div>
                <div className={style.selectContainer}>
                  <label htmlFor="condition">紙箱保存等級</label>
                  <select
                    id="condition"
                    className={style.select}
                    value={row.condition}
                  >
                    <option value="全新">全新</option>
                    <option value="優">優</option>
                    <option value="普通">普通</option>
                    <option value="差">差</option>
                  </select>
                </div>
                <div className={style.selectContainer}>
                  <label htmlFor="retention_days">紙箱保留天數</label>
                  <select
                    id="retention_days"
                    className={style.select}
                    value={row.retention_days}
                  >
                    <option value="7">7</option>
                    <option value="30">30</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                  </select>
                </div>
                <div className={style.selectContainer}>
                  <p>保存到期日</p>
                  <p className="text-left">2025/02/25</p>
                </div>
                <div className={style.selectContainer}>
                  <label htmlFor="status">紙箱狀態</label>
                  <select
                    id="status"
                    className={style.select}
                    value={row.status}
                  >
                    <option value="可認領">可認領</option>
                    <option value="自用">自用</option>
                    <option value="售出">售出</option>
                    <option value="報廢">被廢</option>
                    <option value="保留到期">保留到期</option>
                  </select>
                </div>
                <div className="text-right">
                  <button className="btn" onClick={(e) => e.preventDefault()}>
                    確認送出
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <button className="rounded-md bg-red-600 p-2 text-white hover:bg-red-500">
            <FaTrashAlt />
          </button>
        </div>
      ),
    },
  ];
  const data = [...boxes];

  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <div className="py-5">
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
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="rounded border p-2 placeholder:text-[#B7B7B7] focus-within:border focus-within:border-main-500 focus-visible:outline-none"
              />
              <div className="">
                <button className="btn flex items-center gap-1 border p-2">
                  <FaTrashAlt /> 清空表單
                </button>
              </div>
            </div>
          }
        />
      </div>
    </StyleSheetManager>
  );
};

export default AdminDeprecatedTable;
