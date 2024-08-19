import axios from 'axios';

export const saveConstitute = (payload) => {
    return axios.post("http://localhost:8087/api/v2/post", payload)
}

export const getAllConstitute=()=>{
    return axios.get("http://localhost:8087/api/v2/get/constitute")
}