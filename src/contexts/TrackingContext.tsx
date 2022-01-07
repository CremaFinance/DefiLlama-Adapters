import { FC, ReactNode, useEffect } from "react";
import TagManager from "react-gtm-module";

export const TrackingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    TagManager.initialize({
      gtmId: "GTM-TTZLQF7",
      dataLayer: {
        app: "marinade-finance",
        version: "1.0.0",
      },
    });
  }, []);

  return <TrackingProvider>{children}</TrackingProvider>;
};
