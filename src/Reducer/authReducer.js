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

const InitialState ={
    token: localStorage.getItem('token'),
    isAuthenticated : null,
    isLoading: false,
    user: null,
    msg: ""
}

export const authReducer = (state = InitialState, action)=>{
    const { type, payload } = action

    switch (type) {
        case User_Loading:
            return{
            ...state,
            isLoading: true
            }

        case User_Loaded:
            return{
            ...state,
            isLoading: false,
            isAuthenticated: true,
            user: payload
            }

        case Auth_Error:    
        case LogIn_Success:
            localStorage.setItem('token', JSON.stringify(payload))
            return{
            ...state,
            isLoading: false,
            isAuthenticated: true,
            msg: "LogIn Success"
                }

        case LogIn_Fail:     
       case LogOut_Success:
        localStorage.removeItem('token')
            return{
            ...state,
            token: null, 
            isAuthenticated: false,
            isLoading: false
            }

        case Register_Success:
            localStorage.setItem('token', JSON.stringify(payload))
            return{
            ...state,
            isLoading: false,
            isAuthenticated: true,
            msg: "Registration Success"
            }

        case Register_Fail:
            localStorage.removeItem('token')
            return{
            ...state,
            token: null, 
            isAuthenticated: false,
            isLoading: false
            }

        default:
            return state;

    }
    


}