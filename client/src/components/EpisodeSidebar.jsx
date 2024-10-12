import { NextTriangle } from "~/assets/icons"; // Import NextTriangle nếu là một component khác

const EpisodeSidebar = () => {
  return (
    <div className="mt-5 s1024:mt-0 border-t s1024:border dark:border-slate-700 s1024:h-[360px] s1280:h-[495px] s1366:h-[540px] w-full overflow-hidden">
      <div className="player-sidebar-header h-12 leading-10 s1024:px-3 flex gap-4 items-center overflow-hidden border-b dark:border-slate-700">
        <div className="tab-item tab-episode activated h-full text-[12px] border-b-2 border-red-500 uppercase cursor-pointer">
          Danh sách tập
        </div>
        <div className="tab-item tab-comment ml-auto h-full border-red-500 text-[12px] uppercase cursor-pointer ">
          BÌNH LUẬN
        </div>
      </div>

      {/* Sidebar - Video List */}
      <div className="player-sidebar-body body-episode relative pb-3 overflow-hidden text-[14px]">
        <div className="episode-list-tool relative h-12 s1024:px-3 flex gap-4 items-center border-b dark:border-slate-700">
          <div className="season-active h-5 flex items-center gap-3 cursor-pointer hidden">
            <div className="season-name w-[72px] shrink-0">SEASON 5</div>
            <div className="season-range w-24 rounded px-2 text-right text-[12px] cursor-pointer bg-gray-200 dark:bg-slate-700"></div>
          </div>
          <div className="season-list absolute top-[39px] left-0 w-full s1024:px-3 max-h-0 overflow-auto opacity-0 invisible bg-white dark:bg-slate-800 shadow-xl transition-all duration-300 z-10 ps-container ps-theme-default"></div>
          <div className="episode-total h-5"> Tổng số: 4 video</div>
          <div className="episode-select relative h-5 flex gap-1 items-center ml-auto">
            Tập
            <input
              className="h-full w-[100px] pl-2 pr-5 bg-gray-200 dark:bg-slate-700 text-[12px] ring-0 outline-0 border-0 focus:ring-0 rounded"
              type="text"
            />
            <NextTriangle />
          </div>
        </div>

        <div className="episode-list relative s1024:px-3 s1024:max-h-[268px] s1280:max-h-[403px] s1366:max-h-[448px] min-h-[200px] overflow-auto">
          {/* Tập */}
          <div className="group/episode episode-item mt-3 overflow-hidden cursor-pointer episode-148916 activated text-red-500 dark:text-teal-300">
            <a href="" className="w-full flex gap-3">
              <div className="relative shrink-0 w-[106px] h-[60px] overflow-hidden">
                <img
                  src="https://s199.imacdn.com/vg/2024/07/04/193629384a417a62_d0af319ab91aa2f2_9481617200816633118684.jpg"
                  alt="episode-thumbnail"
                  className="group-hover/episode:scale-125 w-full h-full transition duration-300"
                />
              </div>
              <div className="grow">
                <div className="text-[14px] line-clamp-2 -mt-0.5 mb-1 group-hover/episode:text-red-600">
                  Tập 1 - Alya giấu cảm xúc của mình bằng tiếng Nga
                </div>
                <div className="text-[11px] font-extralight opacity-75">
                  23,851 lượt xem
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeSidebar;
