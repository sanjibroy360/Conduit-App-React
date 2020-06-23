import React from "react";

function Header() {
    return (
        <header>
            <div className="container header_flex">
                <p className="logo">
                    conduit
                </p>

                <ul className="nav_menu">
                    <li>
                        <button>Home</button>
                    </li>
                    <li>
                        <button>Sign in</button>
                    </li>
                    <li>
                        <button>Sign up</button>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header;
