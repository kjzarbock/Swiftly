import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <a href="/"><img src="https://i.imgur.com/RLmkFZ6.jpg" style={{ width: "150px", height: "40px" }} /></a>
            <li className="navbar__item navbar__logout">
                <button style={{ color: "white", border: "1px solid white" }}><Link className="navbar__link" to="/shows">Shows</Link></button>
            </li>
            <li className="navbar__item active">
                <button style={{ color: "white", border: "1px solid white" }}><Link className="navbar__link" to="/tickets">Tickets</Link></button>
            </li>
            <li className="navbar__item active">
                <button style={{ color: "white", border: "1px solid white" }}><Link className="navbar__link" to="/merchandise">Merchandise</Link></button>
            </li>
            <li className="navbar__item active">
                <button style={{ color: "white", border: "1px solid white" }}><Link className="navbar__link" to="/about">About Us</Link></button>
            </li>
            {
                localStorage.getItem("swiftly_user")
                    ? <li className="navbar__item navbar__logout">
                        <button style={{ color: "white", border: "1px solid white" }}><Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("swiftly_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link></button>
                    </li>
                    : ""
            }
        </ul>
    )
}


