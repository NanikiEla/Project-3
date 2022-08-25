import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../Actions/authActions";
import NavBar from "../../Components/NavBar/NavBar";
import { Link } from "react-router-dom";

const SignUp = ()=>{
    const {isAuthenticated} = useSelector((state)=>state.authReducer);
    const dispatch = useDispatch();

    const[formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirm_password: '',
    })

    const {username, email, phone, address, password, confirm_password} = formData;

    const onChange = e=>setFormData({...formData,[e.target.name]:e.target.value});

    const onClick = ()=>{
        dispatch(register({
            username: username,
            email: email,
            phone: phone,
            address: address,
            password: password, 
        }))
    }

    useEffect(()=>{
        if(isAuthenticated){
            window.location.replace('/profile')
        }
    }, [dispatch, isAuthenticated])

    return(
        <div>
            <NavBar />
            <form onSubmit={onClick}>
                <div>
                    <input type="text" 
                    name="username" 
                    value={username} 
                    placeholder="Username"
                    onChange={e=>onChange(e)}
                    required
                    />
                </div>

                <div>
                    <input type="text" 
                    name="email" 
                    value={email}
                    placeholder="Email"
                    onChange={e=>onChange(e)}
                    required
                    />
                </div>

                <div>
                    <input type="text" 
                    name="address" 
                    value={address}
                    placeholder="Address"
                    onChange={e=>onChange(e)}
                    required
                    />
                </div>

                <div>
                    <input type="number" 
                    name="phone" 
                    value={phone}
                    placeholder="Phone"
                    onChange={e=>onChange(e)}
                    required
                    />
                </div>

                <div>
                    <input type="password" 
                    name="password" 
                    value={password}
                    placeholder="Password"
                    onChange={e=>onChange(e)}
                    required
                    />
                </div>

                <div>
                    <input type="password" 
                    name="confirm_password" 
                    value={confirm_password}
                    placeholder="Confirm Password"
                    onChange={e=>onChange(e)}
                    required
                    />
                </div>
                <button>Sign Up</button>

                <div>
                <h3>Have an account?</h3>
                <Link to={'/login'}>
                    <span>LogIn Here</span>
                </Link>
            </div>
            </form>
        </div>
    )
}

export default SignUp;