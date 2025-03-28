import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateStationInfo } from "@/hooks/stations/useUpdateStationInfo";

import toast from "react-hot-toast";
import { FaPen, FaTimes } from "react-icons/fa";

const formSchema = z.object({
  station_name: z.string().nonempty("站點名稱不得為空"),
  address: z.string().nonempty("地址不得為空"),
  phone: z.string().nonempty("電話不得為空"),
  station_daily_hours: z.array(
    z.object({
      id: z.number(),
      open_time: z.string().optional(),
      close_time: z.string().optional(),
      is_business_day: z.boolean(),
    }),
  ),
});

import PropTypes from "prop-types";
AdminInfoForm.propTypes = { station: PropTypes.object };

const daysOfWeek = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

function AdminInfoForm({ station }) {
  const [isEditing, setIsEditing] = useState(false);
  const { updateStation, isUpdating } = useUpdateStationInfo();

  const { handleSubmit, register, setValue } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      station_name: station.station_name || "",
      address: station.address || "",
      phone: station.phone || "",
      station_daily_hours: Array.from({ length: 7 }, (_, index) => {
        const dayData = station.station_daily_hours.find(
          (item) => item.day_of_week === index,
        );

        return {
          id: dayData ? dayData.id : "",
          open_time: dayData ? dayData.open_time.substring(0, 5) : "",
          close_time: dayData ? dayData.close_time.substring(0, 5) : "",
          is_business_day: dayData ? dayData.is_business_day : false,
        };
      }),
    },
  });

  function onSubmit(values) {
    try {
      updateStation({ ...values, id: station.id });
      setIsEditing(false);
    } catch (error) {
      toast.error("Form submission error", error);
    }
  }

  function handleClickClose() {
    setIsEditing(!isEditing);
    setValue("station_name", station.station_name);
    setValue("phone", station.phone);
    setValue(
      "station_daily_hours",
      Array.from({ length: 7 }, (_, index) => {
        const dayData = station.station_daily_hours.find(
          (item) => item.day_of_week === index,
        );

        return {
          id: dayData ? dayData.id : "",
          open_time: dayData ? dayData.open_time.substring(0, 5) : "",
          close_time: dayData ? dayData.close_time.substring(0, 5) : "",
          is_business_day: dayData ? dayData.is_business_day : false,
        };
      }),
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-gray-700">轉運站長</p>
        <button type="button" onClick={handleClickClose}>
          {isEditing ? (
            <FaTimes size={20} />
          ) : (
            <FaPen className="text-main-600" size={20} />
          )}
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-4 py-6"
      >
        <div className="flex items-center">
          <label className="w-1/5">
            <h6 className="text-main-600">站點名稱</h6>
          </label>
          <input
            {...register("station_name")}
            placeholder="輸入店名"
            className="w-3/5 rounded-sm border border-neutral-400 p-1 text-gray-700 focus:border-main-400 focus:outline-none disabled:border-none disabled:bg-transparent"
            disabled={!isEditing}
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/5">
            <h6 className="text-main-600">地址</h6>
          </label>
          <input
            {...register("address")}
            placeholder="輸入地址"
            className="w-3/5 rounded-sm border border-neutral-400 p-1 text-gray-700 focus:border-main-400 focus:outline-none disabled:border-none disabled:bg-transparent"
            disabled={!isEditing}
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/5">
            <h6 className="text-main-600">電話</h6>
          </label>
          <input
            {...register("phone")}
            placeholder="輸入電話"
            className="w-3/5 rounded-sm border border-neutral-400 p-1 text-gray-700 focus:border-main-400 focus:outline-none disabled:border-none disabled:bg-transparent"
            disabled={!isEditing}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="mb-2">
            <h6 className="text-main-600">營業時間</h6>
          </label>
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 md:space-x-2"
            >
              <input
                type="checkbox"
                {...register(`station_daily_hours.${index}.is_business_day`)}
                disabled={!isEditing}
              />
              <span className="text-nowrap p-1">{day}</span>
              <input
                {...register(`station_daily_hours.${index}.open_time`)}
                placeholder="開店時間"
                type="time"
                disabled={!isEditing}
                className="text-md w-full rounded-sm border border-neutral-400 p-1 text-gray-700 focus:border-main-400 focus:outline-none disabled:border-none disabled:bg-transparent"
              />
              <input
                {...register(`station_daily_hours.${index}.close_time`)}
                placeholder="關店時間"
                type="time"
                disabled={!isEditing}
                className="text-md w-full rounded-sm border border-neutral-400 p-1 text-gray-700 focus:border-main-400 focus:outline-none disabled:border-none disabled:bg-transparent"
              />
            </div>
          ))}
        </div>
        {isEditing && (
          <button className="btn" type="submit" disabled={isUpdating}>
            {isUpdating ? "更新中" : "確認修改"}
          </button>
        )}
      </form>
    </>
  );
}

export default AdminInfoForm;
