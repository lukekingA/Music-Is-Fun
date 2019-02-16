import ItunesService from "./itunes-service.js";


//Private
const itunesService = new ItunesService()

function drawSongs() {
  //changes button back to GET MUSIC once songs are loaded
  document.querySelector('#get-music-button').textContent = 'GET MUSIC'
  console.log(itunesService.Songs)
  let template = ''
  let songs = itunesService.Songs

  for (let song in songs) {
    let currentSong = songs[song]
    if (currentSong.kind == 'song') {
      template += `
      <div class="col col-sm-5 offset-sm-1 shadow-lg rounded p-3 my-4">
        <div class="card-body">
            <div class="card-content">
            <div id="${currentSong.id}">
            <img src="${currentSong.albumArt}" alt="" class="img-fluid card-img-top">
            <audio src="${currentSong.preview}"></audio>
                <h5 class="card-title">${currentSong.artist}</h5>
            </div>
                <p class="card-subtitle">${currentSong.collection}</p>
                <div class="card-text d-flex justify-content-between"><span class="text-left">${currentSong.track}</span> <span class="text-right">${currentSong.price}</span></div>
            </div>
        </div>
    </div>`
    }
  }

  $('#songs').html(template)
}

function pauseAudio(track) {
  Array.from(document.getElementsByTagName('AUDIO')).forEach(player => {
    if (player != track) {
      player.pause()
    }
  })
}

function setHandlers() {
  let songs = itunesService.Songs

  for (let song in songs) {
    let currentCard = songs[song]
    let songImage = $(`#${currentCard.id}`)
    let track = $(`#${currentCard.id} audio`)
    songImage.click(() => {
      pauseAudio(track[0])
      if (track[0].paused) {
        track[0].play()
      } else {
        track[0].pause()
      }
    })
  }
}


//PUBLIC
class ItunesController {
  constructor() {
    //BE SURE TO REGISTER YOUR SUBSCRIBERS!!!!!!!
    itunesService.addSubscriber('songs', drawSongs)
    itunesService.addSubscriber('songs', setHandlers)
  }


  //DO NOT MODIFY THIS METHOD
  getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    //changes the button to loading while songs load
    document.querySelector('#get-music-button').textContent = 'LOADING....'
    itunesService.getMusicByArtist(artist)
  }
}


export default ItunesController