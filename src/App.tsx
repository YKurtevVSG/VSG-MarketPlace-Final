import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Main from './Layouts/Main/Main'
import Home from './Pages/Home/Home'
import Marketplace from './Pages/Marketplace/Marketplace'
import Inventory from './Pages/Inventory/Inventory'
import PendingOrders from './Pages/Pending Orders/PendingOrders'
import MyOrders from './Pages/My Orders/MyOrders'
import PrivateRoutesAuth from './components/Global/Private Routes/PrivateRoutesAuth'
import PrivateRoutesAdmin from './components/Global/Private Routes/PrivateRoutesAdmin'
import AdminError from './Pages/AdminError/AdminError'
import { setInitialTheme } from './utils/themeChangeFunction'
import LendedItems from './Pages/Lended items/LendedItems'
import MyLendedItems from './Pages/My Lended Items/MyLendedItems'

function App() {
    // Set light theme to light on initial page load
    setInitialTheme();

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                {/* Private routes for authenticated users only */}
                <Route element={<PrivateRoutesAuth />}>
                    <Route path='/marketplace' element={<Main><Marketplace /></Main>} />
                    {/* Private routes for admin only */}
                    <Route element={<PrivateRoutesAdmin />}>
                        <Route path='/inventory' element={<Main><Inventory /></Main>} />
                        <Route path='/pending-orders' element={<Main><PendingOrders /></Main>}></Route>
                        <Route path='/lended-items' element={<Main><LendedItems /></Main>}></Route>
                    </Route>
                    <Route path='/my-orders' element={<Main><MyOrders /></Main>}></Route>
                    <Route path='/my-lended-items' element={<Main><MyLendedItems /></Main>}></Route>
                </Route>
                <Route path='/no-access' element={<Main><AdminError /></Main>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
