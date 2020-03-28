declare global {
    interface Window { gtag: any; }
}

export const gtagEventClick = (data) => {
    typeof window !== "undefined" && window.gtag("event", "click", { ...data })
}
