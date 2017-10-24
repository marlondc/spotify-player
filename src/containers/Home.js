import { connect } from 'react-redux';
import Page from '../components/Page';
import { setTokens, getPlaylistTracks, searchTrack, addToPlaylist, searchAlbum } from '../actions/songs';

const mapStateToProps = ({ songs }) => ({
  songs,
});

const mapDispatchToProps = dispatch => ({
  setTokens: (accessToken, refreshToken) => dispatch(setTokens(accessToken, refreshToken)),
  getPlaylistTracks: (accessToken) => dispatch(getPlaylistTracks(accessToken)),
  searchTrack: (track, accessToken) => dispatch(searchTrack(track, accessToken)),
  searchAlbum: (album, accessToken) => dispatch(searchAlbum(album, accessToken)),
  addToPlaylist: (url, accessToken) => dispatch(addToPlaylist(url, accessToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
