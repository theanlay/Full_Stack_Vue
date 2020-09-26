const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get posts
router.get('/', async (req, res)=>{
    const posts = await loadpostsCollection();
    res.send(await posts.find({}).toArray());
    
});



// add post 

router.post('/', async (req, res) => {
    const posts = await loadpostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createAt: new Date()
    });
    res.status(201).send();
})
// delete post
router.delete('/:id',async (req,res) => {
    const posts = await loadpostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});

    res.status(200).send();

});


async function loadpostsCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://theanlay:123@cluster0.2c9hh.mongodb.net/<dbname>?retryWrites=true&w=majority',{
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('tasks')
}
module.exports = router;