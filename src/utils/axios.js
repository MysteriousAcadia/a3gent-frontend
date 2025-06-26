import axios from "axios";
import { getAuth, getIdToken } from "firebase/auth";

const auth = getAuth();
// const baseURL = "https://cdp-hackathon-backend.onrender.com/api";
const baseURL = "https://fcd7-223-185-133-30.ngrok-free.app/api";

const getAccount = async () => {
  const token = await getIdToken(auth.currentUser);
  const response = await axios.get(`${baseURL}/user/getAccount`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const topup = async (amount) => {
  const token = await getIdToken(auth.currentUser);
  const response = await axios.post(
    `${baseURL}/user/topup`,
    {
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const getChatHistory = async () => {
  const token = await getIdToken(auth.currentUser);
  const response = await axios.get(`${baseURL}/chat/history`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const sendChatMessage = async (message) => {
  const token = await getIdToken(auth.currentUser);
  const response = await axios.post(
    `${baseURL}/user/chat`,
    {
      message,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
export { getAccount, topup, getChatHistory, sendChatMessage };
