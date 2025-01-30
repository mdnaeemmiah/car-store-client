import AccountDetails from "@/Dashboard/DPages/User/AccountDetails";
import OrderHistory from "@/Dashboard/DPages/User/OrderHistory";


export const userPaths=[
    {
        name: 'Dashboard ',
        path: 'dashboard',
        element: <OrderHistory></OrderHistory>
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