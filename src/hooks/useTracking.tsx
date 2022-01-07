import { useCallback } from "react";

declare const dataLayer: Record<string, unknown>[];

type TrackEvent = {
  // todo better event types
  event: string;
  category:
    | "Account Staking"
    | "Basic Staking"
    | "Liquidity"
    | "mSOL Farm"
    | "MSOL-SOL LP Farm"
    | "Retro MNDE CLaim";
  action: string;
  label: "Success" | "Error";
  description?: string;
};
export const useTracking = () => {
  const track = useCallback((event: TrackEvent) => {
    dataLayer.push(event);
  }, []);

  return { track };
};
