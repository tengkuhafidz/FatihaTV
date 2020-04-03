import React from 'react'
import { DonationListingModel } from '../../models'

interface Props {
    donationData: DonationListingModel
}

const SingleDonationCard: React.FC<Props> = ({ donationData }) => {
    const { organisation, paynow_uen } = donationData

    return (  
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:scale-110 hover:shadow-xl transform hover:scale-110 border-2">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{organisation}</div>
                <p className="text-gray-700 text-base">
                    PayNow UEN: {paynow_uen}
                </p>
            </div>
        </div>
    )
}

export default SingleDonationCard