import {useCallback, useState} from "react";

interface useHttpHook {
    loading: boolean,
    request: (url: string, method?: string, body?: any, headers?: { [key: string]: string }) => Promise<any>,
    error: any,
    clearError: () => void,
}

export const useHttp = (): useHttpHook => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(
        async (url: string, method: string = 'GET', body: any = null, headers: { [key: string]: string } = {}) => {
            setLoading(true)
            try {
                if (body) {
                    body = JSON.stringify(body);
                    headers['Content-Type'] = 'application/json';
                }

                const response = await fetch(url, {method, body, headers});
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message ?? "Something went wrong")
                }

                return data

            } catch (err) {
                setError(err.message);
                throw err
            } finally {
                setLoading(false)
            }
        }, []);

    const clearError = () => setError(null);


    return {loading, request, error, clearError}
}