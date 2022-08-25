import {
    Get_Cart,
    Add_to_Cart,
    Delete_from_Cart,
    Cart_Loading,
    Get_Items_Cart,
    Add_Item_to_Cart,
    Delete_Item_from_Cart,
    Cart_Item_Loading
} from '../Types/cartTypes'

const InitialState ={
    cart : [],
    cartItem: [],
    loadingCart : false,
    loadingCartItem : false
}

export const cartReducer = (state = InitialState, action)=>{
    const { type, payload } = action

    switch (type) {
        case Get_Cart:
            return{
            ...state,
            cart : payload,
            loadingCart: false
            }

        case Add_to_Cart:
            return{
                ...state,
                cart : payload,
                loadingCart: false
            }

        case Delete_from_Cart:
            return{
                ...state,
                cart : payload,
                loadingCart: false
            }

        case Cart_Loading:
            return{
                ...state,
                loadingCart: true
            }

        case Get_Items_Cart:
            return{
                ...state,
                cart : payload,
                loadingCart: false
            } 

       case Add_Item_to_Cart:
        return{
            ...state,
            loadingCart: false
        }     

        case Delete_Item_from_Cart:
            return{
                ...state,
                loadingCart: false
            } 

        case Cart_Item_Loading:
            return{
                ...state,
                loadingCart: true
            } 

        default:
            return state;

    }
    


}