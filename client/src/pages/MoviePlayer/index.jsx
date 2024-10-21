import BilingualSubtitles from '~/components/BilingualSubtitles';
import CustomVideoPlayerV2 from '~/components/CustomVideoPlayerV2';

import MovieList from '~/components/MovieList';

import { CustomButton, ImageWithOverlay, GenreSection, SubGroupSection, Description, TagList } from '~/Container/reusable'; // hàng tái sử dụng reusable
import EpisodeSidebar from '~/components/EpisodeSidebar';
import '~/styles/components/MovieDetail.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
function MoviePlayer() {
    const [showBilingualTab, setShowBilingualTab] = useState(false);

    const toggleBilingualTab = () => {
        setShowBilingualTab(!showBilingualTab);
    };
    const sidebarVariants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    return (
        <div className="s768:px[0] pt-[60px] dark:bg-slate-800 dark:text-gray-400 s360:px-[0px] s375:px-[0px] s412:px-[0px] s480:px-[0px] s640:px-[0px] s800:px-[0px] s900:px-[40px] s1024:px-[40px] s1280:px-[40px] s1366:px-[40px]">
            {/* Main Content */}
            <div className="mt-[20px] gap-2 px-[10px] s1024:flex s1024:gap-3 s1024:px-0">
                {/* Video Player */}
                <div className="w-full shrink-0 s1024:w-[640px] s1280:w-[880px] s1366:w-[960px]">
                    <CustomVideoPlayerV2 url="https://vimeo.com/1016909521" />

                    <div className="mb-2 mt-4">
                        <h1 className="film-info-title text-[16px] uppercase s768:text-[18px] s1024:text-[20px]">
                            CON LỢN VÀ CÔ GÁI: 100-NGÀY LÀM LỢN TẬP 1
                        </h1>
                    </div>
                    <div className="flex items-center justify-between s1024:block">
                        <span className="inline-block text-[14px] font-light s1024:mb-2">92,380 lượt xem</span>
                        <div className="flex gap-2">
                            {/* Nút Thích */}
                            <CustomButton
                                iconClass="fas fa-heart"
                                text="Thích 204"
                                colorClass="bg-red-600"
                                onClick={() => alert('Đã thích!')}
                            />
                            {/* Nút Theo dõi */}
                            <CustomButton
                                iconClass="fas fa-plus"
                                text="Theo dõi 196"
                                colorClass="bg-teal-700"
                                onClick={() => alert('Đã theo dõi!')}
                            />
                            {/* Nút Share */}
                            <CustomButton
                                iconClass="fas fa-share"
                                text="Share"
                                colorClass="bg-sky-700"
                                onClick={() => alert('Đã chia sẻ!')}
                            />
                            <div className="ml-auto">
                                <CustomButton
                                    iconClass={showBilingualTab ? "fas fa-list" : "fas fa-language"}
                                    text={showBilingualTab ? "Danh sách tập" : "Bật tab song ngữ"}
                                    colorClass={showBilingualTab ? "bg-sky-700" : "bg-orange-700"}
                                    onClick={toggleBilingualTab}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sidebar - Video List or Bilingual Tab with Animation */}
                <div className="relative w-full overflow-hidden ">
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
                            {showBilingualTab ? <BilingualSubtitles /> : <EpisodeSidebar />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <div className="">
                <div className="mt-[30px] gap-2 px-[10px] s1024:flex s1024:gap-3 s1024:px-0">
                    <div className="w-full s1024:w-[640px] s1280:w-[880px] s1366:w-[960px]">
                        <div className="mb-5 w-full gap-2 overflow-hidden s640:gap-3 s768:flex">
                            <ImageWithOverlay
                                src="https://s199.imacdn.com/vg/2024/07/04/d86acdea3895fcc4_ddd0d6d63d32dcec_48167172008078633.jpg"
                                alt=""
                                overlayText="24 Tập"
                            />
                            <span className="block text-[14px] font-light s768:hidden">Thể loại:</span>
                            <div className="flex grow flex-col s768:w-auto">
                                <GenreSection genres={['Siêu nhiên', 'Đời thường', 'Học đường']} />
                                <span className="block text-[14px] font-light s768:hidden">Nhóm sub:</span>
                                <SubGroupSection
                                    groups={[
                                        {
                                            name: 'Wicked House',
                                            href: 'https://www.facebook.com/letiendat912',
                                        },
                                        {
                                            name: 'Omamori お守り',
                                            href: 'https://www.facebook.com/letiendat912',
                                        },
                                    ]}
                                />
                                <Description
                                    totalEpisodes={24}
                                    content="Câu chuyện bắt đầu với Goro, một bác sĩ tình cờ xử lý ca sinh nở của thần tượng mà mình yêu thích - Ai Hoshino, người đã tạm ngừng hoạt động trong ngành giải trí để sinh hai đứa con song sinh. Tuy nhiên, ngay trước khi Ai sinh ra, Gorō đã chết vì một tai nạn, nhưng được tái sinh thành một trong những đứa con của Ai, Aquamarine Hoshino, với ký ức hoàn toàn nguyên vẹn."
                                    source="TinAnime"
                                />
                            </div>
                        </div>
                        <TagList tags={['Đạt đz tag', 'Đạt đz tag', 'Đạt đz tag', 'Đạt đz tag', 'Đạt đz tag', 'Đạt đz tag']} />
                    </div>
                </div>
            </div>
            <section className="mx-4">
                <MovieList title={'Chỗ này thêm slide'} />
            </section>
        </div>
    );
}

export default MoviePlayer;
