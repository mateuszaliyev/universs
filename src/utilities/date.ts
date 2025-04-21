export const formatDate = (
  ...parameters: ConstructorParameters<DateConstructor>
) =>
  new Date(...parameters).toLocaleString("en", {
    dateStyle: "medium",
    timeStyle: "short",
  });
