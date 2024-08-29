"use client";
import React,{ useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import ProductDetail from '../../componets/ProductDetail';

const ProductPage = ({params}) => {
    const router = useRouter();
    console.log("router",params)
    console.log("router2",router)
    const { id } = params;
    console.log("id",id)
    return <ProductDetail id={id} />;
    // return <ProductDetail />;
};

export default ProductPage;
