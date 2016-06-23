var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var expect = chai.expect;
chai.should();
chai.use(require('chai-things'));

var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);

var models = require('../models');
var Page = models.Page;
var User = models.User;
var marked = require('marked');

before(function () {
    return models.db.sync({force: true});
});

// POST testing in supertest
// agent
// .post('/some/route')
// .send({someProp: 'someString'});

describe('http requests', function () {

  describe('GET /wiki', function () {
    it('gets 200 on index', function (done) {
      agent
      .get('/wiki')
      .expect(200, done);
    });
  });

  describe('GET /wiki/add', function () {
    it('responds with 200');
  });

  describe('GET /wiki/:urlTitle', function () {
    it('responds with 404 on page that does not exist', function (done) {
      agent
      .get('/wiki/spread')
      .expect(404, done);
    });
    it('responds with 200 on page that does exist');
  });

  describe('GET /wiki/search', function () {
    it('responds with 200');
  });

  describe('GET /wiki/:urlTitle/similar', function () {
    it('responds with 404 for page that does not exist');
    it('responds with 200 for similar page');
  });

  describe('POST /wiki', function () {
    it('responds with 302', function (done) {
      agent
      .post('/wiki')
      .send({ name: 'Annika', email: 'annika@bla.com', title: 'Anything', content: 'Stuff', status: 'open' })
      .expect(302, done);
    });
    it('creates a page in the database', function (done) {
      Page
      .findOne({ where: { title: 'Anything' }})
      .then(function (finds) {
        expect(finds).to.have.property('title');
        done();
      });
    });
  });

});
