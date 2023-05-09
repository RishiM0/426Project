const Blog = require('../model/blogModel');
const mongoose = require('mongoose');

const getBlogs = async (req,res) => {
    const blogs = await Blog.find({}).sort({createdAt: -1});

    res.status(200).json(blogs)
}

const getBlog = async (req,res) => {
    const {title} = req.params;

    const blog = await Blog.find({'title': title});

    if (!blog) {
        return res.status(404).json({error: 'No blogs with this title'})
    }

    res.status(200).json(blog)
}

const createBlog = async (req,res) => {
    const{title, author, body} = req.body;

    let emptyFields = []

    if(!title || !author || !body) {
        emptyFields.push('missing')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'please fill in all fields'})
    }

    try{
        const blog = await Blog.create({title, author, body})
        res.status(200).json(blog);
    }
    catch (err) {
        res.status(400).json({err: err.message})
    }
}

const deleteBlog = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such blog id'})
    }

    const blog = await Blog.findOneAndDelete({_id: id})

    if (!blog) {
        return res.status(404).json({error: 'No such blog, no delete happened'})
    }

    res.status(200).json(blog);

}

const updateBlog = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such blog id'})
    }

    const blog = await Blog.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!blog) {
        return res.status(404).json({error: 'No such blog'})
    }

    res.status(200).json(blog);
}

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    deleteBlog,
    updateBlog
}
