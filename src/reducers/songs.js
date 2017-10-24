import {
  REQUEST_PLAYLIST,
  RECEIVE_PLAYLIST,
  ADDED_TO_PLAYLIST,
  LOGGED_IN,
  REQUEST_TOKENS,
  RECEIVE_TOKENS,
  RECEIVE_TOKENS_ERROR,
} from '../actions/songs';

/** The initial state; no tokens and no user info */
const initialState = {
  accessToken: null,
  refreshToken: null,
  loading: true,
  tracks: [],
  searchResults: [],
  logged_in: false,
};

/**
 * Our reducer
 */
export default function reduce(state = initialState, action) {
  switch (action.type) {

  case ADDED_TO_PLAYLIST: {
    return {
      ...state,
      searchResults: [],
    }
  }

  case LOGGED_IN: {
    return {
      ...state,
      logged_in: true,
    }
  }

  case RECEIVE_PLAYLIST: {
    const { tracks } = action;
    return {
      ...state,
      tracks,
    }
  }

  case RECEIVE_TOKENS: {
    const {
      accessToken,
      refreshToken,
    } = action.data;
    return {
      ...state,
      accessToken,
      loading: false,
      refreshToken,
    }
  }

  case RECEIVE_TOKENS_ERROR : {
    return state;
  }

  case REQUEST_PLAYLIST: {
    return state;
  }

  case REQUEST_TOKENS: {
    return state;
  }

  default:
    return state;
  }
}
