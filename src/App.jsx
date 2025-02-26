import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import Map from "./components/Map";
import MapPage from "./pages/MapPage";
import StationInfo from "./pages/StationInfo";
import Member from "./pages/Member";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import MemberInfo from "./components/MemberInfo";

import AdminInfo from "./components/AdminInfo";
import AdminBoxManageTable from "./components/table/AdminBoxManageTable";
import AdminDeprecatedTable from "./components/table/AdminDeprecatedTable";
import AdminTradeHistoryTable from "./components/table/AdminTradeHistoryTable";
import MemberInfoHistoryTable from "./components/table/MemberInfoHistoryTable";
import MemberInfoPointTable from "./components/table/MemberInfoPointTable";
import AdminTrade from "./components/AdminTrade";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="map" element={<MapPage />}>
            <Route index element={<Map />} />
            <Route path=":stationId" element={<StationInfo />} />
          </Route>
          <Route path="member" element={<Member />}>
            <Route
              index
              element={<Navigate replace to="normal/memberInfo" />}
            />
            <Route path="normal">
              <Route index element={<Navigate replace to="memberInfo" />} />
              <Route path="memberInfo" element={<MemberInfo />} />
              <Route path="pointsRecords" element={<MemberInfoPointTable />} />
              <Route
                path="transactionRecords"
                element={<MemberInfoHistoryTable />}
              />
            </Route>
            <Route path="admin">
              <Route index element={<Navigate replace to="adminInfo" />} />
              <Route path="adminInfo" element={<AdminInfo />} />
              <Route path="boxesTable" element={<AdminBoxManageTable />} />
              <Route path="recyclingTable" element={<AdminDeprecatedTable />} />
              <Route
                path="adminTransactionRecords"
                element={<AdminTradeHistoryTable />}
              />
            </Route>
          </Route>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />

          {/* 測試用 */}
          <Route path="adminTrade" element={<AdminTrade />} />
        </Routes>
      </HashRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
