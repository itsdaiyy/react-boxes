import { createHashRouter, Navigate } from "react-router-dom";

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

export const route = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "map",
    element: <MapPage />,
    children: [
      {
        index: true,
        element: <Map />,
      },
      {
        path: ":stationId",
        element: <StationInfo />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "member",
        element: <Member />,
        children: [
          {
            index: true,
            element: <Navigate replace to="normal/memberInfo" />,
          },
          {
            path: "normal",
            children: [
              {
                index: true,
                element: <Navigate replace to="memberInfo" />,
              },
              {
                path: "memberInfo",
                element: <MemberInfo />,
              },
              {
                path: "pointsRecords",
                element: <MemberInfoPointTable />,
              },
              {
                path: "transactionRecords",
                element: <MemberInfoHistoryTable />,
              },
            ],
          },
          {
            element: <AdminProtectedRoute />,
            children: [
              {
                path: "admin",
                children: [
                  {
                    index: true,
                    element: <Navigate replace to="adminInfo" />,
                  },
                  {
                    path: "adminInfo",
                    element: <AdminInfo />,
                  },
                  {
                    path: "boxesTable",
                    element: <AdminBoxManageTable />,
                  },
                  {
                    path: "addBoxes",
                    element: <AdminAddBoxes />,
                  },
                  {
                    path: "tradeBoxes",
                    element: <AdminTrade />,
                  },
                  {
                    path: "recyclingTable",
                    element: <AdminDeprecatedTable />,
                  },
                  {
                    path: "adminTransactionRecords",
                    element: <AdminTradeHistoryTable />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "signin",
    element: <Signin />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "stationSignup",
    element: <StationSignup />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
