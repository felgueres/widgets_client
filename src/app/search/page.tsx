"use client";

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import useSearch, { TCalculator, TCurrentTime, TCurrentWeather } from "@/hooks/useSearch";
import WeatherWidget from "@/components/WeatherWidget";
import CalculatorWidget from "@/components/CalculatorWidget";
import TimeWidget from "@/components/TimeWidget";

enum Widgets {
    Weather = 'WeatherWidget',
    Calculator = 'CalculatorWidget',
    Time = 'TimeWidget',
    Unknown = 'UnknownWidget'
}

const objectToWidgetMap = {
    [Widgets.Weather]: Widgets.Weather,
    [Widgets.Calculator]: Widgets.Calculator,
    [Widgets.Time]: Widgets.Time,
    [Widgets.Unknown]: Widgets.Unknown
}

export default function SearchResults({ searchParams }: { searchParams: URLSearchParams }) {
    const [widgetType, setWidgetType] = useState<Widgets | null>(null)
    const [query, setQuery] = useState<string | null>(null)
    const { data, loading, setSubmitQ } = useSearch({ queryStr: query })
    const router = useRouter()

    useEffect(() => {
        if ("q" in searchParams) {
            const q = searchParams["q"] as string
            setQuery(q)
            setSubmitQ(true)
        } else { router.push("/") }
    }, [])

    useEffect(() => {
        if (data) {
            const obj = data.object as Widgets
            setWidgetType(objectToWidgetMap[obj])
        }
    }, [data])

    const renderWidget = () => {
        if (!widgetType) { return null }
        switch (widgetType) {
            case Widgets.Weather: 
                const wdata = data as TCurrentWeather
                return <WeatherWidget data={wdata} />
            case Widgets.Calculator: 
                const cdata = data as TCalculator
                return <CalculatorWidget data={cdata} /> 
            case Widgets.Time: 
                const tdata = data as TCurrentTime
                return <TimeWidget data={tdata} />
            case Widgets.Unknown:
                return <>Uh oh! Not a widget or edge case :-)</>
        }
    }

    return (
        <div className="flex flex-col items-center h-screen p-4">
            <div className="w-full mx-auto max-w-screen-md md:px-lg px-md py-lg">
                <div className=" text-2xl font-medium mb-4"> {query} </div>
                {loading && <span>Loading...</span>}

                <div className="font-medium text-base">
                    {renderWidget()}
                </div>

                {!loading &&
                    <button onClick={() => router.push("/")} className="flex justify-center items-center mt-8 border rounded-full px-3 py-1 hover:bg-gray-50">
                       New Thread 
                    </button>
                }

            </div>
        </div>
    )
}