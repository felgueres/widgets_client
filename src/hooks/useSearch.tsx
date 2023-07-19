import { useState, useEffect } from 'react';
const HOST = 'http://127.0.0.1:5000'

export type TCurrentWeather = {
    object: string,
    data: {
        current: {
            temp_c: number,
            temp_f: number,
            wind_mph: number,
            wind_kph: number,
            wind_dir: string,
            pressure_mb: number,
            pressure_in: number,
            precip_mm: number,
            precip_in: number,
            humidity: number,
            cloud: number,
            condition: {
                text: string,
                icon: string,
                code: number
            }
        },
        location: {
            name: string,
            country: string,
            tz_id: string,
            localtime: string
        }
    }
}

export type TCalculator = {
    object: string,
    data: {
        result: number,
        expr: string
    }
}

export type TCurrentTimeData = {
    object: string,
    data: {
        time: string,
        tz: string,
    }
}

export default function useSearch({ queryStr }: { queryStr: string | null }) {

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
                // TODO: add toast to show error  
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