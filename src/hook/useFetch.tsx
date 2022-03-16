import { useState, useEffect } from "react";

const useFetch = (url: any, method: string, body?: any) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        switch(method) {
            case 'GET': {
                const fetchData = async () => {
                    setLoading(true);
                    try {
                        const res = await fetch(url);
                        const json = await res.json();

                        setData(json);
                        setLoading(false);

                    } catch (error: any) {
                        setError(error);
                        setLoading(false)
                    }
                }
                fetchData();
                break;
            }
            case 'PUT': {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: 'React Hooks PUT Request Example' })
                }
                const fetchData = async () => {
                    setLoading(true);
                    try {
                        const res = await fetch(url, requestOptions);
                        const json = await res.json();

                        setData(json);
                        setLoading(false);
                    } catch (error: any) {
                        setError(error);
                        setLoading(false);
                    }
                }
                fetchData();
                break;
            }
            default: return;
        }
    }, [url, method])

    return {loading, error, data};
}

export default useFetch;