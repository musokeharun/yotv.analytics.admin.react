import jwtDecode from "jwt-decode";
import http, {apiUrl} from "./http";
import {store} from '../store';

const apiEndpoint = apiUrl + "auth";
const tokenKey = "ADMIN_TOKEN_KEY";

http.setJwt(getJwt());

export async function login(email, password) {
    try {
        const {data: jwt} = await http.post(apiEndpoint + "/login", {email, password});
        sessionStorage.setItem(tokenKey, jwt);
        http.setJwt(jwt);
        return jwtDecode(jwt);
    } catch (e) {
        return null;
    }

}

export function loginWithJwt(jwt) {
    sessionStorage.setItem(tokenKey, jwt);
}

export function logout() {
    sessionStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        let state = store.getState();
        let selector = state['auth']['user'];
        if (!selector) {
            let token = sessionStorage.getItem(tokenKey);
            selector = jwtDecode(token);
        }
        return selector;
    } catch (ex) {
        return null;
    }
}

export function getJwt() {
    return sessionStorage.getItem(tokenKey);
}

export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt
};