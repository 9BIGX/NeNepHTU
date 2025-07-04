import React, { useState, StrictMode } from 'react';
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainPage from './Pages/Main';
import WorkPage from './Pages/Work';
import ChatPage from './Pages/Chat';
import NotFound from './404';
import './App.css';
import Footer from './components/Footer';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />,
    },
    {
      path: "/Work",
      element: <WorkPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />,
    },
    {
      path: "/Chat",
      element: <ChatPage isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />,
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