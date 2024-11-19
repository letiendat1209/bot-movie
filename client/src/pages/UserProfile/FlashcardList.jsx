import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDecksByUserId } from '~/services/deck';

const FlashcardList = () => {
    const id = JSON.parse(localStorage.getItem('user'))?.id || null;
    const [decks, setDecks] = useState([]);
    const [activeTab, setActiveTab] = useState('myList'); // Tab mặc định là "List từ của tôi"

    useEffect(() => {
        if (id) {
            const fetchDecks = async () => {
                try {
                    const response = await getDecksByUserId(id);
                    setDecks(response);
                } catch (error) {
                    console.error('Error fetching decks:', error);
                }
            };
            fetchDecks();
        }
    }, [id]);

    return (
        <div className="bg-gray-5 min-h-screen">
            {/* Header */}
            <header className="bg-gradient-to-r from-pink-100 to-blue-100 py-6 pt-[75px]">
                <div className="container mx-auto px-4">
                    <h1 className="text-center text-3xl font-bold text-gray-700">Flashcards</h1>
                    <div className="mt-4 flex space-x-4">
                        <button
                            onClick={() => setActiveTab('myList')}
                            className={`rounded px-4 py-2 ${
                                activeTab === 'myList' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                        >
                            List từ của tôi
                        </button>
                        <button
                            onClick={() => setActiveTab('explore')}
                            className={`rounded px-4 py-2 ${
                                activeTab === 'explore' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                        >
                            Khám phá
                        </button>
                        <button
                            onClick={() => setActiveTab('create')}
                            className={`rounded px-4 py-2 ${
                                activeTab === 'create' ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                        >
                            Tạo flashcard
                        </button>
                    </div>
                </div>
            </header>

            {/* Nội dung theo từng tab */}
            <div className="container mx-auto my-6 px-4">
                {activeTab === 'myList' && (
                    <div>
                        {/* Danh sách các bộ từ */}
                        <h2 className="mb-4 text-xl font-semibold text-gray-700">Danh sách từ của tôi</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {!decks ? (
                                <p className="text-center text-gray-500">Đang tải...</p>
                            ) : decks.length === 0 ? (
                                <p className="text-center text-gray-500">Bạn chưa có bộ từ nào. Hãy tạo một bộ từ mới!</p>
                            ) : (
                                decks.map((set) => (
                                    <div key={set.id} className="cursor-pointer overflow-hidden rounded bg-white shadow hover:shadow-lg">
                                        <Link to={`/flashcards/${set.id}`}>
                                            <div className="p-4">
                                                <h2 className="text-lg font-bold text-gray-700">{set.title}</h2>
                                                <p className="text-sm text-gray-500">{set.word_count} Từ</p>
                                                <div className="mt-2 text-sm text-gray-400">Tác giả: {set.user_id}</div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'explore' && (
                    <div>
                        <h2 className="mb-4 text-xl font-semibold text-gray-700">Khám phá bộ từ</h2>
                        <p className="text-gray-500">Tính năng này đang được phát triển...</p>
                    </div>
                )}

                {activeTab === 'create' && (
                    <div>
                        <h2 className="mb-4 text-xl font-semibold text-gray-700">Tạo flashcard</h2>
                        <p className="text-gray-500">Tính năng này đang được phát triển...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlashcardList;
