import { useEffect, useState } from "react";

import { millisecondsToDhms } from "../../../utils/ms-to-dmhs";

type CountdownProps = { initialTimeLeft: number };

const Countdown = ({ initialTimeLeft }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return <>{millisecondsToDhms(timeLeft)}</>;
};

export default Countdown;
