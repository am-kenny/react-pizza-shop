import {useCallback, useEffect, useState} from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(url);
            const resData = await response.json();
            setError(null);
            setData(resData);
        } catch (err) {
            console.error("Error fetching data", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {data, loading, error, refetch: fetchData};
}

export default useFetch;