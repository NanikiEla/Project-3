import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './Store'
import Home from './Pages/Home/Home'
import CartView from './Pages/CartView/CartView';
import DetailProduct from './Pages/DetailProduct/DetailProduct'
import LogIn from './Pages/LogIn/LogIn'
import ProfilePages from './Pages/ProfilePages/ProfilePages'
// import PreviewImgs from './Pages/PreviewImgs/PreviewPages'
import Product from './Pages/Product/Product'
// import SellerProduct from './Pages/SellerProduct/SellerProduct'
import SignUp from './Pages/SignUp/SignUp'
import Navigate from 'react-dom'


function App() {
  const token = localStorage.getItem('token');
  const tokenReady = token !== null && token !== 'undefined';
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/cartView" element={tokenReady?<Navigate to={'/login'} />:<CartView/>}></Route>
        <Route path="/detail_product" element={<DetailProduct/>}></Route>
        <Route path="/logIn" element={tokenReady?<Navigate to={'/profile'} />:<LogIn/>}></Route>
        <Route path="/profile" element={tokenReady?<Navigate to={'/login'} />:<ProfilePages/>}></Route>
        {/* <Route path="/product" element={<PreviewImgs/>}></Route> */}
        <Route path="/seller_product_list" element={<Product/>}></Route>
        {/* <Route path="/seller_product" element={<SellerProduct/>}></Route> */}
        <Route path="/signUp" element={tokenReady?<Navigate to={'/profile'} />:<SignUp/> }></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    
  );
}

export default App;