import { useEffect, useState } from "react";

import { millisecondsToDhms } from "../../../utils/ms-to-dhms";

type CountdownProps = {
  initialTimeLeft: number;
  showSeconds: boolean;
  showSecondsOnMinuteLeft?: boolean;
  onTimerFinished?: () => void;
};

const Countdown = ({
  initialTimeLeft,
  showSeconds = true,
  showSecondsOnMinuteLeft = false,
  onTimerFinished = () => {},
}: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1000);
      if (timeLeft >= 0 && timeLeft <= 1000) {
        onTimerFinished();
      }
    }, 1000);
    if (timeLeft <= 0) clearTimeout(timer);

    return () => clearTimeout(timer);
  }, [timeLeft, onTimerFinished]);

  return (
    <>
      {millisecondsToDhms(
        timeLeft,
        showSeconds || (showSecondsOnMinuteLeft && timeLeft < 60000)
      )}
    </>
  );
};

export default Countdown;
