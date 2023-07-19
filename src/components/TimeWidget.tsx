import { TCurrentTime } from "@/hooks/useSearch"

export default function TimeWidget({ data }: { data: TCurrentTime | null }) {
    if (!data) { return null }
    const { time, tz } = data.data
    return <>
        <div className="text-black border-b pb-6">
            <span className="">
                <span className="text-2xl text-black">
                    {time}
                </span>
                <br />
                <span className="text-md text-black">
                    {tz}
                </span>
            </span>
        </div>
    </>
}