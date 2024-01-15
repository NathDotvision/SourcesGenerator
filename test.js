// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQC6qGe0SrjI9ucmuv6S-g4Iih4_EUGpzbMJdeUJC7-xQ5C0f_yosiaPTYNKTLhd7qOcNLmlX5-7V8CtjQLq_ZVmYxEBukXCbhMiOZ5HPYUXhN0dgKENB0us3JV7t549uTa-7xzLFEO42Xwy1vg6D_drlPgOB8DckJE8IUkdYbSLr47DfkuRouinTL-lHSdfrA4RgCF7KgXplHe5cqWem9ZhGgW6fbYeeGpUMocZ-h8H3ow1panSuf5qCVUsXoLrs5Z4L_4P-TF2rNOAAZ3x';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const topTracksIds = [
  '0D45ixbwxjkT4S7V1kpt5y','1fd3XY9w5SzDPT40K92Bch','3d5ECgaMepdcABX0qV2U0n','1UBErDGHs9OSGYiMXxhXgl','1GdBWAbpod5BFDCkZiuhjJ'
];

async function getTracksInfo(trackIds) {
    // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-tracks/
    return await fetchWebApi(`v1/tracks?ids=${trackIds.join(',')}`, 'GET');
}

(async function() {
    const tracksInfo = await getTracksInfo(topTracksIds);
    const tracksWithGenres = await Promise.all(
        tracksInfo.tracks.map(async ({name, artists, album}) => {
            const genres = await Promise.all(artists.map(artist => getArtistGenre(artist.id)));
            return {
                name,
                artists: artists.map(artist => artist.name),
                albumCoverUrl: album.images[0].url,
                genres: genres.flat()
            };
        })
    );
    console.log(tracksWithGenres);
})();

async function getRecommendations(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  return (await fetchWebApi(
    `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
  )).tracks;
}

async function getArtistGenre(artistId) {
    // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/
    const artistInfo = await fetchWebApi(`v1/artists/${artistId}`, 'GET');
    return artistInfo.genres;
}

(async function() {
    const recommendedTracks = await getRecommendations();
    const tracksWithGenres = await Promise.all(
        recommendedTracks.map(async ({name, artists, album}) => {
            const genres = await Promise.all(artists.map(artist => getArtistGenre(artist.id)));
            return {
                name,
                artists: artists.map(artist => artist.name),
                albumCoverUrl: album.images[0].url,
                genres: genres.flat()
            };
        })
    );
    console.log(tracksWithGenres);
})();

//? Telecharger les musiques
//https://spotify-downloader.com/