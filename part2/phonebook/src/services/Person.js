import axios from 'axios';

const urlBase = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(urlBase);
    return request.then(response => response.data);
}

const create = (personObj) => {
    const request = axios.post(urlBase, personObj)
    return request.then(response => response.data);
}

const remove = (id) => {
    const request = axios.delete(`${urlBase}/${id}`)
    return request.then(response => response.data)
}

const update = (personObj, id) => {
    const request = axios.put(`${urlBase}/${id}`, personObj)
    return request.then(response => response.data)
}

export default {getAll, create, remove, update}