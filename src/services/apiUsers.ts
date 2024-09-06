import axios from "axios";
import { getToken } from "@/utils/getToken";

export const client = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const addNewMentor = async (name: string, email: string, cpf: string) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` },
    };
    await client.post(
      "/mentors",
      {
        name,
        email,
        cpf,
      },
      config
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { addNewMentor };
