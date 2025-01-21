# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# 開發日誌

### 0121 環境初始化
#### Tailwind
1. 修改 tailwind.config.js：新增顏色（primary & secondary color）、調整預設 font-family、修改 screen (breakpoints)
2. 修改 index.css：修改預設 h1 - h7 字體樣式、新增 .fs-1 - .fs-7 字體樣式 class

#### 整體架構
1. 新增pages、共用components
2. 安裝套件：
   前端：leaflet、react-leaflet、react-data-table-component、react-icons
   後端：@supabase/supabase-js
   開發階段：gh-pages、tailwindcss、postcss、autoprefixer、prettier、prettier-plugin-tailwindcss（自動排序 tailwind classname）
