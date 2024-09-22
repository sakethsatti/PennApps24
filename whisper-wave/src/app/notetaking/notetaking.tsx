'use client';
import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import "../styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faUpload } from '@fortawesome/free-solid-svg-icons';
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const NoteTaking = () => {
    const [mode, setMode] = useState<'record' | 'upload' | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [transcription, setTranscription] = useState<string | null>(null);
    const [notes, setNotes] = useState<string | null>(null);
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
        setShowBounce(false);
        let audioFile;

        try {
            // Prepare audio file for transcription
            if (mode === 'record' && mediaBlobUrl) {
                const audioBlob = await fetch(mediaBlobUrl).then(r => r.blob());
                audioFile = new File([audioBlob], 'recorded_audio.wav');
            } else if (mode === 'upload' && file) {
                audioFile = file;
            } else {
                throw new Error('No audio file selected or recorded.');
            }

            // Step 1: Use Whisper for transcription
            const response = await openai.audio.transcriptions.create({
                model: 'whisper-1',
                file: audioFile,
            });

            const transcribedText = response.text;
            setTranscription(transcribedText);

            // Step 2: Use GPT to summarize the transcription
            const summaryResponse = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "Summarize the following transcription into clear, concise notes." },
                    { role: "user", content: transcribedText }
                ],
                max_tokens: 300,
                temperature: 0.5
            });

            const generatedNotes = summaryResponse.choices[0].message.content;
            setNotes(generatedNotes);

        } catch (err) {
            setError('Error processing audio: ' + (err instanceof Error ? err.message : String(err)));
        } finally {
            setIsLoading(false);
        }
    };

    const downloadNotes = () => {
        if (!notes) return;
        const blob = new Blob([notes], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notes.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    useEffect(() => {
        if (status === 'stopped' && mode === 'record') {
            setShowBounce(true);
        }
    }, [status, mode]);

    return (
        <div className='w-full flex flex-col items-center justify-center p-4 bg-white min-h-screen font-[Outfit]'>
            <h1 className='text-4xl font-bold mb-4 text-center text-black'>Note Taking</h1>
            <p className='text-lg mb-4 text-black text-center'>Record or Submit a Recording of a Lesson.</p>
            
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
            {notes && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-black">Generated Notes:</h2>
                    <pre className="whitespace-pre-wrap bg-gray-100 p-4 mt-4 rounded-md text-black">{notes}</pre>
                    <button
                        className="mt-4 px-6 py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition-colors duration-300"
                        onClick={downloadNotes}
                    >
                        Download Notes as .txt
                    </button>
                </div>
            )}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default NoteTaking;
