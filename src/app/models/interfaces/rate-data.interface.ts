export interface RateData {
    timestamp: string,
    rate: string
}

export interface FilteredRateData {
    name: string,
    value: number,
    tooltipText: string | null
}