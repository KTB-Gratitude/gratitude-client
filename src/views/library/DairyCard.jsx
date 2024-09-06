import { useEffect, useState } from "react";
import Weather from "./Weather";

function DairyCard({ data }) {
    console.log(data)
    // 날씨, 날짜, 타이틀,
    let title = data.title;
    let weather = data.weather;
    let date = data.createdAt.split('T')[0];
    let RJMD = `${data.rType.split(',')[0]}${data.jType.split(',')[0]}${data.mType.split(',')[0]}${data.dType.split(',')[0]}`;

    return (
        <div
            className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
                <div className="h-48 bg-blue-500"></div>
            </div>
            <div className="p-6">
                <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {data.title}
                </h4>
                <p>RJMD: {RJMD}</p>
            </div>
            <div className="flex items-center justify-between p-6">
                <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                {date}
                </p>
            </div>
        </div>         
    );
}

export default DairyCard;