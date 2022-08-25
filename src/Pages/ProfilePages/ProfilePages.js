import React from 'react';
import './profilePages.css';
import { useEffect, useState } from 'react';
import { LogOut } from "../../Actions/authActions";
import { getStore, getUser } from "../../Actions/userActions";
import NavBar from '../../Components/NavBar/NavBar';
import { useSelector, useDispatch } from 'react-redux';



const ProfilePages = ()=>{
    let tokenParse = [];
    let tokenReady = false;

    const {token} = useSelector((state)=>state.authReducer)
    const {user, store, isLoading} = useSelector((state)=>state.userReducer)

    const dispatch = useDispatch();
    const[showForm, setShowForm] = useState(false);
    const[storeCreated, setStoreCreated] = useState(false);

    const onClick =()=>{
        dispatch(LogOut());
        window.location.replace('/')
    }

    useEffect(()=>{
        if(token !== null && token !== 'Undefined'){
            tokenParse = JSON.parse(token);
            tokenReady = (token !== null && token !== 'Undefined');
            dispatch(getUser(tokenParse?.id));
            dispatch(getStore(tokenParse?.id));
        }
        if(!isLoading){
            if(store?.length !== 0){
                setStoreCreated(true);
            }
        }

    }, [dispatch, isLoading, store])
    return(
        <>
        <NavBar />
            <div className='profileContainer'>
                <h1>Hi {user?.name}</h1>
                <div>
                    <ul>
                        <li>Username : {isLoading?'Loading. . .':user?.username}</li>
                        <li>Email : {isLoading?'Loading. . .':user?.email}</li>
                        <li>Phone : {isLoading?'Loading. . .':user?.phone}</li>
                        <li>Address : {isLoading?'Loading. . .':user?.address}</li>
                    </ul>
                </div>
            </div>
            {/* <div>
                <h5>{storeCreated?'Your Login Has Been Created':''}</h5>
            </div> */}
        </>

    )
}

export default ProfilePages;