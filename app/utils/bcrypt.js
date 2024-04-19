const bcryptjs = require('bcryptjs');

const hashPass = async (pass) => {
    return await bcryptjs.hash(pass, 10);
};

const comparePass = async (pass, hashPass) => {
    return await bcryptjs.compare(pass, hashPass);
}

module.exports = {hashPass, comparePass};