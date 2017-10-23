import {
  SPOTIFY_TOKENS,
  REQUEST_PLAYLIST,
  RECEIVE_PLAYLIST,
  SEARCH_TRACK,
  TRACK_SEARCH_RESULTS,
  ADDED_TO_PLAYLIST,
  SEARCH_ALBUM,
  ALBUM_SEARCH_RESULTS,
} from '../actions/songs';

/** The initial state; no tokens and no user info */
const initialState = {
  accessToken: null,
  refreshToken: null,
  loading: true,
  tracks: [],
  searchResults: [],
};

/**
 * Our reducer
 */
export default function reduce(state = initialState, action) {
  switch (action.type) {
  case SPOTIFY_TOKENS: {
    const {accessToken, refreshToken, loading} = action;
    return {
      ...state,
      accessToken,
      refreshToken,
      loading,
    };
  }

  case RECEIVE_PLAYLIST: {
    const { tracks } = action;
    return {
      ...state,
      tracks,
    }
  }
  
  case SEARCH_ALBUM:
  case SEARCH_TRACK:
  case REQUEST_PLAYLIST: {
    return state;
  }

  case TRACK_SEARCH_RESULTS: {
    const { results } = action;
    return {
      ...state,
      searchResults: results,
    }
  }

  case ADDED_TO_PLAYLIST: {
    return {
      ...state,
      searchResults: [],
    }
  }

  case ALBUM_SEARCH_RESULTS: {
    const { results } = action;
    return {
      ...state,
      searchResults: results,
    };
  }

  default:
    return state;
  }
}
