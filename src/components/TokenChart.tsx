'use client'
import React, { useEffect, useRef } from 'react';
import { createChart, CandlestickSeries, ColorType } from 'lightweight-charts';

interface CandleStickData {
    open: number;
    high: number;
    low: number;
    close: number;
    time: string;
}

const TokenChart: React.FC = () => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chartOptions = {
            layout: {
                textColor: 'black',
                background: {
                    type: ColorType.Solid,
                    color: 'white',
                },
            },
        };

        const chart = createChart(chartContainerRef.current, chartOptions);
        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        const randomFactor = 25 + Math.random() * 25;
        const samplePoint = (i: number) =>
            i * (0.5 + Math.sin(i / 1) * 0.2 + Math.sin(i / 2) * 0.4 +
                Math.sin(i / randomFactor) * 0.8 + Math.sin(i / 50) * 0.5) + 200 + i * 2;

        function generateData(numberOfCandles = 500, updatesPerCandle = 5, startAt = 100) {
            const createCandle = (val: number, time: number): CandleStickData => ({
                time: new Date(time * 1000).toISOString().split('T')[0],
                open: val,
                high: val,
                low: val,
                close: val,
            });

            const updateCandle = (candle: CandleStickData, val: number): CandleStickData => ({
                time: candle.time,
                close: val,
                open: candle.open,
                low: Math.min(candle.low, val),
                high: Math.max(candle.high, val),
            });

            const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
            const numberOfPoints = numberOfCandles * updatesPerCandle;
            const initialData: CandleStickData[] = [];
            const realtimeUpdates: CandleStickData[] = [];
            const firstValue = samplePoint(-1);
            let lastCandle = createCandle(firstValue, date.getTime() / 1000);
            let previousValue = firstValue;

            for (let i = 0; i < numberOfPoints; ++i) {
                if (i % updatesPerCandle === 0) {
                    date.setUTCDate(date.getUTCDate() + 1);
                }
                const time = date.getTime() / 1000;
                let value = samplePoint(i);
                const diff = (value - previousValue) * Math.random();
                value = previousValue + diff;
                previousValue = value;

                if (i % updatesPerCandle === 0) {
                    const candle = createCandle(value, time);
                    lastCandle = candle;
                    if (i >= startAt) {
                        realtimeUpdates.push(candle);
                    }
                } else {
                    const newCandle = updateCandle(lastCandle, value);
                    lastCandle = newCandle;
                    if (i >= startAt) {
                        realtimeUpdates.push(newCandle);
                    } else if ((i + 1) % updatesPerCandle === 0) {
                        initialData.push(newCandle);
                    }
                }
            }

            return { initialData, realtimeUpdates };
        }

        const data = generateData(2500, 20, 1000);
        candleSeries.setData(data.initialData);
        chart.timeScale().fitContent();
        chart.timeScale().scrollToPosition(5, true);

        function* getNextRealtimeUpdate(realtimeData: CandleStickData[]) {
            for (const dataPoint of realtimeData) {
                yield dataPoint;
            }
            return null;
        }

        const streamingDataProvider = getNextRealtimeUpdate(data.realtimeUpdates);
        const intervalId = setInterval(() => {
            const update = streamingDataProvider.next();
            if (update.done) {
                clearInterval(intervalId);
                return;
            }
            candleSeries.update(update.value);
        }, 100);

        return () => {
            clearInterval(intervalId);
            chart.remove();
        };
    }, []);

    return (
        <div
            ref={chartContainerRef}
            className='w-full h-full rounded'
        />
    );
};

export default TokenChart;