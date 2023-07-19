import { TCurrentWeather } from "@/hooks/useSearch"
import { useState } from "react"

// TODO: move to utils
function getDateFromStr(dateStr: string) {
    return new Date(dateStr).toLocaleString('en-US', {
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })
}

export default function WeatherWidget({ data }: { data: TCurrentWeather | null }) {
    const [isMetric, setIsMetric] = useState(false)

    if (!data) { return null }
    const { current, location } = data.data
    return <>
        <div className="text-black border-b pb-6">
            <div className="flex justify-between">
                <div className="text-super flex gap-2 items-center mb-4">
                    Weather
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                    <img src={current.condition.icon} className="w-16 h-16" />
                    <div>
                        <div className="text-4xl flex gap-1" > 
                            {isMetric ? current.temp_c : current.temp_f} 
                            <span className="text-lg align-text-top"> 
                                <button onClick={() => setIsMetric(true)} className={`${isMetric? '': 'text-gray-300'}`}> °C </button>
                                <span className="text-gray-200"> | </span>
                                <button onClick={() => setIsMetric(false)} className={`${isMetric? 'text-gray-300': ''}`}> °F </button>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col ml-2">
                        <div className="text-sm" > Humidity: {current.humidity} % </div>
                        <div className="text-sm" > Wind: {isMetric ? `${current.wind_kph} kph` : `${current.wind_mph} mph`} </div>
                    </div>
                </div>
                <div className="flex flex-col text-end">
                    <div> {location.name} </div>
                    <div> {current.condition.text} </div>
                    <div> {getDateFromStr(location.localtime)} </div>
                </div>
            </div>
        </div>
    </>
}