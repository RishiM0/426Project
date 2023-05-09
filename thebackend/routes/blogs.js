const express = require('express');
const {
    createBlog,
    getBlog,
    getBlogs,
    deleteBlog,
    updateBlog
} = require('../control/blogControl')
const router = express.Router();

//all workouts
router.get('/', getBlogs)

//single workout
router.get('/:title', getBlog)

//post a new workout
router.post('/', createBlog)

//delete a workout
router.delete('/:id', deleteBlog)

//Update a workout
router.patch('/:id', updateBlog)

module.exports = router;
