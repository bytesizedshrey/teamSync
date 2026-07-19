import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../config/axiosInstance";

let loginEmployee = createAsyncThunk(
    "auth/login",
    async (credentials,thunkApi) =>{
        try {
            let res = await axiosInstance.post("/auth/login",creadentials)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)