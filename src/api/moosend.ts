import axios from "axios";

export const addSubscriber = async (email: string): Promise<boolean> => {
  const apiKey = process.env.GATSBY_MOOSEND_API_KEY;
  const mailingListId = process.env.GATSBY_MOOSEND_LIST_ID;

  const url = `https://api.moosend.com/v3/subscribers/${mailingListId}/json?apikey=${apiKey}`;
  const request = {
    Email: email,
    CustomFields: {
      source: "website",
    },
  };
  const { code } = await axios.post(url, request);

  return code === 0 ? true : false;
};
