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
import "~/styles/components/CarouselCustom.css";
import { useEffect, useRef, useState } from 'react';

function CarouselCustom() {
    const [active, setActive] = useState(0);
    const autoPlayRef = useRef(null);
    const prevBtnRef = useRef(null);
    const nextBtnRef = useRef(null);
    const carouselRef = useRef(null);
    const firstPosition = 0;
    const lastPosition = data.length - 1;

    // Auto play logic
    const startAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }
        autoPlayRef.current = setInterval(() => {
            handleNextClick();
        }, 5000);
    };

    // Set slider state
    const setSlider = (index) => {
        setActive(index);
        startAutoPlay();
    };

    const handleNextClick = () => {
        const nextIndex = active + 1 > lastPosition ? 0 : active + 1;
        setSlider(nextIndex);
    };

    const handlePrevClick = () => {
        const prevIndex = active - 1 < firstPosition ? lastPosition : active - 1;
        setSlider(prevIndex);
    };

    // Dots click handler
    const handleDotClick = (index) => {
        setSlider(index);
    };

    // Start autoplay when component mounts
    useEffect(() => {
        startAutoPlay();

        return () => {
            clearInterval(autoPlayRef.current); // Cleanup interval on component unmount
        };
    }, [active]);

    return (
        <>
            <section className="carousel" ref={carouselRef}>
                <div className="list">
                    {data.map((item, index) => (
                        <div key={index} className={`item ${active === index ? 'active' : ''}`}>
                            <figure>
                                <img src={item.image} alt={`Nike D.0${index + 1}`} />
                            </figure>
                            <div className="content">
                                <p className="category">Sport Shoes</p>
                                <h2>{`NIKE D.0${index + 1}`}</h2>
                                <p className="description">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere ipsa blanditiis quidem dignissimos
                                    enim quam corrupti praesentium ipsam assumenda?
                                </p>
                                <div className="more">
                                    <button>Add To Cart</button>
                                    <button>
                                        <i className="fa-solid fa-play"></i> See More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="arrows">
                    <button id="prev" ref={prevBtnRef} onClick={handlePrevClick}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button id="next" ref={nextBtnRef} onClick={handleNextClick}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
                <div className="indicators">
                    <div className="number">{`0${active + 1}`}</div>
                    <ul>
                        {data.map((_, index) => (
                            <li
                                key={index}
                                className={active === index ? 'active' : ''}
                                onClick={() => handleDotClick(index)}
                            ></li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default CarouselCustom;
