import axios from 'axios';
import qs from 'qs';
import { test } from 'ramda';

// our constants
export const ADDED_TO_PLAYLIST = 'ADDED_TO_PLAYLIST';
export const LOGGED_IN = 'LOGGED_IN';
export const REQUEST_CURRENT_TRACK = 'REQUEST_CURRENT_TRACK';
export const REQUEST_PLAYLIST = 'REQUEST_PLAYLIST';
export const REQUEST_TOKENS = 'REQUEST_TOKENS'
export const RECEIVE_PLAYLIST = 'RECEIVE_PLAYLIST';
export const RECEIVE_TOKENS = 'RECEIVE_TOKENS'
export const RECEIVE_TOKENS_ERROR = 'RECEIVE_TOKENS_ERROR'

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

export const getCurrentTrack = (accessToken) => (dispatch) => {
  dispatch({
    type: REQUEST_CURRENT_TRACK,
  });
  axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  }).then(({data}) => console.log(data))
}

export const getTokens = () => (dispatch) => {
  dispatch({
    type: REQUEST_TOKENS,
  });
  axios
    .get('http://localhost:8000/tokens')
    .then((response) => {
      dispatch({
        type: RECEIVE_TOKENS,
        data: response.data
      })
    })
    .catch(() => {
      dispatch({
        type: RECEIVE_TOKENS_ERROR,
      })
    })
}

export const login = () => {
  return {
    type: LOGGED_IN,
  }
};
