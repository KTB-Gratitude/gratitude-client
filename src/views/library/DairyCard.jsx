import { useEffect, useState } from "react";

function DairyCard({ data, emotionState }) {
    let emotionList = "";
    data.emotions.map((emotion, index) => (
        emotionList += `${emotion.name}(${emotion.per}) `
    ));
    let RJMD = `${emotionState.R}${emotionState.J}${emotionState.M}${emotionState.D}`;
    
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
                <p>감정: {emotionList}</p>
                <p>RJMD: {RJMD}</p>
            </div>
            <div className="flex items-center justify-between p-6">
                <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                January 10
                </p>
            </div>
        </div>         
    );
}

export default DairyCard;