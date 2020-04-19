# [kuliah.sg](https://kuliah.sg)

UPDATE: version 2.0 of this project is being developed and maintained by MSOCIETY. 

------------------

This site's creation was inspired by the observation of how adaptive our local asatizah are in responding to the covid19 situation. Despite the challenges that they are facing, they are hard at work in producing online content and conducting live seminars - to ensure that we can continue to seek for religious knowledge without leaving our homes. May Allah reward their efforts and make it easy for them  

As such, to support their work, my wife and I have curated some of their videos and upcoming live sessions so that we can find them in one place.

This is also my first tech project with my wife - hence the name dedication. :P

## Prerequisites
- python 2.7
- Node.js 10.13.0 or higher (required for Gatsby)

## Environment Variables

### `GATSBY_GOOGLE_API_KEY`

Set this to an api key with access to both Google Sheets API v4 and Youtube Data API v3

### `GATSBY_USE_LOCAL_DATA`

Set this to true if you want to cache YouTube data and use it instead of calling the API at every build. It will use the API if local file does not exist (i.e. first time.) Default is false, and will call YouTube on build every time (i.e. for production).

Install dependencies:
```bash
$ npm i
```

After setting up env variables, run:

```bash
$ npm run develop
```


## Support our asatizah

- Contribute to Pergas fundraising: https://www.giving.sg/pergas/gracious_package
- Contribute to mosques: https://kuliah.sg/donation-listing
