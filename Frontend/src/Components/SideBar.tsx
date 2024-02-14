import {Link} from "react-router-dom";

export function SideBar(){
    return(
        <nav className="sticky top-0 px-2 py-4">
            <ul>
                <li>
                    <Link to={`/profile`}>
                        profile
                    </Link>
                </li>
            </ul>
        </nav>
    )
}