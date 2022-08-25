import'./ProductLayout.css'


const ProductLayout = ({children, category})=>{
    return(
        <div>
           <h1>{category}</h1>
           <div className='plContainer'>
            {children}
           </div>
        </div>
    )
}

export default ProductLayout;