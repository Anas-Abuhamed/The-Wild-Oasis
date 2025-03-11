import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

export default function useGuests() {
  const {
    data: guests,
    isLoading,
  } = useQuery({
    queryFn: getGuests,
    queryKey: ["guests"],
  });
  return { guests, isLoading };
}
