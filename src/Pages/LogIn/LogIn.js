import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LogIn } from "../../Actions/authActions";
import NavBar from "../../Components/NavBar/NavBar";

const Login = ()=>{
    const {isAuthenticated} = useSelector((state)=>state.authReducer)
    const dispatch = useDispatch();
    const [loged, setLoged] = useState(isAuthenticated);
    const[formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData;

    const onChange = e=>setFormData({...formData,[e.target.name]:e.target.value});

    const onClick = ()=>{
        dispatch(Login(email, password))
    }

    useEffect(()=>{
        if(isAuthenticated){
            window.location.replace('/profile')
        }
    }, [dispatch, isAuthenticated])
    return(
        <div>
            <NavBar/>
            <div>
                <input type="text" 
                name="email" 
                placeholder="Email" 
                value={email}
                onChange={e=>onChange(e)}
                required />
            </div>

            <div>
                <input type="text" 
                name="password" 
                placeholder="Password" 
                value={password}
                onChange={e=>onChange(e)}
                required />
            </div>
            <div>
                <button onClick={{onClick}}>LogIn</button>
            </div>
            <div>
                <h3>Don't have an account?</h3>
                <Link to={'/signup'}>
                    <span>Register Here</span>
                </Link>
            </div>
        </div>
    )
}

export default Login;