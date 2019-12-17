import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../style/basic.scss';
import '../App';


export default function Gigs (props){
    const [gigs, setGigs] = useState([]) 
    const [newGig, setNewGig] = useState('') 
    const [showAll, setShowAll] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3000/gigs')
            .then(response => {
            setGigs(response.json)
            })
    }, [])

    const gigsToShow = showAll
    ? gigs
    : gigs.filter(gig => {
        return gig.tags.includes ='music';
    });

    const rows = () => gigsToShow.map(gig =>
        <Gig/>
    )


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
            {rows()}
        </div>
    )

}


const Gig = (props) => {
    return(
        <div className="col-3 col-sm-3 col-md-3 box" >
            <img className=" py-5" src={props.gig.img} alt={props.gig.name}/>
            <div className="info pt-4">
                <h2>{props.gig.name}</h2>
                <h3>{props.gig.desc}</h3>
                <br/>
                <p>{props.gig.date}</p>
            </div>
        </div>
    )
}

