import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, setSidebarState } from "../store/sidebarSlice";

export const useSidebarWithCookies = () => {
    const [cookies, setCookie] = useCookies(['sidebar_state']);
    const dispatch = useDispatch();
    const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);

    const openSidebarWithCookie = () => {
        dispatch(setSidebarState(true));
        setCookie('sidebar_state', 'true', { path: '/', maxAge: 31536000 });
    };

    const closeSidebarWithCookie = () => {
        dispatch(setSidebarState(false));
        setCookie('sidebar_state', 'false', { path: '/', maxAge: 31536000 });
    };

    const toggleSidebarWithCookie = () => {
        if (sidebarOpen === null) return; // Don't toggle if not initialized
        const newState = !sidebarOpen;
        dispatch(toggleSidebar());
        setCookie('sidebar_state', newState.toString(), { path: '/', maxAge: 31536000 });
    };

    return {
        sidebarOpen,
        openSidebar: openSidebarWithCookie,
        closeSidebar: closeSidebarWithCookie,
        toggleSidebar: toggleSidebarWithCookie,
    };
};
