var Song = require('../models/song')
var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic('neo4j', 'Welkom123'));
var session = driver.session();

module.exports = {
    postPlaylist(req, res) {

    },

    putPlaylist(req, res) {

    },

    getPlaylistById(req, res) {

    },

    getAllPlaylists(req, res) {

    },

    deletePlaylist(req, res) {

    },

    postSong(req, res) {
      var body = req.body;
      session.run(
        'CREATE (n:Song {title: {titleParam}, artist: {artistParam}, url: {urlParam}}) RETURN n',
        {
          titleParam: body.title,
          artistParam: body.artist,
          urlParam: body.url
        })
        .then(result => {
          var id = result.records[0]._fields.identity.low;

          session.run(
            'MERGE (n:Genre {genre: {genreParam}} return n',
            {
              genreParam: body.genre
            })
            .then(Genre => {
              session.run(
                'MATCH (s:Song), (g:Genre) WHERE id(s)=toInt({songParam}) AND id(g)=toInt({genreParam}) ' +
                'CREATE (s)-[r:IS_OF_GENRE]->(g)',
                {
                  songParam: id,
                  genreParam: Genre.records[0]._fields.identity.low
                })
                .then(x => {
                  res.status(200)
                  res.json({"msg":"Song Created"})
              })
            })
        })
        .catch(err => {
          console.log(err);

          res.status(500).json(err);
        })

    },

    putSong(req, res) {

    },

    getSongById(req, res) {

    },

    getAllSongs(req, res) {

    },

    deleteSong(req, res) {

    },

    addSongToPlaylist(req, res) {

    },

    deleteSongFromPlaylist(req, res) {

    }
}