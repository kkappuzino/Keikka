import React from 'react';
import '../style/basic.scss';


export default function Header() {
    return(
        <div className="Nav">
            <list>
                <ul id="products">Products</ul>
                <ul id="popular">Most popular</ul>
                <ul id="cart" data-toggle="Cart">Cart</ul>
            </list>
        </div>
    )
}