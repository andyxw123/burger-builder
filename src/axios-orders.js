import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-65f4e-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;