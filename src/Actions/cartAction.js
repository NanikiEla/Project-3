import{
    Get_Cart,
    Add_to_Cart,
    Delete_from_Cart,
    Cart_Loading,
    Get_Items_Cart,
    Add_Item_to_Cart,
    Delete_Item_from_Cart,
    Cart_Item_Loading
} from '../Types/cartTypes'

import axios from "axios";


export const getCart = (id)=> async (dispatch)=>{
    dispatch({type : Cart_Loading });
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    await axios.get(`${process.env.REACT_APP_API_URL}api/cart/${id}/`, config).then((res)=>
    dispatch({
        type: Get_Cart,
        payload: res.data
    })
    )
}

export const addToCart = (id, quantity)=> async (dispatch)=>{
    dispatch({type: Cart_Loading });
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    await axios.put(`${process.env.REACT_APP_API_URL}api/cart/${id}/`,{"userId": id, "quantity": quantity + 1}, config).then((res)=>{
        dispatch({
            type: Add_to_Cart,
            payload: res.data
        })  
        
    })
    
}

export const deleteFromCart = (id, quantity)=> async (dispatch)=>{
    dispatch({type: Cart_Loading });
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    await axios.put(`${process.env.REACT_APP_API_URL}api/cart/${id}/`, {"userId": id, "quantity": quantity + 1}, config).then((res)=>{
        dispatch({
            type: Delete_from_Cart,
            payload: res.data
        })  
        
    })
    
}

export const getItemsCart = (cartId)=> async (dispatch)=>{
    dispatch({type: Cart_Item_Loading });
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    await axios.get(`${process.env.REACT_APP_API_URL}api/showItemCart/${cartId}/`, config).then((res)=>{
        dispatch({
            type: Get_Items_Cart,
            payload: res.data
        })  
        
    })
    
}

export const addItemsToCart = (cartId, productId)=> async (dispatch)=>{
    dispatch({type: Cart_Loading });
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    await axios.get(`${process.env.REACT_APP_API_URL}api/cartItemDetectSameItem/${cartId}/${productId}/`, config).then(async(res)=>{
        

        if(res.data.length === 0){
            axios.post(`${process.env.REACT_APP_API_URL}api/cartItem/`, {"cartId": cartId, "productId": productId, "quantity": 1}, config).then((res2)=>{
                dispatch({
                    type: Add_Item_to_Cart,
                    payload: res.data
                }) 
            })
            
        }

        axios.put(`${process.env.REACT_APP_API_URL}api/cartItem/id/${res.data[0]?.id}/`, {"cartId": cartId, "productId": productId, "quantity": res.data[0]?.quantity + 1}, config)
    })
    
}

export const deleteItemFromCart = (id)=> async (dispatch)=>{
    dispatch({type: Cart_Loading });
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    await axios.delete(`${process.env.REACT_APP_API_URL}api/cartItem/id/${id}/`, config).then((res)=>{
        dispatch({
            type: Delete_Item_from_Cart,
            payload: res.data
        })  
        
    })
    
}
