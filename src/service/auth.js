import axios from "axios";

export default class AuthService {
    signedIn(email, password) {
        return axios.post("http://localhost:8080/api/authentication/sign-in", { email: email, password: password })

    }

    signedUp(email, password) {
        return axios.post("http://localhost:8080/api/authentication/sign-in", { email: email, password: password })

    }
}