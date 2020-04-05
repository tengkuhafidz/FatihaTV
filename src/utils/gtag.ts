declare global {
  interface Window {
    gtag: object;
  }
}

export const gtagEventClick = (
  action: string,
  parameters?: Record<string, object>
): void => {
  const { NODE_ENV } = process.env;
  const isDevEnv = NODE_ENV === "development";
  typeof window !== "undefined" &&
    !isDevEnv &&
    window.gtag("event", action, parameters);
};
