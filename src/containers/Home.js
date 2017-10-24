import { connect } from 'react-redux';
import { filter, isEmpty, equals } from 'ramda';

import Page from '../components/Page';
import {
  addToPlaylist,
  getCurrentTrack,
  getPlaylistTracks,
  getTokens,
  login,
 } from '../actions/songs';

const mapStateToProps = ({ songs }) => {
  let displayCurrentTrack;

  const filteredTracks = filter(track => (
    equals(track.id, songs.currentTrack.id)
  ), songs.tracks);

  displayCurrentTrack = isEmpty(filteredTracks)
    ? false
    : songs.currentTrack;

  return {
    ...songs,
    currentTrack: displayCurrentTrack,
  }
};

const mapDispatchToProps = dispatch => ({
  addToPlaylist: (url, accessToken) => dispatch(addToPlaylist(url, accessToken)),
  getCurrentTrack: (accessToken) => dispatch(getCurrentTrack(accessToken)),
  getPlaylistTracks: (accessToken) => dispatch(getPlaylistTracks(accessToken)),
  getTokens: () => dispatch(getTokens()),
  login: () => login(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
