import { useEffect, useRef, useState } from "react";
import { CertificationDetail } from "./CertificationDetail";
import { certificationsData } from "@/data/certifications.data";
import { CertificationTypes } from "@/types/certifications.types";
import CertificationsCard from "./CertificationsCard";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../css/swiper.certifications.css";
import ButtonSeeMore from "./ButtonSeeMore";
import { CertificationComponentsProps } from "@/types/certification-components.types";

const Certifications = ({
  isVisibleElements = false,
  showHeader = true,
}: CertificationComponentsProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(isVisibleElements);
  const [selectedCertification, setSelectedCertification] =
    useState<CertificationTypes | null>(null);

  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const onAutoplayTimeLeft = (_s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const displayedCerts = showAll
    ? certificationsData
    : certificationsData.slice(0, visibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("certifications");
    if (element) observer.observe(element);

    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(2);
      else if (window.innerWidth < 1024) setVisibleCount(showHeader ? 4 : 2);
      else if (window.innerWidth < 1440) setVisibleCount(showHeader ? 6 : 4);
      else setVisibleCount(showHeader ? 6 : 4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [showHeader]);

  function handleShowAll() {
    setShowAll((prev) => !prev);

    window.scrollTo({
      top: document.getElementById("certificationsGrid")?.offsetTop || 0,
      behavior: "smooth",
    });
  }

  return (
    <section
      id="certifications"
      className={`min-h-screen px-6 bg-gradient-subtle w-full ${
        showHeader && "py-20"
      }`}
    >
      {showHeader && (
        <div className="max-w-7xl mx-auto w-full">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
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

            {/* Certifications carousel */}
            <Swiper
              className="grid mySwiper"
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
              {certificationsData.map((cert, index) => (
                <SwiperSlide
                  key={index}
                  className="grid w-[90%] justify-center justify-items-center"
                >
                  <CertificationsCard
                    cert={cert}
                    index={index}
                    setSelectedCertification={setSelectedCertification}
                    isVisible={isVisible}
                  />
                </SwiperSlide>
              ))}

              <div
                className="autoplay-progress z-50 absolute"
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
      )}

      {/* Certifications grid */}
      <div className="relative w-full" id="certificationsGrid">
        <motion.div
          layout
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`grid grid-cols-1 md:grid-cols-2 ${
            showHeader ? "lg:grid-cols-3" : "lg:grid-cols-2"
          } w-full justify-center justify-items-center mt-10 gap-y-20 pb-10`}
        >
          {[...displayedCerts].map((cert, index) => (
            <CertificationsCard
              key={index}
              cert={cert}
              index={index}
              setSelectedCertification={setSelectedCertification}
              isVisible={isVisible}
            />
          ))}
        </motion.div>

        {/* Persistent ShowAll button */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex w-full justify-center items-center mt-12"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            onClick={handleShowAll}
            className="cursor-pointer"
          >
            <ButtonSeeMore showAll={showAll} />
          </motion.div>
        </motion.div>
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
