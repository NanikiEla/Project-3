import { useLocation } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import PhotoProduct from "../../Components/PhotoProduct/PhotoProduct";
import DescriptionProduct from "../../Components/DescriptionProduct/DescriptionProduct";
import BuyingBox from "../../Components/BuyingBox/BuyingBox"

const DetailProduct = ()=>{
    const location = useLocation()
    const { item } = location.state

    return(
        <div>
            <NavBar />
            <div style={{ display:'flex'}}>
                <PhotoProduct id={item?.id} />
                <DescriptionProduct item={item} />
                <BuyingBox productId={item?.id} stock={item?.stock} />
            </div>
            <h1>DetailProduct</h1>
        </div>
    )
}

export default DetailProduct;