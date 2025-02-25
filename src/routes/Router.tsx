import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Community from "../pages/community/Community";
import CommunityDetail from "../pages/community/CommunityDetail";
import CommunityEditor from "../pages/community/CommunityEditor";
import Informations from "../pages/informations/Informations";
import MapSearch from "../pages/mapsearch/MapSearch";
import RootLayout from "../layouts/RootLayout";
import InfoCardDetail from "../pages/informations/InfoCardDetail";
import MyPage from "../pages/user/MyPage";
import UserPage from "../pages/user/UserPage";
import OAuthCallback from "../pages/auth/OAuthCallback";
import ProfileEdit from "../pages/user/ProfileEdit";

const Router = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/detail" element={<CommunityDetail />} />
        <Route path="/community/editor" element={<CommunityEditor />} />
        <Route path="/informations" element={<Informations />} />
        <Route path="/mapsearch" element={<MapSearch />} />
        <Route path="/infocarddetail" element={<InfoCardDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/edit" element={<ProfileEdit />} />
        <Route path="/userpage/:id" element={<UserPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
