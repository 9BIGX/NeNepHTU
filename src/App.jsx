import { useState, StrictMode } from 'react';
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import MainPage from './Pages/Main';
import WorkPage from './Pages/Roles';
import ChatPage from './Pages/Chat';
import VerifyViolatePage from './Pages/VerifyViolate';
import ViolatePage from './Pages/Violate';
import NotFound from './404';
import SupportPage from './utilities/support';
import FAQPage from './utilities/faq';
import StudentCRUD from './Pages/StudentCRUD';
import RolesPage from './Pages/Roles';
import UserProfilePage from './account/Profile';
import DisciplineIntroPage from './utilities/Info';
import './App.css';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const router = createBrowserRouter([
    {
      path: "/NeNepHTU/Dashboard/Main",
      element: <MainPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />,
    },
    {
      path: "/NeNepHTU/Category/Roles",
      element: <RolesPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />,
    },
    {
      path: "/NeNepHTU/Pages/Chat",
      element: <ChatPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />,
    },
    {
      path: "/NeNepHTU/Pages/Violate",
      element: <ViolatePage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />,
    },
    {
      path: "/NeNepHTU/Pages/VerifyViolate",
      element: <VerifyViolatePage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />,
    },
    {
      path: "/NeNepHTU/Utilities/Support",
      element: <SupportPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />,
    },
    {
      path: "/NeNepHTU/Utilities/FAQ",
      element: <FAQPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />,
    },
    {
      path: "/NeNepHTU/Category/StudentCRUD",
      element: <StudentCRUD isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />,
    },
    {
      path: "/NeNepHTU/Account/Profile",
      element: <UserProfilePage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />,
    },
    {
      path: "/NeNepHTU/Utilities/About",
      element: <DisciplineIntroPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />,
    },
    {
      path: "*",
      element: <NotFound />,
    }
  ]);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

export default App;