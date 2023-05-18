import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import InsideRoom from './components/InsideRoom.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/room1",
    element: <InsideRoom />
  },
  {
    path: "/room2",
    element: <InsideRoom />
  },
  {
    path: "/room3",
    element: <InsideRoom />
  },
  {
    path: "/room4",
    element: <InsideRoom />
  },
  {
    path: "/room5",
    element: <InsideRoom />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
