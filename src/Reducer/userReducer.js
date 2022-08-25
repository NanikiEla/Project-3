import{
    Get_User,
    Create_Store,
    Get_Store,
    User_Loading
} from '../Types/userTypes'

const InitialState = {
    user : [],
    store : [],
    loading : true
}

export const userReducer = (state = InitialState, action)=>{
    const { type, payload} = action

    switch (type) {
        case Get_User:
            return{
            ...state,
            user : payload,
            loading: false
            }

        case Create_Store:
            return{
            ...state,
            store : payload,
            loading: false
            }

        case Get_Store:
            return{
            ...state,
            store : payload,
            loading: false
            }

        case User_Loading:
            return{
            ...state,
            loading: true
            }
        
        default:
        return state;
    }
}