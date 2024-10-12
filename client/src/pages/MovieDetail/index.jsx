import BilingualSubtitles from "~/components/BilingualSubtitles";
// import CustomVideoPlayer from "~/components/CustomVideoPlayer";
import CustomVideoPlayerV2 from "~/components/CustomVideoPlayerV2";

import MovieList from "~/components/MovieList";

import {
  CustomButton,
  ImageWithOverlay,
  GenreSection,
  SubGroupSection,
  Description,
  TagList,
} from "~/Container/reusable"; // hàng tái sử dụng reusable
import EpisodeSidebar from "~/components/EpisodeSidebar";
import "~/styles/components/MovieDetail.css";
function MovieDetail() {
  return (
    <div className="dark:bg-slate-800 dark:text-gray-400 pt-[60px] s360:px-[0px] s375:px-[0px] s412:px-[0px] s480:px-[0px] s640:px-[0px] s768:px[0] s800:px-[0px] s900:px-[40px] s1024:px-[40px] s1280:px-[40px] s1366:px-[40px]">
      {/* Main Content */}
      <div className="mt-[20px] px-[10px] s1024:px-0 s1024:flex gap-2 s1024:gap-3">
        {/* Video Player */}
        <div className="shrink-0 w-full s1024:w-[640px] s1280:w-[880px] s1366:w-[960px]">
          <CustomVideoPlayerV2 url="https://vimeo.com/manage/videos/1016909521" />
          <div className="mt-4 mb-2">
            <h1 className="film-info-title text-[16px] s768:text-[18px] s1024:text-[20px] uppercase">
              CON LỢN VÀ CÔ GÁI: 100-NGÀY LÀM LỢN TẬP 1
            </h1>
          </div>
          <div className="flex justify-between items-center s1024:block">
            <span className="s1024:mb-2 inline-block text-[14px] font-light">
              92,380 lượt xem
            </span>
            <div className="flex gap-2">
              {/* Nút Thích */}
              <CustomButton
                iconClass="fas fa-heart"
                text="Thích 204"
                colorClass="bg-red-600"
                onClick={() => alert("Đã thích!")}
              />
              {/* Nút Theo dõi */}
              <CustomButton
                iconClass="fas fa-plus"
                text="Theo dõi 196"
                colorClass="bg-teal-700"
                onClick={() => alert("Đã theo dõi!")}
              />
              {/* Nút Share */}
              <CustomButton
                iconClass="fas fa-share"
                text="Share"
                colorClass="bg-sky-700"
                onClick={() => alert("Đã chia sẻ!")}
              />
              <div className="ml-auto">
                <CustomButton
                  iconClass="fas fa-language"
                  text="Bật tab song ngữ"
                  colorClass="bg-sky-700"
                  onClick={() => alert("Bật tab song ngữ")}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar - Video List */}
        <div className="hidden">
          <EpisodeSidebar />
        </div>
        {/* Sidebar - Song ngữ */}
        <div>
          <BilingualSubtitles />
        </div>
      </div>
      <div className="container">
        <div className="mt-[30px] px-[10px] s1024:px-0 s1024:flex gap-2 s1024:gap-3">
          <div className="w-full s1024:w-[640px] s1280:w-[880px] s1366:w-[960px]">
            <div className="s768:flex gap-2 w-full overflow-hidden s640:gap-3 mb-5">
              <ImageWithOverlay
                src="https://s199.imacdn.com/vg/2024/07/04/d86acdea3895fcc4_ddd0d6d63d32dcec_48167172008078633.jpg"
                alt=""
                overlayText="24 Tập"
              />
              <span className="block s768:hidden text-[14px] font-light">
                Thể loại:
              </span>
              <div className="grow s768:w-auto flex flex-col">
                <GenreSection
                  genres={["Siêu nhiên", "Đời thường", "Học đường"]}
                />
                <span className="block s768:hidden text-[14px] font-light">
                  Nhóm sub:
                </span>
                <SubGroupSection
                  groups={[
                    {
                      name: "Wicked House",
                      href: "https://www.facebook.com/letiendat912",
                    },
                    {
                      name: "Omamori お守り",
                      href: "https://www.facebook.com/letiendat912",
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
            <TagList
              tags={[
                "Đạt đz tag",
                "Đạt đz tag",
                "Đạt đz tag",
                "Đạt đz tag",
                "Đạt đz tag",
                "Đạt đz tag",
              ]}
            />
          </div>
        </div>
      </div>
      <section className="container">
        <MovieList title={"Chỗ này thêm slide khéo đẹp hơn"} />
      </section>
    </div>
  );
}

export default MovieDetail;
