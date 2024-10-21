import { useState } from 'react';
import { Edit, Trash, PlusCircle, Search, Move } from 'lucide-react';

const initialPairs = [
    { id: 1, en: 'Hello', vi: 'Xin chào', group: 'Phim A', note: 'Lời chào đơn giản' },
    { id: 2, en: 'How are you?', vi: 'Bạn khỏe không?', group: 'Phim B', note: '' },
    { id: 3, en: 'You are a very opinionated person', vi: 'Bạn là người rất có chính kiến', group: 'Mặt trời', note: 'câu này sẽ học sau' },
];

const groups = ['Phim A', 'Phim B', 'Phim C'];

function Pairs() {
    const [pairs, setPairs] = useState(initialPairs);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editPair, setEditPair] = useState(null);
    const [newPair, setNewPair] = useState({ en: '', vi: '', group: '', note: '' });
    const [search, setSearch] = useState('');
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
    const [selectedPairForMove, setSelectedPairForMove] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState('');

    // Filter pairs based on search term
    const filteredPairs = pairs.filter(
        (pair) =>
            pair.en.toLowerCase().includes(search.toLowerCase()) ||
            pair.vi.toLowerCase().includes(search.toLowerCase()) ||
            pair.group.toLowerCase().includes(search.toLowerCase()),
    );

    const showAlert = (message, type = 'success') => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    };

    // Add new pair
    const handleAddPair = () => {
        if (!newPair.en || !newPair.vi || !newPair.group) {
            showAlert('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
            return;
        }

        const newId = Math.max(...pairs.map((p) => p.id)) + 1;
        setPairs([...pairs, { ...newPair, id: newId }]);
        setNewPair({ en: '', vi: '', group: '', note: '' });
        setIsModalOpen(false);
        showAlert('Thêm cặp câu thành công');
    };

    // Edit pair
    const handleEditPair = () => {
        if (!editPair.en || !editPair.vi || !editPair.group) {
            showAlert('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
            return;
        }

        setPairs(pairs.map((p) => (p.id === editPair.id ? editPair : p)));
        setEditPair(null);
        setIsModalOpen(false);
        showAlert('Cập nhật cặp câu thành công');
    };

    // Delete pair
    const handleDeletePair = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa cặp câu này?')) {
            setPairs(pairs.filter((p) => p.id !== id));
            showAlert('Xóa cặp câu thành công');
        }
    };

    // Move pair to different group
    const handleMovePair = () => {
        if (!selectedGroup) {
            showAlert('Vui lòng chọn nhóm đích', 'error');
            return;
        }

        setPairs(pairs.map((p) => (p.id === selectedPairForMove.id ? { ...p, group: selectedGroup } : p)));
        setSelectedPairForMove(null);
        setSelectedGroup('');
        setIsMoveModalOpen(false);
        showAlert('Di chuyển cặp câu thành công');
    };

    return (
        <div className="px-4 pt-[65px] sm:px-6 dark:text-white">
            <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Cặp câu song ngữ</h1>

            {/* Alert */}
            {alert.show && (
                <div
                    className={`mb-4 rounded-md p-4 ${alert.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                >
                    {alert.message}
                </div>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Add new pair button */}
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

                {/* Search input */}
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

            {/* Pairs list */}
            <div className="space-y-4">
                {filteredPairs.map((pair) => (
                    <div
                        key={pair.id}
                        className="flex flex-col justify-between rounded-md bg-gray-100 p-4 shadow-sm sm:flex-row sm:items-center"
                    >
                        <div>
                            <p className="text-lg font-semibold text-gray-800">{pair.en}</p>
                            <p className="text-gray-600">{pair.vi}</p>
                            <p className="text-sm text-gray-400">Nhóm: {pair.group}</p>
                            <p className="italic text-gray-500">{pair.note}</p>
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

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <h2 className="mb-4 text-xl font-bold">{editPair ? 'Chỉnh sửa cặp câu' : 'Thêm cặp câu mới'}</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Câu tiếng Anh *"
                                className="w-full rounded-md border p-2"
                                value={editPair ? editPair.en : newPair.en}
                                onChange={(e) =>
                                    editPair
                                        ? setEditPair({ ...editPair, en: e.target.value })
                                        : setNewPair({ ...newPair, en: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Câu tiếng Việt *"
                                className="w-full rounded-md border p-2"
                                value={editPair ? editPair.vi : newPair.vi}
                                onChange={(e) =>
                                    editPair
                                        ? setEditPair({ ...editPair, vi: e.target.value })
                                        : setNewPair({ ...newPair, vi: e.target.value })
                                }
                            />
                            <select
                                className="w-full rounded-md border p-2"
                                value={editPair ? editPair.group : newPair.group}
                                onChange={(e) =>
                                    editPair
                                        ? setEditPair({ ...editPair, group: e.target.value })
                                        : setNewPair({ ...newPair, group: e.target.value })
                                }
                            >
                                <option value="">Chọn nhóm *</option>
                                {groups.map((group) => (
                                    <option key={group} value={group}>
                                        {group}
                                    </option>
                                ))}
                            </select>
                            <textarea
                                placeholder="Ghi chú"
                                className="w-full rounded-md border p-2"
                                value={editPair ? editPair.note : newPair.note}
                                onChange={(e) =>
                                    editPair
                                        ? setEditPair({ ...editPair, note: e.target.value })
                                        : setNewPair({ ...newPair, note: e.target.value })
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

            {/* Move Modal */}
            {isMoveModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <h2 className="mb-4 text-xl font-bold">Di chuyển cặp câu</h2>
                        <div className="space-y-4">
                            <select
                                className="w-full rounded-md border p-2"
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)}
                            >
                                <option value="">Chọn nhóm đích</option>
                                {groups
                                    .filter((g) => g !== selectedPairForMove?.group)
                                    .map((group) => (
                                        <option key={group} value={group}>
                                            {group}
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
                                    Di chuyển
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
