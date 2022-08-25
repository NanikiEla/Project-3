import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Get_Items_by_ID } from '../../Types/itemTypes';
import'./PhotoProduct.css'


const PhotoProduct = ({id})=>{
    const {items, loading} = useSelector((state)=>state.itemReducer)
    const dispatch = useDispatch();

    useEffect(()=>{
            dispatch(Get_Items_by_ID('api/productImg/'.id))
    }, [dispatch])

    const [imgHover, setImgHover] = useState(0)

    return(
        <div className='ppContainer'>
            <div className='ppSmallImg'>
                {items.map((e, i)=>{
                    return(
                        <img key={i} onMouseEnter={()=>setImgHover(i)} src={e.url} alt={'small-img -'+i} />
                    )
                })}
            </div>
            <div className='ppBigImg'>
                <img src={loading?'': items[imgHover]?.url} alt="big-img" />
            </div>
        </div>
    )
}

export default PhotoProduct;