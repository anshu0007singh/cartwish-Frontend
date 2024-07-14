import React, { useState, useEffect,useContext } from 'react'
import './CartPage.css'
import UserContext from '../../Contexts/UserContext'
import CartContext from '../../Contexts/CartContext'
import remove from '../../assets/emojis/remove.png'
import Table from '../Common/Table'
import QuantityInput from '../SingleProduct/QuantityInput'
import { CheckoutAPI } from '../../Services/orderServices'
import { toast } from 'react-toastify'

const CartPage = () => {
    const [subTotal,setSubTotal] = useState(0)
    const user = useContext(UserContext)
    const {cart,removeFromCart, updateCart,setCart} = useContext(CartContext)

    useEffect(() => {
        let total = 0;
        cart.forEach(element => {
            total += element.product.price*element.quantity
        });
        setSubTotal(total)
    } ,[cart])

    const checkout = () =>{
        const oldCart = [...cart];
        setCart([])
        CheckoutAPI().then(()=>{
            toast.success("Order placed Succesfully")
        }).catch(()=>{
            toast.error("Something went wrong")
            setCart(oldCart)
        })
    }
  return (
    <section className="align_center cart_page">
        <div className="align_center user_info">
            <img src={`http://localhost:5000/profile/${user?.profilePic}`} alt="user profile"/>
            <div>
                <p className="user_name">Name : {user?.name}</p>
                <p className="user_email">Email : {user?.email }</p>
            </div> 
        </div>
        <Table headings={["Item","Price","Quantity","Total","Remove"]}>
            <tbody>
            
                {cart.map(({product,quantity})=>
                    <tr key={product._id}>
                    <td>{product.title}</td>
                    <td>${product.price}</td>
                    <td className='align_center table_quantity_input'><QuantityInput quantity = {quantity} setQuantity={updateCart} cartPage = {true} productId = {product._id} stock = {product.stock}></QuantityInput></td>
                    <td>${quantity*product.price}</td>
                    <td><img src={remove} alt="remove" className='cart_remove_icon' onClick={() => removeFromCart(product._id)}/></td>
                </tr>
                )}
            </tbody>
        </Table>
        <table className="cart_bill">
            <tbody>
                {cart.length>0 && <>
                    <tr>
                        <td> subtotal </td>
                        <td> ${subTotal} </td>
                    </tr>
                    <tr>
                        <td> Shipping Charge </td>
                        <td> $5 </td>
                    </tr>
                    <tr className='cart_bill_final'>
                        <td> Total </td>
                        <td> ${subTotal + 5} </td>
                    </tr>
                </>}
                

            </tbody>
        </table>
        {cart.length>0 && <button className="search_button checkout_button" onClick={checkout}>Checkout</button>}
        
    </section>
  )
}

export default CartPage
