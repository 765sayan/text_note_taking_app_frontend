import { LOGIN_URL, REGISTER_URL, GET_USER_URL } from "../../constants/apiUrls";

export const loginService = async (user) => {
  let response = await fetch(LOGIN_URL, {
    method: "POST",
    body: JSON.stringify(user),
  });
  response = await response.json();
  return response;
};

export const registerService = async (user) => {
  let response = await fetch(REGISTER_URL, {
    method: "POST",
    body: JSON.stringify(user),
  });
  response = await response.json();
  return response;
};

export const getUserService = async (Input) => {
  let response = await fetch(`${GET_USER_URL}${Input.id}`);
  response = await response.json();
  return response;
};
