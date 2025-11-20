import { useEffect, useState } from "react";

export const useHeroAnimation = () => {
  const [typedHeroText, setTypedHeroText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const targetText = "FULLSTACK DEVELOPER";
    let idx = 0;
    const interval = setInterval(() => {
      setTypedHeroText(targetText.slice(0, idx));
      idx += 1;
      if (idx > targetText.length) {
        clearInterval(interval);
        setTypedHeroText(targetText);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return { typedHeroText, cursorVisible };
};

