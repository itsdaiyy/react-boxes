import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPen, FaTimes } from "react-icons/fa";
import { useUpdateAvailableSlots } from "@/hooks/stations/useUpdateAvailableSlots";

import PropTypes from "prop-types";

function AdminRecyclingBoxForm({ station }) {
  const { updateAvailableSlots, isLoading } = useUpdateAvailableSlots();
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm({
    defaultValues: {
      S: station.available_slots?.S || 0,
      M: station.available_slots?.M || 0,
      L: station.available_slots?.L || 0,
      XL: station.available_slots?.XL || 0,
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  function onSubmit(available_slots) {
    try {
      updateAvailableSlots({ stationId: station.id, ...available_slots });
      console.log(available_slots);
      toast.success("提交成功");
      setIsEditing(false);
    } catch (error) {
      toast.error("提交失敗", error);
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
              id="S"
              type="text"
              name="S"
              defaultValue={0}
              disabled={!isEditing}
              {...register("S", {
                valueAsNumber: true,
                validate: (fieldValue) => {
                  if (Number(fieldValue) < 0) {
                    return "回收紙箱數不可小於0";
                  }
                  if (isNaN(fieldValue)) {
                    return "回收紙箱數不可為空或字串";
                  }
                },
              })}
              className={`w-full bg-transparent text-center text-[24px] font-bold leading-[28.8px] focus:outline-none ${isEditing ? "rounded border-2 border-main-200 bg-white focus:border-main-400" : ""}`}
            />
            <label className="fs-7" htmlFor="S">
              小紙箱
            </label>
          </div>
          <div className="flex w-1/4 flex-col flex-wrap gap-1 rounded-md bg-main-100 p-2 text-center text-main-600">
            <input
              id="M"
              type="text"
              name="M"
              defaultValue={0}
              disabled={!isEditing}
              {...register("M", {
                valueAsNumber: true,
                validate: (fieldValue) => {
                  if (Number(fieldValue) < 0) {
                    return "回收紙箱數不可小於0";
                  }
                  if (isNaN(fieldValue)) {
                    return "回收紙箱數不可為空或字串";
                  }
                },
              })}
              className={`w-full bg-transparent text-center text-[24px] font-bold leading-[28.8px] focus:outline-none ${isEditing ? "rounded border-2 border-main-200 bg-white focus:border-main-400" : ""}`}
            />
            <label className="fs-7" htmlFor="M">
              中紙箱
            </label>
          </div>
          <div className="flex w-1/4 flex-col flex-wrap gap-1 rounded-md bg-main-100 p-2 text-center text-main-600">
            <input
              id="L"
              type="text"
              name="L"
              defaultValue={0}
              disabled={!isEditing}
              {...register("L", {
                valueAsNumber: true,
                validate: (fieldValue) => {
                  if (Number(fieldValue) < 0) {
                    return "回收紙箱數不可小於0";
                  }
                  if (isNaN(fieldValue)) {
                    return "回收紙箱數不可為空或字串";
                  }
                },
              })}
              className={`w-full bg-transparent text-center text-[24px] font-bold leading-[28.8px] focus:outline-none ${isEditing ? "rounded border-2 border-main-200 bg-white focus:border-main-400" : ""}`}
            />
            <label className="fs-7" htmlFor="L">
              大紙箱
            </label>
          </div>
          <div className="flex w-1/4 flex-col flex-wrap gap-1 rounded-md bg-main-100 p-2 text-center text-main-600">
            <input
              id="XL"
              type="text"
              name="XL"
              defaultValue={0}
              disabled={!isEditing}
              {...register("XL", {
                valueAsNumber: true,
                validate: (fieldValue) => {
                  if (Number(fieldValue) < 0) {
                    return "回收紙箱數不可小於0";
                  }
                  if (isNaN(fieldValue)) {
                    return "回收紙箱數不可為空或字串";
                  }
                },
              })}
              className={`w-full bg-transparent text-center text-[24px] font-bold leading-[28.8px] focus:outline-none ${isEditing ? "rounded border-2 border-main-200 bg-white focus:border-main-400" : ""}`}
            />
            <label className="fs-7" htmlFor="XL">
              特大紙箱
            </label>
          </div>
        </div>
        <p>{errors.S?.message}</p>
        <p>{errors.M?.message}</p>
        <p>{errors.L?.message}</p>
        <p>{errors.XL?.message}</p>
        {isEditing && (
          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? "更新中" : "確認修改"}
          </button>
        )}
      </form>
    </>
  );
}
AdminRecyclingBoxForm.propTypes = { station: PropTypes.object };

export default AdminRecyclingBoxForm;
