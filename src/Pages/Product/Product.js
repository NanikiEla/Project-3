import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import FilterBox from "../../Components/FilterBox/FilterBox";
import NavBar from "../../Components/NavBar/NavBar";
import ProductLayout from "../../Components/ProductLayout/ProductLayout";
import { Filter_All, Filter_Condition, Filter_Price, Filter_Price_and_Condition, Filter_Price_and_Rating, Filter_Rating, Filter_Rating_and_Condition } from "../../Types/filterTypes";
import { Empty_Items, Get_Items, Get_Item_by_Category, Search_Items } from "../../Types/itemTypes";

const Product = ()=>{
    const location = useLocation()
    const { category, keyword} = location.state
    const {items, loading} = useSelector((state)=>state.itemReducer)
    const { products } = useSelector((state)=>state.filterReducer)
    const dispatch = useDispatch();

    const useEffect = (minPrice, maxPrice, rating, condition)=>{
        dispatch(Empty_Items());

        if(
            minPrice !== '' &&
            maxPrice !== '' &&
            rating === '' &&
            condition === ''
        ){
            dispatch(Filter_Price(minPrice, maxPrice));
        }else if (
            minPrice !== '' &&
            maxPrice === '' &&
            rating === '' &&
            condition === ''
        ){
            dispatch(Filter_Price(minPrice, maxPrice));
        }else if(
            minPrice === '' &&
            maxPrice !== '' &&
            rating === '' &&
            condition === ''
        ){
            dispatch(Filter_Price(minPrice, maxPrice));
        }else if(
            minPrice === '' &&
            maxPrice === '' &&
            rating !== '' &&
            condition === ''
        ){
            dispatch(Filter_Rating(rating));
        }else if(
            minPrice === '' &&
            maxPrice === '' &&
            rating === '' &&
            condition !== ''
        ){
            dispatch(Filter_Condition(condition));
        }else if(
            minPrice !== '' &&
            maxPrice !== '' &&
            rating !== '' &&
            condition === ''
        ){
            dispatch(Filter_Price_and_Rating(minPrice, maxPrice, rating));
        }else if(
            minPrice !== '' &&
            maxPrice !== '' &&
            rating === '' &&
            condition !== ''
        ){
            dispatch(Filter_Price_and_Condition(minPrice, maxPrice, condition));
        }else if(
            minPrice === '' &&
            maxPrice === '' &&
            rating !== '' &&
            condition !== ''
        ){
            dispatch(Filter_Rating_and_Condition(rating, condition));
        }else if(
            minPrice !== '' &&
            maxPrice !== '' &&
            rating !== '' &&
            condition !== ''
        ){
            dispatch(Filter_All(minPrice, maxPrice, rating, condition));
        }else{
            dispatch(Get_Item_by_Category(category));
        }
    }

    useEffect(()=>{
        
        if(category === ''){
            dispatch(Search_Items(keyword));
            if(keyword === ''){
                dispatch(Get_Items(`api/product/`))
            }
        }else{
            dispatch(Get_Item_by_Category(category));
        }
    }, [dispatch, category, keyword])

    let dataProduct;
    if(products.length === 0){
        dataProduct = items;
    }else if(products.length === 0 && items.length === 0){
        dataProduct = []
    }else{
        dataProduct = products;
    }

    return(
        <div>
            <NavBar />
            <div>
            <h2>Products</h2>
                <select>
                    <option>Default sorting</option>
                    <option>sort by price</option>
                    <option>sort by popularity</option>
                    <option>sort by rating</option>
                    <option>sort by sale </option>
                </select>
            </div>

            <div className="row">
            <div class="col-4">
                <img src="Images/Solar panel.png" />
                <h4>Portable solar panel</h4>
            </div>
            <div class="rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            
                <p>R 3500.00</p>
            </div>

            <div class="col-4">
                <img src="Images/Gas stove .png" />
                <h4>Gas stove</h4>
            </div>
            <div class="rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            
                <p>R 350.00</p>
            </div>

            <div class="col-4">
                <img src="Images/Rechargeable lamp.png" />
                <h4>Rechargeable lamp</h4>
            </div>
            <div class="rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            
                <p>R 70.00</p>
            </div>            
            </div>

            <div className="body">
                {/* <FilterBox applyFilter={applyFilter} /> */}
                <ProductLayout category={category} >
                    {loading?<h1>Loading . . .</h1>:dataProduct.length === 0?<h1>Product Not Found</h1>
                        :dataProduct.map((e, i)=>{
                            return(
                                <></>
                            )
                        }    )
                }
                </ProductLayout>
            </div>
        </div>
    )
}

export default Product;