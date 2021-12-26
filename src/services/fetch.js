const SendRequest = (url, options) => {
  return fetch(url, options);
}

const BindPayload = (url, body, auth, method) => {
  const myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append(
    'Content-Type',
    auth ? 'application/x-www-form-urlencoded' : 'application/json'
  );
  const options = {
    method,
    headers: myHeaders,
    body: JSON.stringify(body)
  };

  return SendRequest(url, options);
}

const get = async (url, queryParams = null) => {
  url = process.env.REACT_APP_SERVER_URL + url;

  const myHeaders = new Headers();
  const options = {
    headers: myHeaders
  };
  const res = queryParams
    ? await fetch(`${url}?${queryParams}`, options)
    : await fetch(url, options);

  return await res.json();
};

const post = (url, body, auth = false) => {
  url = process.env.REACT_APP_SERVER_URL + url;
  return BindPayload(url, body, auth, 'POST');
};

const put = (url, body, auth = false) => {
  url = process.env.REACT_APP_SERVER_URL + url;;
  return BindPayload(url, body, auth, 'PUT');
};

export {
  get,
  post,
  put
};
