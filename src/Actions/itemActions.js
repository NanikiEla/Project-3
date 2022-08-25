import{
    Get_Items,
    Search_Items,
    Get_Item_by_Category,
    Get_Item_by_ID,
    Get_Product_Images,
    Add_Item,
    Update_Item,
    Delete_Item,
    Items_Loading,
    Empty_Items,
    Get_Items_by_ID
} from '../types/itemTypes'

import axios from "axios";


export const getItems = (url)=> async (dispatch)=>{
    
    dispatch({
        type: Items_Loading
    })

    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    await axios.get(`${process.env.SERVER_URL}${url}/`, config).then((res)=>{
        dispatch({
            type: Get_Items,
            payload: res.data
        })
    })
    

}

export const searchItems = (keyword)=> async (dispatch)=>{
    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    await axios.get(`${process.env.SERVER_URL}api/product/find?search=${keyword}`, config).then((res)=>{
        dispatch({
            type: Search_Items,
            payload: res.data
        })
    })

}

export const getItemsById = (url, id)=> async (dispatch)=>{
    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    await axios.get(`${process.env.SERVER_URL}${url}${id}/`, config).then((res)=>{
        dispatch({
            type: Get_Items_by_ID,
            payload: res.data
        })
    })

}

export const getProductImages = (id)=> async (dispatch)=>{
    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    await axios.get(`${process.env.SERVER_URL}api/productImg/${id}/`, config).then((res)=>{
        dispatch({
            type: Get_Product_Images,
            payload: res.data
        })
    })

}

export const getItemByCategory = (category)=> async (dispatch)=>{
    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    await axios.get(`${process.env.SERVER_URL}api/product/find/${category}/`, config).then((res)=>{
        dispatch({
            type: Get_Item_by_Category,
            payload: res.data
        })
    })

}

export const addItem = (item, file)=> async (dispatch)=>{
    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
if(!file){
    // this is for when file image is null
    item.thumbnail = 'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'

    await axios.post(`${process.env.SERVER_URL}api/product/`,item, config).then((res)=>{
        dispatch({
            type: Get_Item_by_Category,
            payload: res.data
        })
    })
}
else{
    let fileData = new FormData();
    fileData.append('imgFile', file)

    await axios.post(`${process.env.SERVER_URL}api/uploadFile/`,fileData, config).then((res)=>{
        
        if(res.status === 201){
            item.thumbnail = res.data.imgFile;
            axios.post(`${process.env.SERVER_URL}api/product/`,item, config).then((res)=>{
        
                dispatch({
                    type: Add_Item,
                    payload: res.data
                })  
            })
        }
    })
}


}

export const deleteItem = (id, fileName)=> async (dispatch)=>{
    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    await axios.delete(`${process.env.SERVER_URL}api/product/${id}/`, config).then((res)=>{
        axios.get(`${process.env.SERVER_URL}api/deleteFile/${fileName}/`, config).then((res2)=>{
            dispatch({
                type: Delete_Item,
                payload: res.data
            })            
        })
    })

}

export const updateItem = (id, item, file)=> async (dispatch)=>{
    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    if(file){
        await axios.put(`${process.env.SERVER_URL}api/product/${id}/`, item, config).then((res)=>{
            dispatch({
                type: Update_Item,
                payload: res.data
            })  
    })
    
    }
    else{
        let fileData = new FormData();
        fileData.append('imgFile', file)

        await axios.post(`${process.env.SERVER_URL}api/uploadFile/${id}/`,fileData, config).then((res)=>{
            if(res.status === 201){
                const fileNameBefore = item.thumbnail.split("/").at(-1);
                item.thumbnail = res.data.imgFile

                axios.put(`${process.env.SERVER_URL}api/product/${id}/`,item, config).then((res)=>{
                    axios.get(`${process.env.SERVER_URL}api/deleteFile/${fileNameBefore}/`, config).then((res)=>{
                        dispatch({
                            type: Update_Item,
                            payload: res.data
                        })
                    })
            })
            }}
        )}

}

export const emptyItem = ()=> async (dispatch)=>{
    dispatch({
        type: Empty_Items
    })
}

