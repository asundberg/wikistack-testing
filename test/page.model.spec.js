var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var expect = chai.expect;
chai.should();
chai.use(require('chai-things'));

var models = require('../models');
var Page = models.Page;
var User = models.User;
var marked = require('marked');


describe('Page class', function () {

  describe('Virtuals', function () {
    var page1,
        page2;
        beforeEach(function () {
          page1=Page.build({
            title: 'page1',
            content: 'an article!'
          });
          page2=Page.build({
            title: 'page2',
            content: 'an article!'
          });
        });
    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function (done) {
        expect(page1.route).to.be.equal('/wiki/' + page1.urlTitle);
        done();
      });
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function (done) {
        expect(page1.renderedContent).to.be.equal(marked(page1.content));
        done();
      });
    });
  });

  describe('Class methods', function () {
    beforeEach(function (done) {
      Page.create({
        title: 'foo',
        content: 'bar',
        tags: ['foo', 'bar']
      })
      .then(function () {
        done();
      })
      .catch(done);
    });
    afterEach(function(done) {
      Page.destroy({
        where: {}
      })
      .then(function() {
        done();
      }).catch(done);
    });
    describe('findByTag', function () {
      it('gets pages with the search tag', function(done) {
        Page.findByTag('foo')
        .then(function(pages) {
          expect(pages).to.have.lengthOf(1);
          done();
        })
        .catch(done);
      });
      it('does not get pages without the search tag');
    });
  });
// one as your base, another that has one shared tag, and another that has no shared tags.
  describe('Instance methods', function () {
    beforeEach(function (done) {
      Page.create({
        title: 'foo',
        content: 'bar',
        tags: ['foo', 'bar']
      })
      .catch(done);
      Page.create({
        title: 'fooo',
        content: 'baz',
        tags: ['foo', 'baz']
      })
      .catch(done);
      Page.create({
        title: 'foopie',
        content: 'barMonkey',
        tags: ['hey', 'yay']
      })
      .then(function () {
        done();
      })
      .catch(done);
    });
    afterEach(function(done) {
      Page.destroy({
        where: {}
      })
      .then(function() {
        done();
      }).catch(done);
    });
    describe('findSimilar', function () {
      it('never gets itself', function (done) {
        var thePage;
        Page.findOne({where: {}})
        .then(function (firstPage) {
          thePage = firstPage;
          return thePage.findSimilar();
        }).then(function (pages) {
          pages.should.not.include(thePage);
          done();
        }).catch(done);
      });
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    var page1;
    beforeEach(function () {
      page1 = Page.build({
        status: 'pageMonkey'
      });
    });
    it('errors without title', function (done) {
      page1.validate()
        .then(function (err) {
          expect(err).to.exist;
          expect(err.errors).to.exist;
          expect(err.errors[0].path).to.equal('title');
          done();
        });
    });
    it('errors without content', function (done) {
      page1.validate()
        .then(function (err) {
          expect(err).to.exist;
          expect(err.errors).to.exist;
          expect(err.errors[2].path).to.equal('content');
          done();
        });
    });
    xit('errors given an invalid status', function (done) {
      page1.validate()
        .then(function (err) {
          expect(err).to.exist;
          expect(err.errors).to.exist;
          expect(err.errors[3].path).to.equal('status');
          done();
        });
    });
  });

  xdescribe('Hooks', function () {
    var page1;
    beforeEach(function () {
      page1 = Page.build({
        title: 'A Great Page',
        content: 'Beautiful content.'
      });
    });
    it('it sets urlTitle based on title before validating', function(done) {
      Page.hook();
      page1.validate().then();
      // console.log("the thing:", page1.urlTitle);
    });
  });

});
