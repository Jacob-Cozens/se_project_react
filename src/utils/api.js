const baseUrl = "http://localhost:3001";

function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  Promise.reject(`Error: ${res.status}`);
}

const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return processResponse(res);
  });
};

const addItems = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      name: name,
      link: imageUrl,
      weather: weather,
    }),
  }).then(processResponse);
};

const deleteItem = (selectedCard) => {
  return fetch(`${baseUrl}/items/${selectedCard._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => {
    return processResponse(res);
  });
};

export { getItems, addItems, deleteItem, processResponse };
