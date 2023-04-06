import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';

import './Shop.css';
const Shop = () => {
    const [cart, setCart] = useState([])

    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch(`products.json`)
            .then(res => res.json())
            .then(data => setProducts(data))

    }, [])
    useEffect(() => {
        const storeCart = getShoppingCart()
        const saveCart=[];
        // step-1: get id
        for (const id in storeCart) {
            // console.log(id);
            // step-2: get the by using id
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                // step-3: get quantity of  the product
                const quantity = storeCart[id];
                addedProduct.quantity = quantity;
                // step-4: add the added product in save cart
                saveCart.push(addedProduct);
                
            }
            console.log(addedProduct);
            // step-5: set the cart
            setCart(saveCart);

        }
        console.log(storeCart);
    }, [products])

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    }

    return (
        <div className='shop-container'>
            <div className="product-container">

                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)

                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>

        </div>
    );
};

export default Shop;