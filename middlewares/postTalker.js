const fs = require('fs');

const postTalker = (req, res) => {
        const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
        const addTalker = {
        name: req.body.name,
        age: req.body.age,
        id: talkers.length + 1,
        talk: req.body.talk,
        };
        talkers.push(addTalker);
         fs.writeFileSync('./talker.json', JSON.stringify(talkers));
        return res.status(201).json(addTalker);
};

const tokenVerify = (req, res, next) => {
    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(401).json({
        message: 'Token não encontrado',
      });
    }
  
    if (!(typeof authorization === 'string' && authorization.length === 16)) {
      return res.status(401).json({
        message: 'Token inválido',
      });
    }
  
    return next();
  };

const validateName = (req, res, next) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({
        message: 'O campo "name" é obrigatório',
      });
    }
  
    if (!(typeof name === 'string' && name.length >= 3)) {
      return res.status(400).json({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      });
    }
  
    return next();
  };

const validateAge = (req, res, next) => {
    const { age } = req.body;
  
    if (!age) {
      return res.status(400).json({
        message: 'O campo "age" é obrigatório',
      });
    }
  
    if (typeof age !== 'number' || age < 18) {
      return res.status(400).json({
        message: 'A pessoa palestrante deve ser maior de idade',
      });
    }

    return next();
  };

  const validateTalk = (req, res, next) => {
    const { talk } = req.body;
  
    if (!talk || !talk.watchedAt || typeof talk.rate !== 'number') {
      return res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
  
    return next();
  };

  const validateDateRate = (req, res, next) => {
    const { talk } = req.body;
    const regEx = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  
    if (!regEx.test(talk.watchedAt)) {
      return res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
    }
  
    if (!(Number.isInteger(talk.rate) && talk.rate >= 1 && talk.rate <= 5)) {
      return res.status(400).json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  
    next();
  };

module.exports = {
    postTalker,
    tokenVerify,
    validateName, 
    validateAge,
    validateTalk,
    validateDateRate,
};
