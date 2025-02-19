import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPen, FaTimes } from "react-icons/fa";

import PropTypes from "prop-types";
AdminRecyclingBoxForm.propTypes = { station: PropTypes.object };

function AdminRecyclingBoxForm({ station }) {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm({
    defaultValues: {
      小: station.pending_boxes_s || 0,
      中: station.pending_boxes_m || 0,
      大: station.pending_boxes_l || 0,
      特大: station.pending_boxes_xl || 0,
    },
  });
  const { register, handleSubmit } = form;

  function onSubmit(values) {
    try {
      console.log(values);
      toast.success("已更新紙箱數量");
    } catch (error) {
      toast.error("Form submission error", error);
    }
  }
  return (
    <>
      <div className="mb-2 flex">
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="ml-auto"
        >
          {isEditing ? (
            <FaTimes size={20} />
          ) : (
            <FaPen className="text-main-600" size={20} />
          )}
        </button>
      </div>
      <div className="mb-2 rounded-md bg-main-100 py-1">
        <p className="fs-6 text-center text-main-600">可回收紙箱</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2 flex gap-2">
          <div className="flex w-1/4 flex-col flex-wrap gap-1 rounded-md bg-main-100 p-2 text-center text-main-600">
            <input
              type="text"
              name="小"
              defaultValue={20}
              disabled={!isEditing}
              {...register("小", { valueAsNumber: true })}
              className={`w-full bg-transparent text-center text-[24px] font-bold leading-[28.8px] focus:outline-none ${isEditing ? "rounded border-2 border-main-200 bg-white focus:border-main-400" : ""}`}
            />
            <label className="fs-7">小紙箱</label>
          </div>
          <div className="flex w-1/4 flex-col flex-wrap gap-1 rounded-md bg-main-100 p-2 text-center text-main-600">
            <input
              type="text"
              name="中"
              defaultValue={20}
              disabled={!isEditing}
              {...register("中", { valueAsNumber: true })}
              className={`w-full bg-transparent text-center text-[24px] font-bold leading-[28.8px] focus:outline-none ${isEditing ? "rounded border-2 border-main-200 bg-white focus:border-main-400" : ""}`}
            />
            <label className="fs-7">中紙箱</label>
          </div>
          <div className="flex w-1/4 flex-col flex-wrap gap-1 rounded-md bg-main-100 p-2 text-center text-main-600">
            <input
              type="text"
              name="大"
              defaultValue={20}
              disabled={!isEditing}
              {...register("大", { valueAsNumber: true })}
              className={`w-full bg-transparent text-center text-[24px] font-bold leading-[28.8px] focus:outline-none ${isEditing ? "rounded border-2 border-main-200 bg-white focus:border-main-400" : ""}`}
            />
            <label className="fs-7">大紙箱</label>
          </div>
          <div className="flex w-1/4 flex-col flex-wrap gap-1 rounded-md bg-main-100 p-2 text-center text-main-600">
            <input
              type="text"
              name="特大"
              defaultValue={20}
              disabled={!isEditing}
              {...register("特大", { valueAsNumber: true })}
              className={`w-full bg-transparent text-center text-[24px] font-bold leading-[28.8px] focus:outline-none ${isEditing ? "rounded border-2 border-main-200 bg-white focus:border-main-400" : ""}`}
            />
            <label className="fs-7">特大紙箱</label>
          </div>
        </div>
        {isEditing && (
          <button className="btn" type="submit">
            確認修改
          </button>
        )}
      </form>
    </>
  );
}

export default AdminRecyclingBoxForm;
