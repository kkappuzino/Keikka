import React from 'react';
import '../style/basic.scss';
import Gigs from './Gigs';
import Header from './Header';
 





export default function Page() {
    return(
        <div className="container-fluid">
            <Header/>
            <Gigs />

        </div>

    )


}