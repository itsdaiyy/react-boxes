import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import Map from "./features/map/Map";
import MapPage from "./pages/MapPage";
import StationInfo from "./pages/StationInfo";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import StationSignup from "./pages/StationSignup";
import PageNotFound from "./pages/PageNotFound";

import Member from "./pages/Member";
import MemberInfo from "./features/member/MemberInfo";
import MemberInfoHistoryTable from "./features/transactions/MemberInfoHistoryTable";
import MemberInfoPointTable from "./features/transactions/MemberInfoPointTable";
import ProtectedRoute from "./features/authentication/ProtectedRoute";

import AdminInfo from "./features/admin/AdminInfo";
import AdminBoxManageTable from "./features/boxes/AdminBoxManageTable";
import AdminDeprecatedTable from "./features/boxes/AdminDeprecatedTable";
import AdminTradeHistoryTable from "./features/transactions/AdminTradeHistoryTable";
import AdminTrade from "./features/boxes/AdminTrade";
import AdminAddBoxes from "./features/boxes/AdminAddBoxes";
import AdminProtectedRoute from "./features/authentication/AdminProtectedRoute";

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
          <Route element={<ProtectedRoute />}>
            <Route path="member" element={<Member />}>
              <Route
                index
                element={<Navigate replace to="normal/memberInfo" />}
              />
              <Route path="normal">
                <Route index element={<Navigate replace to="memberInfo" />} />
                <Route path="memberInfo" element={<MemberInfo />} />
                <Route
                  path="pointsRecords"
                  element={<MemberInfoPointTable />}
                />
                <Route
                  path="transactionRecords"
                  element={<MemberInfoHistoryTable />}
                />
              </Route>
              <Route element={<AdminProtectedRoute />}>
                <Route path="admin">
                  <Route index element={<Navigate replace to="adminInfo" />} />
                  <Route path="adminInfo" element={<AdminInfo />} />
                  <Route path="boxesTable" element={<AdminBoxManageTable />} />
                  <Route path="addBoxes" element={<AdminAddBoxes />} />
                  <Route path="tradeBoxes" element={<AdminTrade />} />
                  <Route
                    path="recyclingTable"
                    element={<AdminDeprecatedTable />}
                  />
                  <Route
                    path="adminTransactionRecords"
                    element={<AdminTradeHistoryTable />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="stationSignup" element={<StationSignup />} />
          <Route path="*" element={<PageNotFound />} />
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
