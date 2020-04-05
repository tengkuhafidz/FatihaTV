import React, { ReactElement, useState } from "react";
import donationListingData from "../../data/donation-methods-data.json";
import SingleDonationCard from "./single-donation-card";
import SearchInput from "../search-input";
import { gtagEventClick } from "../../utils/gtag";
import { DonationListingModel, GtagCategories, InputEvent } from "../../models";
import { getFuseFilterResult } from "../../utils";

const DonationLists = (): ReactElement => {
  const [searchTerm, setSearchTerm] = useState("");

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
        key={donationData.paynowUen}
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
