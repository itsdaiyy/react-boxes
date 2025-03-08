import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useUpdateMultipleBoxes } from "@/hooks/useBoxes";
import AdminTradeTable from "./table/AdminTradeTable";
import { useCreateTransaction } from "@/hooks/useCreateTransaction";

// 驗證 schema
const formSchema = z.object({
  userId: z.string().min(1, { message: "會員編號為必填" }),
  selectedRows: z.array(z.any()).min(1, { message: "尚未選擇要交易的項目" }),
  paymentMethod: z.enum(["cash", "points"]),
});

function AdminTrade() {
  const navigate = useNavigate();
  const { createTransactionAsync } = useCreateTransaction();
  // 從 5-3 傳遞 station_id
  // const location = useLocation();
  // const { station_id } = location.state;
  // console.log("5-7收到站點編號", station_id);

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      selectedRows: [],
      paymentMethod: "cash",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;

  // 選取計算
  const [totalCash, setTotalCash] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedCounts, setSelectedCounts] = useState(0);

  // 更新紙箱狀態(status: 可認領 => 售出)
  const { updateMultipleBoxes } = useUpdateMultipleBoxes();
  const [boxIds, setBoxIds] = useState([]);
  const [values, setValues] = useState({});

  const handleSelectChange = ({ selectedRows }) => {
    setValue("selectedRows", selectedRows); // 更新表單中的 selectedRows

    const cashSum = selectedRows.reduce(
      (sum, item) => sum + item.cash_value,
      0,
    );
    const pointSum = selectedRows.reduce(
      (sum, item) => sum + item.point_value,
      0,
    );
    const counts = selectedRows.length;

    const selectedBoxIds = selectedRows.map((item) => item.id);

    setTotalCash(cashSum);
    setTotalPoints(pointSum);
    setSelectedCounts(counts);
    setBoxIds(selectedBoxIds);
    setValues({ status: "售出" });
  };

  const onSubmit = async (data) => {
    console.log("提交的資料:", data);

    const boxesArr = data.selectedRows.map((box) => {
      return {
        size: box.size,
        box_id: box.id,
        condition: box.condition,
        cash_value: box.cash_value,
        point_value: box.point_value,
      };
    });

    const transaction = {
      transaction_type: data.paymentMethod === "cash" ? "購買" : "兌換",
      cash_cost: data.paymentMethod === "cash" ? totalCash : 0,
      points_cost: data.paymentMethod === "points" ? totalPoints : 0,
      earned_points: 2 * boxesArr.length,
      boxes: boxesArr,
    };

    updateMultipleBoxes({ boxIds, values });
    await createTransactionAsync({ transaction, memberId: data.userId });
    navigate("/member/admin/boxesTable"); // 轉向至 5-3
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="z-100 container top-16 mx-auto my-5 flex flex-col items-center justify-center">
            <div className="mb-3 flex w-1/3 justify-center">
              <p className="my-5 w-full border-b-4 border-b-main-600 pb-5 text-center text-4xl font-bold text-main-600">
                交易紙箱
              </p>
            </div>
            <div className="w-full rounded-xl bg-[#fafafa] p-5">
              <div className="w-1/2">
                <div className="mb-5 flex flex-1 items-center">
                  <Label className="mr-5 text-2xl font-bold text-main-600">
                    交易時間
                  </Label>
                  <Label className="text-2xl text-main-600">
                    {new Date().toLocaleString()}
                  </Label>
                </div>
                <div className="mb-5 flex flex-1 items-center">
                  <Label className="mr-5 text-2xl font-bold text-main-600">
                    會員編號
                  </Label>
                  <Input className="w-72" type="text" {...register("userId")} />
                  {errors.userId && (
                    <p className="ml-5 text-red-500">{errors.userId.message}</p>
                  )}
                </div>
              </div>

              <AdminTradeTable
                handleSelectChange={handleSelectChange}
                setBoxId={setBoxIds}
                setValues={setValues}
              />

              {/* 顯示錯誤訊息 */}
              {errors.selectedRows && (
                <p className="text-red-500">{errors.selectedRows.message}</p>
              )}

              <div className="flex w-full gap-5">
                <div className="mr-10 flex flex-1 justify-end">
                  <p className="p-5">
                    現金總計：<span>{totalCash}</span>
                  </p>
                  <p className="p-5">
                    積分總計：<span>{totalPoints}</span>
                  </p>
                </div>
              </div>

              <div className="my-5 flex items-center justify-between">
                <div className="flex flex-1 flex-col items-start">
                  <div className="mb-3 flex w-1/2">
                    <p className="w-1/3 text-xl font-bold">交易紙箱數</p>
                    <p className="text-xl">{selectedCounts} 個紙箱</p>
                  </div>
                  <div className="flex w-1/2 items-center">
                    <p className="w-1/3 text-xl font-bold">支付方式</p>
                    <Controller
                      name="paymentMethod"
                      control={methods.control}
                      defaultValue="cash"
                      render={({ field }) => (
                        <select className="text-xl" {...field}>
                          <option value="cash">現金</option>
                          <option value="points">積分</option>
                        </select>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-1 gap-3">
                  <button className="btn w-1/2 text-xl" type="submit">
                    確認送出
                  </button>
                  <button
                    className="btn w-1/2 text-xl"
                    type="button"
                    onClick={() => navigate("/member/admin/boxesTable")}
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default AdminTrade;
