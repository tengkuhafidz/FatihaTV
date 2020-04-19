export interface PlaylistModel {
  id: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  updatedAt: string;
  organisationName: string;
  donationUrl: string;
  language: string[];
  tags: string[];
  thumbnailUrl: string;
  videos: VideoModel[];
}

export interface VideoModel {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
}

export interface PlayedPlaylistsModel {
  playlistId: string;
  videoId: string;
}

export interface PlaylistsAndVideoIds {
  formattedPlayedPlaylists: PlaylistModel[];
  videoIds: string[];
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
export type FormEvent = React.FormEvent<HTMLFormElement>;
