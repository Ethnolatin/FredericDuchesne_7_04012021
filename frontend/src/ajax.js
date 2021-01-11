// import React from 'react'

// Exécute un appel AJAX POST
export function ajaxPost(url, data) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.open("POST", url);
		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status >= 200 && request.status < 400) {
					resolve(JSON.parse(request.responseText));
				} else {
					reject(request.status + " " + request.statusText + " " + url);
				};
			};
		};
		request.setRequestHeader("Content-Type", "application/json");
		data = JSON.stringify(data);
		request.send(data);
	});
}