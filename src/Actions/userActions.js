import{
    Get_User,
    Create_Store,
    Get_Store,
    User_Loading
} from '../Types/userTypes'

import axios from "axios";


export const getUser = (id)=> async (dispatch)=>{
    
    dispatch({
        type: User_Loading
    })

    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    await axios.get(`${process.env.SERVER_URL}api/user/${id}`, config).then((res)=>{
        dispatch({
            type: Get_User,
            payload: res.data
        })
    })
    
}

export const getStore = (userId)=> async (dispatch)=>{
    
    dispatch({
        type: User_Loading
    })

    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    await axios.get(`${process.env.SERVER_URL}api/store/${userId}`, config).then((res)=>{
        dispatch({
            type: Get_Store,
            payload: res.data
        })
    })
    
}

export const createStore = (dataForm)=> async (dispatch)=>{
    
    dispatch({
        type: User_Loading
    })

    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    await axios.get(`${process.env.SERVER_URL}api/user/`,dataForm, config).then((res)=>{
        dispatch({
            type: Create_Store,
            payload: res.data
        })
    })
    
}