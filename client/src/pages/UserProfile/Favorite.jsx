import { useEffect, useState } from 'react';
import { Trash2, Heart, Star, Type, ArrowBigUpDash, Eye } from 'lucide-react';
import { getFavoritesByUserId, deleteFavorite } from '~/services/favorite';

const Favorite = () => {
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const id = JSON.parse(localStorage.getItem('user'))?.id || null;

    useEffect(() => {
        if (!id) {
            console.warn('User ID not found in localStorage');
            return;
        }
        const fetchFavoriteItems = async () => {
            try {
                const response = await getFavoritesByUserId(id);
                const data = await response;
                setFavoriteItems(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFavoriteItems();
    }, [id]);
console.log(favoriteItems)
    const handleDelete = async (favoriteId) => {
        try {
            await deleteFavorite(favoriteId);
            setFavoriteItems(favoriteItems.filter((item) => item.id_favorite !== favoriteId));
            setConfirmDelete(null);
        } catch (error) {
            console.error('Failed to delete favorite:', error);
        }
    };

    return (
        <div className="min-h-screen bg-black px-4 pt-[75px] text-white relative">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="flex items-center justify-center">
                    <Heart className="mr-4 text-red-500" size={32} />
                    <h1 className="text-3xl font-bold text-white">Favorite Anime</h1>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                    {favoriteItems.map((item) => (
                        <div key={item.id_favorite} className="group relative">
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="h-96 w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex flex-col justify-between bg-black/50 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <div className="flex items-start justify-between">
                                    <div className="w-full pr-4">
                                        <span className="text-lg font-semibold text-white">{item.title}</span>
                                        <div className="mt-2 flex items-center">
                                            <Star size={18} className="mr-2 text-yellow-400" />
                                            <span className="text-sm text-white">Đánh giá {item.rating}</span>
                                        </div>
                                        <div className="mt-2 flex items-center">
                                            <Type size={18} className="mr-2 text-yellow-400" />
                                            <span className="text-sm uppercase text-white">Thể loại: {item.type}</span>
                                        </div>
                                        <div className="mt-2 flex items-center">
                                            <ArrowBigUpDash size={18} className="mr-2 text-yellow-400" />
                                            <span className="text-sm uppercase text-white">Số lượng vote: {item.upvote}</span>
                                        </div>
                                        <div className="mt-2 flex items-center">
                                            <Eye size={18} className="mr-2 text-yellow-400" />
                                            <span className="text-sm uppercase text-white">Lượt xem: {item.total_views}</span>
                                        </div>
                                        <div className="mt-4">
                                            <p className="line-clamp-6 text-sm text-gray-300">{item.description}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setConfirmDelete(item.id_favorite)}
                                        className="text-red-500 transition-colors hover:text-red-400 w-10 h-10 flex items-center justify-center"
                                    >
                                        <Trash2 size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {favoriteItems.length === 0 && <div className="py-10 text-center text-gray-500">No favorite anime yet</div>}
            </div>

            {confirmDelete && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 text-center">
                        <h2 className="text-xl font-bold mb-4">Xác nhận xóa</h2>
                        <p className="mb-6">Bạn có chắc chắn muốn xóa anime này khỏi danh sách yêu thích?</p>
                        <div className="flex justify-center space-x-4">
                            <button 
                                onClick={() => setConfirmDelete(null)}
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                            >
                                Hủy
                            </button>
                            <button 
                                onClick={() => handleDelete(confirmDelete)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Favorite;