let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../index");

chai.should();

chai.use(chaiHttp);







describe('Todo API', function() {

  it('should Register user, login user, check token and delete a todo on /todo/<id> DELETE', function(done) {
      chai.request(app)

          // register request
          .post('/api/auth/signup')

          // send user registration details
          .send({
                  'username': 'Matias',
                  'email': 'smbpy43@gmail.com',
                  'password': 'tester'
              }

          ) // this is like sending $http.post or this.http.post in Angular
          .end((err, res) => { // when we get a resonse from the endpoint

              // in other words,
              // the res object should have a status of 201
              res.should.have.status(200);

              // follow up with login
              chai.request(app)
                  .post('/api/auth/signin')
                  // send user login details
                  .send({
                      'username': 'Matias',
                      'password': 'tester'
                  })
                  .end((err, res) => {
                      console.log('this runs the login part');
                      res.body.should.have.property('accessToken');
                      var token = res.body.accessToken;
                    
                    
                      // follow up with requesting user protected page
                      chai.request(app)
                          .get('/api/characters')
                          .end(function(err, res) {
                        
                              chai.request(app)
                                  .delete('/api/characters/' + res.body.characters[0].id)

                                  // we set the auth header with our token
                                  .set('x-access-token',token)
                                  .end(function(error, resonse) {
                                      resonse.should.have.status(200);
                                      resonse.body.should.have.property('message');
                                      resonse.body.message.should.equal('Authorized User, Action Successful!');
                                      done();
                                  });
                          })

                          done();
                  })
          })
  })
})
  /**
     *
     * 
     * 
     * 
     * 
     */

// describe('Tasks API', () => {

//   /**
//      * Test the GET route
//      */
 


//   describe("GET /api/characters", () => {
//     it("It should GET all the tasks", (done) => {
//         chai.request(app)
//         .get("/api/movies").then(
//             function (response) {
              
              
//               response.should.have.status(200);
//               response.body.should.be.an('object');
//               var object=response.body;
//               object.should.have.property('movie');
//               var movies= object.movie;
//               movies.forEach(movie => {
//                 movie.should.have.property('title');
                
//               });

          

              
//                 done();
//             },
//             function (err) {
//               console.log("EL ERROR");
//               console.log(err);
//                done(err);
//             }
//         );
        
//     });

//     describe("GET /api/characters", () => { it("It should NOT GET a task by ID", (done) => {
//             const taskId = 123;
//             chai.request(app)                
//                 .get("/api/tasks/" + taskId)
//                 .end((err, response) => {
//                     response.should.have.status(404);
//                     response.text.should.be.eq("The task with the provided ID does not exist.");
//                 done();
//                 });
//         });
//       it("It should GET all the tasks", (done) => {
//           chai.request(app)
//           .get("/api/movies").then(
//               function (response) {
                
                
//                 response.should.have.status(200);
//                 response.body.should.be.an('array');
                
         
                  
              
  
            
  
                
//                   done();
//               },
//               function (err) {
//                 console.log("EL ERROR");
//                 console.log(err);
//                  done(err);
//               }
//           );
          
//       });



//       it("It should NOT GET a task by ID", (done) => {
//         const taskId = 123;
//         chai.request(app)                
//             .get("/api/tasks/" + taskId)
//             .end((err, response) => {
//                 response.should.have.status(404);
//                 response.text.should.be.eq("The task with the provided ID does not exist.");
//             done();
//             });
//     });



// });











// });


//});