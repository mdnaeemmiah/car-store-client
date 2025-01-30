import AccountDetails from "@/Dashboard/DPages/User/AccountDetails";
import OrderHistory from "@/Dashboard/DPages/User/OrderHistory";
import UDashboard from "@/Dashboard/DPages/User/UDashboard";


export const userPaths=[
    {
        name: 'Dashboard ',
        path: 'dashboard',
        element: <UDashboard></UDashboard>
    },
    {
        name: 'Order History ',
        path: 'order-history',
        element: <OrderHistory></OrderHistory>
    },
    {
        name: 'Account Details.',
        path: 'account-details',
        element: <AccountDetails></AccountDetails>
    },
    
]