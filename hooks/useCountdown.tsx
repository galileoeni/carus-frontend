"use client";
import { useState, useEffect, useCallback } from "react";

export const useCountdown = (key: string, initialMinutes = 10) => {
  // Initialize the target end time
  const getTargetTime = useCallback(() => {
    if (typeof window === "undefined") {
      return Date.now() + initialMinutes * 60 * 1000;
    }

    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return parseInt(storedValue, 10);
    }

    // If no stored time, set a new one and persist it
    const newTarget = Date.now() + initialMinutes * 60 * 1000;
    localStorage.setItem(key, newTarget.toString());
    return newTarget;
  }, [key, initialMinutes]);

  const [targetTime, setTargetTime] = useState(getTargetTime);
  const [timeLeft, setTimeLeft] = useState(() =>
    Math.max(0, targetTime - Date.now()),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = targetTime - Date.now();

      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  // Function to manually reset the timer (e.g., when "Resend OTP" is clicked)
  const resetTimer = () => {
    const newTarget = Date.now() + initialMinutes * 60 * 1000;
    localStorage.setItem(key, newTarget.toString());
    setTargetTime(newTarget);
    setTimeLeft(initialMinutes * 60 * 1000);
  };

  return { timeLeft, resetTimer };
};
