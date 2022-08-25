import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rating } from 'react-simple-star-rating';
import { addItemsToCart, getCart } from '../../Actions/cartAction';
import'./BuyingBox.css'

let tokenParse = []

const BuyingBox = ({productId, stock})=>{
    const {cart, loadingCartItem} = useSelector((state)=>state.cartReducer)
    const {token} = useSelector((state)=>state.authReducer)

    const dispatch = useDispatch();

    useEffect(()=>{
        if(token !== null && token !== 'Undefined'){
            tokenParse = JSON.parse(token);
            dispatch(getCart(tokenParse?.id))
        }
    }, [dispatch, token])

    const addCart = (cart, productId)=>{
        dispatch(addCart(tokenParse?.id, cart?.quantity));
        dispatch(addItemsToCart(cart?.id, productId));
    }

    return(
        <div className='dpContainer'>
           <div className='qty'>
                <div>
                <span>Stock : {stock}</span>
                </div>
           <span>Qty : </span>
           <input type="numbr" name='qty' max={stock} min={1} />
           </div>
           {loadingCartItem?<div>Loading . . .</div>:<div onClick={()=>{addCart(cart, productId) }}
            className={StyleSheet.button}>Add to Cart</div>}
            <div className={StyleSheet.button}>
                Buy Now
            </div>
        </div>
    )
}

export default BuyingBox;