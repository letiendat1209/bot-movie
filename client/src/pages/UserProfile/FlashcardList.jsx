import { Link } from 'react-router-dom';

const decks = [
    {
        id: 1,
        title: 'Tập từ 1',
        words: 20,
        image: 'link-to-image-1.jpg',
        author: 'study4',
    },
    {
        id: 2,
        title: 'Tập từ phim A',
        words: 20,

        image: 'link-to-image-2.jpg',
        author: 'study4',
    },
    {
        id: 3,
        title: 'Tập từ phim B',
        words: 20,
        image: 'link-to-image-3.jpg',
        author: 'study4',
    },
    // Thêm dữ liệu khác tại đây
];

const FlashcardList = () => {
    return (
        <div className="bg-gray-5 min-h-screen">
            {/* Header */}
            <header className="bg-gradient-to-r from-pink-100 to-blue-100 py-6 pt-[75px]">
                <div className="container mx-auto px-4">
                    <h1 className="text-center text-3xl font-bold text-gray-700">Flashcards</h1>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button className="rounded bg-gray-100 px-4 py-2 hover:bg-gray-200">List từ của tôi</button>
                        <button className="rounded bg-blue-500 px-4 py-2 text-white">Khám phá</button>
                    </div>
                </div>
            </header>

            {/* Thông báo */}
            <div className="container mx-auto my-6 rounded bg-green-100 px-4 py-3 text-green-700">
                <p>
                    <strong>Chú ý:</strong> Bạn có thể tạo flashcards từ highlights (bao gồm các highlights các bạn đã tạo trước đây) trong
                    trang chi tiết kết quả bài thi.{' '}
                    <a href="#" className="text-blue-500 underline">
                        Xem hướng dẫn.
                    </a>
                </p>
            </div>

            {/* Danh sách các bộ từ */}
            <div className="container mx-auto grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {decks.map((set) => (
                    <div key={set.id} className="cursor-pointer overflow-hidden rounded bg-white shadow hover:shadow-lg">
                        <Link to={`/flashcards`}>
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-gray-700">{set.title}</h2>
                                <p className="text-sm text-gray-500">{set.words} Từ</p>
                                <div className="mt-2 text-sm text-gray-400">Tác giả: {set.author}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlashcardList;
