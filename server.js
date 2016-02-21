/**
 * Created by Jason on 2015/11/21.
 */

/*==================================BASE SETUP==============================================*/

//call the package we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var Employee = require('./public/models/employee');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/company');

//this will let us get the data form a POSY
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
var port = process.env.PORT || 8888;

/*=========================================ROUTES============================================*/
var router = express.Router();

router.use(function(req, res, next){
    console.log('Something is happening.');
    next(); //make sure we go to the next routes and dont stop here
});

router.get('/', function(req, res){
    res.json({message:'Welcome to our api!'});
});

/*-----------------------------EMPLOYEE-----------------------------------------------*/
router.route('/employees')

    //get method
    .get(function(req, res){
        Employee.find(function(err, employee){
            if(err){
                res.send(err);
            }
            res.json(employee);
        });
    })

    .post(function(req, res){

        var newEmployee = new Employee();
        newEmployee.email = req.body.email;
        newEmployee.SMS = req.body.SMS;
        newEmployee.cellPhone = req.body.cellPhone;
        newEmployee.officePhone = req.body.officePhone;
        newEmployee.startDate = req.body.startDate;
        newEmployee.city = req.body.city;
        newEmployee.manager = req.body.manager;
        newEmployee.managerId = req.body.managerId;
        newEmployee.directReports = req.body.directReports;
        newEmployee.pic = req.body.pic;
        newEmployee.title = req.body.title;
        newEmployee.lastName = req.body.lastName;
        newEmployee.firstName = req.body.firstName;
        newEmployee.id = req.body.id;

        newEmployee.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message:"Employee created!"});
        });
    });
/*-------------------------------/employees/:id----------------------------------------*/

router.route('/employees/:_id')

    .get(function(req, res){
        console.log("get ID");
        Employee.findOne({'id': parseInt(req.params._id)}, function(err, employee){
            if(err){
                res.send(err);
            }
            res.json(employee);
        })
    })

    .put(function(req, res){
        Employee.findOne({'id':parseInt(req.params._id)}, function(err, employee){
            if(err){
                res.send(err);
            }
            employee.email = req.body.email;
            employee.SMS = req.body.SMS;
            employee.cellPhone = req.body.cellPhone;
            employee.officePhone = req.body.officePhone;
            employee.startDate = req.body.startDate;
            employee.city = req.body.city;
            employee.manager = req.body.manager;
            employee.managerId = req.body.managerId;
            employee.directReports = req.body.directReports;
            employee.pic = req.body.pic;
            employee.title = req.body.title;
            employee.lastName = req.body.lastName;
            employee.firstName = req.body.firstName;
            employee.id = req.body.id;

            employee.save(function(err){
                if(err){
                    res.send(err);
                }
                res.json({message:'Employee Updated!'});
            });
        });
    })

    .delete(function(req,res){
        Employee.findOne({'id': parseInt(req.params._id)}, function(err, employee){
            if(err){
                res.send(err);
            }
            employee.remove(function(err){
                if(err){
                    res.send(err);
                }
                res.json({message:'Employee Deleted!'});
            });
        });
    });

/*-------------------------------Register Routes-----------------------------------------*/
app.use('/api', router);

/*==========================================START SERVER====================================================*/
app.listen(port);
console.log('Server Started!');



