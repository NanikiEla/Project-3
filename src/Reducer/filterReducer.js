import {
    Filter_Price,
    Filter_Rating,
    Filter_Condition,
    Filter_Price_and_Rating,
    Filter_Price_and_Condition,
    Filter_Rating_and_Condition,
    Filter_All
} from '../Types/filterTypes'

const InitialState ={
    product : [],
    loading : true
}

export const filterReducer = (state = InitialState, action)=>{
    const { type, payload } = action

    switch (type) {
        case Filter_Price:
            return{
            ...state,
            product : payload,
            loading: false
            }

        case Filter_Rating:
            return{
                ...state,
                product : payload,
                loading: false
                }

        case Filter_Condition:
            return{
                ...state,
                product : payload,
                loading: false
                }

        case Filter_Price_and_Rating:
            return{
                ...state,
                loading: true
            }

        case Filter_Price_and_Condition:
            return{
                ...state,
                product : payload,
                loading: false
            } 

        case Filter_Rating_and_Condition:
                return{
                    ...state,
                    product : payload,
                    loading: false
                } 

       case Filter_All:
        return{
            ...state,
            loading: true
        }     

        default:
            return state;

    }
    


}