const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');
//Gets all members
router.get('/', (req, res) => res.json(members));

//Get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id)); //check to see if the member exists

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ Msg: `No member found with the id ${req.params.id}` });
    }
});

//create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    }
    //members.save(newMember);  //if you use mongo DB or mongoose or sql this kind of syntax
    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

//update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id)); //check to see if the member exists
    if (found) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
                res.json({ msg: 'Member was updated', member });
            }
        });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

//Delete a member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id)); //check to see if the member exists
    if (found) {
       res.json ({
           msg: 'Member Deleted',
           members: members.filter(member => member.id !== parseInt(req.params.id))
       });
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }   
});

module.exports = router;