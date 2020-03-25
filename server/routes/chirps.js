const express = require('express');
const ChirpStore = require('../utils/chirpstore');

const router = express.Router();

router.get('/:chirpid?', (req, res) =>{
    const chirpid = req.params.chirpid;
    if(chirpid) {
        const chirp = ChirpStore.GetChirp(chirpid);
        res.json({ id: chirpid, ...chirp });
    } else {
        let data = ChirpStore.GetChirps();
        const chirps = Object.keys(data).map(key => {
            return {
                id: key,
                username: data[key].username,
                message: data[key].message
            }
        });
        chirps.pop();
        res.json(chirps);
    }
});

router.post('/', (req, res) => {
    ChirpStore.CreateChirp(req.body);
    res.json('Chirp added!');
});

router.delete('/:chirpid', (req, res) => {
    const chirpid = req.params.chirpid;
    ChirpStore.DeleteChirp(chirpid);
    res.json('Chirp deleted!');
})

router.put('/:chirpid', (req, res) => {
    const chirpid = req.params.chirpid;
    ChirpStore.UpdateChirp(chirpid, req.body);
    res.json('Chirp edited!');
})

module.exports = router;