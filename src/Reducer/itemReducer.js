import{
    Get_Items,
    Search_Items,
    Get_Item_by_Category,
    Get_Items_by_ID,
    Get_Product_Images,
    Add_Item,
    Update_Item,
    Delete_Item,
    Items_Loading,
    Empty_Items
} from '../Types/itemTypes'

const InitialState ={
    items : [],
    productImgs : [],
    file : [],
    loading : true,
}

export const itemReducer = (state = InitialState, action)=>{
    const { type, payload} = action

    switch(type) {
        case Get_Items:
            return{
                ...state,
                items: payload,
                loading: false
            }

        case Search_Items:
            return{
                ...state,
                product : payload,
                loading: false
                    }
        
        case Get_Item_by_Category:
            return{
                ...state,
                items: payload,
                loading: false
            }
    
        case Get_Items_by_ID:
            return{
                ...state,
                items: payload,
                loading: false
            }

        case Get_Product_Images:
            return{
                ...state,
                productImgs: payload,
                loading: false
            }

        case Add_Item:
            return{
                ...state,
                loading: false
            }

        case Update_Item:
            return{
                ...state,
                loading: false
            }

        case Delete_Item:
            return{
                ...state,
                loading: false
            }

        case Items_Loading:
            return{
                ...state,
                items: payload,
                loading: true
            }

        case Empty_Items:
            return{
                ...state,
                items: [],
                loading: false
            }
    default:
        return state;
}

}