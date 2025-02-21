// 5-7 回收站點管理者後台 - 售出紙箱流程

import AdminTradeTable from "./table/AdminTradeTable";

function AdminTrade() {
  return (
    <div className="container flex flex-col items-center">
      <div>
        <p>交易紙箱</p>
      </div>
      <div>
        <div className="flex">
          <p className="mr-3">交易時間</p>
          <p>2024/11/28 15:32</p>
        </div>
        <div className="flex">
          <p className="mr-3">會員編號</p>
          <input className="border" type="number" />
        </div>
        <AdminTradeTable />
      </div>
    </div>
  );
}

export default AdminTrade;
