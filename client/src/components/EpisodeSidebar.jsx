/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { NextTriangle } from '~/assets/icons';
import { getEpisodesBySeasonId } from '~/services/episodes';
import { getSeasonsByMovieId } from '~/services/season';
import '~/styles/components/BilingualSubtitles.css';

const EpisodeSidebar = ({ seasonId, movieId }) => {
    const [episodes, setEpisodes] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [selectedSeasonId, setSelectedSeasonId] = useState(seasonId || 1);
    const [view, setView] = useState('episodes'); // 'episodes' or 'seasons'

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const data = await getEpisodesBySeasonId(selectedSeasonId);
                setEpisodes(data.data);
            } catch (error) {
                console.error('There was an error fetching the Episode data!', error);
            }
        };
        fetchEpisodes();
    }, [selectedSeasonId]);

    useEffect(() => {
        const fetchSeasons = async () => {
            try {
                const data = await getSeasonsByMovieId(movieId); // Sử dụng movieId để lấy danh sách các season
                setSeasons(data.data); // Cập nhật state seasons với dữ liệu từ API
            } catch (error) {
                console.error('There was an error fetching the Season data!', error);
            }
        };
        fetchSeasons();
    }, [movieId]);

    return (
        <div className="mt-5 w-full overflow-hidden border-t dark:border-slate-700 s1024:mt-0 s1024:h-[360px] s1024:border s1280:h-[495px] s1366:h-[540px]">
            <div className="flex h-12 items-center gap-4 overflow-hidden border-b leading-10 dark:border-slate-700 s1024:px-3">
                <div
                    className={`h-full cursor-pointer text-[12px] uppercase ${view === 'episodes' ? 'border-b-2 border-red-500' : ''}`}
                    onClick={() => setView('episodes')}
                >
                    Episode List
                </div>
                <div
                    className={`h-full cursor-pointer text-[12px] uppercase ${view === 'seasons' ? 'border-b-2 border-red-500' : ''}`}
                    onClick={() => setView('seasons')}
                >
                    Seasons
                </div>
            </div>

            {view === 'seasons' ? (
                <div className="rounded-md bg-gray-100 p-5 shadow-md dark:bg-slate-800">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-slate-200">Available Seasons</h2>
                    <ul className="space-y-3">
                        {seasons.map((season) => (
                            <li
                                key={season.id}
                                className="flex cursor-pointer items-center gap-3 rounded-lg bg-white p-3 shadow-sm transition-all hover:bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600"
                                onClick={() => {
                                    setSelectedSeasonId(season.id);
                                    setView('episodes');
                                }}
                            >
                                <span className="block h-10 w-10 rounded-full bg-gray-200 pt-1 text-center text-lg font-semibold text-gray-800 dark:bg-slate-600 dark:text-slate-200">
                                    S{season.season_number}
                                </span>
                                <span className="text-gray-700 dark:text-slate-300">{season.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="relative overflow-hidden pb-3 text-[14px]">
                    <div className="relative flex h-12 items-center gap-4 border-b dark:border-slate-700 s1024:px-3">
                        <div className="h-5">Total: {episodes.length} episodes</div>
                        <div className="relative ml-auto flex h-5 items-center gap-1">
                            Episode
                            <input
                                className="h-full w-[100px] rounded border-0 bg-gray-200 pl-2 pr-5 text-[12px] outline-0 ring-0 focus:ring-0 dark:bg-slate-700"
                                type="text"
                            />
                            <NextTriangle />
                        </div>
                    </div>

                    <div className="bilingual-subtitles mt-5 w-full border-t dark:border-slate-700 s1024:mt-0 s1024:h-[360px] s1024:border s1280:h-[495px] s1366:h-[540px]">
                        {episodes.map((episode) => (
                            <div
                                key={episode.id}
                                className="group/episode episode-item activated mt-3 cursor-pointer overflow-hidden text-red-500 dark:text-teal-300"
                            >
                                <a href={`/episode/${episode.id}`} className="flex w-full gap-3">
                                    <div className="relative h-[60px] w-[106px] shrink-0 overflow-hidden">
                                        <img
                                            src={
                                                episode.thumbnail ||
                                                'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480,height=720/catalog/crunchyroll/13839ea2b48b0323417b23813a090c93.jpg'
                                            }
                                            alt={`episode-${episode.id}-thumbnail`}
                                            className="h-full w-full object-cover transition duration-300 group-hover/episode:scale-125"
                                        />
                                    </div>
                                    <div className="grow">
                                        <div className="-mt-0.5 mb-1 line-clamp-2 text-[14px] group-hover/episode:text-red-600">
                                            {episode.title}
                                        </div>
                                        <div className="text-[11px] font-extralight opacity-75">{episode.views}</div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EpisodeSidebar;
