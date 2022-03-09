/* eslint-disable no-throw-literal */
import { NewFormattedPaymentDataType } from "./app-types";

interface FormDataInterface {
  username: string;
  password: string;
  grant_type: string;
}

export const getAuthToken = () => {
  const hasToken = localStorage.getItem("token");
  if (hasToken) {
    return hasToken;
  }

  const tokenData = {
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD,
    grant_type: process.env.REACT_APP_GRANT_TYPE,
  };
  const formData = new FormData();

  let appendedKey: keyof FormDataInterface;
  for (appendedKey in tokenData) {
    const appendedData = tokenData[appendedKey];
    if (appendedData) {
      formData.append(appendedKey, appendedData);
    }
  }

  return fetch(`${process.env.REACT_APP_URL}/auth/login`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("token", res.accessToken);
      return res.accessToken;
    })
    .catch(() => {
      throw "No auth token :(";
    });
};

export const getData = async (token: string) => {
  return fetch(`${process.env.REACT_APP_URL}/payments`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then(({ data }) => data)
    .catch(() => {
      throw "Can't get data :(";
    });
};

export const getAllPaymentDetails = async (
  data: NewFormattedPaymentDataType[],
  token: string
) => {
  try {
    return await Promise.all(
      data.map((paymentData) => getPaymentDetails(token, paymentData.id))
    );
  } catch (error) {
    return error;
  }
};

export const getPaymentDetails = (token: string, paymentId: string) => {
  return fetch(`${process.env.REACT_APP_URL}/payments/${paymentId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
};
