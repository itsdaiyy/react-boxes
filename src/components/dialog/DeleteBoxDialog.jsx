import { useState } from "react";
import PropTypes from "prop-types";
DeleteBoxDialog.propTypes = { row: PropTypes.object };
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

function DeleteBoxDialog({ row }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="rounded-md bg-red-600 p-2 text-white hover:bg-red-500 focus-visible:outline-none">
            <FaTrashAlt />
          </button>
        </DialogTrigger>

        <DialogContent inert={!open}>
          <DialogHeader>
            <DialogTitle>刪除紙箱</DialogTitle>
            <DialogDescription>
              確定要刪除 紙箱編號：{row.id} 的紙箱嗎?
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-2">
            <button
              className="btn-cancel"
              onClick={() => {
                setOpen(false);
                toast.error("取消刪除");
              }}
            >
              取消
            </button>
            <button
              className="btn-delete"
              onClick={() => {
                setOpen(false);
                toast.success("刪除成功");
              }}
            >
              刪除
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeleteBoxDialog;
