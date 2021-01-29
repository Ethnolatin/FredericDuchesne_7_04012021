// Exécute un appel AJAX GET
export function ajaxGet(url, token) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.open('GET', url)
		request.setRequestHeader('Authorization', 'Bearer ' + token)
		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status >= 200 && request.status < 400) {
					resolve(JSON.parse(request.responseText))
				} else {
					reject(request.status + ' ' + request.statusText + ' ' + url)
				}
			}
		}
		request.send()
	})
}

// Exécute un appel AJAX POST
export function ajaxPost(url, data, token) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.open('POST', url)
		request.setRequestHeader('Authorization', 'Bearer ' + token)
		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status >= 200 && request.status < 400) {
					resolve(JSON.parse(request.responseText))
				} else {
					reject(request.status + ' ' + request.statusText + ' ' + url)
				}
			}
		}
		request.setRequestHeader('Content-Type', 'application/json')
		data = JSON.stringify(data)
		console.log('data: ', data)
		request.send(data)
	})
}

// Exécute un appel AJAX PUT
export function ajaxPut(url, data, token) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.open('PUT', url)
		request.setRequestHeader('Authorization', 'Bearer ' + token)
		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status >= 200 && request.status < 400) {
					resolve(JSON.parse(request.responseText))
				} else {
					reject(request.status + ' ' + request.statusText + ' ' + url)
				}
			}
		}
		request.setRequestHeader('Content-Type', 'application/json')
		data = JSON.stringify(data)
		request.send(data)
	})
}

// Exécute un appel AJAX DELETE
export function ajaxDelete(url, token) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.open('DELETE', url)
		request.setRequestHeader('Authorization', 'Bearer ' + token)
		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status >= 200 && request.status < 400) {
					resolve(JSON.parse(request.responseText))
				} else {
					reject(request.status + ' ' + request.statusText + ' ' + url)
				}
			}
		}
		request.send()
	})
}
