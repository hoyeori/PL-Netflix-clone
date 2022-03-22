import axios from "axios";

const instance = axios.create({

    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "2782965201eeb6af9dcd99273688e02e",
        language: "ko-KR",
    },

});

export default instance;