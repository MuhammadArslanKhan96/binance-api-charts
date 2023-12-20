"use client";
import OrdersTable from "@/components/OrdersTable";
import Chart from "@/components/Chart";
import Controls from "@/components/Controls";
import { fetchChartData } from "@/utils/getChartData";
import { useEffect, useState } from "react";
import { ChartData, OrderType } from "@/types";

export default function Home() {
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [interval, setInterval] = useState("1m");
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [buyOrders, setBuyOrders] = useState<OrderType[]>([]);
    const [sellOrders, setSellOrders] = useState<OrderType[]>([]);

    useEffect(() => {
        fetchChartData(symbol, interval, setChartData);
        setBuyOrders([]);
        setSellOrders([]);
    }, [symbol, interval]);

    useEffect(() => {
        const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`);
        const socket2 = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`);
        socket2.onmessage = (event) => {
            const trade = JSON.parse(event.data);
            const time = trade.E;
            const open = parseFloat(trade.k.o);
            const high = parseFloat(trade.k.h);
            const low = parseFloat(trade.k.l);
            const close = parseFloat(trade.k.c);
            if (chartData[chartData.length - 1].open !== open) {
                setChartData((pre) => [
                    ...pre.slice(1),
                    {
                        time: time,
                        open: open,
                        high: high,
                        low: low,
                        close: close,
                    },
                ]);
            }
        };
        socket.onmessage = (event) => {
            const trade = JSON.parse(event.data);
            if (trade.m) {
                setBuyOrders((prev) => [
                    ...prev,
                    {
                        time: trade.T,
                        price: parseFloat(trade.p),
                        quantity: parseFloat(trade.q),
                    },
                ]);
            } else {
                setSellOrders((prev) => [
                    ...prev,
                    {
                        time: trade.T,
                        price: parseFloat(trade.p),
                        quantity: parseFloat(trade.q),
                    },
                ]);
            }
        };

        return () => {
            socket.close();
            socket2.close();
        };
    }, [chartData, interval, symbol]);

    return (
        <div className="w-full min-h-screen py-4 bg-transparent flex justify-center items-center flex-col">
            <Chart chartData={chartData} />
            <Controls setInterval={setInterval} setSymbol={setSymbol} />
            <div className="flex flex-col md:flex-row mt-4 gap-4 justify-between w-full px-4 py-2">
                <OrdersTable heading="Buy Orders" data={buyOrders} />
                <OrdersTable heading="Sell Orders" data={sellOrders} />
            </div>
        </div>
    );
}
