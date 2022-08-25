import {
    Filter_Price,
    Filter_Rating,
    Filter_Condition,
    Filter_Price_and_Rating,
    Filter_Price_and_Condition,
    Filter_Rating_and_Condition,
    Filter_All
} from '../Types/filterTypes'

import axios from "axios";


export const filterPrice = (minPrice, maxPrice)=> async (dispatch)=>{
    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    let url;
    if(minPrice && maxPrice){
        url = `api/filter/price/${minPrice}/${maxPrice}/`
    }
    else if(minPrice && maxPrice){
        url = `api/filter/price/min/${minPrice}/`
    }
    else{
        url = `api/filter/price/max/${maxPrice}/`
    }

    await axios.get(`${process.env.SERVER_URL}${url}/`, config).then((res)=>{
        dispatch({
            type: Filter_Price,
            payload: res.data
    })
})
}

export const filterRating = (rating)=> async (dispatch)=>{
    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }


    await axios.get(`${process.env.SERVER_URL}api/filter/rating/${rating}/`, config).then((res)=>{
        dispatch({
            type: Filter_Rating,
            payload: res.data
    })
})
}

export const filterCondition = (condition)=> async (dispatch)=>{
    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }


    await axios.get(`${process.env.SERVER_URL}api/filter/condition/${condition}/`, config).then((res)=>{
        dispatch({
            type: Filter_Condition,
            payload: res.data
    })
})
}

// export const filterPriceAndCondition = (minPrice, maxPrice, condition)=> async (dispatch)=>{
    
//     const config ={
//         Headers:{
//             'Content-Type' : 'application/json'
//         }
//     }


//     await axios.get(`${process.env.SERVER_URL}api/filter/price_and_condition/${minPrice}/${maxPrice}/${condition}/`, config).then((res)=>{
//         dispatch({
//             type: Filter_Price_and_Condition,
//             payload: res.data
//     })
// })
// }

export const filterPriceAndRating = (minPrice, maxPrice, rating)=> async (dispatch)=>{
    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }


    await axios.get(`${process.env.SERVER_URL}api/filter/price_and_rating/${minPrice}/${maxPrice}/${rating}/`, config).then((res)=>{
        dispatch({
            type: Filter_Price_and_Rating,
            payload: res.data
    })
})
}

export const filterRatingAndCondition = (rating, condition)=> async (dispatch)=>{
    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }


    await axios.get(`${process.env.SERVER_URL}api/filter/rating_and_condition/${rating}/${condition}/`, config).then((res)=>{
        dispatch({
            type: Filter_Rating_and_Condition,
            payload: res.data
    })
})
}

export const filterAll = (minPrice, maxPrice, rating, condition)=> async (dispatch)=>{
    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }


    await axios.get(`${process.env.SERVER_URL}api/filter/rating_and_condition/${minPrice}/${maxPrice}/${rating}/${condition}/`, config).then((res)=>{
        dispatch({
            type: Filter_Rating_and_Condition,
            payload: res.data
    })
})
}