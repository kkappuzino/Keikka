import React, { useState, useEffect } from 'react'
import gigService from'../services/gigs';
import '../style/basic.scss';

const Gig = ({gig}) => {
    return(
    <div className="col-4 col-sm-4 col-md-4 box" >
        <img className="py-5" src={gig.image} alt={gig.name}/>
        <div className="pt-4 info">
            <h2>{gig.name}</h2>
            <h3>{gig.date}</h3>
            <br/>
            <p>{gig.desc}</p>
            <p>{gig.tags}</p>

            
        </div>
    </div>
    )
}



const Gigs = () => {
    const [gigs, setGigs] = useState([]) 
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        
        gigService
            .getAll()
            .then(allGigs =>{
                console.log('effect')
                console.log(allGigs)
                setGigs(allGigs)
            })
    }, [])

    const gigsToShow = showAll
    ? gigs
    : gigs.filter(gig => gig.tags.includes('music'))

    return (
        <div className="row">
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'tags' : 'all'}
                </button>
            </div>
            <div>
                {gigsToShow.map(gig => <Gig key={gig.id} gig={gig}/>)}
            </div>

        </div>
    )

}
export default Gigs;

