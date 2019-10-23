var supertest = require('supertest')
const{ assert , expect} = require('chai');
var should = require("should");
const validateUser = require("../validator/validateUser");


var server = supertest.agent("http://localhost:4000/register");


describe("Unit Test 1", ()=>{

    // it("should return home",(done)=>{
    //     server.get('/')
    //           .expect("content-type",/json/)
    //           .expect(200)
    //           .end((err,res)=>{
    //             res.status.should.equal(200);
    //             //res.body.error.should.equal(false);
    //           done();
    //       });
    // });

    // it("Should register user", (done)=>{
    //     server.post('/add')
    //           .send({name:"user1", email:"news9test@test.com", password:"newtests"})
    //           .expect("content-type",/json/)
    //           .expect(200)
    //           .end((err,res)=>{
    //                 res.status.should.equal(200);
    //                 done();
    //           });
    // });

    // it("should login user", (done)=>{
    //     server.post('/login')
    //           .send({name:"user1", email:"newstest@test.com", password:"newtests"})
    //           .expect("content-type",/json/)
    //           .expect(200)
    //           .end((err,res)=>{
    //               res.status.should.equal(200);
    //               done();
    //           })
    // });

    it("should return true", ()=>{
        
        let user = {
            name: "alex",
            email:"ziemedee@gmail.com",
            password:"alexdder"
        }
        let result = validateUser(user);
        expect(result.isValid).to.be.true;

    });
    

});