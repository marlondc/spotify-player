import { connect } from 'react-redux';
import Page from '../components/Page';
import {
  addToPlaylist,
  getCurrentTrack,
  getPlaylistTracks,
  login,
  getTokens,
 } from '../actions/songs';

const mapStateToProps = ({ songs }) => ({
  songs,
});

const mapDispatchToProps = dispatch => ({
  addToPlaylist: (url, accessToken) => dispatch(addToPlaylist(url, accessToken)),
  getCurrentTrack: (accessToken) => dispatch(getCurrentTrack(accessToken)),
  getPlaylistTracks: (accessToken) => dispatch(getPlaylistTracks(accessToken)),
  getTokens: () => dispatch(getTokens()),
  login: () => login(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
