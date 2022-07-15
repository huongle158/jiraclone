import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../components/Home/Header/Header';


export const HomeTemplate = (props) => {
    const { children, ...restParam } = props;
    return <>
        Hello
        {children}
    </>
}