import { useBoxesTotalForSelling } from "@/hooks/useBoxes";

import AdminInfoForm from "./form/AdminInfoForm";
import AdminRecyclingBoxForm from "./form/AdminRecyclingBoxForm";
import AdminTradeHistoryTable from "./table/AdminTradeHistoryTable";
import SellingBoxesCard from "./card/SellingBoxesCard";
import shop from "@/assets/shop.png";
import Spinner from "./Spinner";
import { useStationAdmin } from "@/hooks/useStationAdmin";

const totalBoxes = function (boxes) {
  let small = 0;
  let medium = 0;
  let large = 0;
  let extraLarge = 0;
  if (boxes.length === 0) return { small, medium, large, extraLarge };
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].size === "小") small++;
    if (boxes[i].size === "中") medium++;
    if (boxes[i].size === "大") large++;
    if (boxes[i].size === "特大") extraLarge++;
  }
  return { small, medium, large, extraLarge };
};

function AdminInfo() {
  const { station, isLoadingStation } = useStationAdmin();
  const { boxes, isLoadingBoxes } = useBoxesTotalForSelling(10);
  if (isLoadingStation) return <Spinner />;
  if (isLoadingBoxes) return <Spinner />;
  const result = totalBoxes(boxes);

  return (
    <>
      <div className="bg-main-100 px-3 py-10 sm:rounded-3xl sm:px-10">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="rounded-2xl bg-white p-4 md:w-1/2 lg:p-10">
            <AdminInfoForm station={station} />
          </div>
          <div className="flex flex-col justify-between md:w-1/2">
            <div className="space-y-6">
              <div className="rounded-[8px] bg-white p-4">
                <AdminRecyclingBoxForm station={station} />
              </div>
              <div className="rounded-[8px] bg-white p-4">
                <div className="mb-2 rounded-md bg-second-100 py-1">
                  <p className="fs-6 text-center text-second-400">可認領紙箱</p>
                </div>
                <div className="flex gap-2">
                  <SellingBoxesCard size="小" count={result.small} />
                  <SellingBoxesCard size="中" count={result.medium} />
                  <SellingBoxesCard size="大" count={result.large} />
                  <SellingBoxesCard size="特大" count={result.extraLarge} />
                </div>
              </div>
            </div>
            <div className="ml-auto flex w-[350px]">
              <img src={shop} alt="shop" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <AdminTradeHistoryTable />
      </div>
    </>
  );
}
export default AdminInfo;
