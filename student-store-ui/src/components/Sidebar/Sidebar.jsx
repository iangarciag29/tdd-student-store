import SidebarLink from "./SidebarLink";
import {HomeIcon} from "../../icons/Home";
import {ShopIcon} from "../../icons/ShopIcon";
import {DollarIcon} from "../../icons/DollarIcon";
import {Alert, Tooltip} from "flowbite-react";
import {InformationIcon} from "../../icons/InformationIcon";
import useAppError from "../../hooks/useAppError";
import {CardIcon} from "../../icons/CardIcon";

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
    }, {
        id: 3,
        name: "Orders",
        route: "/orders",
        icon: CardIcon
    },
    {
        id: 4,
        name: "Checkout",
        route: "/payment",
        icon: DollarIcon
    }
];

const Sidebar = () => {

    const {errors, removeError} = useAppError();

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
        <div className="h-[40%] flex flex-col space-y-4 py-10">
            {links.map((link, idx) =>
                <SidebarLink link={link} key={idx}/>
            )}
        </div>
        <div className="h-[38%] flex flex-col space-y-5 overflow-y-auto px-2">
            {errors?.map(error => <Alert
                    color="failure"
                    key={error.id}
                    icon={InformationIcon}
                    onDismiss={() => removeError(error.id)}
                >
                      <span>
                    <span className="font-medium ml-2 inline-flex text-xs">
                        <Tooltip content={<div className="flex flex-col text-xs space-y-2">
                            <span><b>[DEBUG] </b>{`${error.code}`}</span>
                            <span><b>[DEBUG] </b>{`${error.id}`}</span>
                            <span><b>[DATE] </b>{`${error.date.toLocaleString()}`}</span>
                        </div>}>
                          ERROR {error.status} {error.fatal ? <span className="font-black text-xs">[FATAL]</span> : ""}
                        </Tooltip>
                        <p className="text-xs ml-2">{error.message}</p>
                    </span>
                  </span>
                </Alert>
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