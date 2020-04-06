import React, { useState, useEffect } from 'react'
import gigService from '../services/gigs';
import '../style/basic.scss';



const UpdateGigs = ({ UpdateGigs }) => {
    const [gigs, setGigs] = useState([])
    const [newGig, setNewGig] = useState({ name: '', desc: '', image: '', tags: '' });

    useEffect(() => {

        gigService
            .getAll()
            .then(allGigs => {
                console.log('effect')
                console.log(allGigs)
                setGigs(allGigs)
            })
    }, [])


    const handleGigChange = (event, type) => {
        console.log(event.target.value)
        const tempGig = { ...newGig };
        tempGig[type] = event.target.value;
        setNewGig(tempGig);
    }

    const addGig = (event) => {
        event.preventDefault()
        console.log(newGig)
        const gigObject = {
            name: newGig.name,
            desc: newGig.desc,
            date: new Date().toISOString(),
            image: newGig.image,
            tags: [newGig.tags]
        }

        gigService
            .add(gigObject)
            .then(addGigs => {
                console.log('effect')
                console.log(addGigs)
                setGigs(gigs.concat(addGigs))
            })
    }

    const remove = id => {
        let tempGig = gigs.filter(gig => gig.id !== id);
        gigService
            .remove(id)
            .then(() => {
                console.log('effect')
                setGigs(tempGig)
            })
    }

    return (
        <div>
            <form onSubmit={addGig}>
                <label>
                    Name:
                    <input type="text" placeholder="name" value={newGig.name} onChange={e => handleGigChange(e, "name")} />
                </label>
                <label>
                    Description:
                    <input type="text" placeholder="description" value={newGig.desc} onChange={e => handleGigChange(e, "desc")} />
                </label>
                <label>
                    Image:
                    <input type="text" placeholder="image link" value={newGig.image} onChange={e => handleGigChange(e, "image")} />
                </label>
                <label>
                    Tags :
                    <input type="text" placeholder="tag" value={newGig.tags} onChange={e => handleGigChange(e, "tags")} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <Gigs gigs={gigs} setGigs={setGigs} remove={remove}/>
        </div>
    )
}


const Gig = ({ gig, remove }) => {

    return (
        <div className="col-4 col-sm-4 col-md-4 box" >
            <img className="py-5" src={gig.image} alt={gig.name} />
            <div className="pt-4 info">
                <h2>{gig.name}</h2>
                <h3>{gig.date}</h3>
                <br />
                <p>{gig.desc}</p>
                <p>{gig.tags}</p>

                <button onClick={e => remove(gig.id)} type="submit">Poista</button>
            </div>
        </div>
    )
}



const Gigs = ({gigs, setGigs, remove}) => {
    const [showAll, setShowAll] = useState(true)

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
                {gigsToShow.map(gig => <Gig key={gig.id} gig={gig} remove={remove} />)}
            </div>

        </div>
    )

}
export default UpdateGigs;