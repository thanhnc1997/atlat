export function create_element(e) {
	return document.createElement(e);
}

export async function fetch_data(params) {
	let {method, url, callback, body, auth, api_key} = params;
	try {
		const response = await fetch(url, {
			method: method,
			body: JSON.stringify(body),
			headers: {
        'Content-Type': 'application/json',
        Authorization: auth
      }
		});
		
		const data = await response.json();
		
		if (callback) await callback(data);
	}
	catch(error) {
		console.log(error);
	}
}