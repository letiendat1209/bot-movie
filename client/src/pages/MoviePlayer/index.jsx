/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BilingualSubtitles from '~/components/BilingualSubtitles';
import CustomVideoPlayerV2 from '~/components/CustomVideoPlayerV2';
import { CustomButton, ImageWithOverlay, GenreSection, SubGroupSection, Description, TagList } from '~/Container/reusable';
import EpisodeSidebar from '~/components/EpisodeSidebar';
import { toast } from 'react-toastify';
import { getEpisodeById } from '~/services/episodes';
import { getSubtitleByEpisodeId } from '~/services/subtitle';
import '~/styles/components/MovieDetail.css';
import { upvoteMovie } from '~/services/movies';
import { createFavorite } from '~/services/favorite';

function MoviePlayer() {
    const [showBilingualTab, setShowBilingualTab] = useState(false);
    const [subtitles, setSubtitles] = useState(null);
    const [episode, setEpisode] = useState(null);
    const [upvotes, setUpvotes] = useState(0); // State lưu số lượt Upvote
    const { id } = useParams();

    const toggleBilingualTab = () => {
        setShowBilingualTab(!showBilingualTab);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch episode data
                const episodeData = await getEpisodeById(id);
                setEpisode(episodeData);

                // Fetch subtitle data
                const subtitleResponse = await getSubtitleByEpisodeId(id);
                setSubtitles(subtitleResponse.data[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    const handleUpvote = async () => {
        if (!episode?.data.movie_id) {
            toast.success('Dữ liệu phim không hợp lệ!');
            return;
        }
        const user_id = JSON.parse(localStorage.getItem('user'))?.id || null;
        // Key lưu trữ thời gian upvote trong localStorage, dựa trên movie_id và user_id trong localStorage
        const localStorageKey = `lastUpvote_${user_id}`;
        const lastUpvote = localStorage.getItem(localStorageKey);
        const now = new Date().getTime();
        const fifteenHours = 15 * 60 * 60 * 1000; // 15 tiếng (millisecond)
    
        // Nếu đã upvote trước đó và chưa đủ 15 tiếng
        if (lastUpvote && now - parseInt(lastUpvote, 10) < fifteenHours) {
            const remainingTime = fifteenHours - (now - parseInt(lastUpvote, 10));
            const hoursLeft = Math.floor(remainingTime / (60 * 60 * 1000));
            const minutesLeft = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
            toast.error(`Bạn chỉ được upvote phim này một lần sau mỗi 15 tiếng. Hãy thử lại sau ${hoursLeft} giờ ${minutesLeft} phút.`);
            return;
        }
    
        // Nếu đủ điều kiện, thực hiện upvote
        try {
            const response = await upvoteMovie(episode?.data.movie_id); // Gọi API upvote
            setUpvotes((prev) => prev + 1); // Tăng lượt upvote trong UI
            localStorage.setItem(localStorageKey, now.toString()); // Lưu thời gian hiện tại
            toast.success(response.message); // Thông báo thành công
        } catch (error) {
            console.error('Error upvoting movie:', error);
            toast.error('Có lỗi xảy ra khi tăng lượt upvote');
        }
    };
    //
    const handleFavorite = async () => {
        const user_id = JSON.parse(localStorage.getItem('user'))?.id || null;
    
        if (!user_id) {
            toast.error('Bạn cần đăng nhập để thêm phim vào danh sách yêu thích!');
            return;
        }
    
        if (!episode?.data.movie_id) {
            toast.error('Dữ liệu phim không hợp lệ!');
            return;
        }
    
        try {
            const response = await createFavorite({ user_id, movie_id: episode?.data.movie_id });
            toast.success(response.message || 'Đã thêm vào danh sách yêu thích thành công!');
        } catch (error) {
            console.error('Error adding to favorites:', error);
            toast.info(error.message);
        }
    };

    const sidebarVariants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    return (
        <div className="pt-[60px] dark:bg-slate-800 dark:text-gray-400 s360:px-[0px] s375:px-[0px] s412:px-[0px] s480:px-[0px] s640:px-[0px] s800:px-[0px] s900:px-[40px] s1024:px-[40px] s1280:px-[40px] s1366:px-[40px]">
            <div className="mt-[20px] gap-2 px-[10px] s1024:flex s1024:gap-3 s1024:px-0">
                <div className="w-full shrink-0 s1024:w-[640px] s1280:w-[880px] s1366:w-[960px]">
                    <CustomVideoPlayerV2 url={episode?.data.video_url} subtitleUrl={episode?.data.subtitle_url} />

                    <div className="mb-2 mt-4">
                        <h1 className="film-info-title text-[16px] uppercase s768:text-[18px] s1024:text-[20px]">{episode?.data.title}</h1>
                    </div>

                    <div className="flex items-center justify-between s1024:block">
                        <span className="inline-block text-[14px] font-light s1024:mb-2">{episode?.data.movie_total_view} lượt xem</span>
                        <div className="flex gap-2">
                            <CustomButton
                                iconClass="fas fa-heart"
                                text={`${episode?.data.movie_upvote} lượt thích`}
                                colorClass="bg-red-600"
                            />
                            <CustomButton
                                iconClass="fas fa-plus"
                                text="Theo dõi 196"
                                colorClass="bg-teal-700"
                                onClick={handleFavorite}
                            />
                            <CustomButton
                                iconClass="fas fa-arrow-up"
                                text={`Upvote ${episode?.data.movie_upvote}`}
                                colorClass="bg-sky-700"
                                onClick={() => handleUpvote()}
                            />

                            <div className="ml-auto flex items-center gap-2">
                                <CustomButton
                                    iconClass={showBilingualTab ? 'fas fa-list' : 'fas fa-language'}
                                    text={showBilingualTab ? 'Danh sách tập' : 'Bật song ngữ'}
                                    colorClass={showBilingualTab ? 'bg-sky-700' : 'bg-orange-700'}
                                    onClick={toggleBilingualTab}
                                />
                                <CustomButton
                                    iconClass="fas fa-upload"
                                    text="Đóng góp phụ đề"
                                    colorClass="bg-sky-700"
                                    onClick={() => alert('Bạn phải đăng nhập để đóng góp!')}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative w-full overflow-hidden">
                    <AnimatePresence initial={false} mode="wait">
                        <motion.div
                            key={showBilingualTab ? 'bilingual' : 'episodes'}
                            variants={sidebarVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="w-full"
                        >
                            {showBilingualTab ? (
                                subtitles ? (
                                    <BilingualSubtitles
                                        engSubUrl={subtitles.eng_sub_url}
                                        vieSubUrl={subtitles.vie_sub_url}
                                        episodeId={id}
                                    />
                                ) : (
                                    <p className="mt-5 text-center text-gray-500">Chưa có bản đóng góp phụ đề song ngữ </p>
                                )
                            ) : (
                                <EpisodeSidebar seasonId={episode?.data.season_id} movieId={episode?.data.movie_id} />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="mt-[30px] gap-2 px-[10px] s1024:flex s1024:gap-3 s1024:px-0">
                <div className="w-full s1024:w-[640px] s1280:w-[880px] s1366:w-[960px]">
                    <div className="mb-5 w-full gap-2 overflow-hidden s640:gap-3 s768:flex">
                        <ImageWithOverlay src={episode?.data?.movie_poster} alt={episode?.data?.title} overlayText="24 Tập" />
                        <span className="block text-[14px] font-light s768:hidden">Thể loại:</span>
                        <div className="flex grow flex-col s768:w-auto">
                            <GenreSection genres={episode?.data?.movie_genres?.map((genre) => genre.name) || []} />
                            <span className="block text-[14px] font-light s768:hidden">Nhóm sub:</span>
                            <SubGroupSection
                                groups={[
                                    {
                                        name: 'Lê Tiến Đạt',
                                        href: 'https://www.facebook.com/letiendat912',
                                    },
                                    {
                                        name: 'Omamori Lê Tiến Đạt お守り',
                                        href: 'https://www.facebook.com/letiendat912',
                                    },
                                ]}
                            />
                            <Description totalEpisodes={24} content={episode?.data.movie_description} source="Bot vn" />
                        </div>
                    </div>
                    <TagList tags={episode?.data?.movie_tags?.map((tag) => tag.name) || []} />
                </div>
            </div>
        </div>
    );
}

export default MoviePlayer;
