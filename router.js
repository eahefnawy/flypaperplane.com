Router.map(function() {
    this.route('home', {
        path: '/'
    });
    this.route('api', {
        path: '/api',
        where: 'server',
        action: function() {
            var origin = this.request.headers.origin.replace(/.*?:\/\//g, "");
            var headers = {
                    'Access-Control-Allow-Origin': '*'
                };
            this.response.writeHead(200, headers);

            if (this.request.method != 'POST') {
                
                var data = {
                    error: {
                        message: "Oops! We only accept POST requests."
                    }
                }
                this.response.end(JSON.stringify(data));

            } else if (!Meteor.users.findOne({"profile.domains": origin })) {
                
                
                var data = {
                    error: {
                        message: "Oops! It seems that the domain making that request is not registered. Please sign up and add this domain at paperplane.io."
                    }
                }
                this.response.end(JSON.stringify(data));
            } else {
              
                var requestBodyReady = JSON.stringify(this.request.body, null, 4);
                var emailBody = 'Hey, Eslam here from paperplane.io. I\'m just letting you know that you got a new paperplane from ' + origin + '. Here are the data exactly as it is:\n\n***********\n\n' + requestBodyReady + '\n\n***********\n\nPsst, this email was sent automatically. I don\'t store nor sneak a peak at your data. Because I\'m not really Eslam, I\'m just the digital representation of him ;)'
                var email = Meteor.users.findOne({"profile.domains": origin }).emails[0].address;
                
                Meteor.call("sendEmail", email, emailBody)

                var data = {
                    success: {
                        message: "Awesome! We got your data, and we sent you a paperplane email with all the data submitted."
                    }
                }
                this.response.end(JSON.stringify(data));
            }
        }
    });
});
