const moment = require('moment');
const formato = ('DD/MM/YYYY ');

//const hora = moment();
const formaterdate = {

   formaterdate: function (date){
   return moment(date).format(formato);      
   },
};

module.exports = formaterdate;



/*helpers.fecha = (date) => {
   return date.format(formato);
};

module.exports = helpers;*/


/*const {format} = require('timeago.js');
const helpers = {};

helpers.timeago = (timestamp) => {
   return format(timestamp);
};
module.exports = helpers;*/