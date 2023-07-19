import { useState, useEffect } from 'react';
const HOST = 'http://50.116.13.65'

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

export type TCurrentTime = {
    object: string,
    data: {
        time: string,
        tz: string,
    }
}

export default function useSearch({ queryStr }: { queryStr: string | null }) {

    const [loading, setLoading] = useState<boolean>(false)
    const [submitQ, setSubmitQ] = useState<boolean>(false)
    const [data, setData] = useState<TCurrentWeather | TCalculator | TCurrentTime| null>(null)

    useEffect(() => {
        const SEARCH_ENDPOINT = `${HOST}/v1/search?q=${queryStr}`
        async function fetchSearch() {
            if (!submitQ) { return }
            setLoading(true)

            console.log('Submitting with query: ', queryStr)
            console.log('Submitting to endpoint: ', SEARCH_ENDPOINT)

            try {
                await fetch(`${SEARCH_ENDPOINT}`, { method: 'POST', })
                    .then((res) => {
                        if (res.ok) {
                            res.json()
                            .then((data) => { setData(data) })
                        } else {
                            console.log('Error: ', res.statusText)
                        }
                    })
            }
            catch (error) {
                // TODO: add handling 
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