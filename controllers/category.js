const errorHandler = require('../utils/errorHandler');
const Category = require('../models/Category');
const Position = require('../models/Position');
module.exports.getAll = async (req, res) => {
    try{
        const categories = await Category.find({
            user: req.user.id
        });
        res.status(200).json(categories);
    }catch(e) {
        errorHandler(res, e);
    }
};
module.exports.getById = async (req, res) => {
    try{
        const category = await Category.findById({
            _id: req.params.id
        });
        res.status(200).json(category);
    }catch(e) {
        errorHandler(res, e);
    }
};
module.exports.remove = async(req, res) => {
    try{
        await Category.remove({_id: req.params.id});
        await Position.remove({category: req.params.id});
        res.status(200).json({
            message: 'Категория удалена!'
        });
    }catch(e) {
        errorHandler(res, e);
    }
};
module.exports.create = async (req, res) => {
    console.log(req);
    const category = new Category({
        user: req.user.id,
        name: req.body.name,
        imageSrc: req.file ? req.file.path : ''
    });
    try{
        await category.save();
        res.status(201).json(category);
    }catch(e) {
        errorHandler(res, e);
    }
};
module.exports.update = async (req, res) => {
    const updated = {};
    if(req.body.name) {
        updated.name = req.body.name;
    }
    if(req.file) {
        updated.imageSrc = req.file.path;
    }
    try{
         const category = await Category.findOneAndUpdate(
             {
                _id: req.params.id
             },
             {
                 $set: updated
             },
             {new: true}
         );
        res.status(200).json(category);
    }catch(e) {
        errorHandler(res, e);
    }
};