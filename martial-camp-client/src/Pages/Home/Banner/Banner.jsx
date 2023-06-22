import { AttentionSeeker, JackInTheBox } from "react-awesome-reveal";
import img1 from "../../../assets/images/banner/img1.jpg"
import img2 from "../../../assets/images/banner/img2.jpg"
import img3 from "../../../assets/images/banner/img3.jpg"

const Banner = () => {

    const bannerText = <>
        <div className='bg-gradient-to-r from-slate-700 ... absolute flex items-center w-full h-full'>
            <div className='text-slate-200 absolute w-3/4 md:w-2/5 space-y-3 left-8'>
                <AttentionSeeker effect="rubberBand">
                    <h2 className='font-bold text-3xl md:text-4xl'>Discover the Martial Camp</h2>
                    <p className='text-slate-300 text-sm font-semibold'>
                        Welcome to Martial Camp! Dive into a world of endless possibilities as you embark on your physical journey. From iconic sets to the latest releases, our vast collection offers something for everyone. Unleash your imagination, build body structures, and create cherished memories!
                    </p>
                </AttentionSeeker>
            </div>
        </div>
    </>
    return (
        <div className="carousel h-[450px] md:h-[600px] w-full rounded-lg my-3 md:my-7 z-10">
            <div id="slide1" className="carousel-item relative w-full">
                {bannerText}
                <img src={img3} className="w-full object-cover" />
                <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                {bannerText}
                <img src={img2} className="w-full object-cover" />
                <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                {bannerText}
                <img src={img1} className="w-full object-cover" />
                <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;