/* eslint-disable react/prop-types */
import '~/styles/components/BilingualSubtitles.css';
import { useState, useEffect, useRef } from 'react';
import { Save, X } from 'lucide-react';
import { parseSrtFile } from '~/utils/srtParser';
import { createSentencePair } from '~/services/sentencePair';

const BilingualSubtitles = ({ engSubUrl, vieSubUrl, episodeId }) => {
    const id_user = JSON.parse(localStorage.getItem('user'))?.id || null;
    const [engSubtitles, setEngSubtitles] = useState([]);
    const [vieSubtitles, setVieSubtitles] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSubtitle, setCurrentSubtitle] = useState({ en: '', vi: '' });
    const [rowHeights, setRowHeights] = useState({});
    const [saving, setSaving] = useState(false); // Track save status

    const engRefs = useRef([]);
    const vieRefs = useRef([]);

    useEffect(() => {
        const fetchSubtitles = async () => {
            try {
                const engResponse = await fetch(engSubUrl);
                const engData = await engResponse.text();
                const parsedEngSubs = parseSrtFile(engData);
                setEngSubtitles(parsedEngSubs);

                const vieResponse = await fetch(vieSubUrl);
                const vieData = await vieResponse.text();
                const parsedVieSubs = parseSrtFile(vieData);
                setVieSubtitles(parsedVieSubs);
            } catch (error) {
                console.error('Error fetching subtitles:', error);
            }
        };

        if (engSubUrl && vieSubUrl) {
            fetchSubtitles();
        }
    }, [engSubUrl, vieSubUrl]);

    useEffect(() => {
        const updateHeights = () => {
            const newHeights = {};
            engRefs.current.forEach((ref, index) => {
                if (ref && vieRefs.current[index]) {
                    const engHeight = ref.offsetHeight;
                    const vieHeight = vieRefs.current[index].offsetHeight;
                    newHeights[index] = Math.max(engHeight, vieHeight);
                }
            });
            setRowHeights(newHeights);
        };

        // Update heights after content is loaded
        if (engSubtitles.length > 0 && vieSubtitles.length > 0) {
            requestAnimationFrame(updateHeights);
        }
    }, [engSubtitles, vieSubtitles]);

    const handleSave = (engSub, vieSub) => {
        setCurrentSubtitle({
            en: engSub.text,
            vi: vieSub.text,
        });
        setIsModalOpen(true);
        console.log(engSub, vieSub);
    };

    const handleSaveToAPI = async () => {
        const payload = {
            user_id: id_user,
            episode_id: episodeId,
            english: currentSubtitle.en,
            vietnamese: currentSubtitle.vi,
            notes: '',
            diff_level: 'medium',
            tags: '',
            status: 'saved',
        };

        setSaving(true);
        try {
            await createSentencePair(payload);
            alert('Subtitle saved successfully!');
        } catch (error) {
            console.error('Error saving subtitle:', error);
            alert('Failed to save subtitle.');
        } finally {
            setSaving(false);
            setIsModalOpen(false);
        }
    };
    const SaveModal = () =>
        isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="mx-4 w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-medium text-white">Save Subtitle</h3>
                        <button onClick={() => setIsModalOpen(false)} className="text-gray-400 transition-colors hover:text-white">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <textarea
                            value={currentSubtitle.en}
                            readOnly
                            className="w-full resize-none rounded border border-zinc-700 bg-zinc-800 p-3 text-sm text-white"
                        />
                        <textarea
                            value={currentSubtitle.vi}
                            readOnly
                            className="w-full resize-none rounded border border-zinc-700 bg-zinc-800 p-3 text-sm text-white"
                        />
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="rounded-full bg-zinc-800 px-4 py-2 text-white transition-colors hover:bg-zinc-700"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSaveToAPI}
                            className={`rounded-full px-4 py-2 text-white transition-colors ${
                                saving ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'
                            }`}
                            disabled={saving}
                        >
                            {saving ? 'Đang lưu...' : 'Lưu'}
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
                        <div className="mb-2">English Subtitles</div>
                        {engSubtitles.map((sub, index) => (
                            <div
                                key={index}
                                className={`group relative mb-2 ${hoveredIndex === index ? 'bg-slate-700/50' : ''} rounded-lg p-2`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="mb-1 flex items-center justify-between">
                                    <span className="text-xs text-gray-400">
                                        {sub.start} - {sub.end}
                                    </span>
                                    {hoveredIndex === index && (
                                        <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button onClick={() => handleSave(sub, vieSubtitles[index])} className="hover:text-white">
                                                <Save className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <p ref={(el) => (engRefs.current[index] = el)} className="text-sm" style={{ minHeight: rowHeights[index] }}>
                                    {sub.text}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1">
                        <div className="mb-2">Vietnamese Subtitles</div>
                        {vieSubtitles.map((sub, index) => (
                            <div
                                key={index}
                                className={`group relative mb-2 ${hoveredIndex === index ? 'bg-slate-700/50' : ''} rounded-lg p-2`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="mb-1 flex items-center justify-between">
                                    <span className="text-xs text-gray-400">
                                        {sub.start} - {sub.end}
                                    </span>
                                    {hoveredIndex === index && (
                                        <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button onClick={() => handleSave(engSubtitles[index], sub)} className="hover:text-white">
                                                <Save className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <p ref={(el) => (vieRefs.current[index] = el)} className="text-sm" style={{ minHeight: rowHeights[index] }}>
                                    {sub.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BilingualSubtitles;
