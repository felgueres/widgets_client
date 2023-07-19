"use client";

import { cloneElement, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import useSearch, { TCalculator, TCurrentTime, TCurrentWeather } from "@/hooks/useSearch";
import WeatherWidget from "@/components/WeatherWidget";
import CalculatorWidget from "@/components/CalculatorWidget";
import TimeWidget from "@/components/TimeWidget";
import { Icons } from "../../../constants";

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

export default function SearchResults() {
    const [widgetType, setWidgetType] = useState<Widgets | null>(null)
    const [query, setQuery] = useState<string | null>(null)
    const { data, loading, setSubmitQ } = useSearch({ queryStr: query })
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const q = searchParams.get("q")
        console.log('q from search params: ', q)
        if (q) {
            setQuery(q)
            setSubmitQ(true)
        } else { router.push("/") }
    }
        , [searchParams])

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
                return <>Uh oh! Looks like an edge case or a bug.
                    <div className="items-center flex text-blue-500">
                        {cloneElement(Icons.bug_report, { className: "w-6 h-6 fill-current" })}
                        <a className="underline text-blue-500" href="https://docs.google.com/spreadsheets/d/1E1b6UpMhR72qMJBwEFVHA3a5eXsJAou1_VGXNSRRcKs/edit?usp=sharing" target="_blank" rel="noreferrer">Report</a>
                    </div>
                </>
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