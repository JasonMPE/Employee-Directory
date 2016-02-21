/**
 * Created by Jason on 2015/11/24.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    id: Number,
    firstName: String,
    lastName: String,
    title: String,
    manager: String,
    managerId: String,
    directReports: String,
    pic: String,
    city: String,
    startDate: String,
    officePhone: String,
    cellPhone: String,
    SMS: String,
    email: String
});

module.exports = mongoose.model('Employee', employeeSchema);