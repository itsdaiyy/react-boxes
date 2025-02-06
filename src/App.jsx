import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import HomePage from "./pages/HomePage";
import Map from "./pages/Map";
import Member from "./pages/Member";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import MemberInfo from "./components/MemberInfo";
import PointRecords from "./components/PointRecords";
import TransactionRecords from "./components/TransactionRecords";
import AdmitInfo from "./components/AdmitInfo";
import BoxesTable from "./components/BoxesTable";
import RecyclingTable from "./components/RecyclingTable";
import AdmitTransactionRecords from "./components/AdmitTransactionRecords";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="map" element={<Map />} />
          <Route path="member" element={<Member />}>
            <Route path="memberInfo" element={<MemberInfo />} />
            <Route path="pointsRecords" element={<PointRecords />} />
            <Route path="transactionRecords" element={<TransactionRecords />} />
            <Route path="admitInfo" element={<AdmitInfo />} />
            <Route path="boxesTable" element={<BoxesTable />} />
            <Route path="recyclingTable" element={<RecyclingTable />} />
            <Route
              path="admitTransactionRecords"
              element={<AdmitTransactionRecords />}
            />
          </Route>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
