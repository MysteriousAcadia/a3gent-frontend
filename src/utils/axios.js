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
  // Transform messages to [{user:"user",text:message},{user:"agent",text:response}]
  const messages = response.data.data.messages.flatMap(
    ({ message, response }) => [
      { sender: "user", text: message },
      { sender: "agent", text: response },
    ]
  );
  return messages;
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
const addTool = async (toolData) => {
  const token = await getIdToken(auth.currentUser);
  const response = await axios.post(`${baseURL}/user/addTool`, toolData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const searchTools = async (query, myTools = false) => {
  const token = await getIdToken(auth.currentUser);
  const response = await axios.get(
    `${baseURL}/user/tools/search?q=${query}&myTools=${myTools}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data.tools;
};
const executeTool = async (toolId, parameters = {}, sessionId = "") => {
  const token = await getIdToken(auth.currentUser);
  const response = await axios.post(
    `${baseURL}/user/tools/external-execute`,
    {
      url: `${baseURL}/user/tools/execute`,
      body: {
        toolId,
        parameters,
        sessionId,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

export {
  getAccount,
  topup,
  getChatHistory,
  sendChatMessage,
  addTool,
  searchTools,
  executeTool,
};
