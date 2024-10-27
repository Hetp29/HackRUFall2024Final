import { useState } from 'react';
import axios from 'axios';
import { AnalyticsDataType } from '../types/AnalyticsTypes';

const useAnalyticsData = (baseEndpoint: string) => {
    const [data, setData] = useState<AnalyticsDataType | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async (inputValue: string = '') => {
        setLoading(true);
        try {
            const endpoint = inputValue ? `${baseEndpoint}/${inputValue}` : baseEndpoint;
            const response = await axios.get(endpoint);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, fetchData };
};

export default useAnalyticsData;