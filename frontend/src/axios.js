import axios from 'axios'

export const createItem = async (url, token, userId, data) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/api/' + url,
            params: { userId },
            data: data,
            headers: { 'Authorization': 'Bearer ' + token }
        })
        console.log(response.data.message)
        return response.data
    } catch (err) {
        console.log({ err })
    }
}

export const getAllItems = async (url, token, userId) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:3000/api/' + url,
            params: { userId },
            headers: { 'Authorization': 'Bearer ' + token }
        })
        return response.data
    } catch (err) {
        console.log('erreur: ', { err })
    }

}

export const getSomeItems = async (url, token, userId, Id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:3000/api/' + url + Id,
            params: { userId },
            headers: { 'Authorization': 'Bearer ' + token }
        })
        return response.data
    } catch (err) {
        console.log('erreur: ', { err })
    }
}

export const updateItem = async (url, token, userId, data, Id) => {
    try {
        const response = await axios({
            method: 'put',
            url: 'http://localhost:3000/api/' + url + Id,
            data: data,
            params: { userId },
            headers: { 'Authorization': 'Bearer ' + token }
        })
        console.log(response.data.message)
        return response.data
    } catch (err) {
        console.log({ err })
    }
}

export const deleteItem = async (url, token, userId, Id) => {
    try {
        const response = await axios({
            method: 'delete',
            url: 'http://localhost:3000/api/' + url + Id,
            params: { userId },
            headers: { 'Authorization': 'Bearer ' + token }
        })
        console.log(response.data.message)
        return response.data
    } catch (err) {
        console.log({ err })
    }
}

export const likeItem = async (url, token, userId, item, like) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/api/' + url + item.Id + '/like',
            data: {
                userId: userId,
                like: like
            },
            params: userId,
            headers: { 'Authorization': 'Bearer ' + token }
        })
        console.log(response.data.message)
        return response.data
    } catch (err) {
        console.log({ err })
    }
}