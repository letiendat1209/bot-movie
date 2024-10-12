// BilingualSubtitles.js
import "../styles/components/BilingualSubtitles.css"; // Đảm bảo bạn có file CSS tương ứng

const subtitles = [
  { time: "00:39.88", en: "One meal?", vi: "Một bữa ăn à?" },
  { time: "00:41.28", en: "Anything?", vi: "Bất cứ gì?" },
  { time: "00:42.84", en: "Whatever I want?", vi: "Tôi muốn gì cũng được?" },
  { time: "00:44.00", en: "Asparagus.", vi: "Măng tây." },
  {
    time: "00:45.32",
    en: "Warm chocolate cake with coconut sugar. Then send your nude photo to me. I will show you my secret.",
    vi: "Bánh sô-cô-la nóng kèm đường dừa. Sau đó, tôi sử dụng một hiệu lên tôi. Tôi sẽ đã gì một bội mà.",
  },
  { time: "00:39.88", en: "One meal?", vi: "Một bữa ăn à?" },
  { time: "00:41.28", en: "Anything?", vi: "Bất cứ gì?" },
  { time: "00:42.84", en: "Whatever I want?", vi: "Tôi muốn gì cũng được?" },
  { time: "00:44.00", en: "Asparagus.", vi: "Măng tây." },
  {
    time: "00:45.32",
    en: "Warm chocolate cake with coconut sugar.",
    vi: "Bánh sô-cô-la nóng kèm đường dừa.",
  },
];
function BilingualSubtitles() {
  return (
    <div className="mt-5 s1024:mt-0 border-t s1024:border dark:border-slate-700 s1024:h-[360px] s1280:h-[495px] s1366:h-[540px] w-full overflow-hidden">
      <div className="bilingual-subtitles mt-5 s1024:mt-0 border-t s1024:border dark:border-slate-700 s1024:h-[360px] s1280:h-[495px] s1366:h-[540px] w-full">
        <div className="flex justify-between gap-2 dark:border-slate-700 text-white pt-3 rounded-lg max-w-full h-full">
          <div className="flex-1">
            <div className="mb-2">English sub</div>
            {subtitles.map((sub, index) => (
              <div key={index} className="mb-2 flex items-center">
                <span className="min-w-[50px] text-xs text-gray-400">
                  {sub.time}
                </span>
                - <p className="text-sm ml-2"> {sub.en}</p>
              </div>
            ))}
          </div>

          <div className="flex-1">
            <div className="mb-2">Vietnamese sub</div>
            {subtitles.map((sub, index) => (
              <div key={index} className="mb-2 flex items-center">
                <span className="min-w-[50px] text-xs text-gray-400">
                  {sub.time}
                </span>
                - <p className="text-sm ml-2">{sub.vi}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BilingualSubtitles;
