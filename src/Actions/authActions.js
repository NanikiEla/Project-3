import{
    User_Loading,
    User_Loaded,
    Auth_Error,
    LogIn_Success,
    LogIn_Fail,
    LogOut_Success,
    Register_Success,
    Register_Fail
} from '../Types/authTypes'

import axios from "axios";


export const loadUser = ()=> async (dispatch)=>{
    dispatch({type : User_Loading });
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    await axios.get(`${process.env.REACT_APP_SERVER_URL}api/user/`, config).then((res)=>
    dispatch({
        type: User_Loaded,
        payload: res.data
    })
    )
}

export const register = (data)=> async (dispatch)=>{
    dispatch({type: User_Loading });
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    await axios.post(`${process.env.REACT_APP_SERVER_URL}api/user/`, data.config).then((res)=>{
        axios.post(`${process.env.REACT_APP_SERVER_URL}api/cart/`,{"userId":res.data?.id, "quantity": 0}, config).then((res2)=>{
            dispatch({
            type: Register_Success,
            payload: res.data
            })
        })
    }).catch(err=>{
        dispatch({
            type: Register_Fail,
            msg: err.response.data
        })
    })
}

export const LogIn = (email, password)=> async (dispatch)=>{
    dispatch({type: User_Loading });
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    await axios.get(`${process.env.REACT_APP_SERVER_URL}api/logIn/${email}/`, config).then((res)=>{
        if (res.data.length === 0){
        alert("Email not registered");
        dispatch({
            type: LogIn_Fail,
            msg: "Email not registered"
        })}
        else{
            let emailinDB = res.data[0]?.email;
            let passwordinDB = res.data[0]?.password;

            if (emailinDB === email && passwordinDB === password){
                dispatch({
                    type: LogIn_Success,
                    payload: res.data[0]
                })
            }
            else{
                alert("Wrong password")
                dispatch({
                    type: LogIn_Fail,
                    msg: "Wrong password"
                })
            }
        }

    })
    .catch(err=>{
        dispatch({
            type: LogIn_Fail,
            msg: err.response.data
        })
    })
}

export const LogOut = (err)=> async (dispatch)=>{
    dispatch({
        type: LogOut_Success,
        msg: err.response.data
    });
    
}

