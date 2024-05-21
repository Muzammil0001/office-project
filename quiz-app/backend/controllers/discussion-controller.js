const Discussion = require('../models/discussion-model');
const User = require('../models/user-model');
const Quiz = require('../models/quizzes-model');

//Create Discussion<=====================>
exports.createDiscussion = async (req, res) => {
    const { title, content, createdBy, relatedQuiz } = req.body;

    try {
        const userExists = await User.findById(createdBy);
        if (!userExists) {
            return res.status(404).send({ message: `User not found: ID ${createdBy}` });
        }

        if (relatedQuiz) {
            const quizExists = await Quiz.findById(relatedQuiz);
            if (!quizExists) {
                return res.status(404).send({ message: `Quiz not found: ID ${relatedQuiz}` });
            }
        }

        const newDiscussion = new Discussion({
            title,
            content,
            createdBy,
            relatedQuiz
        });

        await newDiscussion.save();
        res.status(201).send({ message: 'Discussion created successfully', discussion: newDiscussion });
    } catch (error) {
        res.status(500).send({ message: 'Failed to create discussion', error: error.message });
    }
};


//Get all Discussions<=====================>
exports.getAllDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find();
        res.status(200).send(discussions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve discussions', error: error.message });
    }
};
//Get a Discussion<=====================>
exports.getDiscussionById = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) {
            return res.status(404).send({ message: 'Discussion not found' });
        }
        res.status(200).send(discussion);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve discussion', error: error.message });
    }
};
//Update Discussion<=====================>
exports.updateDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!discussion) {
            return res.status(404).send({ message: 'Discussion not found' });
        }
        res.status(200).send({ message: 'Discussion updated successfully', discussion });
    } catch (error) {
        res.status(500).send({ message: 'Failed to update discussion', error: error.message });
    }
};
//Delete Discussion<=====================>
exports.deleteDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndDelete(req.params.id);
        if (!discussion) {
            return res.status(404).send({ message: 'Discussion not found' });
        }
        res.status(200).send({ message: 'Discussion deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete discussion', error: error.message });
    }
};
