
import App from '@/App';
import Dashboard from '@/Dashboard/Dashboard';
import AboutUs from '@/pages/home/AboutUs';
import AllProduct from '@/pages/home/AllProduct';
import Contact from '@/pages/home/Contact';
import Home from '@/pages/home/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { createBrowserRouter } from 'react-router-dom';


const router = createBrowserRouter([
   {
      path:'/',
      element:<App></App>,
      children:[
         {
            path:'home',
            element:<Home></Home>
          },
         {
            path:'product',
            element:<AllProduct></AllProduct>
          },
         {
            path:'about',
            element:<AboutUs></AboutUs>
          },
         {
            path:'contact',
            element:<Contact></Contact>
          },
      ]
   },
   {
    path:'/login',
    element:<Login></Login>
   },
   {
    path:'/login',
    element:<Login></Login>
   },
   {
    path:'/register',
    element:<Register></Register>
   },
   {
      path:'/dashboard',
      element:<Dashboard></Dashboard>
   }
])

export default router;