import axios from "axios";

const PROTOCOL = "http://";
const URL = "localhost:8000";

const instance = axios.create({
    baseURL: `${PROTOCOL}${URL}/api`,
    withCredentials: true, // 쿠키를 전송하도록 설정
});

export const postLogin = ({body}) => {
    return instance.post(`/login/`, body, {
        withCredentials: false,
    });
}

export const postLogout = () => {
    return instance.post('/logout/');
}

export const postSignup = ({body}) => {
    return instance.post(`/signup/`, body, {
        withCredentials: false,
    });
}
