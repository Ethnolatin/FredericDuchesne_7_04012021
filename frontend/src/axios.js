import axios from 'axios'
const port = process.env.REACT_APP_SERVER_PORT || 3002
const urlPrefix = 'http://localhost:' + port

export const logUser = async (url, data) => {
    try {
        const response = await axios({
            method: 'post',
            url: urlPrefix + '/api/user/' + url,
            data: data,
        })
        return response.data
    } catch (err) {
        const message = (url === 'login') ? 
            {errorMessage: 'Identifiants non reconnus'}
            : {errorMessage: 'Erreur - Inscription impossible'}
        return message
    }
}

export const createItem = async (url, token, userId, data) => {
    try {
        const response = await axios({
            method: 'post',
            url: urlPrefix + '/api/' + url,
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
            url: urlPrefix + '/api/' + url,
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
            url: urlPrefix + '/api/' + url + Id,
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
            url: urlPrefix + '/api/' + url + Id,
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
            url: urlPrefix + '/api/' + url + Id,
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
            url: urlPrefix + '/api/' + url + item.Id + '/like',
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