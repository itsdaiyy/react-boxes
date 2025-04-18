// Table 客製化樣式
export const customStyles = {
  table: {
    style: {
      border: "1px solid #d9d9d9",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      fontSize: "16px",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#F5F1E8",
      borderBottomColor: "#d9d9d9",
      fontWeight: "bold",
      fontSize: "14px",
      color: "#3d3d3d",
    },
  },
  rows: {
    style: {
      "&:hover": {
        backgroundColor: "#F3F3F3",
      },
    },
  },
  pagination: {
    style: {
      borderBottomLeftRadius: "8px",
      borderBottomRightRadius: "8px",
      backgroundColor: "#F5F1E8",
      border: "1px solid #d9d9d9",
      borderTop: "0px",
    },
  },
  subHeader: {
    style: {
      border: "1px solid #d9d9d9",
      borderBottom: "0px",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
      backgroundColor: "#F5F1E8",
      paddingTop: "24px",
    },
  },
};

// Table 客製化分頁元件
export const paginationComponentOptions = {
  rowsPerPageText: "每頁顯示筆數",
  rangeSeparatorText: "共",
  selectAllRowsItem: true,
  selectAllRowsItemText: "全部",
};

// StationInfo站點資訊頁Table樣式
// Table 客製化樣式
export const stationInfoStyles = {
  table: {
    style: {
      border: "1px solid #d9d9d9",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#F3F3F3",
      borderBottomColor: "#d9d9d9",
      fontWeight: "bold",
      color: "#3d3d3d",
    },
  },
  rows: {
    style: {
      "&:hover": {
        backgroundColor: "#F3F3F3",
      },
    },
  },
  pagination: {
    style: {
      borderBottomLeftRadius: "8px",
      borderBottomRightRadius: "8px",
      backgroundColor: "#F3F3F3",
      border: "1px solid #d9d9d9",
      borderTop: "0px",
    },
  },
  subHeader: {
    style: {
      border: "1px solid #d9d9d9",
      borderBottom: "0px",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
      backgroundColor: "#F5F1E8",
      paddingTop: "24px",
    },
  },
};
