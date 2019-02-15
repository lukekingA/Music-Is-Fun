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
    template += `
      <div class="col col-md-5 offset-md-1 shadow-lg rounded p-3 my-4">
        <div class="card-body">
            <div class="card-content">
                <img src="${currentSong.albumArt}" alt="" class="img-fluid card-img-top">
                <h5 class="card-title">${currentSong.artist}</h5>
                <p class="card-subtitle">${currentSong.collection}</p>
                <audio controls="controls">
                  <source src="${currentSong.preview}">
                </audio>
                <div class="card-text d-flex justify-content-between"><span class="text-left">${currentSong.track}</span> <span class="text-right">${currentSong.price}</span></div>
            </div>
        </div>
    </div>`
  }

  $('#songs').html(template)
}


//PUBLIC
class ItunesController {
  constructor() {
    //BE SURE TO REGISTER YOUR SUBSCRIBERS!!!!!!!
    itunesService.addSubscriber('songs', drawSongs)
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