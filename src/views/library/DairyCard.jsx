import { useEffect, useState } from "react";
import Weather from "./Weather";

function DairyCard({ data, onClick }) {
    // 날씨, 날짜, 타이틀,
    let title = data.title;
    let weather = data.weather;
    let date = data.createdAt.split('T')[0];
    let RJMD = `${data.rType.split(',')[0]}${data.jType.split(',')[0]}${data.mType.split(',')[0]}${data.dType.split(',')[0]}`;

    return (
        <div
            className="relative flex flex-col h-60 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md" onClick={onClick}>
            <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
                <div className="h-28 bg-blue-500">
                </div>
            </div>
            <div className="p-5 h-28 w-44">
                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 truncate">
                    {data.title}
                </h5>
                <p>RJMD: {RJMD}</p>
            </div>
            <div className="flex items-center justify-between p-2">
                <p className="block font-sans text-base text-sm antialiased font-normal leading-relaxed text-inherit">
                {date}
                </p>
            </div>
        </div>
    );
}

export default DairyCard;