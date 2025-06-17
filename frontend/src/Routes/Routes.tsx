import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import CompanyPage from "../pages/CompanyPage/CompanyPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import CompanyProfile from "../components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../components/IncomeStatement/IncomeStatement";
import DesignPage from "../pages/DesignPage/DesignPage";
import BalanceSheet from "../components/BalanceSheet/BalanceSheet";
import CashflowStatement from "../components/CashflowStatement/CashflowStatement";
import Login from "../pages/LoginPage/Login";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Register from "../pages/RegisterPage/Register";
import ProtectRoute from "./ProtectRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/search",
        element: (
          <ProtectRoute>
            <SearchPage />
          </ProtectRoute>
        ),
      },
      { path: "/design-guide", element: <DesignPage /> },
      {
        path: "/company/:ticker",
        element: (
          <ProtectRoute>
            <CompanyPage />
          </ProtectRoute>
        ),
        children: [
          { path: "company-profile", element: <CompanyProfile /> },
          { path: "income-statement", element: <IncomeStatement /> },
          { path: "balance-sheet", element: <BalanceSheet /> },
          { path: "cashflow-statement", element: <CashflowStatement /> },
        ],
      },
    ],
  },
  { path: "*", element: <ErrorPage /> },
]);
