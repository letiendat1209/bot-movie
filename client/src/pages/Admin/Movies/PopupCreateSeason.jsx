/* eslint-disable react/prop-types */
import { useState } from 'react';

const PopupCreateSeason = ({ isOpen, onClose, onSave }) => {
    const [seasonNumber, setSeasonNumber] = useState('');

    const handleSave = () => {
        if (seasonNumber.trim() === '') {
            alert('Please enter a season number');
            return;
        }
        onSave(seasonNumber);
        setSeasonNumber('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-80 rounded-lg bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">Add New Season</h2>
                <input
                    type="text"
                    value={seasonNumber}
                    onChange={(e) => setSeasonNumber(e.target.value)}
                    placeholder="Enter season number"
                    className="mb-4 w-full rounded border border-gray-300 p-2"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupCreateSeason;
