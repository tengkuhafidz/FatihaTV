import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-gtag';

const Footer = () => (
    <div className="px-8 py-4">
        <p className="text-center font-light text-sm text-gray-800">Built from the comfort of our own home in Woodlands &hearts;</p>
        <p className="text-center font-light text-sm text-gray-800">
            You may contact us at: 
            <OutboundLink href="https://form.kuliah.sg/contact" target="_blank" className="underline ml-1 text-gray-600">form.kuliah.sg/contact</OutboundLink> 
        </p>
    </div>
)

export default Footer