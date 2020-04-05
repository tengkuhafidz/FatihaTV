/* eslint-disable @typescript-eslint/no-var-requires */

const allPlaylistWithVideos = require('./src/data/merged-playlist-video-data.json')

exports.createPages = async ({ actions: { createPage } }) => {
  allPlaylistWithVideos.forEach(playlist => {
    playlist.videos.forEach((currentVideo, index) => {
      const videoNumber = index + 1
      createPage({
        path: `/watch/${playlist.id}/${videoNumber}`,
        component: require.resolve('./src/templates/watch.tsx'),
        context: { playlist, currentVideo },
      })
    })
  })
}
