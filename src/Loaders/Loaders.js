import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader=async()=>{
    const loaderProducts=await fetch('products.json');
    const products=await loaderProducts.json();
    // if cart data in database,you have to async await
    const storedCart=getShoppingCart();
    const savedCart=[];
    for(const id in storedCart){
        const addedProduct=products.find(pd=>pd.id==id);
       if(addedProduct){
        const quantity=storedCart[id];
        addedProduct.quantity=quantity;
        savedCart.push(addedProduct)
       }
    }
    // if you need to send to things
    // return[products, savedCart];
    // another option
    // return {products,cart:savedCart}
    return savedCart;
}

export default cartProductsLoader;