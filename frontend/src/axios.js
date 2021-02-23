import axios from 'axios'

export const createItem = (url, token, data) => {
    axios({
        method: 'post',
        url: 'http://localhost:3000/api/' + url,
        data: data,
        headers: {'Authorization': 'Bearer ' + token}
    })
    .then ((response) => {
        console.log(response.data.message)
        return response.data
    })
    .catch((err) => {
        console.log({err})
    })
}

export const getAllItems = (url, token) => {
    return axios({
        method: 'get',
        url: 'http://localhost:3000/api/' + url,
        headers: {'Authorization': 'Bearer ' + token}
    })
    .then ((response) => {
        return response.data
    })
    .catch((err) => {
        console.log('erreur: ',{err})
    })

}

export const updateItem = (url, token, data, Id) => {
    axios({
        method: 'put',
        url: 'http://localhost:3000/api/' + url + Id,
        data: data,
        headers: {'Authorization': 'Bearer ' + token}
    })
    .then ((response) => {
        console.log(response.data.message)
        return response.data
    })
    .catch((err) => {
        console.log({err})
    })
}

export const deleteItem = (url, token, Id) => {
    axios({
        method: 'delete',
        url: 'http://localhost:3000/api/' + url + Id,
        headers: {'Authorization': 'Bearer ' + token}
    })
    .then ((response) => {
        console.log(response.data.message)
        return response.data
    })
    .catch((err) => {
        console.log({err})
    })
}
