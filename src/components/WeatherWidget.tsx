import { TCurrentWeather } from "@/hooks/useSearch"

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
                    <div className="text-4xl" > {current.temp_f} °F </div>
                    <div className="flex flex-col ml-2">
                        <div className="text-sm" > Humidity: {current.humidity} % </div>
                        <div className="text-sm" > Wind: {current.wind_mph} mph </div>
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