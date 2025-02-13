// 5-3 回收站點管理者後台 - 待認領／自用紙箱列表
import { useState } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaFolderPlus, FaCashRegister } from "react-icons/fa";

import { useBoxesForAdminManaging } from "../..//hooks/useBoxes";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UpdateBoxesForm from "../form/UpdateBoxesForm";

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

const AdminBoxManageTable = () => {
  // 篩選搜尋資料
  const [filterText, setFilterText] = useState("");
  // const filteredData = pointsData.filter(
  //   item => Object.values(item).some(
  //     val => val.toString().toLowerCase().includes(filterText.toLowerCase())
  //   )
  // );

  // 取得可認領紙箱資料
  const { boxes, isLoadingBoxes, boxesError } = useBoxesForAdminManaging();
  if (isLoadingBoxes) return <Spinner />;
  if (boxesError) return <ErrorMessage errorMessage={boxesError.message} />;

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
            <DialogTrigger asChild>
              <button className="rounded-md bg-main-600 p-2 text-white hover:bg-main-500 focus-visible:outline-none">
                <FaPen />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>編輯紙箱</DialogTitle>
                <DialogDescription>編輯紙箱資訊</DialogDescription>
              </DialogHeader>
              <div className="flex gap-2">
                <img src={row.image_url} alt="照片" className="w-1/4" />
                <div className="flex flex-col">
                  <p>紙箱編號：{row.id}</p>
                  <p>
                    新增時間：{row.created_at.replace("T", " ").slice(0, 16)}
                  </p>
                  <p>
                    更新時間：{row.updated_at.replace("T", " ").slice(0, 16)}
                  </p>
                  <p className="text-red-500">
                    保存到期日：{row.updated_at.replace("T", " ").slice(0, 16)}
                  </p>
                  <p className="text-red-500">
                    回收會員：{row.user_id.slice(0, 16)}
                  </p>
                </div>
              </div>
              <UpdateBoxesForm row={row} />
            </DialogContent>
          </Dialog>
          <button className="rounded-md bg-red-600 p-2 text-white hover:bg-red-500 focus-visible:outline-none">
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
      </div>
    </StyleSheetManager>
  );
};

export default AdminBoxManageTable;

{
  /* <div className='flex justify-between w-full'>
          <input
            type="text"
            placeholder="搜尋紙箱編號"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="p-2 border rounded "
          />
          <div className='flex gap-5'>
            <button className="btn p-2 border flex items-center"><FaFolderPlus /> 新增紙箱</button>
            <button className="btn p-2 border flex items-center"><FaCashRegister /> 交易紙箱</button>
          </div>
        </div> */
}
