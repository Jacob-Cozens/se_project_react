import { processResponse } from "./Api";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.what2wear.crabdance.com"
    : "http://localhost:3001";

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

const getContent = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return processResponse(res);
  });
};

const auth = { register, authorize, getContent };

export default auth;
