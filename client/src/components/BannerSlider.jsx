import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade'; // Import hiệu ứng fade
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import '../styles/components/BannerSlider.css';
import { useEffect, useState } from 'react';
import { getImagesByType } from '~/services/Images';

function BannerSlider() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await getImagesByType('slider');
                setData(response);
                console.log(response);
            } catch (error) {
                console.error('Failed to fetch images:', error);
            }
        };
        fetchImages();
    }, []);

    return (
        <Swiper
            effect="fade" //
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
                clickable: true,
                el: '.custom-pagination',
                renderBullet: function (index, className) {
                    return '<span class="' + className + '"><div class="progress"></div></span>';
                },
            }}
            onSlideChange={(swiper) => {
                const bullets = document.querySelectorAll('.swiper-pagination-bullet');
                bullets.forEach((bullet, i) => {
                    const progress = bullet.querySelector('.progress');
                    if (i !== swiper.realIndex) {
                        bullet.classList.remove('animating');
                        if (progress) {
                            progress.style.transform = 'translateX(-100%)';
                        }
                    } else {
                        bullet.classList.add('animating');
                        if (progress) {
                            progress.style.transform = 'translateX(0)';
                        }
                    }
                });
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            className="relative"
        >
            {data.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className="relative">
                        <img src={item.url} alt="Slide 1" className="w-full" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent"></div>
                        <div className="absolute left-20 top-1/4 max-w-[460px] space-y-4 text-white">
                            <h2 className="text-4xl font-bold md:line-clamp-1">{item.title}</h2>
                            <p className="hidden text-lg md:line-clamp-5">{item.description}</p>
                            <div className="flex space-x-4">
                                <button className="rounded-full bg-cyan-200 px-4 py-2 font-semibold uppercase text-black">
                                    start watching
                                </button>
                                <button className="rounded-full border-2 border-white bg-transparent px-4 py-2">
                                    <i className="fas fa-bookmark text-orange-200"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}

            {/* Pagination */}
            <div className="custom-pagination swiper-pagination"></div>
        </Swiper>
    );
}

export default BannerSlider;
