import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import { addDays } from "date-fns";
import useCabins from "../cabins/useCabins";
import { useSettings } from "../settings/useSettings";
import SpinnerMini from "../../ui/SpinnerMini";
import useGuests from "./useGuests";
import { useCreateBooking } from "./useCreateBooking";

function CreateBookingForm() {
  const { register, handleSubmit, getValues, formState, reset } = useForm({
    defaultValues: {},
  });
  const { cabins, isLoading: cabinsLoading } = useCabins();
  const { settings, isLoading: settingsLoading } = useSettings();
  const { guests, isLoading: guestsLoading } = useGuests();
  const { CreateBooking } = useCreateBooking();
  if (cabinsLoading || settingsLoading || guestsLoading) return <SpinnerMini />;
  const { errors } = formState;
  function onSubmit(data) {
    const [cabin] = cabins.filter(
      (cabin) => cabin.name === getValues().cabinId
    );
    const [guest] = guests.filter(
      (guest) => guest.fullName === getValues().guestId
    );
    const newBooking = {
      ...data,
      guestId: guest.id,
      cabinId: cabin.id,
      startDate: new Date(getValues().startDate).toISOString(),
      endDate: addDays(
        new Date(getValues().startDate),
        getValues().numNights
      ).toISOString(),
      status: "unconfirmed",
      cabinPrice: cabin.regularPrice * getValues().numNights,
      extrasPrice: getValues().hasBreakfast
        ? settings.breakfastPrice * getValues().numNights
        : 0,
      totalPrice:
        cabin.regularPrice * getValues().numNights +
        (getValues().breakfast
          ? settings.breakfastPrice * getValues().numNights
          : 0),
      isPaid: false,
    };
    CreateBooking({ ...newBooking });
    reset();
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormRow label="Guest name" error={errors?.guestId?.message}>
        <Input
          type="text"
          id="guestId"
          {...register("guestId", {
            required: "This field is required",
            validate: (value) =>
              guests.filter((guest) => guest.fullName === value) ||
              "Not valid name",
          })}
        />
      </FormRow>
      <FormRow label="Cabin ID" error={errors?.cabinId?.message}>
        <Input
          type="text"
          id="cabinId"
          {...register("cabinId", {
            required: "This field is required",
            validate: (value) =>
              cabins.filter((cabin) => cabin.name === value) || "Not valid ID",
          })}
        />
      </FormRow>
      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Number of nights" error={errors?.startDate?.message}>
        <Input
          type="text"
          id="numNights"
          {...register("numNights", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Num of guests">
        <Input
          type="number"
          id="NumGuests"
          {...register("numGuests", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Observations" error={errors?.observations?.message}>
        <Input
          type="text"
          id="observations"
          {...register("observations", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Breakfast" error={errors?.breakfast?.message}>
        <Input
          type="checkbox"
          id="hasBreakfast"
          {...register("hasBreakfast")}
        />
      </FormRow>
      <FormRow>
        <Button type="reset">Cancel</Button>
        <Button>Add new booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
