// BilingualSubtitles.js
import '~/styles/components/BilingualSubtitles.css'; // Đảm bảo bạn có file CSS tương ứng
import { useState } from 'react';
import { Save, X } from 'lucide-react';


const subtitles = [
    { time: '00:39.88', en: 'One meal?', vi: 'Một bữa ăn à?' },
    { time: '00:41.28', en: 'Anything?', vi: 'Bất cứ gì?' },
    { time: '00:42.84', en: 'Whatever I want?', vi: 'Tôi muốn gì cũng được?' },
    { time: '00:44.00', en: 'Asparagus.', vi: 'Măng tây.' },
    {
        time: '00:45.32',
        en: 'Warm chocolate cake with coconut sugar. Then send your nude photo to me. I will show you my secret.',
        vi: 'Bánh sô-cô-la nóng kèm đường dừa. Sau đó, tôi sử dụng một hiệu lên tôi. Tôi sẽ đã gì một bội mà.',
    },
    { time: '00:39.88', en: 'One meal?', vi: 'Một bữa ăn à?' },
    { time: '00:41.28', en: 'Anything?', vi: 'Bất cứ gì?' },
    { time: '00:42.84', en: 'Whatever I want?', vi: 'Tôi muốn gì cũng được?' },
    { time: '00:44.00', en: 'Asparagus.', vi: 'Măng tây.' },
    {
        time: '00:45.32',
        en: 'Warm chocolate cake with coconut sugar.',
        vi: 'Bánh sô-cô-la nóng kèm đường dừa.',
    },
    { time: '00:39.88', en: 'One meal?', vi: 'Một bữa ăn à?' },
    { time: '00:41.28', en: 'Anything?', vi: 'Bất cứ gì?' },
    { time: '00:42.84', en: 'Whatever I want?', vi: 'Tôi muốn gì cũng được?' },
    { time: '00:44.00', en: 'Asparagus.', vi: 'Măng tây.' },
    {
        time: '00:45.32',
        en: 'Warm chocolate cake with coconut sugar. Then send your nude photo to me. I will show you my secret.',
        vi: 'Bánh sô-cô-la nóng kèm đường dừa. Sau đó, tôi sử dụng một hiệu lên tôi. Tôi sẽ đã gì một bội mà.',
    },
    { time: '00:39.88', en: 'One meal?', vi: 'Một bữa ăn à?' },
    { time: '00:41.28', en: 'Anything?', vi: 'Bất cứ gì?' },
    { time: '00:42.84', en: 'Whatever I want?', vi: 'Tôi muốn gì cũng được?' },
    { time: '00:44.00', en: 'Asparagus.', vi: 'Măng tây.' },
    {
        time: '00:45.32',
        en: 'Warm chocolate cake with coconut sugar.',
        vi: 'Bánh sô-cô-la nóng kèm đường dừa.',
    },
];
function BilingualSubtitles() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSubtitle, setCurrentSubtitle] = useState({ en: '', vi: '' });

    const handleSave = (subtitle) => {
        setCurrentSubtitle(subtitle);
        setIsModalOpen(true);
    };
    const SaveModal = () => isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-white">Save Subtitle</h3>
                    <button 
                        onClick={() => setIsModalOpen(false)} 
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    <textarea 
                        value={currentSubtitle.en}
                        readOnly
                        className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white text-sm resize-none"
                    />
                    <textarea 
                        value={currentSubtitle.vi}
                        readOnly
                        className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white text-sm resize-none"
                    />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 rounded-full text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
                    >
                        Hủy
                    </button>
                    <button 
                        onClick={() => {
                            // Implement save logic here
                            setIsModalOpen(false);
                        }}
                        className="px-4 py-2 rounded-full text-white bg-red-600 hover:bg-red-700 transition-colors"
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
    return (
        <div className="mt-5 w-full overflow-hidden border-t dark:border-slate-700 s1024:mt-0 s1024:h-[360px] s1024:border s1280:h-[495px] s1366:h-[540px]">
            <SaveModal />
            <div className="bilingual-subtitles mt-5 w-full border-t dark:border-slate-700 s1024:mt-0 s1024:h-[360px] s1024:border s1280:h-[495px] s1366:h-[540px]">
                <div className="flex h-full max-w-full justify-between gap-2 rounded-lg pt-3 text-white dark:border-slate-700">
                    <div className="flex-1">
                        <div className="mb-2">English sub</div>
                        {subtitles.map((sub, index) => (
                            <div 
                                key={index} 
                                className={`mb-2 relative group ${
                                    hoveredIndex % subtitles.length === index ? 'bg-slate-700/50' : ''
                                } rounded-lg p-2`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-400">{sub.time}</span>
                                    {hoveredIndex === index && (
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => handleSave(sub)}
                                                className="hover:text-white"
                                            >
                                                <Save className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm">{sub.en}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1">
                        <div className="mb-2">Vietnamese sub</div>
                        {subtitles.map((sub, index) => (
                            <div 
                                key={index} 
                                className={`mb-2 relative group ${
                                    hoveredIndex % subtitles.length === index ? 'bg-slate-700/50' : ''
                                } rounded-lg p-2`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-400">{sub.time}</span>
                                    {hoveredIndex === index && (
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => handleSave(sub)}
                                                className="hover:text-white"
                                            >
                                                <Save className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm">{sub.vi}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BilingualSubtitles;
