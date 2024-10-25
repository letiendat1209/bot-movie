import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade'; // Import hiệu ứng fade
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import '../styles/components/BannerSlider.css';
const data = [
    {
        title: 'Kaiju No. 8',
        description:
            "In a world plagued by creatures known as Kaiju, Kafka Hibino aspired to enlist in The Defense Force. He makes a promise to enlist with his childhood friend, Mina Ashiro.Soon, life takes them in separate ways.While employed cleaning up after Kaiju battles, Kafka meets Reno Ichikawa.Reno's determination to join The Defense Force reawakens Kafka's promise to join Mina and protect humanity.",
        image: 'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F17ovUftCzLgf-rNnn5NV9KCqIJg1pfI1j%3Dw3840&w=1920&q=80',
    },
    {
        title: 'Makoto Misumi',
        description:
            "Makoto Misumi was just an average teenager who suddenly was summoned to another world as a hero. But the goddess of this world called him ugly and took his hero status away from him, then sent him to the ends of the world. He meets dragons, spiders, orcs, dwarves, and many other non-human races in the wastelands. Makoto manages to show promise in the use of magic and fighting, which he wouldn't have been able to do in his former world.He has numerous encounters, but will he be able to survive this new world ? A fantasy where a guy who gods and humanity had abandoned tries to reset his life in this new world is about to begin!",
        image: 'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1lrekDo5SUq73TkpcmcLIZYtQ9hEWcD5Z%3Dw3840&w=1920&q=80',
    },
    {
        title: 'Failure Flame',
        description:
            "While on the road to their field trip, Class 2-C's bus is enveloped in light, and the Goddess, Vicius, summons the students and their teacher to another world.The Goddess hopes to raise them as Heroes to defeat the Great Demon Empire, and she",
        image: 'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1Iq82R_G7kZTeqM4AH8MSJCWfXckRNqEf%3Dw3840&w=1920&q=80',
    },
];
function BannerSlider() {
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
                        <img src={item.image} alt="Slide 1" className="w-full" />
                        <div className="absolute left-20 top-1/4 max-w-[460px] space-y-4 text-white">
                            <h2 className="text-4xl font-bold">{item.title}</h2>
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
