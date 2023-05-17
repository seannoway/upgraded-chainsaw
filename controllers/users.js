const { User } = require('../models');

const userController = {
    // gets all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            }
            );
    },
    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                // error code if no user is found
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // if found sends data
                res.json(dbUserData);
            }
            )
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            }
            );
    },
    // creates User
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    // updates user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                // error code if no user is found
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // if found sends data
                res.json(dbUserData);
            }
            )
            .catch(err => res.json(err));
    },
    // deletes user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                // error code if no user is found
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // if found sends data
                res.json(dbUserData);
            }
            )
            .catch(err => res.status(400).json(err));
    },
    // adds friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .populate({
                path: 'friends',
                select: ('-__v')
            })
            .select('-__v')
            .then(dbUserData => {
                // error code if no user is found
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // if found sends data
                res.json(dbUserData);
            }
            )
            .catch(err => res.status(400).json(err));
    },
    // deletes friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .populate({
                path: 'friends',
                select: ('-__v')
            })
            .select('-__v')
            .then(dbUserData => {
                // error code if no user is found
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // sends data if found
                res.json(dbUserData);
            }
            )
            .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;