import { doLoginStrapi } from '../services/api';

const useStrapiAuth = () => {
    const strapiLogin = async () => {
        const res = await doLoginStrapi();
        if (res && res.data) {
            localStorage.setItem('jwt', res.data.jwt)
        }
    }

    const strapiRegister = async () => {

    }

    return {
        strapiLogin,
        strapiRegister
    }
}

export default useStrapiAuth
