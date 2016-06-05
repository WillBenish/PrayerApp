var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var prayerSchema = mongoose.Schema({
    name: String,
    frequency: Number, //number of days.  Daily==>1, Weekly ==> 7, Monthly ==>30
    lastRun: Number,
    totalUpdates: Number,
	description: String
    });

module.exports=  mongoose.model('Prayer', prayerSchema,'prayers');