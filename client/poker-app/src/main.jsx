import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Table from './pages/Table.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/room1",
    element: <Table />
  },
  {
    path: "/room2",
    element: <Table />
  },
  {
    path: "/room3",
    element: <Table />
  },
  {
    path: "/room4",
    element: <Table />
  },
  {
    path: "/room5",
    element: <Table />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
