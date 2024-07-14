import React, { useEffect, useState } from 'react'
import "./App.css"
import UserContext from './Contexts/UserContext'
import CartContext from './Contexts/CartContext'
import { ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'
import { getJwt, getUser } from './Services/userServices'
import setAuthToken from './Utils/setAuthToken'
import { addToCartAPI, decreaseProductAPI, getCartAPI, increaseProductAPI, removeFromCartAPI } from './Services/cartServices'
import { Navigate } from 'react-router-dom'

setAuthToken(getJwt())
const App = () => {
  const [user,setUser]= useState(null)
  const [cart,setCart]= useState([])

  useEffect(()=>{
    try {
      const jwtUser = getUser();
      if(Date.now() >= jwtUser.exp*1000){
        localStorage.removeItem("token")
        location.reload()
        return <Navigate to="/login" />;
      }else{
        setUser(jwtUser);
      }
    } catch (error) {
    }
    
  },[])

  useEffect(()=>{
    if(user){
      getCart()
    }
  },[user])

  const addToCart = (product,quantity) => {
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex(item => item.product._id===product._id)

    if(productIndex === -1){
      updatedCart.push({product,quantity})
    }else{
      updatedCart[productIndex].quantity+=quantity
    }
    setCart(updatedCart)
    addToCartAPI(product._id,quantity).then(res => {
      toast.success("product added successfully")
    }).catch(err => {
      toast.success("Failed to add product!")
      setCart(cart);
    })
  }

  const removeFromCart = (id) =>{
    const oldCart = [...cart]
    const newCart = oldCart.filter(item => item.product._id !== id)
    setCart(newCart)
    removeFromCartAPI(id).then(toast.success("Product removed successfully")).catch(err => {
      toast.error("Something went wrong")
    })
  }

  const updateCart = (type , id) => {
    const oldCart = [...cart]
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex(item => item.product._id === id)
    // console.log(updatedCart[productIndex].quantity-1);
    if(type==="increase"){
      updatedCart[productIndex].quantity += 1
      setCart(updatedCart)
      increaseProductAPI(id).catch(err => {
        toast.error("Something went wrong")
        setCart(oldCart)
    })
  }
    if(type==="decrease"){
      updatedCart[productIndex].quantity -= 1
      setCart(updatedCart)
      decreaseProductAPI(id).catch(err => {
        toast.error("Something went wrong")
        setCart(oldCart)
    })
    }
  }

  const getCart = () => {
    getCartAPI().then(res => {
      setCart(res.data);
    }).catch(err => {
      toast.error("something went wrong!")
    })
  }
  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider value={{cart, addToCart, removeFromCart,updateCart, setCart}}>
        <div className='app'>
            <Navbar></Navbar>
            <main>
              <ToastContainer position='top-center'/>
              <Routing/>
            </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App
