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
import { AdminDeleteCategory } from "./pages/AdminDeleteCategory"
import { ProtectedRoute } from "./components/ProtectedRoute"

function App() {
    return(
      <>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path="/hotel/:id" element={<HotelDetailPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/favorites" element={<FavoritesPage/>} />

        <Route path="/admin" element={<ProtectedRoute adminRequired={true} />}>
          <Route index element={<AdminPanelPage />} /> {/* /admin */}
          <Route path="add-hotel" element={<AddHotelPage />} /> {/* /admin/add-hotel */}
          <Route path="hotel-list" element={<AdminHotelListPage />} /> {/* /admin/hotel-list */}
          <Route path="hotels/edit/:id" element={<EditProductPage />} /> {/* /admin/hotels/edit/:id */}
          <Route path="users" element={<AdminUsersPage />} /> {/* /admin/users */}
          <Route path="features" element={<AdminFeaturesPage />} /> {/* /admin/features */}
          <Route path="add-categories" element={<AdminAddCategory />} /> {/* /admin/add-categories */}
          <Route path="categories" element={<AdminDeleteCategory />} /> {/* /admin/categories */}
        </Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
      </>
      
    )
}

export default App
