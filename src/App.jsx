import { useState, StrictMode } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  BrowserRouter
} from 'react-router-dom';
import LoginPage from './Login';
import MainPage from './Pages/Main';
import WorkPage from './Pages/Roles';
import ChatPage from './Pages/Chat';
import VerifyViolatePage from './Pages/VerifyViolate';
import ViolatePage from './Pages/Violate';
import NotFound from './404';
import SupportPage from './utilities/support';
import FAQPage from './utilities/faq';
import StudentCRUD from './Pages/StudentCRUD';
import CriteriaAchievementPage from './Pages/CriteriaCRUD';
import RolesPage from './Pages/Roles';
import UserProfilePage from './account/Profile';
import DisciplineIntroPage from './utilities/Info';
import StatisticsPage from './Pages/Statistics';
import ViolateCRUDPage from './Pages/ViolateCRUD';
import AchievementPage from './Pages/Achievement';
import GradeClassPage from './Pages/GradeClass';
import ImportExcel from './Pages/ImportPage';
import LoadingPopUp from './ui/Loading';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Dashboard/Main" replace />} />
          <Route path="/Login"
            element={<LoginPage />} />
          <Route path="/Dashboard/Main"
            element={<MainPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/DashBoard/Statistics"
            element={<StatisticsPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/Category/Class"
            element={<GradeClassPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/Category/Roles"
            element={<RolesPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/Category/Violate"
            element={<ViolateCRUDPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/Pages/Chat"
            element={<ChatPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/Pages/Violate"
            element={<ViolatePage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/Pages/Achievement"
            element={<AchievementPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/Pages/VerifyViolate"
            element={<VerifyViolatePage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/Utilities/Support"
            element={<SupportPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/Utilities/FAQ"
            element={<FAQPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/Category/StudentCRUD"
            element={<StudentCRUD isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/import"
            element={<ImportExcel isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/Category/Criteria"
            element={<CriteriaAchievementPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/Account/Profile"
            element={<UserProfilePage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/Utilities/About"
            element={<DisciplineIntroPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />

          <Route path="*"
            element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
