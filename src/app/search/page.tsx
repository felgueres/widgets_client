"use client";

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import useSearch from "@/hooks/useSearch";
import WeatherWidget from "@/components/WeatherWidget";
import CalculatorWidget from "@/components/CalculatorWidget";
import TimeWidget from "@/components/TimeWidget";

enum Widgets {
    Weather = 'WeatherWidget',
    Calculator = 'CalculatorWidget',
    Time = 'TimeWidget',
}

export const objectToWidgetMap = {
    [Widgets.Weather]: Widgets.Weather,
    [Widgets.Calculator]: Widgets.Calculator,
    [Widgets.Time]: Widgets.Time,
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
            case Widgets.Weather: return <WeatherWidget data={data} />
            case Widgets.Calculator: return <CalculatorWidget data={data} />
            case Widgets.Time: return <TimeWidget data={data} />
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
            </div>
        </div>
    )
}