import React, { Dispatch, SetStateAction } from "react";

type Props = {
    setSymbol: Dispatch<SetStateAction<string>>;
    setInterval: Dispatch<SetStateAction<string>>;
};

const Controls = (props: Props) => {
    return (
        <div className="flex flex-col gap-3 mt-5">
            <p className="text-center text-lg font-bold text-white">Select Interval</p>
            <div className="flex gap-3 items-center justify-center">
                <button
                    onClick={() => props.setInterval("1m")}
                    className="bg-white/90 font-bold text-base text-black px-4 py-2 rounded "
                >
                    1m
                </button>
                <button
                    onClick={() => props.setInterval("5m")}
                    className="bg-white/90 font-bold text-base text-black px-4 py-2 rounded "
                >
                    5m
                </button>
                <button
                    onClick={() => props.setInterval("15m")}
                    className="bg-white/90 font-bold text-base text-black px-4 py-2 rounded "
                >
                    15m
                </button>
            </div>
            <div className="flex gap-3 items-center justify-center">
                <button
                    onClick={() => props.setSymbol("BTCUSDT")}
                    className="bg-white/90 font-bold text-base text-black px-4 py-2 rounded "
                >
                    BTCUSDT
                </button>
                <button
                    onClick={() => props.setSymbol("ETHUSDT")}
                    className="bg-white/90 font-bold text-base text-black px-4 py-2 rounded "
                >
                    ETHUSDT
                </button>
                <button
                    onClick={() => props.setSymbol("BNBUSDT")}
                    className="bg-white/90 font-bold text-base text-black px-4 py-2 rounded "
                >
                    BNBUSDT
                </button>
            </div>
        </div>
    );
};

export default Controls;
