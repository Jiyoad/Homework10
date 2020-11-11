// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
const router = require("express").Router();
const store = require("../db/store.js");



// ===============================================================================
// ROUTING
// ===============================================================================

router.get("/notes", (req, res) => {
    // this is the GET route where your will you 
    // will utilize the getNotes() function

    // using the function from store.js
    store.getNotes()
    // turn our notes into a json
    .then(notes => res.json(notes));

});

router.post("/notes", (req, res) => {
    // this is the POST route where your will you 
    // will utilize the addNote() function
    store.addNote(req.body)

    .then(notes => res.json(notes));

})

router.delete("/notes/:id", function(req, res) {
    // this is the delete route where you will
    // utilize the removeNote() function

    //  Uses the removeNote function from store.js
    // and grabs the requested id from "/notes/:id"
    store.removeNote(req.params.id)
    // checks to see if successful response is there
        //respond with store as a json
    .then(() => res.json({ ok: true }));
});


module.exports = router;