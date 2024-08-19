import axios from "axios"


export const getAllConstitute = () => {
    return axios.get("http://localhost:8087/api/v2/get/constitute");
}

export const createVoter = (request) => {
    return axios.post("http://localhost:8087/api/v2/voter", request);
}

export const getAllVoter = () => {
    return axios.get("http://localhost:8087/api/v2/get/voter");
}