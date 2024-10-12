/* eslint-disable react/prop-types */
// Tùy chỉnh nút
export const CustomButton = ({
  iconClass,
  text,
  colorClass,
  onClick,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2 py-1",
    lg: "text-base px-3 py-1.5",
  };
  const iconSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };
  return (
    <button
      className={`flex items-center gap-1 rounded-full cursor-pointer ${colorClass} text-white font-light ${sizeClasses[size]}`}
      onClick={onClick}
    >
      <i className={`${iconClass} ${iconSizes[size]}`}></i>
      <span className="hidden sm:inline">{text}</span>
    </button>
  );
};

// Tùy chỉnh Tag
export const Tag = ({ href, className, children }) => (
  <a
    href={href}
    className={`relative shrink-0 px-2 py-0.5 text-[14px] font-light rounded ${className}`}
  >
    {children}
  </a>
);

// Tùy chỉnh Ảnh Overlay
export const ImageWithOverlay = ({ src, alt, overlayText }) => (
  <div className="relative w-28 hidden s768:block s640:w-40 s768:w-52 shrink-0">
    <img src={src} alt={alt} className="w-full rounded" />
    <span className="absolute top-2 left-2 px-2 py-1 rounded bg-red-600/50 text-white text-[12px] font-extralight">
      {overlayText}
    </span>
  </div>
);

// Tùy chỉnh Thể loại (trong chi tiết phim)
export const GenreSection = ({ genres }) => (
  <div className="relative mb-2 s640:mb-3 s768:mb-2 flex snap-x snap-mandatory overflow-x-auto gap-2 s1280:block scrollbar-hide">
    <span className="w-24 shrink-0 hidden s1280:inline-block">Thể loại:</span>
    {genres.map((genre, index) => (
      <Tag
        key={index}
        className="bg-red-400 dark:bg-teal-800 text-white s1280:mr-1"
      >
        {genre}
      </Tag>
    ))}
  </div>
);

// Tùy chỉnh tag Nhóm sub
export const SubGroupSection = ({ groups }) => (
  <div className="relative mb-2 s640:mb-3 s768:mb-2 flex snap-x snap-mandatory overflow-x-auto gap-2 s1280:block scrollbar-hide">
    <span className="w-24 shrink-0 hidden s1280:inline-block">Nhóm sub:</span>
    {groups.map((group, index) => (
      <Tag
        key={index}
        href={group.href}
        className="bg-purple-400 dark:bg-purple-800/80 text-white s1280:mr-1"
        rel="nofollow"
        target="_blank"
      >
        {group.name}
      </Tag>
    ))}
  </div>
);
// Tùy chỉnh Description phim
export const Description = ({ totalEpisodes, content, source }) => (
  <div className="order-last s768:order-none film-description relative mb-2 s640:mb-3 s768:mb-2 s768:ml-0 s768:h-36 overflow-hidden ps-container ps-theme-default">
    <p className="mb-2 s768:hidden">Tổng số: {totalEpisodes} tập</p>
    <p>{content}</p>
    <p>
      <em>(Nguồn: {source})</em>
    </p>
  </div>
);

// Tùy chỉnh Tag list
export const TagList = ({ tags }) => (
  <div className="mb-2">
    {tags.map((tag, index) => (
      <span
        key={index}
        className="inline-block bg-gray-200 dark:bg-slate-700 px-2 py-1 text-[14px] mr-1 mb-2 rounded"
      >
        {tag}
      </span>
    ))}
  </div>
);
