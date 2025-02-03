import { useState, useEffect, useCallback } from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/client/Header"
import Footer from "../components/client/Footer"
import Navigation from "../router/Navigation.jsx"

const Layout = () => {
    const [isMenuOpen, setMenuOpen] = useState(false)

    const handleMenuClick = useCallback(() => {
        setMenuOpen((prev) => !prev)
    }, [])

    const closeMenu = useCallback(() => {
        setMenuOpen(false)
    }, [])

    useEffect(() => {
        document.body.classList.toggle("lock", isMenuOpen)

        return () => {
            document.body.classList.remove("lock")
        }
    }, [isMenuOpen])

    return (
        <div className="wrapper">
            <Header isMenuOpen={isMenuOpen} handleMenuClick={handleMenuClick} />
            <main className="page" role="main">
                <div className="page__container">
                    <Outlet />
                    <Navigation isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Layout
