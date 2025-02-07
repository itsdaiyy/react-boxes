import { useState } from 'react';
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

const AdminTradeTable = () => {
  // 欄位
  const columns = [
    {
      name: '新增時間',
      selector: row => row.time,
      sortable: true,
    },
    {
      name: '紙箱編號',
      selector: row => row.content,
      sortable: true,
    },
    {
      name: '紙箱大小',
      selector: row => row.site,
      sortable: true,
    },
    {
      name: '紙箱保存等級',
      selector: row => row.totalPoints,
      sortable: true,
    },
    {
      name: '保留天數',
      selector: row => row.totalPoints,
      sortable: true,
    },
    {
      name: '保留到期日',
      selector: row => row.totalPoints,
      sortable: true,
    },
    {
      name: '狀態',
      selector: row => row.totalPoints,
      sortable: true,
    },
    {
      name: '現金',
      selector: row => row.totalPoints,
      sortable: true,
    },
    {
      name: '積分',
      selector: row => row.totalPoints,
      sortable: true,
    },
  ];

  // 篩選搜尋資料
  const [filterText, setFilterText] = useState('');

  // const filteredData = pointsData.filter(
  //   item => Object.values(item).some(
  //     val => val.toString().toLowerCase().includes(filterText.toLowerCase())
  //   )
  // );

  return (
    <DataTable
      columns={columns}
      data={tempData}
      customStyles={customStyles}
      selectableRows
      subHeader
      subHeaderComponent={
        <div className='flex justify-between w-full'>
          <input
            type="text"
            placeholder="搜尋紙箱編號"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="p-2 border rounded "
          />
        </div>
      }
    />
  );
};

export default AdminTradeTable;