import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <a href="/"><img src="https://i.imgur.com/RLmkFZ6.jpg" style={{ width: "150px", height: "40px" }}/></a>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="/shows">Shows</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Tickets</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/about">About Us</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/merchandise">Merchandise</Link>
            </li>
            {
                localStorage.getItem("honey_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("honey_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}


