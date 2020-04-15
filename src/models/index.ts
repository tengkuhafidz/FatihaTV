export interface PlaylistModel {
  id: string;
  title: string;
  organisation: string;
  donationMethod: string;
  tags: string;
  platform: string;
  pageUrl: string;
  thumbnailUrl: string;
  language: string;
  videos: VideoModel[];
}

export interface VideoModel {
  id: string;
  playlistId: string;
  episodeNumber?: string;
  title: string;
  asatizah: string;
  language: string;
  addedOn: string;
  videoUrl: string;
}

export interface PlayedPlaylistsModel {
  playlistId: string;
  videoId: string;
}

export interface LiveSessionModel {
  Date: string;
  Time: string;
  Mosque: string;
  Title: string;
  Speaker: string;
  Link: string;
}

export interface DonationListingModel {
  organisationName: string;
  paynowUen: string;
  bankAccount: string;
}

export enum GtagCategories {
  Engagement = "engagement",
}

export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
export type SpanEvent = React.MouseEvent<HTMLSpanElement>;
