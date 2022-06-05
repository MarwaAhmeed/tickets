import { axiosInstance } from "../../network/axios";

export const login = async (user) => await axiosInstance.post("/auth/login", user);
export const register = async (user) =>await axiosInstance.post("/customer/register", user);
   