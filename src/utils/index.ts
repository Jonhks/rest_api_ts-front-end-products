export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const toBoolean = (str: string) => {
  return str.toLowerCase() === "true";
};
