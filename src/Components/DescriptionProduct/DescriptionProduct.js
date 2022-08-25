import { rating } from 'react-simple-star-rating';
import'./DescriptionProduct.css'


const DescriptionProduct = ({item})=>{
    
    return(
        <div className='dpContainer'>
           <h1>{item.title}</h1>
           <h5>{item.category}</h5>
           <rating readonly={true} ratingValue={item.rating} size={20} />
           <h5>R {item.price}</h5>
           <p>{item.description}</p>
        </div>
    )
}

export default DescriptionProduct;