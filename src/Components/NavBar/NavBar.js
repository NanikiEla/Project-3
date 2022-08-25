import'./NavBar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react'
import { getCart } from "../../Actions/cartAction"

let tokenParse = [];
let tokenReady = false;

const NavBar = ()=>{
    const {cart, loading} = useSelector((state)=>state.cartReducer)
    const {token} = useSelector((state)=>state.authReducer)

    const dispatch = useDispatch();

    const [keyword, setKeyword] = useState(" ");

    const navigate = useNavigate();

    const search = (e, actionKey)=>{
        if(actionKey === 'Pressed Enter'){
            if(e.keyCode === 13){
                navigate('/product', {state:{keyword:keyword, category:''}});
            }
        }else{
            navigate('/product', {state:{keyword, category: ''}});
        }
    }

    useEffect(()=>{
        if(token !== null && token !== 'Undefined'){
            tokenParse = JSON.parse(token);
            tokenReady = (token !== null && token !== 'Undefined');
            dispatch(getCart(tokenParse?.id))
        }
    }, [dispatch, token])
    return(
        <div className='navContainer'>
            <Link to={'/'}>
                <div className='logo'>
                    <img src='https://ceosearchpartners.com/wp-content/uploads/2015/07/Sola-logo.png' alt='logo' />
                </div>
            </Link>
            <div className='search'>
                <input onKeyDown={e=>search(e, 'Pressed Enter') } type="text" name='search' value={keyword} 
                onChange={e=>setKeyword(e.target.value)} 
                />
                <img onClick={e=>search(e, "")} src='https://www.pngfind.com/pngs/m/319-3196157_research-data-and-insights-search-icon-png-transparent.png' alt='search-icon' />
            </div>
            <div className='cartContainer'>
                <Link to={'/LogIn'} style={{textDecoration: 'none', color:'black'}}>
                    <div className='login_signup'>
                        {tokenReady?<img src='https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png' alt='user-icon' /> : <span>LogIn</span>}
                    </div>
                </Link>
                <div className='cart'>
                    <Link to={'/cartView'} state={{cartId:cart?.id}}>
                        <img src='https://flyclipart.com/thumb2/shopping-cart-png-icon-free-download-301486.png' alt='cart-icon' />
                    </Link>
                    {!loading?tokenReady?cart?.quantity !== 0?
                    <div className='bubble'>
                        <span>{cart?.quantity}</span>
                        </div>:<span></span>:<span></span>:<span>Loading. . .</span>}
                </div>
            </div>
        </div>
    )
}

export default NavBar;