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
import { LoginPage } from "./pages/LoginPage"
import { AdminUsersPage } from "./pages/AdminUserPage"
import { AdminFeaturesPage } from "./pages/AdminFeaturesPage"
import { AdminAddCategory } from "./pages/AdminAddCategory"
import { AdminRoute } from "./context/AdminRoute"
import { FavoritesPage } from "./pages/FavoritesPage"

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
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/admin/users" element={<AdminUsersPage/>} />
        <Route path="/admin/features" element={<AdminFeaturesPage/>} />
        <Route path="/admin/add-categories" element={<AdminAddCategory/>} />
        <Route path="/admin" element={<AdminRoute><AdminPanelPage /></AdminRoute>} />
        <Route path="/favorites" element={<FavoritesPage/>} />

      </Routes>
      <Footer/>
      </BrowserRouter>
      </>
      
    )
}

export default App
