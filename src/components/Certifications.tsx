import { useEffect, useRef, useState } from "react";
import { CertificationDetail } from "./CertificationDetail";
import { certificationsData } from "@/data/certifications.data";
import { CertificationTypes } from "@/types/certifications.types";
import CertificationsCard from "./CertificationsCard";
import ButtonSeeMore from "./ButtonSeeMore";

import { motion } from "framer-motion";

interface CertificationComponentsProps {
  isVisibleElements?: boolean;
  showHeader?: boolean;
}

const Certifications = ({
  isVisibleElements = false,
  showHeader = true,
}: CertificationComponentsProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(isVisibleElements);
  const [selectedCertification, setSelectedCertification] =
    useState<CertificationTypes | null>(null);

  const [showAll, setShowAll] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const reversedCerts = [...certificationsData].reverse();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("certifications");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  function handleToggleShowAll() {
    setShowAll(!showAll);

    if (!showAll && containerRef.current) {
      // Scroll agar grid kelihatan penuh saat showAll
      window.scrollTo({
        top: containerRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
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
          </div>
        </div>
      )}

      {/* Certifications Grid */}
      <div
        className="relative w-full"
        id="certificationsGrid"
        ref={containerRef}
      >
        <div
          className={`grid gap-6 grid-cols-1 md:grid-cols-2 ${
            showHeader ? "lg:grid-cols-3" : "lg:grid-cols-2"
          }`}
        >
          {(showAll ? reversedCerts : reversedCerts.slice(0, 6)).map(
            (cert, index) => (
              <CertificationsCard
                key={cert.id}
                cert={cert}
                index={index}
                setSelectedCertification={setSelectedCertification}
                isVisible={isVisible}
              />
            )
          )}
        </div>

        {/* Overlay gradient + button saat showAll = false */}
        {!showAll && (
          <div className="absolute bottom-0 left-0 right-0 w-full h-40 bg-gradient-to-t from-background to-transparent flex items-end justify-center">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-full flex justify-center"
            >
              <button
                onClick={handleToggleShowAll}
                className="w-full max-w-md py-4 font-orbitron font-semibold bg-gradient-primary text-primary-foreground rounded-md shadow-lg"
              >
                <ButtonSeeMore showAll={showAll} />
              </button>
            </motion.div>
          </div>
        )}

        {/* Button saat showAll true */}
        {showAll && (
          <div className="w-full flex justify-center mt-12">
            <button
              onClick={handleToggleShowAll}
              className="px-6 py-3 font-orbitron font-semibold bg-gradient-primary text-primary-foreground rounded-md shadow-lg"
            >
              <ButtonSeeMore showAll={showAll} />
            </button>
          </div>
        )}
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
