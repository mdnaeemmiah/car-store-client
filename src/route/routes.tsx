
import App from '@/App';
import Dashboard from '@/Dashboard/Dashboard';
import AboutUs from '@/pages/home/AboutUs';
import AllProduct from '@/pages/home/AllProduct';
import Contact from '@/pages/home/Contact';
import Home from '@/pages/home/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { routeGenerator } from '@/utils/routeGenerator';
import { createBrowserRouter } from 'react-router-dom';
import { adminPaths } from './admin.route';
import { userPaths } from './user.route';


const router = createBrowserRouter([
   {
      path:'/',
      element:<App></App>,
      children:[
         {
            path:'',
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
      path: '/admin',
      element: <Dashboard />,
      children: routeGenerator(adminPaths),
   },
   {
      path: '/user',
      element: <Dashboard />,
      children: routeGenerator(userPaths),
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