import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// import HomePage from "./pages/HomePage";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

const HomePage = lazy(()=> import('./pages/HomePage'));
const Pricing = lazy(()=> import('./pages/Pricing'));
const Product = lazy(()=> import('./pages/Product'));
const Login = lazy(()=> import('./pages/Login'));
const AppLayout = lazy(()=> import('./pages/AppLayout'));
const PageNotFound = lazy(()=> import('./pages/PageNotFound'));
 
// dist/assets/icon-98c6b6d7.png    20.20 kB
// dist/assets/index-82efd547.css   30.20 kB │ gzip:   5.06 kB
// dist/assets/index-40ff3b6b.js   526.09 kB │ gzip: 149.21 kB

function App() {

 
  return (
    <AuthProvider>
    <CitiesProvider>
    <BrowserRouter>
    <Suspense fallback = {<SpinnerFullPage/>}>
    <Routes>
    <Route index element={<HomePage />} />
    <Route path="pricing" element={<Pricing />} />
    <Route path="product" element={<Product />} />
    <Route path="login" element={<Login />} />
    <Route path="app" element={
      <ProtectedRoute>
      <AppLayout />
      </ProtectedRoute>
    }>
    <Route index element={<Navigate replace to='cities'/>} />
    <Route path="cities" element={<CityList/>} />
    <Route path="cities/:id" element={<City/>}/>
    <Route path="countries" element={<CountryList />} />
    <Route path="form" element={<Form>Form</Form>} />
    </Route>
    <Route path="*" element={<PageNotFound />} />
    </Routes>
    </Suspense>
    </BrowserRouter>
    </CitiesProvider>
    </AuthProvider>
    );
}

export default App;
