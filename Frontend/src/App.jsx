import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { AddHotelPage} from './pages/AddHotelPage'
import { HotelDetailPage} from "./pages/HotelDetailPage"
import { Footer } from "./components/Footer"
import { AdminPanelPage } from "./pages/AdminPanelPage"
import { AdminHotelListPage } from "./pages/AdminHotelListPage"
import { EditProductPage } from "./pages/EditProductPage"
import { RegisterPage } from "./pages/RegisterPage"

function App() {
    return(
      <>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/admin' element={<AdminPanelPage/>}></Route>
        <Route path='/admin/add-hotel' element={<AddHotelPage/>}></Route>
        <Route path='/admin/hotel-list' element={<AdminHotelListPage/>} />
        <Route path="/admin/hotels/edit/:id" element={<EditProductPage />} /> 
        <Route path="/hotel/:id" element={<HotelDetailPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
      </>
      
    )
}

export default App
