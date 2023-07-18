import { useState, useEffect } from 'react';
const HOST = 'http://127.0.0.1:5000' 

type TCurrentWeather = {
    object: string,
    data: {
        location: string,
        temperature: number,
        humidity: number,
        windSpeed: number,
        windDirection: number,
    }
}

type TCalculator = {
    object: string,
    data: { 
        result: number 
    }
}

type TCurrentTimeData = {
    object: string,
    data: {
        time: string,
        timezone: string,
    }
}

export default function useSearch({ queryStr }: { queryStr: string | null}) {

    const [loading, setLoading] = useState<boolean>(false)
    const [submitQ, setSubmitQ] = useState<boolean>(false)
    const [data, setData] = useState<TCurrentWeather | TCalculator | TCurrentTimeData | null>(null)

    useEffect(() => {
        const SEARCH_ENDPOINT = `${HOST}/v1/search?q=${queryStr}`
        async function fetchSearch() {
            if (!submitQ) { return }
            setLoading(true)
            try {
                await fetch(`${SEARCH_ENDPOINT}`, { method: 'POST', })
                    .then((res) => {
                        if (res.ok) {
                            res.json()
                                .then((data) => { setData(data) })
                        }
                    })
            }
            catch (error) { 
                // TODO: handle error gracefully 
            }
            finally { 
                setLoading(false) 
                setSubmitQ(false)
            }
        }
        fetchSearch()
    }, [submitQ])

    return { loading, data, setSubmitQ, submitQ }
}