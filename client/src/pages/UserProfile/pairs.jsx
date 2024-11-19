import { useState, useEffect } from 'react';
import { Edit, Trash, PlusCircle, Search, Move } from 'lucide-react';
import { getSentencePairsByUserId, updateSentencePair, deleteSentencePair, createSentencePair } from '~/services/sentencePair';

const difficultyLevels = ['easy', 'medium', 'hard'];

function Pairs() {
    const id_user = JSON.parse(localStorage.getItem('user'))?.id || null;

    const [pairs, setPairs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editPair, setEditPair] = useState(null);
    const [newPair, setNewPair] = useState({ english: '', vietnamese: '', diff_level: '', notes: '' });
    const [search, setSearch] = useState('');
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
    const [selectedPairForMove, setSelectedPairForMove] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPairs();
    }, [id_user]);

    const fetchPairs = async () => {
        try {
            if (!id_user) return;
            setIsLoading(true);
            const data = await getSentencePairsByUserId(id_user);
            setPairs(data);
        } catch (error) {
            showAlert('Lỗi khi tải dữ liệu: ' + error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredPairs = pairs.filter(
        (pair) =>
            pair.english.toLowerCase().includes(search.toLowerCase()) ||
            pair.vietnamese.toLowerCase().includes(search.toLowerCase()) ||
            pair.diff_level.toLowerCase().includes(search.toLowerCase()),
    );

    const showAlert = (message, type = 'success') => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    };

    // Updated Add new pair function to use createSentencePair
    const handleAddPair = async () => {
        if (!newPair.english || !newPair.vietnamese || !newPair.diff_level) {
            showAlert('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
            return;
        }

        try {
            await createSentencePair({
                ...newPair,
                user_id: id_user,
                status: 'saved',
            });
            await fetchPairs(); // Refresh the list
            setNewPair({ english: '', vietnamese: '', diff_level: '', notes: '' });
            setIsModalOpen(false);
            showAlert('Thêm cặp câu thành công');
        } catch (error) {
            showAlert('Lỗi khi thêm cặp câu: ' + error.message, 'error');
        }
    };

    const handleEditPair = async () => {
        if (!editPair.english || !editPair.vietnamese || !editPair.diff_level) {
            showAlert('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
            return;
        }

        try {
            // Tách riêng id và data
            const { id, ...updateData } = editPair;

            console.log('ID:', id);
            console.log('Data being sent for update:', updateData);

            // Gọi API với id và data riêng biệt
            const response = await updateSentencePair(id, updateData);
            console.log('Update API response:', response);

            if (!response) {
                throw new Error('Không thể cập nhật dữ liệu');
            }

            await fetchPairs(); // Refresh the list
            setEditPair(null);
            setIsModalOpen(false);
            showAlert('Cập nhật cặp câu thành công');
        } catch (error) {
            console.error('Error updating pair:', error);
            showAlert('Lỗi khi cập nhật cặp câu: ' + error.message, 'error');
        }
    };

    const handleDeletePair = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa cặp câu này?')) {
            try {
                await deleteSentencePair(id);
                await fetchPairs(); // Refresh the list
                showAlert('Xóa cặp câu thành công');
            } catch (error) {
                showAlert('Lỗi khi xóa cặp câu: ' + error.message, 'error');
            }
        }
    };

    const handleMovePair = async () => {
        if (!selectedDifficulty) {
            showAlert('Vui lòng chọn độ khó', 'error');
            return;
        }

        try {
            await updateSentencePair({
                ...selectedPairForMove,
                diff_level: selectedDifficulty,
            });
            await fetchPairs(); // Refresh the list
            setSelectedPairForMove(null);
            setSelectedDifficulty('');
            setIsMoveModalOpen(false);
            showAlert('Thay đổi độ khó thành công');
        } catch (error) {
            showAlert('Lỗi khi thay đổi độ khó: ' + error.message, 'error');
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center pt-[65px]">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="px-4 pt-[65px] dark:text-white sm:px-6">
            <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Cặp câu song ngữ</h1>

            {alert.show && (
                <div
                    className={`mb-4 rounded-md p-4 ${alert.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                >
                    {alert.message}
                </div>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                    onClick={() => {
                        setEditPair(null);
                        setIsModalOpen(true);
                    }}
                    className="mb-6 flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    <PlusCircle className="h-5 w-5" />
                    Thêm cặp câu mới
                </button>

                <div className="relative mb-6 max-w-full rounded-full border border-gray-500 sm:max-w-[400px] lg:block">
                    <input
                        type="text"
                        className="w-full rounded-full border border-gray-600 bg-opacity-70 px-4 py-2 text-white placeholder-gray-400 shadow-md transition-all duration-300 ease-in-out hover:bg-gray-700 focus:border-blue-300"
                        placeholder="Tìm kiếm cặp câu..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className="absolute right-3 top-2 text-gray-400 hover:text-white">
                        <Search />
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                {filteredPairs.map((pair) => (
                    <div
                        key={pair.id}
                        className="flex flex-col justify-between rounded-md bg-gray-100 p-4 shadow-sm sm:flex-row sm:items-center"
                    >
                        <div>
                            <p className="text-lg font-semibold text-gray-800">{pair.english}</p>
                            <p className="text-gray-600">{pair.vietnamese}</p>
                            <p className="text-sm text-gray-400">Độ khó: {pair.diff_level}</p>
                            <p className="italic text-gray-500">{pair.notes}</p>
                        </div>
                        <div className="mt-3 flex gap-3 sm:mt-0">
                            <button
                                onClick={() => {
                                    setEditPair(pair);
                                    setIsModalOpen(true);
                                }}
                                className="text-blue-500 hover:text-blue-600"
                            >
                                <Edit className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedPairForMove(pair);
                                    setIsMoveModalOpen(true);
                                }}
                                className="text-gray-500 hover:text-gray-600"
                            >
                                <Move className="h-5 w-5" />
                            </button>
                            <button onClick={() => handleDeletePair(pair.id)} className="text-red-500 hover:text-red-600">
                                <Trash className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <h2 className="mb-4 text-xl font-bold">{editPair ? 'Chỉnh sửa cặp câu' : 'Thêm cặp câu mới'}</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Câu tiếng Anh *"
                                className="w-full rounded-md border p-2"
                                value={editPair ? editPair.english : newPair.english}
                                onChange={(e) =>
                                    editPair
                                        ? setEditPair({ ...editPair, english: e.target.value })
                                        : setNewPair({ ...newPair, english: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Câu tiếng Việt *"
                                className="w-full rounded-md border p-2"
                                value={editPair ? editPair.vietnamese : newPair.vietnamese}
                                onChange={(e) =>
                                    editPair
                                        ? setEditPair({ ...editPair, vietnamese: e.target.value })
                                        : setNewPair({ ...newPair, vietnamese: e.target.value })
                                }
                            />
                            <select
                                className="w-full rounded-md border p-2"
                                value={editPair ? editPair.diff_level : newPair.diff_level}
                                onChange={(e) =>
                                    editPair
                                        ? setEditPair({ ...editPair, diff_level: e.target.value })
                                        : setNewPair({ ...newPair, diff_level: e.target.value })
                                }
                            >
                                <option value="">Chọn độ khó *</option>
                                {difficultyLevels.map((level) => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select>
                            <textarea
                                placeholder="Ghi chú"
                                className="w-full rounded-md border p-2"
                                value={editPair ? editPair.notes : newPair.notes}
                                onChange={(e) =>
                                    editPair
                                        ? setEditPair({ ...editPair, notes: e.target.value })
                                        : setNewPair({ ...newPair, notes: e.target.value })
                                }
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 rounded-md bg-gray-500 p-2 text-white hover:bg-gray-600"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={editPair ? handleEditPair : handleAddPair}
                                    className="flex-1 rounded-md bg-green-500 p-2 text-white hover:bg-green-600"
                                >
                                    {editPair ? 'Lưu chỉnh sửa' : 'Thêm cặp câu'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isMoveModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <h2 className="mb-4 text-xl font-bold">Thay đổi độ khó</h2>
                        <div className="space-y-4">
                            <select
                                className="w-full rounded-md border p-2"
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                            >
                                <option value="">Chọn độ khó mới</option>
                                {difficultyLevels
                                    .filter((level) => level !== selectedPairForMove?.diff_level)
                                    .map((level) => (
                                        <option key={level} value={level}>
                                            {level}
                                        </option>
                                    ))}
                            </select>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsMoveModalOpen(false)}
                                    className="flex-1 rounded-md bg-gray-500 p-2 text-white hover:bg-gray-600"
                                >
                                    Hủy
                                </button>
                                <button onClick={handleMovePair} className="flex-1 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600">
                                    Thay đổi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pairs;
