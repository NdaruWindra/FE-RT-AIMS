import { useState, useRef } from 'react';
import { PiUploadBold } from 'react-icons/pi';
import { FaMicrophone } from 'react-icons/fa6';
import { MdContentCopy } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import 'flag-icons/css/flag-icons.min.css';
import { Upload } from './components/upload';

function Index() {
    const [selectedLanguage, setSelectedLanguage] = useState('id');
    const [showUpload, setShowUpload] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const handleLanguageChange = (event: React.FormEvent<HTMLSelectElement>) => {
        setSelectedLanguage(event.currentTarget.value);
    };

    const handleStartRecording = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
                audioChunksRef.current = [];
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleDownload = () => {
        if (audioUrl) {
            const link = document.createElement('a');
            link.href = audioUrl;
            link.download = 'recording.mp3';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleCopyLink = () => {
        if (audioUrl) {
            navigator.clipboard.writeText(audioUrl).then(() => {
                alert('Audio URL berhasil disalin ke clipboard!');
            });
        }
    };

    const handleReset = () => {
        setAudioUrl(null);
        audioChunksRef.current = [];
    };

    const handleCloseUpload = () => {
        setShowUpload(false);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl mt-10">
            <section className="flex flex-col lg:flex-row w-full items-start gap-4 lg:gap-0">
                <div className="flex w-full lg:w-1/2 flex-col justify-center">
                    <h1 className="text-2xl md:text-3xl mt-0 font-bold text-primary">
                        Summarized AI
                    </h1>
                </div>

                <div className="flex mt-2 lg:mt-0 ml-auto lg:mr-16">
                    <button
                        className="flex items-center px-4 py-2 lg:-mr-20 bg-colorPrimary text-primary font-semibold rounded-lg hover:bg-primary hover:text-colorPrimary transition duration-200 ease-in-out"
                        onClick={() => setShowUpload(true)}
                    >
                        Upload File
                        <PiUploadBold className="h-6 w-6 ml-2" />
                    </button>
                </div>
            </section>
            {showUpload && <Upload onClose={handleCloseUpload} />}

            <section className="flex flex-col w-full items-start lg:-ml-20 lg:pl-20 mt-6 lg:mt-8">
                <div className="flex w-full lg:w-1/2 flex-col justify-center">
                    <h2 className="text-lg md:text-xl lg:text-2xl text-primary">
                        Record your meeting, get instant transcribe and summary by AI
                    </h2>
                </div>

                <div className="flex items-center mt-4 lg:mt-8 space-x-2 md:space-x-4">
                    <span className={`fi fi-${selectedLanguage} text-2xl`} /> 
                    <select
                        className="px-4 py-2 bg-[#FDF7FE] text-textPrimary font-semibold rounded-lg hover:bg-gray-300 w-full md:w-auto"
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                    >
                        <option value='gb'>English Language</option>
                        <option value='id'>Indonesia Language</option>
                        <option value='other'>Other Languages Soon</option> 
                    </select>
                </div>
            </section>

            <section className="py-6 lg:py-8 px-4 md:px-6 lg:px-8 mt-8 lg:mt-12">
                <div className="max-w-lg mx-auto bg-primary rounded-lg shadow-lg p-6 lg:p-8">
                    <h2 className="text-xl md:text-2xl font-bold text-textPrimary text-center">
                        Record Audio
                    </h2>
                    <div className="flex flex-col items-center space-y-4 mt-4">
                        {isRecording ? (
                            <button 
                                onClick={handleStopRecording} 
                                className="px-4 py-3 bg-red-600 text-white font-semibold rounded-full flex items-center">
                                <FaMicrophone className="h-6 w-6" />
                            </button>
                        ) : (
                            <button 
                                onClick={handleStartRecording} 
                                className="px-4 py-3 bg-colorPrimary text-white font-semibold rounded-full flex items-center">
                                <FaMicrophone className="h-6 w-6" />
                            </button>
                        )}

                        {audioUrl && (
                            <div className="flex flex-col items-center space-y-4 mt-4">
                                <audio controls src={audioUrl} className="mt-4 w-full" />
                                
                                <div className="flex flex-row items-center space-x-2 md:space-x-4">
                                    <button 
                                        onClick={handleDownload} 
                                        className="px-3 py-2 md:px-4 md:py-3 bg-blue-500 text-white font-semibold rounded-full flex items-center hover:bg-blue-600 transition duration-200 ease-in-out"
                                    >
                                        <IoMdDownload className="h-5 w-5 md:h-6 md:w-6"/>
                                    </button>

                                    <button 
                                        onClick={handleCopyLink} 
                                        className="px-3 py-2 md:px-4 md:py-3 bg-yellow-500 text-black font-semibold rounded-full flex items-center hover:bg-yellow-600 transition duration-200 ease-in-out"
                                    >
                                        <MdContentCopy className="h-5 w-5 md:h-6 md:w-6" />
                                    </button>

                                    <button 
                                        onClick={handleReset} 
                                        className="px-3 py-2 md:px-4 md:py-3 bg-red-500 text-white font-semibold rounded-full flex items-center hover:bg-red-600 transition duration-200 ease-in-out"
                                    >
                                        <GrPowerReset className="h-5 w-5 md:h-6 md:w-6" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Index;
