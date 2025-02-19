import { useState } from "react";
import PropTypes from "prop-types";
UpdateBoxDialog.propTypes = { row: PropTypes.object };
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateBoxForm from "../form/UpdateBoxForm";
import { FaPen } from "react-icons/fa";

function UpdateBoxDialog({ row }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="rounded-md bg-main-600 p-2 text-white hover:bg-main-500 focus-visible:outline-none">
            <FaPen />
          </button>
        </DialogTrigger>

        <DialogContent inert={!open}>
          <DialogHeader>
            <DialogTitle>編輯紙箱</DialogTitle>
            <DialogDescription>編輯紙箱資訊</DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <img src={row.image_url} alt="照片" className="w-1/4" />
            <div className="flex flex-col">
              <p>紙箱編號：{row.id}</p>
              <p>新增時間：{row.created_at?.replace("T", " ").slice(0, 16)}</p>
              <p>更新時間：{row.updated_at?.replace("T", " ").slice(0, 16)}</p>
              <p className="text-red-500">
                保存到期日：
                {row.updated_at?.replace("T", " ").slice(0, 16)}
              </p>
              <p className="text-red-500">
                回收會員：{row.user_id?.slice(0, 16)}
              </p>
            </div>
          </div>
          <UpdateBoxForm row={row} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateBoxDialog;
