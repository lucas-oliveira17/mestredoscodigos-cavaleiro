import axios from "axios"

const PRIVATE_KEY = "ac99894488b5c2915b7dc09727bc570a"

//const PUBLIC_KEY = '30cb7eb871825d558abe440e5a02ff3269853ce0'

const getHeros = () => {
    return axios.get('https://gateway.marvel.com/v1/public/characters', {
        params: {
            apikey: PRIVATE_KEY
        }
    }).then(ret => ret.data.data.results);
}

export default getHeros