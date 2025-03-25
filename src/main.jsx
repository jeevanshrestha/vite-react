import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store'
import {  RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import {Protected} from './components/UI'
import { AddBlog, AllBlogs, EditPost, Login, Post, Home, Signup , ErrorPage} from './pages'
 
 
const router = createBrowserRouter([{

    path:'/',
    element:<App />,
    children: [
        {
          path: '/',
          element: <Home />,
          errorElement: <ErrorPage />

        },
        {
          path:'/login',
          element:<Protected authentication={false}><Login /></Protected>,
          errorElement: <ErrorPage />
        },
        {
          path:'/signup',
          element:<Protected authentication={false}><Signup /></Protected>,
          errorElement: <ErrorPage />
        },
        {
          path:'/create-post',
          element:<Protected authentication={true}><AddBlog /></Protected>,
          errorElement: <ErrorPage />
        },
        {path:'/edit-post/:slug',
        element:<Protected authentication={true}><EditPost /></Protected>,
        errorElement: <ErrorPage />
        },
        { path:'/post/:slug',
        element:<Protected authentication={false}><Post /></Protected>
        },
        { path:'/all-posts',
        element:<Protected authentication={false}><AllBlogs /></Protected>
        } 
      ]
}]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      
          <App />
      
  </RouterProvider>
 </Provider>
)
