import { useState } from "react";
import PropTypes from "prop-types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateBoxForm from "./UpdateBoxForm.jsx";
import { FaPen } from "react-icons/fa";

UpdateBoxDialog.propTypes = { row: PropTypes.object };

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
          <div className="max-h-[80vh] overflow-y-auto px-2">
            <UpdateBoxForm row={row} setOpen={setOpen} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateBoxDialog;
