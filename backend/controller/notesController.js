const Note = require('../models/Notes');
const { v4: uuidv4 } = require('uuid');


const getAllProducts = async(req,res) =>{
    try{
        console.log("test");
        const notes = await Note.find({});
        res.json(notes);

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"})
    }
}


const getProductsById = async(req,res) =>{
    try{
        const note = await Note.findById(req.params.id);
        // res.header("Access-Control-Allow-Origin", "*");
        res.json(note);

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"})
    }
}



const createNewUUID = async(req,res) =>{
    try{
        const uuid = uuidv4();
        res.json(uuid);

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"UUID is not generated"})
    }
}

const addNote = async(req,res) => {
    await Note.findOneAndUpdate(
        {_id: req.params.id} ,
        {$push : {notes : req.body}},
        { new : true },
      ).then(
        () => {
          res.status(201).json({
            message: "New note created successfully"
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          })
        }
      )
}

const deleteNote = async(req,res) => {
    await Note.findOneAndUpdate(
        { _id: req.params.id1 },
        { $pull: { notes : { _id: req.params.id2} } },
        { new: true },
        function(err) {
            if (err) { console.log(err) }
        }
      ).then(
          () => {
            res.status(200).json({
            message: "Note deleted successfully!"
          });
        }
      ).catch(
          (error) => {
            res.status(400).json({
            error: error
          })
        }
      )
}


module.exports ={
    getAllProducts,
    getProductsById,
    createNewUUID,
    addNote,
    deleteNote
}