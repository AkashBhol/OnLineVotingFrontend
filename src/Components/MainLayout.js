import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

const MainLayout = () => {

    // const path = window.location.pathname;
    // const showSideBar = path !== "/signIn" && path !== "/" ;

    return (
        <div className="main-layout">
            <MainContent />
           <Sidebar />
        </div>
    )
}
export default MainLayout;