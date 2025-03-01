import AdminTradeTable from "./table/AdminTradeTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import memberBannerBg01 from "@/assets/memberBanner-bg1.svg";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

// 驗證 schema
const formSchema = z.object({
  userId: z.string().min(1, { message: "會員編號為必填" }),
  selectedRows: z.array(z.any()).min(1, { message: "尚未選擇要交易的項目" }),
  paymentMethod: z.enum(["cash", "points"]),
});

function AdminTrade() {
  const navigate = useNavigate();

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

    setTotalCash(cashSum);
    setTotalPoints(pointSum);
    setSelectedCounts(counts);
  };

  const onSubmit = (data) => {
    console.log("提交的資料:", data);
    navigate("/member/admin/boxesTable"); // 轉向至 5-3
  };

  return (
    <>
      <Header />
      <section className="bg-[#F3F3F3] bg-top bg-no-repeat md:bg-[url('@/assets/memberBanner-bg2.svg')]">
        <div className="container relative mx-auto flex flex-col items-center gap-10 py-20 text-center md:flex-row md:justify-between md:text-left">
          <div className="relative h-[201px] w-[200px]">
            <img
              src={memberBannerBg01}
              alt="背景圖"
              className="absolute -bottom-3 -left-14 hidden md:flex"
            />
          </div>
          <div className="relative h-60 w-80 md:w-[500px]"></div>
        </div>
      </section>
      <div className="mb-[500px]"></div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="z-100 container absolute left-0 right-0 top-16 mx-auto my-5 flex flex-col items-center justify-center">
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

              <AdminTradeTable handleSelectChange={handleSelectChange} />

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
                  <button className="btn w-1/2 text-xl" type="button">
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
      <Footer />
    </>
  );
}

export default AdminTrade;
