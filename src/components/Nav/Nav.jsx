import React from "react"
import styles from "./Nav.module.css"
import { NavLink } from "react-router-dom"

const Nav = () => {

    return(
        <nav className={styles.nav}>
            <NavLink to="/dashboard">Home</NavLink>
            <NavLink to="/games">Games</NavLink>
            <NavLink to="/library">Library</NavLink>
            <NavLink to="/learn">Learn</NavLink>
        </nav>
    )
}

export default Nav