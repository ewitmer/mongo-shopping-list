global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
            });
            done();
        });
    });

it('should edit an existing item on PUT ', function(done) {
        chai.request(app)
            .put('/items/:id')
            .send({'name': 'apple', id: 3})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                storage.items[3].name.should.equal('apple');
            });
            done();
    });

    after(function(done) {
        Item.remove(function() {
        });
        done();
    });
});