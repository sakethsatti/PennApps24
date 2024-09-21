'use client';
import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';
import "../styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faUpload } from '@fortawesome/free-solid-svg-icons';
const MediaProcessing = () => {
    const [mode, setMode] = useState<'record' | 'upload' | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [predictions, setPredictions] = useState<Array<{ class: string; score: number }> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showBounce, setShowBounce] = useState<boolean>(false);
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
            setMode('upload');
            setShowBounce(true); 
        }
    };
    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        setPredictions(null);
        setShowBounce(false); 
        const formData = new FormData();
        if (mode === 'record' && mediaBlobUrl) {
            const audioBlob = await fetch(mediaBlobUrl).then(r => r.blob());
            formData.append('file', audioBlob, 'recorded_audio.wav');
        } else if (mode === 'upload' && file) {
            formData.append('file', file);
        } else {
            setError('No audio file selected or recorded.');
            setIsLoading(false);
            return;
        }
        try {
            const response = await axios.post<{ predictions: Array<{ class: string; score: number }> }>('http://localhost:8000/predict', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setPredictions(response.data.predictions);
        } catch (err) {
            setError('Error processing audio: ' + (err instanceof Error ? err.message : String(err)));
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (status === 'stopped' && mode === 'record') {
            setShowBounce(true);
        }
    }, [status, mode]);
    return (
        <div className='w-full flex flex-col items-center justify-center p-4 bg-white min-h-screen font-[Outfit]'>
            <h1 className='text-4xl font-bold mb-4 text-center text-black'>Audio Classification</h1>
            <p className='text-lg mb-4 text-black text-center'>Choose an option to begin audio processing.</p>
            
            <div className='flex justify-center mt-10 space-x-4'>
                <button
                    className={`px-6 py-3 rounded-md text-white font-semibold ${status === 'recording' ? 'bg-red-500 hover:bg-red-600' : 'bg-black hover:bg-gray-800'} transition-colors duration-300`}
                    onClick={status === 'recording' ? stopRecording : () => { startRecording(); setMode('record'); }}
                >
                    <FontAwesomeIcon icon={faMicrophone} className="mr-2" />
                    {status === 'recording' ? 'Stop Recording' : 'Record Audio'}
                </button>
                <button className="px-6 py-3 rounded-md bg-black text-white font-semibold hover:bg-gray-800 transition-colors duration-300">
                    <label htmlFor="audioUpload" className="cursor-pointer">
                        <FontAwesomeIcon icon={faUpload} className="mr-2" />
                        Upload Audio
                    </label>
                </button>
                <input
                    type="file"
                    id="audioUpload"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
            <div className="mt-8">
                <button
                    className={`px-6 py-3 w-full max-w-xs bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition-colors duration-300 ${showBounce ? 'animate-bounce' : ''}`}
                    onClick={handleSubmit}
                    disabled={isLoading || (!mediaBlobUrl && !file)}
                >
                    {isLoading ? 'Processing...' : 'Submit'}
                </button>
            </div>
            {isLoading && <div className="mt-4 w-full h-1 bg-black animate-pulse"></div>}
            {error && <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">{error}</div>}
            {predictions && (
                <div className="mt-8 w-full max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-black">Predictions</h2>
                    <ul className="space-y-2">
                        {predictions.map((pred, index) => (
                            <li key={index} className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
                                <span className="font-semibold text-black">{pred.class}</span>
                                <span className="px-2 py-1 bg-black text-white rounded-md text-sm">
                                    {(pred.score * 100).toFixed(2)}%
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
export default MediaProcessing;