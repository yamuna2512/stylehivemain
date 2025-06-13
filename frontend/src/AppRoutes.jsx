import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import Cart from './containers/Cart';
import Checkout from './containers/Checkout';
import Homepage from './containers/Homepage';
import Landing from './containers/Landing';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import ThankYou from './containers/ThankYou';

import { fetchUserFromLocalStorage } from './reducks/users/operations';
import { getUser } from './reducks/users/selectors';

const Router = () => {

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const user = getUser(selector);
    const token = user?.token;
    console.log("router render")
    useEffect(() => {
        dispatch(fetchUserFromLocalStorage());
        // eslint-disable-next-line
    }, []);

    return (
        <Routes>
            <Route path="/" element={token ? <Homepage /> : <Landing />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thank-you" element={<ThankYou />} />
            {/* Optional fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default Router;
