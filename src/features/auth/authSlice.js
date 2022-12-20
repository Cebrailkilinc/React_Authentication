import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    data: [],
    userToken: null,
    loading: false,
    isSuccess: false,
    error: "",
}



export const fetchUserFunc = createAsyncThunk("fetchUser", async () => {
    const response = await axios.get(
        "http://localhost:5000/users"
    )
    return response.data;
});

//LOGIN FUNCTIONS
export const fetchUserToken = createAsyncThunk("login/fetchUser", async (userData) => {
    console.log(userData.password)
    const response = await axios.post(
        "http://localhost:5000/login", { email: userData.email, password: userData.password }
    ).then(res => {
        localStorage.setItem("userToken", res.data.accsessToken)
        console.log(res.data)
    })
    return response.data;
});

//REGISTER FUNCTIONS
export const fetchUserRegister = createAsyncThunk("register/fetchUserRegister", async (userRegisterData) => {
    console.log(userRegisterData.password)
    const response = await axios.post(
        "http://localhost:5000/register", { firstName: userRegisterData.userName, email: userRegisterData.email, password: userRegisterData.password }
    ).then(res => {
        localStorage.setItem("userToken", res.data.accsessToken)
        console.log(res.data)
    })
    return response.data;
});

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {

        //GET ALL USERS
        builder.addCase(fetchUserFunc.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(fetchUserFunc.fulfilled, (state, action) => {
            state.loading = false;
            state.data.push(action.payload)
        })

        builder.addCase(fetchUserFunc.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })



        //POST TOKEN
        builder.addCase(fetchUserToken.pending, (state) => {
            state.loading = true
            state.isSuccess = false
        })

        builder.addCase(fetchUserToken.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true,
                state.userToken = action.payload
        })

        builder.addCase(fetchUserToken.rejected, (state, action) => {
            state.loading = false,
                state.isSuccess = false,
                state.error = action.error.message;
        })


        //USER REGISTER  
        builder.addCase(fetchUserRegister.pending, (state) => {
            state.loading = true
            state.isSuccess = false
        })

        builder.addCase(fetchUserRegister.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true,
                state.userToken = action.payload
        })

        builder.addCase(fetchUserRegister.rejected, (state, action) => {
            state.loading = false,
                state.isSuccess = false,
                state.error = action.error.message;
        })
    }
})

export default authSlice.reducer;