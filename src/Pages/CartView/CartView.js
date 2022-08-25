import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom"
import { deleteItemFromCart, deleteFromCart, getItemsCart } from "../../Actions/cartAction"
import NavBar from "../../Components/NavBar/NavBar";
import './CartView.css'

let tokenParse = []
const CartView = ()=>{

    const location = useLocation();
    const { cartId } = location.this.state
    const {cartItem, cart} = useSelector((state)=>state.cartReducer)
    const {token} = useSelector((state)=>state.authReducer)
    const dispatch = useDispatch();

    const deleteItem = (id)=>{
        dispatch(deleteFromCart(tokenParse?.id, cart?.quantity));
        dispatch(deleteItemFromCart(id));
        window.location.replace('/cartView')
    }

    useEffect(()=>{
        if(token !== null && token !== 'Undefined'){
            tokenParse = JSON.parse(token);
            dispatch(getItemsCart(cartId))
        }
    }, [dispatch, token, cartId])
    
    return(
        <div>
            <NavBar />
            <div className="cartContainer">
                <h1>Your Cart Items</h1>
                {cartId.map((e, i)=>{
                    return(
                        <div key={i} className="cartProduct">
                            <h1>{i+1}.</h1>
                            <img src={e.product_details.thumbnail} alt={"thumbnail -" +i} />
                            <div>
                                <h2>{e.product_details?.title}</h2>
                                <h3>R{e.product_details.price}</h3>
                                <h5>x{e.quantity}</h5>
                                <button onClick={()=>{deleteItem(e.id)}}>Delete Item</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default CartView;