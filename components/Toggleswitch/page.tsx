"use client";
import "./styles.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Toggleswitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const bb8Element = e.currentTarget.parentElement?.querySelector(
      ".bb8"
    ) as HTMLElement;

    if (bb8Element) {
      const handleTransitionEnd = () => {
        setTheme(theme === "dark" ? "light" : "dark");
        setIsAnimating(false);
        bb8Element.removeEventListener("transitionend", handleTransitionEnd);
      };

      bb8Element.addEventListener("transitionend", handleTransitionEnd);
    } else {
      // Fallback if element not found
      setTimeout(() => {
        setTheme(theme === "dark" ? "light" : "dark");
        setIsAnimating(false);
      }, 400);
    }
  };

  return (
    <label className="bb8-toggle">
      <input
        className="bb8-toggle__checkbox"
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
        disabled={isAnimating}
      />
      <div className="bb8-toggle__container">
        <div className="bb8-toggle__scenery">
          <div className="bb8-toggle__star"></div>
          <div className="bb8-toggle__star"></div>
          <div className="bb8-toggle__star"></div>
          <div className="bb8-toggle__star"></div>
          <div className="bb8-toggle__star"></div>
          <div className="bb8-toggle__star"></div>
          <div className="bb8-toggle__star"></div>
          <div className="tatto-1"></div>
          <div className="tatto-2"></div>
          <div className="gomrassen"></div>
          <div className="hermes"></div>
          <div className="chenini"></div>
          <div className="bb8-toggle__cloud"></div>
          <div className="bb8-toggle__cloud"></div>
          <div className="bb8-toggle__cloud"></div>
        </div>
        <div className="bb8">
          <div className="bb8__head-container">
            <div className="bb8__antenna"></div>
            <div className="bb8__antenna"></div>
            <div className="bb8__head"></div>
          </div>
          <div className="bb8__body"></div>
        </div>
        <div className="artificial__hidden">
          <div className="bb8__shadow"></div>
        </div>
      </div>
    </label>
  );
};

export default Toggleswitch;
