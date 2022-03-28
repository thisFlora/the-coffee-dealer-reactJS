import { createContext, useState } from 'react';

export const contexto = createContext();
const { Provider } = contexto;

const CartContext = ({children}) => {

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const addItem = (product, count) => {
        let cartProduct = { product, count }
        let cartAux = [];
        if(isInCart(product)){
            cartProduct = cart.find(item => item.product === product)
            cartProduct.count = cartProduct.count + count;
            cartAux = [...cart];
        }else {
            if(cart === undefined){
                cartAux = [cartProduct];
            } else {
                cartAux = [cartProduct, ...cart]
            }
        }
        setCart(cartAux);
    }

    const removeItem = (product) => {
        if(isInCart(product)){
            const cartAux = cart.filter(item => item.product !== product);
            setCart(cartAux);
        }
        
    }

    const clear = () => {
        setCart([]);
    }

    const isInCart = (product) => {
        return cart && cart.some(el=> el.product === product)
    }

    const getTotal = () => {
        let totalAux = 0;
        if(cart){
            cart.forEach(item => {
                totalAux += item.product.precio * item.count;
            });
        }
        setTotal(totalAux);
        return totalAux;
    }

    const valorDelContexto = {
        addItem:addItem,
        removeItem:removeItem,
        clear:clear,
        cart:cart,
        total:total,
        getTotal:getTotal,
    }
    return (
        <Provider value={valorDelContexto}>
            {children}
        </Provider>
    )
}

export default CartContext;