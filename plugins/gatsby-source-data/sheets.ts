import axios from "axios";

export class Sheets {
  constructor(apiKey: string){
    this.API_KEY = apiKey;
  }

  API_KEY: string;
  BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets/"

  url = (
    spreadsheetId: string,
    range: string): string => {
      return this.BASE_URL + spreadsheetId + '/values/' + range + '?key=' + this.API_KEY
  }

  /*
    "values": [
    [
      "name",
      "paynow_uen",
      "bank_type",
      "bank_account",
      "youtube_url",
      "youtube_id"
    ],
    [
      "Masjid Abdul Hamid Kampung Pasiran",
      "S32MQ0003J",
      "OCBC Al-Wadiah Account",
      "591-666813-001",
      "feqf",
      "fqef"
    ],
    ...
  ]
  */

  getOrganisationData = async (): Promise<Record<string, string>[]> => {
    const res = await axios.get(this.url('1l0YvEG8IpYFZ0KZLw6Y4jzbRrCWv5aLZjrFYyNulwPg', 'A:D'));
    return res.data.values;
  }

  getLiveSessions = async (): Promise<Record<string, string>[]> => {
    const res = await axios.get(this.url('1nO1QgB_1FEp-ilYZmNiA8nUvODp7S0E-_8IJVxeCm64','A:F'));
    return res.data.values;
  }
}
