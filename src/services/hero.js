import axios from "axios"

const PRIVATE_KEY = "ac99894488b5c2915b7dc09727bc570a"

//const PUBLIC_KEY = '30cb7eb871825d558abe440e5a02ff3269853ce0'

const getHeroes = (heroesQuantity) => {
    return axios.get('https://gateway.marvel.com/v1/public/characters', {
        params: {
            apikey: PRIVATE_KEY,
            orderBy: '-modified',
            limit: heroesQuantity
        }
    }).then(ret => {
        return ret.data.data.results
    }).catch((err) => {
        console.log(err.status)
        return err;
    });
}

export default getHeroes