import { connect } from 'react-redux';
import Page from '../components/Page';
import {
  getPlaylistTracks,
  addToPlaylist,
  login,
  getTokens,
 } from '../actions/songs';

const mapStateToProps = ({ songs }) => ({
  songs,
});

const mapDispatchToProps = dispatch => ({
  getPlaylistTracks: (accessToken) => dispatch(getPlaylistTracks(accessToken)),
  addToPlaylist: (url, accessToken) => dispatch(addToPlaylist(url, accessToken)),
  getTokens: () => dispatch(getTokens()),
  login: () => login(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
