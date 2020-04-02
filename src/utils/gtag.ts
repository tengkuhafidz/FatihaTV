declare global {
    interface Window { gtag: any; }
}


export const gtagEventClick = (action: string, parameters?: Object) => {
    const { NODE_ENV } = process.env
    const isDevEnv =  NODE_ENV === "development"
    typeof window !== "undefined" && !isDevEnv && window.gtag("event", action, parameters )
}
