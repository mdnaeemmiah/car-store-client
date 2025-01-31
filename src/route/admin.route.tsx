
import AdminDashboard from "@/Dashboard/DPages/Admin/AdminDashboard";
import AllCar from "@/Dashboard/DPages/Admin/ManageOrders/AllCar";
import AllOrder from "@/Dashboard/DPages/Admin/ManageOrders/AllOrder";
import CreateCar from "@/Dashboard/DPages/Admin/ManageOrders/CreateCar";
import UserManagement from "@/Dashboard/DPages/Admin/ManageOrders/UserManagement";


export const adminPaths=[
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <AdminDashboard></AdminDashboard>
    },
    {
        name: 'Create Car',
        path: 'crete-car',
        element: <CreateCar></CreateCar>
    },
    {
        name: 'All Car',
        path: 'all-car',
        element: <AllCar></AllCar>
    },
    {
        name: 'All Order',
        path: 'all-order',
        element: <AllOrder></AllOrder>
    },
    {
        name: 'User Management',
        path: 'user',
        element: <UserManagement></UserManagement>
    },
 
]