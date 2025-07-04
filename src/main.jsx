import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState } from 'react';
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import Footer from './components/Footer';
import NotFound from './404.jsx';
import MainPage from './Pages/Main.jsx';


createRoot(document.getElementById('root')).render(
  <App />
)
