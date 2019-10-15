import axios from 'axios';

const api = axios.create({
    baseURL: 'https://contack-keeper.herokuapp.com',
})

export default api