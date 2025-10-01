const { camelize} = require('../utils.js')

module.exports = [
    {path: '126720', 
    getPath: (msg, field) => {return camelize(`${msg.fields.manufacturerCode}`)+`.`+camelize(`${msg.fields.device}`)+`.${field}`;}}
]