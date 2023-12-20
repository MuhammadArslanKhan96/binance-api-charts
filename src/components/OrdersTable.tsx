import { OrderType } from "@/types";
import React from "react";

type Props = {
    data: OrderType[];
    heading: string;
};

const OrdersTable = (props: Props) => {
    return (
        <div className="h-full max-h-96 overflow-scroll border border-black rounded w-full">
            <h2 className="font-bold sticky w-full -top-2 py-2 text-white bg-black text-lg px-4">{props.heading}</h2>
            <table className="w-full h-full max-h-96 overflow-scroll">
                <thead className="sticky top-8 bg-black text-white py-3 pb-4">
                    <tr>
                        <th>Time</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((order, index) => (
                        <tr className="even:bg-white h-12 text-black bg-gray-300" key={index}>
                            <td>{new Date(order.time).toLocaleString()}</td>
                            <td>{order.price}</td>
                            <td>{order.quantity}</td>
                        </tr>
                    ))}
                    {!props.data.length && (
                        <tr className="even:bg-white h-12 text-black bg-gray-300">
                            <td colSpan={3} className="text-center">
                                No Data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
