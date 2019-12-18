import React, { useState, useEffect } from 'react'
import gigService from'../services/gigs';
import '../style/basic.scss';

const Gig = ({gig}) => {
    return(
    <div className="col-3 col-sm-3 col-md-3" >
        <img className="py-5" src={gig.img} alt={gig.name}/>
        <div className="pt-4">
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
    const [newGig, setNewGig] = useState('') 
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

    const handleGigChange = (event) => {
        console.log(event.target.value)
        setNewGig(event.target.value)
    }

    const addGig = (event) => {
        event.preventDefault()
        const gigObject = {
            name: newGig,
            date: new Date().toISOString(),
            id: gigs.length + 1,
        }

        setGigs(gigs.concat(gigObject))
        setNewGig('')
    }

    return (
        <div className="row">
            <div>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'tags' : 'all'}
            </button>
            </div>
            {gigsToShow.map(gig => <Gig key={gig.id} gig={gig}/>)}

        </div>
    )

}
export default Gigs;

