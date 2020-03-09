import axios from "axios"

const PRIVATE_KEY = "ac99894488b5c2915b7dc09727bc570a"

const DEFAULT_HEROES_QUANTITY = 16

//const PUBLIC_KEY = '30cb7eb871825d558abe440e5a02ff3269853ce0'

const heroService = () => {
    return axios.get('https://gateway.marvel.com/v1/public/characters', {
        params: {
            apikey: PRIVATE_KEY,
            orderBy: '-modified',
            limit: DEFAULT_HEROES_QUANTITY
        }
    }).then(ret => {
        console.log('Api called!')
        return ret.data.data.results
    }).catch((err) => {
        return err;
    });
}

export default heroService