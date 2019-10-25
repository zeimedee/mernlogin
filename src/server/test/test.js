var supertest = require('supertest')
const{ assert , expect} = require('chai');
var should = require("should");
const validateUser = require("../validator/validateUser");
const validateLogin = require('../validator/validateLogin');

let user = {
    name: "alex",
    email:"ziemedee@gmail.com",
    password:"alexnnnjsd"
}

var server = supertest.agent("http://localhost:4000/register");


describe("Test Suite", ()=>{

    describe("Integration Tests", ()=>{
        it("should return home",(done)=>{
            server.get('/')
                  .expect("content-type",/json/)
                  .expect(200)
                  .end((err,res)=>{
                    res.status.should.equal(200);
                    //res.body.error.should.equal(false);
                  done();
              });
        });
    
        it("Should register user", (done)=>{
            server.post('/add')
                  .send(user)
                  .expect("content-type",/json/)
                  .expect(200)
                  .end((err,res)=>{
                        res.status.should.equal(200);
                        done();
                  });
        });
    
        it("should login user", (done)=>{
            server.post('/login')
                  .send(user)
                  .expect("content-type",/json/)
                  .expect(200)
                  .end((err,res)=>{
                      res.status.should.equal(200);
                      done();
                  })
        });
    });

    
        describe("Unit Tests", ()=>{
            it(" user should return true", ()=>{
                let result = validateUser(user);
                expect(result.isValid).to.be.true;
        
            });
        
        
            it("login should return true", ()=>{
                let result = validateLogin(user);
                expect(result.isValid).to.be.true;
            });
            
        });
    

});