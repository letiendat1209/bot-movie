import { CheckIcon } from 'lucide-react';
import { useState } from 'react';
import '~/styles/components/flashcards.css';

const Flashcards = () => {
    const flashcardsData = [
        {
            english: 'picture',
            vietnamese: 'Hình ảnh',
            example: 'This is a beautiful picture of nature.',
            ukAudio: 'link-to-uk-audio-1.mp3',
            usAudio: 'link-to-us-audio-1.mp3',
        },
        {
            english: 'book',
            vietnamese: 'Quyển sách',
            example: 'I love reading this book.',
            ukAudio: 'link-to-uk-audio-2.mp3',
            usAudio: 'link-to-us-audio-2.mp3',
        },
        {
            english: 'computer',
            vietnamese: 'Máy tính',
            example: 'She works on her computer every day.',
            ukAudio: 'link-to-uk-audio-3.mp3',
            usAudio: 'link-to-us-audio-3.mp3',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev === flashcardsData.length - 1 ? 0 : prev + 1));
    };

    const handlePrevious = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev === 0 ? flashcardsData.length - 1 : prev - 1));
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-100 to-blue-100">
            <h1 className="mb-8 text-4xl font-bold text-gray-700">Flashcards: Flip to Learn</h1>

            <div className="relative">
                {/* Nút Previous */}
                <button
                    onClick={handlePrevious}
                    className="absolute left-[-80px] top-1/2 -translate-y-1/2 rounded-full bg-gray-300 p-4 shadow-md hover:bg-gray-400"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Flashcard */}
                <div className="flip-card" onClick={handleFlip}>
                    <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''} rounded-lg`}>
                        {/* Mặt trước */}
                        <div className="flip-card-front">
                            <div>
                                <h2 className="text-4xl font-bold text-blue-500">{flashcardsData[currentIndex].english}</h2>
                                <p className="mt-2 text-lg text-gray-500">English</p>
                                <div className="mt-4 flex justify-center space-x-6">
                                    <button className="rounded-lg bg-gray-100 px-5 py-2 hover:bg-gray-200">
                                        <audio src={flashcardsData[currentIndex].ukAudio} />
                                        <span className="font-medium text-blue-500">UK</span>
                                    </button>
                                    <button className="rounded-lg bg-gray-100 px-5 py-2 hover:bg-gray-200">
                                        <audio src={flashcardsData[currentIndex].usAudio} />
                                        <span className="font-medium text-blue-500">US</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mặt sau */}
                        <div className="flip-card-back">
                            <div>
                                <h2 className="text-4xl font-bold text-yellow-600">{flashcardsData[currentIndex].vietnamese}</h2>
                                <p className="mt-2 text-lg text-gray-500">Nghĩa tiếng Việt</p>
                                <p className="mt-6 text-base text-gray-700">{flashcardsData[currentIndex].example}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nút Next */}
                <button
                    onClick={handleNext}
                    className="absolute right-[-80px] top-1/2 -translate-y-1/2 rounded-full bg-gray-300 p-4 shadow-md hover:bg-gray-400"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Hiển thị vị trí hiện tại */}
            <div className="mt-6 text-gray-600">
                <p className="text-lg">
                    Card {currentIndex + 1} of {flashcardsData.length}
                </p>
                <p className="mt-2 text-gray-500">Nhấp vào thẻ để lật!</p>
            </div>
            {/* Nút hoàn thành */}
            <div className="mt-6">
                <button className="flex justify-center rounded-full bg-gray-300 p-4 shadow-md hover:bg-gray-400">
                    <CheckIcon className="h-8 w-8" />
                    <span className="ml-2">Complete</span>
                </button>
            </div>
        </div>
    );
};

export default Flashcards;
