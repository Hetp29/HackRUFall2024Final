export interface AnalyticsDataType {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor?: string;
    }[];
}