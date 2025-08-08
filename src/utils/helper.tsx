import moment from "moment";

export const formatFriendlyTimeRange = (start: string, end: string) => {
  const startMoment = moment(start);
  const endMoment = moment(end);

  // Check if same day
  const isSameDay = startMoment.isSame(endMoment, "day");

  const dayFormat = "Do";
  const timeFormat = "h:mm A";

  if (isSameDay) {
    return `${startMoment.format(timeFormat).toLowerCase()} - ${endMoment
      .format(timeFormat)
      .toLowerCase()}`;
  } else {
    return `${startMoment.format(timeFormat).toLowerCase()} - ${endMoment
      .format(timeFormat)
      .toLowerCase()}`;
  }
};
