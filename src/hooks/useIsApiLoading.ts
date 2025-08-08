import { api } from "@/utils/api2";
import { useAppSelector } from "@/utils/hooks";

export const useIsApiLoading = () => {
  return useAppSelector((state: any) => {
    return Object.values(api.endpoints).some((endpoint: any) => {
      return Object.values(endpoint).some(
        (sub: any) => sub?.isLoading || sub?.isFetching
      );
    });
  });
};
