import axios from 'axios';
import qs from 'qs';
import { test } from 'ramda';

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const REQUEST_PLAYLIST = 'REQUEST_PLAYLIST';
export const RECEIVE_PLAYLIST = 'RECEIVE_PLAYLIST';
export const SEARCH_TRACK = 'SEARCH_TRACK';
export const TRACK_SEARCH_RESULTS = 'TRACK_SEARCH_RESULTS';
export const ADDED_TO_PLAYLIST = 'ADDED_TO_PLAYLIST';
export const SEARCH_ALBUM = 'SEARCH_ALBUM';
export const ALBUM_SEARCH_RESULTS = 'ALBUM_SEARCH_RESULTS';

/** set the app's access and refresh tokens */
export const setTokens = (accessToken, refreshToken) => ({
  type: SPOTIFY_TOKENS,
  accessToken,
  refreshToken,
  loading: false,
});

export const getPlaylistTracks = (accessToken) => (dispatch) => {
  dispatch({
    type: REQUEST_PLAYLIST,
  })
  return axios.get(`https://api.spotify.com/v1/users/${process.env.REACT_APP_SPOTIFY_USER_NAME}/playlists/${process.env.REACT_APP_SPOTIFY_PLAYLIST_ID}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  }).then(({ data }) => {
    const tracks = data.tracks.items.map((item) => {
      return {
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        id: item.track.id,
        image: item.track.album.images[0].url,
        name: item.track.name,
      }
    });
    dispatch({
      type: RECEIVE_PLAYLIST,
      tracks,
    })
  }).catch(err => console.log(err));
}

export const searchTrack = (track, accessToken) => (dispatch) => {
  dispatch({
    type: SEARCH_TRACK,
  })
  const query = qs.stringify({
    q: track,
    type: 'track',
    limit: 5,
  });
  axios.get(`https://api.spotify.com/v1/search?${query}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(({ data }) => {
    const searchResults = data.tracks.items.map(item => ({
      artist: item.artists[0].name,
      name: item.name,
      href: item.href,
      id: item.id,
    }));
    dispatch({
      type: TRACK_SEARCH_RESULTS,
      results: searchResults,
    })
  });
}

export const searchAlbum = (album, accessToken) => (dispatch) => {
  dispatch({
    type: SEARCH_ALBUM,
  })
  const query = qs.stringify({
    q: album,
    type: 'album',
    limit: 5,
  });
  axios.get(`https://api.spotify.com/v1/search?${query}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(({ data }) => {
    const searchResults = data.albums.items.map(item => ({
      artist: item.artists[0].name,
      name: item.name,
      href: item.href,
      id: item.id,
    }));
    dispatch({
      type: ALBUM_SEARCH_RESULTS,
      results: searchResults,
    })
  });
}

export const addToPlaylist = (url, accessToken) => (dispatch) => {
  const spotifyRegex = /([a-z,A-Z,0-9]{22})$/;
  const spotifyID = spotifyRegex.exec(url)[1];
  if (test(/track/, url)) {
    const query = qs.stringify({
      uris: url,
    })
    axios(`https://api.spotify.com/v1/users/${process.env.REACT_APP_SPOTIFY_USER_NAME}/playlists/${process.env.REACT_APP_SPOTIFY_PLAYLIST_ID}/tracks?${query}`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      },
    }).then(() => {
      dispatch({
        type: ADDED_TO_PLAYLIST,
      });
      dispatch(getPlaylistTracks(accessToken));
    }).catch((err) => {
      dispatch({
        type: ADDED_TO_PLAYLIST,
      });
    });
  } else {
    axios.get(`https://api.spotify.com/v1/albums/${spotifyID}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      }
    }).then(({ data }) => {
      const tracks = data.items.map(item => item.uri).join(',');
      const query = qs.stringify({
        uris: tracks,
      })
      axios(`https://api.spotify.com/v1/users/${process.env.REACT_APP_SPOTIFY_USER_NAME}/playlists/${process.env.REACT_APP_SPOTIFY_PLAYLIST_ID}/tracks?${query}`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json'
        },
      }).then(() => {
        dispatch({
          type: ADDED_TO_PLAYLIST,
        });
        dispatch(getPlaylistTracks(accessToken));
      }).catch((err) => {
        dispatch({ type: ADDED_TO_PLAYLIST })
      })
    });
  }
}