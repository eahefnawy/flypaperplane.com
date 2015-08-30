Template.home.helpers({
  domains: function() {
    Meteor.call('getDomains', function(error, result) {
      if (error)
        console.log(error.reason);
      else
        Session.set('domains', result);
    });
    return Session.get('domains');
  }
});

Template.home.events({
  'submit #getStartedForm': function(e, t) {
    e.preventDefault();
    var email = $('#email').val() || " ",
      password = $('#password').val() || " ";
    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    Meteor.loginWithPassword(email, password, function(error) {
      if (error) {
        if (error.reason === "User not found") {
          if (!emailRegex.test(email)) {
            $('#error').text("Please enter a valid email address.");
            $('#error').css("display", "block");
          } else if (password.length < 6) {
            $('#error').text("Password must be at least 6 characters.");
            $('#error').css("display", "block");
          } else {
            Accounts.createUser({
              email: email,
              password: password,
              profile: {
                domains: []
              }
            }, function(error) {
              if (error) {
                $('#error').text("Somthing went wrong, couldn't create account.");
                $('#error').css("display", "block");
              } else {
                // Success. Account has been created and the user
                // has logged in successfully. 
                $('#error').css("display", "none");
              }
            });
          }
        } else if (error.reason === "Incorrect password") {
          $('#error').text("Email registered but doesnt match password.");
          $('#error').css("display", "block");
        }
      } else {
        $('#error').css("display", "none");
      }
    });
  },
  'click #signOutButton': function() {
    Meteor.logout();
  },
  'click #updateDomainsButton': function() {
    var domains = $('#updateDomains').val().split(',');

    Meteor.call('updateDomains', domains, function(error, result) {
      if (error)
        console.log(error.reason);
      else if (!result) {
        $('h3#updateDomainsNotes').text('Error: Some of those domains are already registered.').css('color', 'red');
        $('#updateDomains').val(Session.get('domains'));
        Meteor.setTimeout(function() {
          $('h3#updateDomainsNotes').text('List all domains that will use our backend, seperated by a coma. (no space)').css('color', 'black');
        }, 2000);
      } else {
        $('h3#updateDomainsNotes').text('Domains List Updated!').css('color', 'green');
        $('#updateDomains').val(Session.set('domains', domains));
        Meteor.setTimeout(function() {
          $('h3#updateDomainsNotes').text('List all domains that will use our backend, seperated by a coma. (no space)').css('color', 'black');
        }, 2000);
      }
    });
  }
});

Template.home.rendered = function() {
  $("main").onepage_scroll();
  hljs.initHighlighting();
}
