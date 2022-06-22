import {NavLink} from "react-router-dom";

const SidebarLink = ({link}) => {
    const {name, route} = link;
    return <>
        <NavLink to={route} className="w-full py-6 px-10 inline-flex space-x-3 hover:bg-gray-200">
                {<link.icon/>}
                <p>{name}</p>
        </NavLink>
    </>
}

export default SidebarLink;