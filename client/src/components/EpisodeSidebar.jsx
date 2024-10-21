import { NextTriangle } from '~/assets/icons'; // Import NextTriangle nếu là một component khác
import '~/styles/components/BilingualSubtitles.css'; // Đảm bảo bạn có file CSS tương ứng

const episodes = [
    {
        id: 1,
        title: 'Tập 1 - Alya giấu cảm xúc của mình bằng tiếng Nga',
        views: '23,851 lượt xem',
        thumbnail: 'https://s199.imacdn.com/vg/2024/07/04/193629384a417a62_d0af319ab91aa2f2_9481617200816633118684.jpg',
    },
    {
        id: 2,
        title: 'Tập 2 - Bí mật của Alya bị lộ',
        views: '20,451 lượt xem',
        thumbnail: 'https://s199.imacdn.com/vg/2024/07/04/193629384a417a62_d0af319ab91aa2f2_9481617200816633118684.jpg',
    },
    {
        id: 3,
        title: 'Tập 3 - Alya đối mặt với thử thách mới',
        views: '18,123 lượt xem',
        thumbnail: 'https://s199.imacdn.com/vg/2024/07/04/193629384a417a62_d0af319ab91aa2f2_9481617200816633118684.jpg',
    },
    {
        id: 4,
        title: 'Tập 4 - Cảm xúc của Alya và người bạn mới',
        views: '15,234 lượt xem',
        thumbnail: 'https://s199.imacdn.com/vg/2024/07/04/193629384a417a62_d0af319ab91aa2f2_9481617200816633118684.jpg',
    },
    {
        id: 5,
        title: 'Tập 5 - Cuộc sống của Alya thay đổi',
        views: '12,345 lượt xem',
        thumbnail: 'https://s199.imacdn.com/vg/2024/07/04/193629384a417a62_d0af319ab91aa2f2_9481617200816633118684.jpg',
    },
    {
        id: 1,
        title: 'Tập 1 - Alya giấu cảm xúc của mình bằng tiếng Nga',
        views: '23,851 lượt xem',
        thumbnail: 'https://s199.imacdn.com/vg/2024/07/04/193629384a417a62_d0af319ab91aa2f2_9481617200816633118684.jpg',
    },
    {
        id: 2,
        title: 'Tập 2 - Bí mật của Alya bị lộ',
        views: '20,451 lượt xem',
        thumbnail: 'https://s199.imacdn.com/vg/2024/07/04/193629384a417a62_d0af319ab91aa2f2_9481617200816633118684.jpg',
    },
    {
        id: 3,
        title: 'Tập 3 - Alya đối mặt với thử thách mới',
        views: '18,123 lượt xem',
        thumbnail: 'https://s199.imacdn.com/vg/2024/07/04/193629384a417a62_d0af319ab91aa2f2_9481617200816633118684.jpg',
    },
    {
        id: 4,
        title: 'Tập 4 - Cảm xúc của Alya và người bạn mới',
        views: '15,234 lượt xem',
        thumbnail: 'https://s199.imacdn.com/vg/2024/07/04/193629384a417a62_d0af319ab91aa2f2_9481617200816633118684.jpg',
    },
    {
        id: 5,
        title: 'Tập 5 - Cuộc sống của Alya thay đổi',
        views: '12,345 lượt xem',
        thumbnail: 'https://s199.imacdn.com/vg/2024/07/04/193629384a417a62_d0af319ab91aa2f2_9481617200816633118684.jpg',
    },
];

const EpisodeSidebar = () => {
    return (
        <div className="mt-5 w-full overflow-hidden border-t dark:border-slate-700 s1024:mt-0 s1024:h-[360px] s1024:border s1280:h-[495px] s1366:h-[540px]">
            <div className="flex h-12 items-center gap-4 overflow-hidden border-b leading-10 dark:border-slate-700 s1024:px-3">
                <div className="h-full cursor-pointer border-b-2 border-red-500 text-[12px] uppercase">Danh sách tập</div>
                <div className="ml-auto h-full cursor-pointer border-red-500 text-[12px] uppercase">BÌNH LUẬN</div>
            </div>

            {/* Sidebar - Video List */}
            <div className="relative overflow-hidden pb-3 text-[14px]">
                <div className="relative flex h-12 items-center gap-4 border-b dark:border-slate-700 s1024:px-3">
                    <div className="h-5">Tổng số: {episodes.length} video</div>
                    <div className="relative ml-auto flex h-5 items-center gap-1">
                        Tập
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
                            <a href="" className="flex w-full gap-3">
                                <div className="relative h-[60px] w-[106px] shrink-0 overflow-hidden">
                                    <img
                                        src={episode.thumbnail}
                                        alt={`episode-${episode.id}-thumbnail`}
                                        className="h-full w-full transition duration-300 group-hover/episode:scale-125"
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
        </div>
    );
};

export default EpisodeSidebar;
