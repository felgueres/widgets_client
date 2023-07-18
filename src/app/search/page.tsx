"use client";

import { useEffect, useState } from "react"
import useUserData from "@/hooks/useSearch";
import { useRouter } from "next/navigation";

export default function SearchResults({ searchParams }: { searchParams: URLSearchParams }) {
    const [query, setQuery] = useState<string | null>(null)
    const { data, loading, setSubmitQ } = useUserData({ queryStr: query })
    const router = useRouter()

    useEffect(() => {
        if ("q" in searchParams) {
            const q = searchParams["q"] as string
            setQuery(q)
            setSubmitQ(true)
        } else { router.push("/") }
    }, [])

    return (
        <div className="flex flex-col items-center h-screen p-4">
            <div className="w-full mx-auto max-w-screen-md md:px-lg px-md py-lg">
                <div className=" text-2xl font-medium mb-4">
                    {query}
                </div>
                {loading && <span>Loading...</span>}
                <div className="text-super font-medium text-base">
                    <mark> {data?.object} </mark>
                </div>
            </div>
        </div>
    )
}