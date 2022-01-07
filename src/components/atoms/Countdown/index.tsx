import { useEffect, useState } from "react";

import { millisecondsToDhms } from "../../../utils/ms-to-dhms";

type CountdownProps = { initialTimeLeft: number; showSeconds: boolean };

const Countdown = ({ initialTimeLeft, showSeconds = true }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return <>{millisecondsToDhms(timeLeft, showSeconds)}</>;
};

export default Countdown;
