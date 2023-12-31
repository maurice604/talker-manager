const getTalkers = require('./getTalkers');
const talkerId = require('./talkerId');
const { login, generateToken, validateEmail, validatePassword } = require('./login');
const { postTalker,
tokenVerify,
validateName,
validateAge,
validateTalk,
validateDateRate,
} = require('./postTalker');
const { putTalker } = require('./putTalker');
const deleteTalker = require('./deleteTalker');
const getSearch = require('./getSearch');

module.exports = {
    getTalkers,
    talkerId,
    login,
    generateToken,
    validateEmail,
    validatePassword,
    postTalker,
    tokenVerify,
    validateName,
    validateAge,
    validateTalk,
    validateDateRate,
    putTalker,
    deleteTalker,
    getSearch,
};
