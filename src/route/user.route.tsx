import AccountDetails from "@/Dashboard/DPages/User/AccountDetails";
import OrderHistory from "@/Dashboard/DPages/User/OrderHistory";


export const userPaths=[
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