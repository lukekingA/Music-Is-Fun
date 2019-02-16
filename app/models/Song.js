let id = 0
export default class Song {
    constructor(song) {
        this.title = song.trackName
        //Change 250x250 if you want a larger image
        this.albumArt = song.artworkUrl100
        this.artist = song.artistName
        this.collection = song.collectionName
        this.price = song.collectionPrice
        this.preview = song.previewUrl
        this.track = song.trackName
        this.kind = song.kind
        this.id = id
        id++
    }
}

//.replace(/60x60/g, "250x250")