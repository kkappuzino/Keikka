import React from 'react';
import '../style/basic.scss';
import Products from './Products';
import pinimg from '../img/pin.jpg';
import hodimg from '../img/hoodie.jpg';
import shimg from '../img/shirt.jpg';
import mimg from '../img/mug.jpg';



const added = [{name:"", Q:""}];

export default function Page() {
    return(
        <div className="container-fluid">
            <Products products={products}/>

        </div>

    )


}