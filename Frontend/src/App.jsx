import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { AddProductPage } from './pages/AddProductPage'
import { ProductDetailPage } from "./pages/ProductDetailPage"
import { Footer } from "./components/Footer"
import { AdminPanelPage } from "./pages/AdminPanelPage"
import { AdminHotelListPage } from "./pages/AdminHotelListPage"

function App() {
    return(
      <>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/admin' element={<AdminPanelPage/>}></Route>
        <Route path='/admin/add-product' element={<AddProductPage/>}></Route>
        <Route path='/admin/hotel-list' element={<AdminHotelListPage/>} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
      <Footer/>
      </BrowserRouter>
      </>
      
    )
}

export default App
