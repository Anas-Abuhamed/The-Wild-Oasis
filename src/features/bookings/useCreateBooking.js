import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateBooking as CreateBookingAPI } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { mutate: CreateBooking, isLoading } = useMutation({
    mutationFn: (newBooking) => CreateBookingAPI(newBooking),
    onSuccess: () => {
      toast.success("New booking successfully created");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isLoading, CreateBooking };
}
