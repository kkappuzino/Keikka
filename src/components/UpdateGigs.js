import React, { useState, useEffect } from 'react'
import gigService from'../services/gigs';
import '../style/basic.scss';



const UpdateGigs = ({UpdateGigs}) => {
    const [gigs, setGigs] = useState('') 
    const [newGig, setNewGig] = useState('') 
    const [newDesc, setNewDesc] = useState('') 
    const [newImg, setNewImg] = useState('') 
    const [newTags, setNewTags] = useState('') 

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
        setNewTags(event.target.value)
    }

    const addGig = (event) => {
        event.preventDefault()
        const gigObject = {
            id: gigs.length + 1,
            name: newGig,
            desc: newDesc,
            date: new Date().toISOString(),
            image: newImg,
            tags: newTags
        }

        gigService
        .add(gigObject)
        .then(addGigs =>{
            console.log('effect')
            console.log(addGigs)
            setGigs(gigs.concat(addGigs))
        })
    }

    return(
        <form onSubmit={addGig}>
            <label>
                Name:
                <input type="text" placeholder="name" value={addGig.name} onChange={handleGigChange}/>
            </label>
            <label>
                Description:
                <input type="text" placeholder="description" value={addGig.desc} onChange={handleGigChange}/>
            </label>
            <label>
                Image:
                <input type="text" placeholder="image link" value={addGig.image} onChange={handleGigChange}/>
            </label>
            <label>
                Tags :
                <input type="text" placeholder="tag" value={addGig.tags} onChange={handleGigChange}/>
            </label>
            <input type="submit" value="Submit"/>
         </form>
    )
}
export default UpdateGigs;