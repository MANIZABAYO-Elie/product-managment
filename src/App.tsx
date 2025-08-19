
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import ProductPage from "./pages/ProductPage";
// import CategoriesPage from "./pages/CategoriesPage";
// import ProductDetail from "./pages/ProductDetail";
// import CartPage from "./pages/CartPage";



// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/products" replace />} />
//         <Route path="/products" element={<ProductPage />} />
//          <Route path="/products/:id" element={<ProductDetail />} />
//          <Route path="/products/:id" element={<CartPage />} />
//         <Route path="/categories" element={<CategoriesPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import { FaUser } from "react-icons/fa6";

export default function App() {
  return (
    <Router>
    
      <nav className="p-4 bg-gray-700 text-white text-xl flex justify-between px-10">
        <div className="flex gap-4">
          <Link to="/products">Products</Link>
          
         
        </div>
        <Link to="/cart">Cart</Link>
        <FaUser/>
      </nav>
      

     
      <Routes>
       
        <Route path="/" element={<Navigate to="/products" replace />} />

       
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/cart" element={<CartPage />} />

       
        <Route path="*" element={<p className="p-4">404 - Page not found</p>} />
      </Routes>
    </Router>
  );
}
