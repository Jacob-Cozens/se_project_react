import { baseUrl, processResponse } from "./constants";

const register = ({ email, password, name, avatar }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
      avatar,
    }),
  }).then((res) => {
    return processResponse(res);
  });
};

const authorize = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => {
    return processResponse(res);
  });
};

const auth = { register, authorize };

export default auth;
