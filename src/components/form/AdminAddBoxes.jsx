import { getTimestamp } from "@/utils/helpers";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const sizeOptions = [
  { label: "特大", value: "特大", points: 5 },
  { label: "大", value: "大", points: 4 },
  { label: "中", value: "中", points: 3 },
  { label: "小", value: "小", points: 2 },
];

const conditionOptions = [
  { label: "全新", value: "全新", points: 4 },
  { label: "優", value: "優", points: 3 },
  { label: "普通", value: "普通", points: 2 },
  { label: "差", value: "差", points: 1 },
];

const retentionDaysOptions = [0, 7, 30, 60, 90];

const getPoints = (size, condition) => {
  const sizePoints = sizeOptions.find((opt) => opt.value === size)?.points || 0;
  const conditionPoints =
    conditionOptions.find((opt) => opt.value === condition)?.points || 0;
  return sizePoints + conditionPoints;
};

const getCashValue = (size, condition) => {
  const sizePoints = sizeOptions.find((opt) => opt.value === size)?.points || 0;
  const conditionPoints =
    conditionOptions.find((opt) => opt.value === condition)?.points || 0;
  return sizePoints * conditionPoints;
};

const formSchema = z.object({
  userId: z.string().nonempty("會員編號不可為空"),
  boxes: z
    .array(
      z.object({
        size: z.string(),
        condition: z.string(),
        retention_days: z.number(),
        points: z.number(),
        cash_value: z.number(),
      }),
    )
    .min(1, "至少新增一筆紙箱資料"),
});

function AdminAddBoxes() {
  const navigate = useNavigate();
  const location = useLocation();
  const { station_id } = location.state || {};

  const { control, handleSubmit, register, watch, setValue, formState } =
    useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        created_at: getTimestamp(),
        userId: "",
        boxes: [],
      },
    });
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "boxes",
  });
  const watchBoxes = watch("boxes");

  useEffect(() => {
    watchBoxes.forEach((box, index) => {
      const points = getPoints(box.size, box.condition);
      setValue(`boxes.${index}.points`, points);
      setValue(
        `boxes.${index}.cash_value`,
        getCashValue(box.size, box.condition),
      );
    });
  }, [watchBoxes, setValue]);

  const totalPoints = watchBoxes.reduce(
    (sum, box) => sum + (box.points || 0),
    0,
  );

  const onSubmit = (data) => {
    console.log("提交的資料:", { ...data, station_id });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-main-100 py-6">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold text-main-600">
          新增紙箱
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 space-x-4">
            <label className="font-semibold text-[#3D3D3D]">新增時間:</label>
            <input
              type="text"
              {...register("created_at")}
              disabled
              className="rounded-md bg-transparent px-2 py-1"
            />
          </div>

          <div className="mb-4 space-x-4">
            <label className="font-semibold text-[#3D3D3D]">會員編號:</label>
            <input
              type="text"
              placeholder="請輸入會員編號"
              {...register("userId")}
              className="rounded-md border border-main-400 px-2 py-1 focus-within:border focus-within:border-main-500 focus-visible:outline-none"
            />
            {errors.userId && (
              <p className="inline text-sm text-red-500">
                {errors.userId.message}
              </p>
            )}
          </div>

          <div className="mb-4 flex justify-between">
            <h3 className="text-xl font-semibold text-main-600">紙箱列表</h3>
            <button
              type="button"
              onClick={() =>
                append({
                  size: "特大",
                  condition: "全新",
                  retention_days: 0,
                  points: getPoints("特大", "全新"),
                  cash_value: getCashValue("特大", "全新"),
                })
              }
              className="rounded-md bg-main-600 px-4 py-2 text-white hover:bg-main-500"
            >
              新增一筆
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-main-100 text-neutral-500">
                <th className="border p-2">編號</th>
                <th className="border p-2">紙箱大小</th>
                <th className="border p-2">紙箱保存等級</th>
                <th className="border p-2">保留天數</th>
                <th className="border p-2">對應積分</th>
                <th className="border p-2">對應現金</th>
                <th className="border p-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">
                    <select
                      {...register(`boxes.${index}.size`)}
                      onChange={(e) => {
                        const newSize = e.target.value;
                        const condition =
                          watchBoxes[index]?.condition || "全新";
                        setValue(
                          `boxes.${index}.points`,
                          getPoints(newSize, condition),
                        );
                        setValue(
                          `boxes.${index}.cash_value`,
                          getCashValue(newSize, condition),
                        );
                      }}
                      className="w-full rounded-md border px-2 py-1"
                    >
                      {sizeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2">
                    <select
                      {...register(`boxes.${index}.condition`)}
                      onChange={(e) => {
                        const newCondition = e.target.value;
                        const size = watchBoxes[index]?.size || "小";
                        setValue(
                          `boxes.${index}.points`,
                          getPoints(size, newCondition),
                        );
                        setValue(
                          `boxes.${index}.cash_value`,
                          getCashValue(size, newCondition),
                        );
                      }}
                      className="w-full rounded-md border px-2 py-1"
                    >
                      {conditionOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2">
                    <select
                      {...register(`boxes.${index}.retention_days`)}
                      className="w-full rounded-md border px-2 py-1"
                    >
                      {retentionDaysOptions.map((days) => (
                        <option key={days} value={days}>
                          {days}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2 text-center">
                    {watchBoxes[index]?.points || 0}
                  </td>
                  <td className="border p-2 text-center">
                    {watchBoxes[index]?.cash_value || 0}
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 font-semibold text-[#3D3D3D]">
            積分總計:
            <span className="font-bold text-main-500">{totalPoints}</span>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/member/admin/boxesTable")}
            >
              取消
            </button>
            <button type="submit" className="btn">
              確認送出
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAddBoxes;
