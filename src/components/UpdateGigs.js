import React, { useState, useEffect } from 'react'
import gigService from'../services/gigs';
import '../style/basic.scss';



const UpdateGigs = ({UpdateGigs}) => {
    const [gigs, setGigs] = useState('') 
    const [newGig, setNewGig] = useState({name:'', desc:'', image:'',tags:''});
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


    const handleGigChange = (event, type) => {
        console.log(event.target.value)
        const tempGig = {...newGig};
        tempGig[type] = event.target.value;
        setNewGig(tempGig);
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
        <div>
            <form onSubmit={addGig}>
                <label>
                    Name:
                    <input type="text" placeholder="name" value={addGig.name} onChange={e => handleGigChange(e, "name")}/>
                </label>
                <label>
                    Description:
                    <input type="text" placeholder="description" value={addGig.desc} onChange={e => handleGigChange(e, "desc")}/>
                </label>
                <label>
                    Image:
                    <input type="text" placeholder="image link" value={addGig.image} onChange={e => handleGigChange(e, "image")}/>
                </label>
                <label>
                    Tags :
                    <input type="text" placeholder="tag" value={addGig.tags} onChange={e => handleGigChange(e, "tags")}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
          
         </div>
    )
}


const Gig = ({gig}) => {
    const [removeGigs] = useState([]) 
    gigService
    .remove()
    .then(removeGig =>{
        console.log('effect')
        console.log(removeGig)
        removeGigs(removeGig)
    }) 
    const remove = id => {
        tempGig = myGigs.filter(gig => gig.id != id);
        setMyGig(tempGig);
    }
    return(
    <div className="col-4 col-sm-4 col-md-4 box" >
        <img className="py-5" src={gig.image} alt={gig.name}/>
        <div className="pt-4 info">
            <h2>{gig.name}</h2>
            <h3>{gig.date}</h3>
            <br/>
            <p>{gig.desc}</p>
            <p>{gig.tags}</p>

            <button onSubmit={remove} type="submit"></button>
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
export default UpdateGigs;