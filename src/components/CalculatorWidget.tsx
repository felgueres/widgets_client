import { TCalculator } from "@/hooks/useSearch"

function formatExpr(expr: string) {
    return `${expr} =`
}

export default function CalculatorWidget({ data }: { data: TCalculator | null }) {
    if (!data) { return null }

    const { result, expr } = data.data // TODO: better naming for data.data

    if (!result) { return null }

    return <>
        <div className="border-b pb-6 gap-3">
            <div className="gap-3 flex flex-col">
                <span className="text-sm text-gray-500 text-right"> {formatExpr(expr)} </span>
                <span className="text-3xl text-black text-right"> {result} </span>
            </div>
        </div>
    </>
}