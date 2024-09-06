import React, { useRef, useState } from 'react';

const Diary = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        const context = canvasRef.current.getContext('2d');
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        setIsDrawing(false);
        const context = canvasRef.current.getContext('2d');
        context.closePath();
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        const context = canvasRef.current.getContext('2d');
        context.lineTo(offsetX, offsetY);
        context.stroke();
    };

    return (
        <div style={{ padding: '10px' }}>
            <h3>그림판</h3>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                width="800"
                height="400"
                style={{ border: '1px solid black' }}
            />
        </div>
    );
};

export default Diary;
