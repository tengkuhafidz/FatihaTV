import React, { useState } from 'react'
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { gtagEventClick } from '../utils/gtag'
import { GtagCategories } from '../models'


const BottomCta = () => {
    // check if the site is on client side to ensure local storage is available
    const hasLocalSotrage: boolean = typeof(Storage) !== "undefined"
    const localHasClosedCta: boolean = hasLocalSotrage && (localStorage.getItem('hasClosedCta') === 'true' || false)

    const [hasClosedCta, setHasClosedCta] = useState(localHasClosedCta)

    const closeCta = () => {
        setHasClosedCta(true)
        localStorage.setItem('hasClosedCta', 'true')
        trackBottomCtaClose()
    }

    const trackBottomCtaClose = () => {
        gtagEventClick('close_bottom_cta', {
            event_category: GtagCategories.Engagement,
            event_label: 'pergas_crowdfunding_cta'
        })
    }

    if(hasClosedCta) return <></>;

    return(
        <div className="fixed bottom-0 pb-8 w-full hidden md:block pointer-events-none">
            <div className="bg-gray-900 p-4 md:max-w-screen-sm rounded-lg mx-auto shadow-lg pointer-events-auto border border-gray-100">
                <strong className="font-semibold text-white text-lg">Support our asatizah.</strong>
                <span className="block sm:inline text-gray-200 ml-2">Contribute in Pergas' crowdfunding. </span>
                <button className="p-1 float-right ml-2 -mt-1" onClick={() => closeCta()}>
                    <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <OutboundLink 
                    className="bg-white hover:bg-gray-200 text-gray-800 py-1 px-4 rounded float-right -mt-1 cursor-pointer" 
                    href="https://www.giving.sg/pergas/gracious_package" 
                    target="_blank"
                >
                    Learn More
                </OutboundLink>
            </div>
        </div>
    )
}

export default BottomCta