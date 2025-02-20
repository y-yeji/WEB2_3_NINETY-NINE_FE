import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Community from "../pages/community/Community";
import CommunityDetail from "../pages/community/CommunityDetail";
import CommunityEditor from "../pages/community/CommunityEditor";
import Exhibition from "../pages/informations/Exhibition";
import Festival from "../pages/informations/Festival";
import Musical from "../pages/informations/Musical";
import PopupStore from "../pages/informations/PopupStore";
import MapSearch from "../pages/mapsearch/MapSearch";
import RootLayout from "../layouts/RootLayout";
import InfoCardDetail from "../pages/informations/InfoCardDetail";

const Router = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/detail" element={<CommunityDetail />} />
        <Route path="/community/editor" element={<CommunityEditor />} />
        <Route path="/exhibition" element={<Exhibition />} />
        <Route path="/festival" element={<Festival />} />
        <Route path="/musical" element={<Musical />} />
        <Route path="/popupstore" element={<PopupStore />} />
        <Route path="/mapsearch" element={<MapSearch />} />
        <Route path="/infocarddetail" element={<InfoCardDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
