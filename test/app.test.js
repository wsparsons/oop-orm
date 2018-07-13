const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))
const app = require('../src')

describe('App Routes', function () {
  describe('/ping', function () {
    it('should pong', async function () {
      const response = await chai.request(app).get('/ping')

      expect(response.status).to.equal(200)
      expect(response.body.message).to.equal('pong!')
    })
  })

  describe('404', function () {
    it('should return a 404 message', async function () {
      const response = await chai.request(app).get('/notaroute')

      expect(response.status).to.equal(404)
      expect(response.body.message).to.be.ok
    })
  })
})
