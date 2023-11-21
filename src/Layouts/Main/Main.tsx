import Header from "../Header/Header"
import Navigation from "../Navigation/Navigation"
import { ReactNode, useState } from "react"

type LayoutProps = {
    children: ReactNode
}

const Main = ({ children }: LayoutProps) => {
    // Navigation state in mobile view
    const [openNav, setOpenNav] = useState<boolean>(false);

    const asideNav = document.querySelector('aside') as HTMLElement;

    openNav === true ? asideNav?.classList.add('active') : asideNav?.classList.remove('active');

    // Open-close navigation in mobile view
    const handleOpenNav = () => {
        setOpenNav((prevState) => !prevState);
    }

    return (
        <>
            <Header handleOpenNav={handleOpenNav} />
            <div id="main-container">
                <Navigation handleOpenNav={handleOpenNav} />
                {children}
            </div>
        </>
    )
}

export default Main;