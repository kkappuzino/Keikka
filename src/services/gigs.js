import axios from 'axios';

const baseUrl = 'http://localhost:3001/gigs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add = newGig => {
    const request = axios.post(baseUrl, newGig)
    return request.then(response => response.data)
}



const update = (id, updatedGig) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedGig)
    return request.then(response => response.data)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll: getAll,
    add: add,
    update: update,
    remove: remove
}