import React from 'react';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Reviewitem from '../Reviewitem/Reviewitem';
import './Orders.css';

const Order = () => {
    const saveCart=useLoaderData();
    const [cart,setCart]=useState(saveCart);
   
    const handleRemoveFromCart=(id)=>{
       const remaining=cart.filter(product=>product.id !==id)
       setCart(remaining);
       removeFromDb(id);
       
    }
    const handleClearCart=()=>{
        setCart([]);
        deleteShoppingCart();
    }
    return (
        <div className='shop-container'>
            <div className='review-container'>
             {
                cart.map(product=><Reviewitem
                key={product.id}
                product={product}
                handleRemoveFromCart={handleRemoveFromCart}
                ></Reviewitem>)
             }
            </div>
            <div className='cart-container'>
                <Cart 
                cart={cart}
                handleClearCart={handleClearCart}
                >
                   <Link className='proceed-link' to="/checkout">
                    <button className='btn-proceed'>Proceed Checkout</button>
                   </Link>
                </Cart>
               
            </div>
        </div>
    );
};

export default Order;