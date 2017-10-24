import { connect } from 'react-redux';
import { filter, isEmpty, equals, addIndex, map } from 'ramda';

import Page from '../components/Page';
import {
  addToPlaylist,
  getCurrentTrack,
  getPlaylistTracks,
  getTokens,
  login,
  startPlayback,
 } from '../actions/songs';

const mapStateToProps = ({ songs }) => {
  let displayCurrentTrack;
  const mapIndexed = addIndex(map);
  const indexedTracks = mapIndexed((track, index) => ({
    ...track,
    position: index,
  }), songs.tracks)
  const filteredTracks = filter(track => (
    equals(track.id, songs.currentTrack.id)
  ), indexedTracks);

  displayCurrentTrack = isEmpty(filteredTracks)
    ? false
    : {
      ...songs.currentTrack,
      position: filteredTracks[0].position
    };

  return {
    ...songs,
    currentTrack: displayCurrentTrack,
  }
};

const mapDispatchToProps = dispatch => ({
  addToPlaylist: (url, accessToken) => dispatch(addToPlaylist(url, accessToken)),
  getCurrentTrack: accessToken => dispatch(getCurrentTrack(accessToken)),
  getPlaylistTracks: accessToken => dispatch(getPlaylistTracks(accessToken)),
  getTokens: () => dispatch(getTokens()),
  login: () => login(),
  startPlayback: (accessToken, position) => dispatch(startPlayback(accessToken, position))
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
