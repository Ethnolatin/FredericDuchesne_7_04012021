import axios from 'axios'

export const createItem = async (url, token, data) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/api/' + url,
            data: data,
            headers: { 'Authorization': 'Bearer ' + token }
        })
        console.log(response.data.message)
        return response.data
    } catch (err) {
        console.log({ err })
    }
}

export const getAllItems = async (url, token) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:3000/api/' + url,
            headers: { 'Authorization': 'Bearer ' + token }
        })
        return response.data
    } catch (err) {
        console.log('erreur: ', { err })
    }

}

export const updateItem = async (url, token, data, Id) => {
    try {
        const response = await axios({
            method: 'put',
            url: 'http://localhost:3000/api/' + url + Id,
            data: data,
            headers: { 'Authorization': 'Bearer ' + token }
        })
        console.log(response.data.message)
        return response.data
    } catch (err) {
        console.log({ err })
    }
}

export const deleteItem = async (url, token, Id) => {
    try {
        const response = await axios({
            method: 'delete',
            url: 'http://localhost:3000/api/' + url + Id,
            headers: { 'Authorization': 'Bearer ' + token }
        })
        console.log(response.data.message)
        return response.data
    } catch (err) {
        console.log({ err })
    }
}
