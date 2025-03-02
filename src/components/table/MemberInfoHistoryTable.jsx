// 4-4 一般會員 - 歷史回收記錄列表
import DataTable from "react-data-table-component";
import { customStyles, paginationComponentOptions } from "@/data/constants";
import { useMemberTransactionRecords } from "@/hooks/useBoxTransactions";

// 假資料
const tempData = [
  {
    time: "2024-02-01 10:30",
    content: "回收 4 個紙箱",
    site: "台南圖書館",
    pointChange: "+50",
    totalPoints: "1050",
  },
  {
    time: "2024-02-02 15:45",
    content: "購買 1 個紙箱",
    site: "米米小吃店",
    pointChange: "+10",
    totalPoints: "1060",
  },
  {
    time: "2024-02-03 09:15",
    content: "回收 1 個紙箱",
    site: "葉子小舖",
    pointChange: "+100",
    totalPoints: "1160",
  },
  {
    time: "2024-02-04 14:20",
    content: "購買 1 個紙箱",
    site: "台南圖書館",
    pointChange: "-500",
    totalPoints: "660",
  },
  {
    time: "2024-02-05 11:45",
    content: "回收 2 個紙箱",
    site: "米米小吃店",
    pointChange: "+200",
    totalPoints: "860",
  },
  {
    time: "2024-02-01 10:30",
    content: "回收 4 個紙箱",
    site: "台南圖書館",
    pointChange: "+50",
    totalPoints: "1050",
  },
  {
    time: "2024-02-02 15:45",
    content: "購買 1 個紙箱",
    site: "米米小吃店",
    pointChange: "+10",
    totalPoints: "1060",
  },
  {
    time: "2024-02-03 09:15",
    content: "回收 1 個紙箱",
    site: "葉子小舖",
    pointChange: "+100",
    totalPoints: "1160",
  },
  {
    time: "2024-02-04 14:20",
    content: "購買 1 個紙箱",
    site: "台南圖書館",
    pointChange: "-500",
    totalPoints: "660",
  },
  {
    time: "2024-02-05 11:45",
    content: "回收 2 個紙箱",
    site: "米米小吃店",
    pointChange: "+200",
    totalPoints: "860",
  },
  {
    time: "2024-02-01 10:30",
    content: "回收 4 個紙箱",
    site: "台南圖書館",
    pointChange: "+50",
    totalPoints: "1050",
  },
  {
    time: "2024-02-02 15:45",
    content: "購買 1 個紙箱",
    site: "米米小吃店",
    pointChange: "+10",
    totalPoints: "1060",
  },
  {
    time: "2024-02-03 09:15",
    content: "回收 1 個紙箱",
    site: "葉子小舖",
    pointChange: "+100",
    totalPoints: "1160",
  },
  {
    time: "2024-02-04 14:20",
    content: "購買 1 個紙箱",
    site: "台南圖書館",
    pointChange: "-500",
    totalPoints: "660",
  },
  {
    time: "2024-02-05 11:45",
    content: "回收 2 個紙箱",
    site: "米米小吃店",
    pointChange: "+200",
    totalPoints: "860",
  },
  {
    time: "2024-02-01 10:30",
    content: "回收 4 個紙箱",
    site: "台南圖書館",
    pointChange: "+50",
    totalPoints: "1050",
  },
  {
    time: "2024-02-02 15:45",
    content: "購買 1 個紙箱",
    site: "米米小吃店",
    pointChange: "+10",
    totalPoints: "1060",
  },
  {
    time: "2024-02-03 09:15",
    content: "回收 1 個紙箱",
    site: "葉子小舖",
    pointChange: "+100",
    totalPoints: "1160",
  },
  {
    time: "2024-02-04 14:20",
    content: "購買 1 個紙箱",
    site: "台南圖書館",
    pointChange: "-500",
    totalPoints: "660",
  },
  {
    time: "2024-02-05 11:45",
    content: "回收 2 個紙箱",
    site: "米米小吃店",
    pointChange: "+200",
    totalPoints: "860",
  },
  {
    time: "2024-02-01 10:30",
    content: "回收 4 個紙箱",
    site: "台南圖書館",
    pointChange: "+50",
    totalPoints: "1050",
  },
  {
    time: "2024-02-02 15:45",
    content: "購買 1 個紙箱",
    site: "米米小吃店",
    pointChange: "+10",
    totalPoints: "1060",
  },
  {
    time: "2024-02-03 09:15",
    content: "回收 1 個紙箱",
    site: "葉子小舖",
    pointChange: "+100",
    totalPoints: "1160",
  },
  {
    time: "2024-02-04 14:20",
    content: "購買 1 個紙箱",
    site: "台南圖書館",
    pointChange: "-500",
    totalPoints: "660",
  },
  {
    time: "2024-02-05 11:45",
    content: "回收 2 個紙箱",
    site: "米米小吃店",
    pointChange: "+200",
    totalPoints: "860",
  },
];

const MemberInfoHistoryTable = () => {
  // 欄位
  const columns = [
    {
      name: "交易時間",
      selector: (row) => row.time,
    },
    {
      name: "交易形式",
      selector: (row) => row.content,
    },
    {
      name: "交易站點",
      selector: (row) => row.site,
    },
    {
      name: "紙箱大小",
      selector: (row) => row.site,
    },
    {
      name: "紙箱保存等級",
      selector: (row) => row.site,
    },
    {
      name: "換算積分",
      selector: (row) => row.pointChange,
      cell: (row) => (
        <span
          style={{
            color: row.pointChange.startsWith("+") ? "green" : "red",
          }}
        >
          {row.pointChange}
        </span>
      ),
    },
  ];
  const { records, isLoadingRecords, recordsError } =
    useMemberTransactionRecords("8b9acdef-b856-4c78-ac16-36d199737957");
  console.log(records);
  return (
    <DataTable
      columns={columns}
      data={tempData}
      pagination
      customStyles={customStyles}
      paginationComponentOptions={paginationComponentOptions}
    />
  );
};

export default MemberInfoHistoryTable;
