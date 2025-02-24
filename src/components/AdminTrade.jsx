// 5-7 回收站點管理者後台 - 售出紙箱流程
import AdminTradeTable from "./table/AdminTradeTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import memberBannerBg01 from "@/assets/memberBanner-bg1.svg";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";

function AdminTrade() {
  // 選取計算
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalCash, setTotalCash] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedCounts, setSelectedCounts] = useState(0);
  const handleSelectChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);

    const cashSum = selectedRows.reduce((sum, item) => {
      return sum + item.cash_value;
    }, 0);

    const pointSum = selectedRows.reduce((sum, item) => {
      return sum + item.point_value;
    }, 0);

    const counts = selectedRows.length;

    setTotalCash(cashSum);
    setTotalPoints(pointSum);
    setSelectedCounts(counts);
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

      <div className="z-100 container absolute left-0 right-0 top-16 mx-auto my-5 flex flex-col items-center justify-center">
        <div className="mb-3 flex w-1/3 justify-center">
          <p className="my-5 w-full border-b-4 border-b-main-600 pb-5 text-center text-4xl font-bold text-main-600">
            交易紙箱
          </p>
        </div>
        <div className="w-full rounded-xl bg-[#fafafa] p-5">
          <div className="w-1/3">
            <div className="mb-5 flex flex-1 items-center">
              <Label className="w-1/3 text-2xl font-bold text-main-600">
                交易時間
              </Label>
              <Label className="w-full text-2xl text-main-600">
                {new Date().toLocaleString()}
              </Label>
            </div>
            <div className="mb-5 flex flex-1 items-center">
              <Label className="w-1/3 text-2xl font-bold text-main-600">
                會員編號
              </Label>
              <Input className="w-full" type="text"></Input>
            </div>
          </div>
          <AdminTradeTable handleSelectChange={handleSelectChange} />
          <div className="flex w-full justify-end gap-5">
            <div className="flex-1"></div>
            <div className="flex-1"></div>
            <div className="flex flex-1 justify-center">
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
                <select className="text-xl" name="" id="">
                  <option value="cash">現金</option>
                  <option value="creditCard">信用卡</option>
                </select>
              </div>
            </div>
            <div className="flex flex-1 gap-3">
              <button className="btn w-1/2 text-xl" type="button">
                確認送出
              </button>
              <button className="btn w-1/2 text-xl" type="button">
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminTrade;
