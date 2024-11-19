/* eslint-disable react/prop-types */
import { CheckIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFlashcardsByDeckId } from '~/services/flashcard';
import '~/styles/components/flashcards.css';

const Flashcards = () => {
    const {deckId} = useParams();
    const [flashcardsData, setFlashcardsData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch flashcards from API
    useEffect(() => {
        const fetchFlashcards = async () => {
            setLoading(true);
            try {
                const data = await getFlashcardsByDeckId(deckId);
                setFlashcardsData(data);
            } catch (error) {
                console.error('Failed to fetch flashcards:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFlashcards();
    }, [deckId]);

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

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-xl text-gray-500">Loading flashcards...</p>
            </div>
        );
    }

    if (flashcardsData.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-xl text-gray-500">No flashcards found for this deck.</p>
            </div>
        );
    }

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
                                <h2 className="text-4xl font-bold text-blue-500">
                                    {flashcardsData[currentIndex].english}
                                </h2>
                                <p className="mt-2 text-lg text-gray-500">English</p>
                            </div>
                        </div>

                        {/* Mặt sau */}
                        <div className="flip-card-back">
                            <div>
                                <h2 className="text-4xl font-bold text-yellow-600">
                                    {flashcardsData[currentIndex].vietnamese}
                                </h2>
                                <p className="mt-2 text-lg text-gray-500">Nghĩa tiếng Việt</p>
                                <p className="mt-6 text-base text-gray-700">
                                    {flashcardsData[currentIndex].example}
                                </p>
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
