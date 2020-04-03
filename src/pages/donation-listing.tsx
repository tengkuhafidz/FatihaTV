import React from 'react'
import BottomCta from '../components/bottom-cta'
import DonationLists from '../components/Donation/donation-lists'
import Hero from '../components/hero'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default () => (
    <Layout>
        <SEO title="Donate to The Mosques" />
        <Hero />
        <p className="text-gray-600 text-center mt-8 font-light text-sm">Last Updated: 2nd April 2020</p>
        <DonationLists />
        <BottomCta />
    </Layout>
)
