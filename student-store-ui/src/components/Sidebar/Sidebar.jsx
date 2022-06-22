import SidebarLink from "./SidebarLink";
import {HomeIcon} from "../../icons/Home";
import {ShopIcon} from "../../icons/ShopIcon";
import {DollarIcon} from "../../icons/DollarIcon";

const links = [
    {
        id: 1,
        name: "Home",
        route: "/",
        icon: HomeIcon
    },
    {
        id: 2,
        name: "All products",
        route: "/products",
        icon: ShopIcon
    },
    {
        id: 3,
        name: "Payment",
        route: "/payment",
        icon: DollarIcon
    }
];

const Sidebar = () => {
    return <div className="w-1/6 min-h-screen bg-slate-100 flex flex-col">
        <div className="h-[15%] grid items-center text-center">
            <a href="/" title="Student Store">
                <div className="flex flex-col">
                    <h1 className="text-5xl">🛒</h1>
                    <p className="text-3xl tracking-tighter font-black text-gray-800">Student Store</p>
                </div>
            </a>
        </div>
        <hr className="mx-10"/>
        <div className="h-[78%] flex flex-col space-y-4 py-10">
            {links.map((link, idx) =>
                <SidebarLink link={link} key={idx}/>
            )}
        </div>
        <div className="h-[7%] text-center grid items-center text-gray-500">
            <p className="text-xs">CodePath Week 2 Project <br/>By <a href="https://github.com/iangarciag29/"
                                                                      target="_blank" rel="noreferrer"
                                                                      className="font-bold hover:text-gray-700">Ian
                Garcia</a>.
            </p>
        </div>
    </div>
}

export default Sidebar;