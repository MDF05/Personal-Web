import { useEffect, useRef, useState } from "react";
import { CertificationDetail } from "./CertificationDetail";
import { certificationsData } from "@/data/certifications.data";
import { CertificationTypes } from "@/types/certifications.types";
import CertificationsCard from "./CertificationsCard";
// atau "@/components/ui/button" kalau pakai shadcn/ui
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../css/swiper.certifications.css";
import ButtonSeeMore from "./ButtonSeeMore";

const Certifications = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedCertification, setSelectedCertification] =
    useState<CertificationTypes>(null);

  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0); // jumlah card yang ditampilkan saat awal
  const [hContainerCertificationGrid, setHContainerCertificationGrid] =
    useState("15vmax");

  const displayedCerts = showAll
    ? certificationsData.reverse().reverse()
    : certificationsData.slice(0, visibleCount);

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("certifications");
    if (element) observer.observe(element);

    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(2);
      else if (window.innerWidth < 1024) setVisibleCount(4);
      else if (window.innerWidth < 1440) setVisibleCount(6);
      else setVisibleCount(6);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    window.removeEventListener("resize", handleResize);

    const buttonContainerShowAll = document.querySelector<HTMLDivElement>(
      ".buttonShowAllContainer"
    );
    buttonContainerShowAll.style.height = "15vmax";

    return () => observer.disconnect();
  }, []);

  function handleShowAll() {
    setShowAll(!showAll);

    setHContainerCertificationGrid(showAll ? "0vmax" : "15vmax");
    const buttonContainerShowAll = document.querySelector<HTMLDivElement>(
      ".buttonShowAllContainer"
    );

    window.scrollTo({
      top: document.getElementById("certificationsGrid").offsetTop,
      behavior: "smooth",
    });

    if (buttonContainerShowAll) {
      buttonContainerShowAll.style.transition = "all 1s ease-in-out";
      buttonContainerShowAll.style.height = showAll
        ? hContainerCertificationGrid
        : "0vmax";
    }

    return;
  }

  return (
    <section
      id="certifications"
      className="min-h-screen py-20 px-6 bg-gradient-subtle w-[100%]"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Section title */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-orbitron font-bold mb-6">
              My <span className="gradient-text">Certifications</span>
            </h2>
            <p className="text-xl text-muted-foreground font-rajdhani max-w-3xl mx-auto">
              Professional certifications validating expertise across cloud
              platforms and modern technologies
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
          </div>

          {/* Certifications grid */}

          <Swiper
            className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mySwiper "
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
          >
            {certificationsData.reverse().map((cert, index) => (
              <SwiperSlide className="grid w-[90%] justify-center justify-items-center ">
                <CertificationsCard
                  cert={cert}
                  index={index}
                  setSelectedCertification={setSelectedCertification}
                  isVisible={isVisible}
                ></CertificationsCard>
              </SwiperSlide>
            ))}

            <div
              className="autoplay-progress z-50 absolute "
              slot="container-end"
            >
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span>
            </div>
          </Swiper>
        </div>
      </div>

      <div className="relative w-full" id="certificationsGrid">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[100%] justify-center justify-items-center mt-10 gap-y-20 pb-10`}
        >
          {[...displayedCerts].reverse()?.map((cert, index) => {
            return (
              <CertificationsCard
                cert={cert}
                index={index}
                setSelectedCertification={setSelectedCertification}
                isVisible={isVisible}
              ></CertificationsCard>
            );
          })}
        </div>
        <div
          className={`flex w-[100%] justify-center items-center rounded-xl bg-white/10 backdrop-blur-md backdrop-saturate-125 border border-white/20 shadow-lg absolute 
          bottom-[-10px] buttonShowAllContainer `}
        >
          <motion.div
            initial={{ scale: 1, y: 0 }}
            animate={{
              scale: [1, 1.1, 1],
              y: [0, -5, 0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            onClick={handleShowAll}
          >
            <ButtonSeeMore showAll={showAll}></ButtonSeeMore>
          </motion.div>
        </div>
      </div>

      {/* Certification Detail Modal */}
      {selectedCertification && (
        <CertificationDetail
          certification={selectedCertification}
          isOpen={!!selectedCertification}
          onClose={() => setSelectedCertification(null)}
        />
      )}
    </section>
  );
};

export default Certifications;
