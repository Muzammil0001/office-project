const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussion-controller');

router.post('/discussion/', discussionController.createDiscussion);
router.get('/discussion/', discussionController.getAllDiscussions);
router.get('/discussion/:id', discussionController.getDiscussionById);
router.patch('/discussion/:id', discussionController.updateDiscussion);
router.delete('/discussion/:id', discussionController.deleteDiscussion);

module.exports = router;
