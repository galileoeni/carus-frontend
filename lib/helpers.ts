export const getSchedulePreposition = (category: string) => {
  switch (category) {
    case "pickup":
      return "for pickup";
    case "dropoff":
      return "to drop-off";
    default:
      break;
  }
};

export const formatToLocaleNaira = (amount: string | number): string => {
  const number = parseFloat(amount.toString());
  return number.toLocaleString("ng-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
