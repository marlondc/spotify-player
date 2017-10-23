import React, { Component } from 'react';
import classnames from 'classnames';
import { test } from 'ramda';

import firstInstruction from '../images/first.png';
import secondInstruction from '../images/second.png';
import thirdInstruction from '../images/third.png';

const invalidURI = (uri) => {
  const spotifyRegex = /^spotify:(track|album):([a-z,A-Z,0-9]{22})$/;
  return !test(spotifyRegex, uri)
}

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spotifyURI: '',
      showModal: false,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { match } = this.props;
    const { params } = match
    const { accessToken, refreshToken } = params;
    this.props.setTokens(accessToken, refreshToken)
    this.props.getPlaylistTracks(accessToken);
  }

  handleInputChange(event) {
    const value = event.target.value;

    this.setState({
      spotifyURI: value
    });
  }

  handleModal() {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  handleSubmit() {
    const { spotifyURI } = this.state;
    const { accessToken } = this.props.songs;
    if (!invalidURI(spotifyURI)) {
      this.props.addToPlaylist(spotifyURI, accessToken)
      this.setState({
        spotifyURI: '',
      })
    }
  }

  render() {
    const {
      accessToken,
      loading,
      tracks,
      searchResults,
    } = this.props.songs;

    const {
      spotifyURI,
      showModal
    } = this.state

    if (loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <div className="container">
        <div className="top">
          <div className="content">
            <div className="top__decoration top__decoration--1"></div>
            <div className="top__decoration top__decoration--2"></div>
            <div className="top__decoration top__decoration--3"></div>
            <div className="input">
              <input
                type="text"
                name="spotifyURI"
                className="input__spotifyURI"
                value={this.state.spotifyURI}
                placeholder="Add spotify track / album uri ..."
                onChange={this.handleInputChange}
              />
              <input
                type="submit"
                value="Add to playlist"
                className={
                  classnames('input__add-button', { 'input__add-button--disabled': invalidURI(spotifyURI) })
                }
                onClick={this.handleSubmit}
              />
            </div>
            <div className="info">
              <button onClick={this.handleModal} className="info__text">How do I find a Spotify URI?</button>
              <div className={classnames('info__modal', { 'info__modal--show': showModal })}>
                <div className="info__modal__content">
                  <div className="info__modal__cross" onClick={this.handleModal} >
                      <svg className="cross__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle className="cross__circle" cx="26" cy="26" r="25" fill="none"/>
                        <path className="cross__path cross__path--right" fill="none" d="M16,16 l20,20" />
                        <path className="cross__path cross__path--right" fill="none" d="M16,36 l20,-20" />
                      </svg>
                  </div>
                  <div className="info__modal__image">
                    <img src={firstInstruction} alt="Instruction 1" />
                  </div>
                  <div className="info__modal__image" >
                    <img src={secondInstruction} alt="Instruction 2" />
                  </div>
                  <div className="info__modal__image">
                    <img src={thirdInstruction} alt="Instruction 3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="content">
            <div className="title">
              <p className="title__text">Currently playing</p>
              <div className="title__line"></div>
            </div>
            <div className="track track--current">
              <div className="track__image"></div>
              <div className="track__details">
                <p className="track__name">Name</p>
                <p className="track__artist">Artist</p>
                <p className="track__album">Album</p>
              </div>
            </div>
            <div className="track__status">
              <div className="track__status__progress-bar"></div>
              <div className="track__status__progress-bar track__status__progress-bar--fill"></div>
              <p className="track__status__time">1:34 <span>left</span></p>
            </div>
            <div className="title">
              <p className="title__text">Up next</p>
              <div className="title__line"></div>
            </div>
            {
              tracks.map(track => (
                <div className="track track--in-list" key={track.id}>
                  <img src={track.image} alt={track.album} className="track__image" />
                  <div className="track__details">
                    <p className="track__name">{track.name}</p>
                    <p className="track__artist">{track.artist}</p>
                    <p className="track__album">{track.album}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

User.defaultProps = {
  tracks: [],
  searchResults: [],
}

export default User;
