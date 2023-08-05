import posts from './tuits.js';
let tuits = posts;
const TuitsController = (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.delete('/api/tuits/:tid', deleteTuit);
    app.put('/api/tuits/:tid', updateTuit);
}
const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit.id = (new Date()).getTime() + ''; // '' to make it to a string
    newTuit.likes = 0;
    newTuit.liked = false;
    tuits.push(newTuit);
    res.json(newTuit);
}
const findTuits = (req, res) => {
    res.json(tuits);
}
const deleteTuit = (req, res) => {
    const tuitIdToDelete = req.params.tid;
    tuits = tuits.filter(
        (t) => t._id !== tuitIdToDelete
    );
    res.sendStatus(200);
}
const updateTuit = (req, res) => {
    const tuitId = req.params.tid;
    const updates = req.body;
    // tuits = tuits.map(
    //     (t) => t._id === tuitId ? {...t, ...updates} : t
    // );
    const tuitIndex = tuits.findIndex((t) => t._id === tuitId);
    // {...tuits[tuitIndex], ...updates}: This is a new object that contains all the properties and values of the original tuits[tuitIndex] object and all the properties and values of the updates object. If the updates object has the same properties as the tuits[tuitIndex] object, then they will be overwritten by the values in updates.
    tuits[tuitIndex] = {...tuits[tuitIndex], ...updates};
    res.sendStatus(200);
}

export default TuitsController;