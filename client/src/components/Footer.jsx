import toji from "../../public/assets/toji.png";
function Footer() {
  return (
    <footer className="relative text-white p-8 mt-8 bg-gray-800 dark:bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-50">
        <img className="w-full h-full object-cover" src={toji} alt="" />
      </div>

      {/* Nội dung chính của footer */}
      <div className="relative z-10 container mx-auto">
        <h2 className="text-xl font-bold mb-4">
          Phim chất lượng cao online của XemPhim khác gì so với các trang phim
          khác?
        </h2>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Là phim bluray (reencoded), có độ phân giải thấp nhất là Full HD
            (1080p), trong khi hầu hết các trang phim khác chỉ có độ phân giải
            HD (720p) là cao nhất
          </li>
          <li>
            Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10 lần
            phim online thông thường - đây là yếu tố quyết định độ nét của phim
            (thậm chí còn quan trọng hơn độ phân giải)
          </li>
          <li>
            Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang
            phim khác (kể cả Youtube)
          </li>
          <li>
            Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải
            cao
          </li>
          <li>
            Nếu không hài lòng với phụ đề có sẵn, bạn có thể tự upload phụ đề
            của riêng mình để xem online
          </li>
          <li>
            Có lựa chọn hiển thị phụ đề song ngữ (tức hiện đồng thời cả tiếng
            Anh & tiếng Việt), phù hợp với những người muốn học tiếng Anh qua
            phụ đề phim
          </li>
        </ul>
        {/* Social Icons */}
        <div className="py-7 border-t border-gray-200">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span className="text-sm text-gray-500 ">
              ©<a href="https://www.facebook.com/letiendat912">botdz</a> 2024,
              All rights reserved.
            </span>
            <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
              <a
                href="https://www.facebook.com/letiendat912"
                className="w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#33CCFF] hover:bg-gray-900"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a
                href="https://www.facebook.com/letiendat912"
                className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[linear-gradient(45deg,#FEE411_6.9%,#FEDB16_10.98%,#FEC125_17.77%,#FE983D_26.42%,#FE5F5E_36.5%,#FE2181_46.24%,#9000DC_85.57%)]  hover:bg-gradient-to-b from-gray-900 to-gray-900  
                        "
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://www.facebook.com/letiendat912"
                className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#337FFF]  hover:bg-gray-900 "
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                href="https://www.facebook.com/letiendat912"
                className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#FF0000]  hover:bg-gray-900 "
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
