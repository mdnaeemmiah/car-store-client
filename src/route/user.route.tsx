
import UDashboard from "@/Dashboard/DPages/User/UDashboard";
import OrderDetails from "@/pages/OrderDetails";


export const userPaths=[
    {
        name: 'Account Details ',
        path: 'dashboard',
        element: <UDashboard></UDashboard>
    },
    {
        name: 'Order History ',
        path: 'order',
        element: <OrderDetails></OrderDetails>
    },
    // {
    //     name: 'Track My Order',
    //     path: 'order/verify',
    //     element: <OrderVerification></OrderVerification>
    // },
]