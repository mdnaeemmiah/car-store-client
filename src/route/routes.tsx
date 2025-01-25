
import App from '@/App';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { createBrowserRouter } from 'react-router-dom';


const router = createBrowserRouter([
   {
      path:'/',
      element:<App></App>
   },
   {
    path:'/login',
    element:<Login></Login>
   },
   {
    path:'/register',
    element:<Register></Register>
   },
])

export default router;