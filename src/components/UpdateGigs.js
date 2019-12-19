import React, { useState, useEffect } from 'react'
import gigService from'../services/gigs';
import '../style/basic.scss';

const UpdateGigs = ({UpdateGigs}) => {
    const [gigs, setGigs] = useState([]) 
    const [showAll, setShowAll] = useState(true)
    const [newGig, setNewGig] = useState('') 
    const [newDesc, setNewDesc] = useState('') 
    const [newImg, setNewImg] = useState('') 

    useEffect(() => {
        
        gigService
            .getAll()
            .then(allGigs =>{
                console.log('effect')
                console.log(allGigs)
                setGigs(allGigs)
            })
    }, [])


    const handleGigChange = (event) => {
        console.log(event.target.value)
        setNewGig(event.target.value)
        setNewDesc(event.target.value)
        setNewImg(event.target.value)
    }

    const addGig = (event) => {
        event.preventDefault()
        const gigObject = {
            name: newGig,
            desc: newDesc,
            date: new Date().toISOString(),
            image: newImg,
            id: gigs.length + 1,
        }

        setGigs(gigs.concat(gigObject))
        setNewGig('')
        setNewDesc('')
        setNewImg('')
    }

    return(
        <form onSubmit={addGig}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleGigChange}/>
        </label>
        <label>
          Description:
          <input type="text" value={desc} onChange={handleGigChange}/>
        </label>
        <label>
          Image:
          <input type="link" value={image} onChange={handleGigChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    )
}
export default UpdateGigs;