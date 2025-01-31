

import OrderHistory from "@/Dashboard/DPages/User/OrderHistory";
import UDashboard from "@/Dashboard/DPages/User/UDashboard";


export const userPaths=[
    {
        name: 'Account Details ',
        path: 'dashboard',
        element: <UDashboard></UDashboard>
    },
    {
        name: 'Order History ',
        path: 'order-history',
        element: <OrderHistory></OrderHistory>
    },
]