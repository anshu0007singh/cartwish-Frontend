import React, { useContext } from "react";
import {Routes,Route, useLocation} from "react-router-dom"
import HomePage from '../Home/HomePage'
import ProductsPage from '../Products/ProductsPage'
import SingleProductPage from '../SingleProduct/SingleProductPage'
import CartPage from '../Cart/CartPage'
import MyOrderPage from '../MyOrder/MyOrderPage'
import LoginPage from '../Authentication/LoginPage'
import SignupPage from '../Authentication/SignupPage'
import Logout from "../Authentication/Logout";
import { getUser } from "../../Services/userServices";

const Routing = () => {
    const user = getUser()
    const location = useLocation();
    return (
        <Routes>
            <Route path="/" element = {<HomePage/>}/>
            <Route path="/products" element = {<ProductsPage/>}/>
            <Route path="/product/:id" element = {<SingleProductPage/>}/>
            {user ? <Route path="/signup" element = {<HomePage/>}/> : < Route path="/signup" element = {<SignupPage/>}/>}
            {user ? <Route path="/login" element = {<Logout/>}/> : <Route path="/login" element = {<LoginPage/>}/>}
            {user ? < Route path="/cart" element = {<CartPage/>}/> : < Route path="/cart" element = {<LoginPage prevPage={true}  pathName = {location.pathname}/>}/> }
            {user ? <Route path="/logout" element = {<Logout/>}/> : < Route path="/logout" element = {<LoginPage prevPage={true}  pathName = {location.pathname}/>}/> }
            {user ? <Route path="/myorders" element = {<MyOrderPage/>}/> : < Route path="/myorders" element = {<LoginPage prevPage={true}  pathName = {location.pathname}/>}/> }
        </Routes>
    )
}

export default Routing