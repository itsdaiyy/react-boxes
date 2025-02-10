import { useBoxes } from "@/hooks/useBoxes";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import DataTable from "react-data-table-component";

import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const customStyles = {
  headRow: {
    style: {
      fontSize: "12px",
      backgroundColor: "#F3F3F3",
    },
  },
  headCells: { style: { justifyContent: "center" } },
  rows: {
    style: {
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
    },
  },
};

const style = {
  selectContainer: "mb-4 flex items-center justify-between",
  select:
    "fs-6 w-2/3 rounded-sm border p-1 text-black placeholder:text-[#B7B7B7] focus-visible:outline-none",
};
function BoxesTable() {
  const { boxes, isLoadingBoxes, boxesError } = useBoxes();
  if (isLoadingBoxes) return <Spinner />;
  if (boxesError) return <ErrorMessage error={boxesError} />;

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
              <MdEdit />
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
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];
  const data = [...boxes];
  return (
    <>
      <div className="py-10">
        <div className="mb-4 flex items-center justify-between">
          <input
            type="search"
            className="rounded border p-2 placeholder:text-[#B7B7B7] focus-within:border focus-within:border-main-500 focus-visible:outline-none"
            placeholder="Search"
          />
          <div>
            <button className="btn mr-2">新增紙箱</button>
            <button className="btn">交易紙箱</button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data}
          fixedHeader
          pagination
          selectableRows
          customStyles={customStyles}
        />
      </div>
    </>
  );
}

export default BoxesTable;
