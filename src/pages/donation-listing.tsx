import React from 'react'
import BottomCta from '../components/bottom-cta'
import DonationLists from '../components/Donation/donation-lists'
import Hero from '../components/hero'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

export default () => (
    <Layout>
        <SEO title="Donate to Our Mosques" />
        <Hero title="Contribute to our Mosques" subtext="Donations received by the mosques have significantly reduced due to it's closure. Our friends from TabungMasjidSG have curated a list of their PayNow UEN for you to conveniently donate to them directly." />
        <p className="text-gray-600 text-center mt-8 font-light text-sm">Last Updated: 4th April 2020 &middot; 
            Curated by:&nbsp;
            <OutboundLink 
                target="_blank" 
                className="underline" 
                href="https://tabungmasjidsg.com"
            >
                TabungMasjidSG
            </OutboundLink>
        </p>
        <DonationLists />
        <BottomCta />
    </Layout>
)
