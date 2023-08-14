// import posts from './tuits.js';
// let tuits = posts;
import * as tuitsDao from './tuits-dao.js';

const findTuits = async (req, res) => {
    const tuits = await tuitsDao.findTuits();
    res.json(tuits);
}
// const findTuits = (req, res) => {
//     res.json(tuits);
// }

const createTuit = async (req, res) => {
    const newTuit = req.body;
    // delete newTuit._id;
    newTuit.tuit = req.body.tuit;
    newTuit.likes = 0;
    newTuit.liked = false;
    const insertedTuit = await tuitsDao.createTuits(newTuit);
    res.json(insertedTuit);
}
// const createTuit = (req, res) => {
//     const newTuit = req.body;
//     newTuit.id = (new Date()).getTime() + ''; // '' to make it to a string
//     newTuit.likes = 0;
//     newTuit.liked = false;
//     tuits.push(newTuit);
//     res.json(newTuit);
// }

const deleteTuit = async (req, res) => {
    const tuitIdToDelete = req.params.tid;
    const status = await tuitsDao.deleteTuit(tuitIdToDelete);
    res.json(status);
}
// const deleteTuit = (req, res) => {
//     const tuitIdToDelete = req.params.tid;
//     tuits = tuits.filter(
//         (t) => t._id !== tuitIdToDelete
//     );
//     res.sendStatus(200);
// }

const updateTuit = async (req, res) => {
    const tuitIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = await tuitsDao.updateTuit(tuitIdToUpdate, updates);
    res.json(status);
}
// const updateTuit = (req, res) => {
//     const tuitId = req.params.tid;
//     const updates = req.body;
//     // tuits = tuits.map(
//     //     (t) => t._id === tuitId ? {...t, ...updates} : t
//     // );
//     const tuitIndex = tuits.findIndex((t) => t._id === tuitId);
//     tuits[tuitIndex] = {...tuits[tuitIndex], ...updates};
//     res.sendStatus(200);
// }

const TuitsController = (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.delete('/api/tuits/:tid', deleteTuit);
    app.put('/api/tuits/:tid', updateTuit);
}
export default TuitsController;