import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Carousels from "./shared/Carousels";


const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Carousels></Carousels>
            <Outlet />
        </div>
    );
};

export default MainLayout;