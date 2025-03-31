const baseUrl = "http://localhostL3007";

_processResponse(res);
{
  if (res.ok) {
    return res.json();
  }
  Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(this._processResponse);
}

export { getItems };
