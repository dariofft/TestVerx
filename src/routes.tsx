import { FC, ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NotFound } from "./pages/NotFound";
import { Dashboard } from "./pages/Dashboard";
import { FarmerList } from "./pages/Farmer/List";
import { FarmerManage } from "./pages/Farmer/Manage";
import { Menu } from "./components/Menu";

const RouterWithMenu: FC<{ page: ReactNode }> = ({ page }) => (
  <>
    <Menu />
    {page}
  </>
);

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RouterWithMenu page={<Dashboard />} />} />
      <Route
        path="/farmers"
        element={<RouterWithMenu page={<FarmerList />} />}
      />
      <Route
        path="/farmers/new"
        element={<RouterWithMenu page={<FarmerManage />} />}
      />
      <Route
        path="/farmers/edit/:id"
        element={<RouterWithMenu page={<FarmerManage />} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
