'use client'
import { useEffect, useRef } from 'react';
import { CandlestickSeries, createChart } from 'lightweight-charts';

// Fungsi untuk generate data candlestick contoh
const generateCandlestickData = () => {
    const data = [];
    let time = new Date('2023-01-01').getTime();
    for (let i = 0; i < 100; i++) {
        const open = 100 + Math.random() * 10;
        const close = open + (Math.random() - 0.5) * 20;
        const high = Math.max(open, close) + Math.random() * 5;
        const low = Math.min(open, close) - Math.random() * 5;
        data.push({
            time: new Date(time += 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Format YYYY-MM-DD
            open,
            high,
            low,
            close,
        });
    }
    return data;
};

const TradingChart = () => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // 1. Membuat chart
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
        });

        // 2. Membuat series candlestick
        const mainSeries = chart.addSeries(CandlestickSeries);

        // 3. Mengatur data series
        mainSeries.setData(generateCandlestickData());

        // 4. Handle resize window
        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.resize(
                    chartContainerRef.current.clientWidth,
                    chartContainerRef.current.clientHeight
                );
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, []);

    return (
        <div
            ref={chartContainerRef}
            className='w-full h-full relative'
        />
    );
};

export default TradingChart;