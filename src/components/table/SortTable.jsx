// 搜尋功能表格
import DataTable from 'react-data-table-component';

// 假資料
const tempData = [
  {
    time: "2024-02-01 10:30",
    content: "回收 4 個紙箱",
    site: "台南圖書館",
    pointChange: "+50",
    totalPoints: "1050"
  },
  {
    time: "2024-02-02 15:45", 
    content: "購買 1 個紙箱",
    site: "米米小吃店",
    pointChange: "+10",
    totalPoints: "1060"
  },
  {
    time: "2024-02-03 09:15",
    content: "回收 1 個紙箱",
    site: "葉子小舖", 
    pointChange: "+100",
    totalPoints: "1160"
  },
  {
    time: "2024-02-04 14:20",
    content: "購買 1 個紙箱",
    site: "台南圖書館",
    pointChange: "-500",
    totalPoints: "660"
  },
  {
    time: "2024-02-05 11:45",
    content: "回收 2 個紙箱",
    site: "米米小吃店",
    pointChange: "+200",
    totalPoints: "860"
  },
  {
    time: "2024-02-01 10:30",
    content: "回收 4 個紙箱",
    site: "台南圖書館",
    pointChange: "+50",
    totalPoints: "1050"
  },
  {
    time: "2024-02-02 15:45", 
    content: "購買 1 個紙箱",
    site: "米米小吃店",
    pointChange: "+10",
    totalPoints: "1060"
  },
  {
    time: "2024-02-03 09:15",
    content: "回收 1 個紙箱",
    site: "葉子小舖", 
    pointChange: "+100",
    totalPoints: "1160"
  },
  {
    time: "2024-02-04 14:20",
    content: "購買 1 個紙箱",
    site: "台南圖書館",
    pointChange: "-500",
    totalPoints: "660"
  },
  {
    time: "2024-02-05 11:45",
    content: "回收 2 個紙箱",
    site: "米米小吃店",
    pointChange: "+200",
    totalPoints: "860"
  },
  {
    time: "2024-02-01 10:30",
    content: "回收 4 個紙箱",
    site: "台南圖書館",
    pointChange: "+50",
    totalPoints: "1050"
  },
  {
    time: "2024-02-02 15:45", 
    content: "購買 1 個紙箱",
    site: "米米小吃店",
    pointChange: "+10",
    totalPoints: "1060"
  },
  {
    time: "2024-02-03 09:15",
    content: "回收 1 個紙箱",
    site: "葉子小舖", 
    pointChange: "+100",
    totalPoints: "1160"
  },
  {
    time: "2024-02-04 14:20",
    content: "購買 1 個紙箱",
    site: "台南圖書館",
    pointChange: "-500",
    totalPoints: "660"
  },
  {
    time: "2024-02-05 11:45",
    content: "回收 2 個紙箱",
    site: "米米小吃店",
    pointChange: "+200",
    totalPoints: "860"
  },
  {
    time: "2024-02-01 10:30",
    content: "回收 4 個紙箱",
    site: "台南圖書館",
    pointChange: "+50",
    totalPoints: "1050"
  },
  {
    time: "2024-02-02 15:45", 
    content: "購買 1 個紙箱",
    site: "米米小吃店",
    pointChange: "+10",
    totalPoints: "1060"
  },
  {
    time: "2024-02-03 09:15",
    content: "回收 1 個紙箱",
    site: "葉子小舖", 
    pointChange: "+100",
    totalPoints: "1160"
  },
  {
    time: "2024-02-04 14:20",
    content: "購買 1 個紙箱",
    site: "台南圖書館",
    pointChange: "-500",
    totalPoints: "660"
  },
  {
    time: "2024-02-05 11:45",
    content: "回收 2 個紙箱",
    site: "米米小吃店",
    pointChange: "+200",
    totalPoints: "860"
  },
  {
    time: "2024-02-01 10:30",
    content: "回收 4 個紙箱",
    site: "台南圖書館",
    pointChange: "+50",
    totalPoints: "1050"
  },
  {
    time: "2024-02-02 15:45", 
    content: "購買 1 個紙箱",
    site: "米米小吃店",
    pointChange: "+10",
    totalPoints: "1060"
  },
  {
    time: "2024-02-03 09:15",
    content: "回收 1 個紙箱",
    site: "葉子小舖", 
    pointChange: "+100",
    totalPoints: "1160"
  },
  {
    time: "2024-02-04 14:20",
    content: "購買 1 個紙箱",
    site: "台南圖書館",
    pointChange: "-500",
    totalPoints: "660"
  },
  {
    time: "2024-02-05 11:45",
    content: "回收 2 個紙箱",
    site: "米米小吃店",
    pointChange: "+200",
    totalPoints: "860"
  },
  
];

// 表格內客製化樣式 (或建立style.css覆蓋樣式)
const customStyles = {
  table: {
    style: {
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
  },
  headRow: {
    style: {
      backgroundColor: '#f3f4f6',
      borderBottomColor: '#e5e7eb',
      fontWeight: 'bold',
    },
  },
  rows: {
    style: {
      '&:hover': {
        backgroundColor: '#f9fafb',
      },
    },
  },
  pagination: {
    style: {
      backgroundColor: '#f3f4f6',
      borderTopColor: '#e5e7eb',
    },
  },
};

// 客製化分頁元件
const paginationComponentOptions = {
  rowsPerPageText: '每頁顯示筆數',
  rangeSeparatorText: '共',
  selectAllRowsItem: true,
  selectAllRowsItemText: '全部',
};

const SortTable = () => {
  // 欄位
  const columns = [
    {
      name: '交易時間',
      selector: row => row.time,
      sortable: true,
    },
    {
      name: '交易內容',
      selector: row => row.content,
      sortable: true,
    },
    {
      name: '交易站點',
      selector: row => row.site,
      sortable: true,
    },
    {
      name: '積分變化',
      selector: row => row.pointChange,
      cell: row => (
        <span style={{ 
          color: row.pointChange.startsWith('+') ? 'green' : 'red' 
        }}>
          {row.pointChange}
        </span>
      ),
    },
    {
      name: '積分總計',
      selector: row => row.totalPoints,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={tempData}
      pagination
      title="積分紀錄"
      customStyles={customStyles}
      paginationComponentOptions={paginationComponentOptions}
    />
  );
};

export default SortTable;