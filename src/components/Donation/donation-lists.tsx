import React, { ReactElement, useState } from "react";
import SingleDonationCard from "./single-donation-card";
import SearchInput from "../search-input";
import { gtagEventClick } from "../../utils/gtag";
import { DonationListingModel, GtagCategories, InputEvent } from "../../models";
import { getFuseFilterResult } from "../../utils";
import { useStaticQuery, graphql } from "gatsby";

const DonationLists = (): ReactElement => {
  const [searchTerm, setSearchTerm] = useState("");
  const data = useStaticQuery(graphql`
    {
      allOrganisation {
        nodes {
          bankType
          bankAccount
          organisationName
          paynowUen
        }
      }
    }
  `);
  const donationListingData = data.allOrganisation.nodes;
  const getSearchFilterResult = (
    donationListing: DonationListingModel[]
  ): DonationListingModel[] => {
    const filterByKeys = ["organisationName"];
    const fuseFilterResults = getFuseFilterResult(
      donationListing,
      filterByKeys,
      searchTerm
    );

    const fuseFilteredPlaylists: DonationListingModel[] = [];
    fuseFilterResults.forEach(result =>
      fuseFilteredPlaylists.push(result.item as DonationListingModel)
    );
    return fuseFilteredPlaylists;
  };

  const handleSearchFilter = (e: InputEvent): void => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    gtagEventClick("search_donation_list", {
      event_category: GtagCategories.Engagement,
      event_label: e.target.value,
    });
  };

  const donationsListingToBeDisplayed = searchTerm
    ? getSearchFilterResult(donationListingData as DonationListingModel[])
    : donationListingData;

  const renderDonationCards = (): ReactElement[] => {
    return donationsListingToBeDisplayed.map(donationData => (
      <SingleDonationCard
        donationData={donationData}
        key={donationData.paynow_uen}
      />
    ));
  };

  return (
    <div className="container mx-auto px-8 pt-8 pb-32" id="donation-listing">
      <SearchInput handleSearchFilter={handleSearchFilter} />
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {renderDonationCards()}
      </div>
    </div>
  );
};

export default DonationLists;
