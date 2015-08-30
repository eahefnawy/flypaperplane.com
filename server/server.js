Meteor.methods({
    getDomains: function() {
        return Meteor.users.findOne({_id: Meteor.userId()}).profile.domains;
    },
    updateDomains: function(domains) {
        if(!Meteor.users.findOne({$and: [{ _id: { $ne: Meteor.userId() } }, {"profile.domains": {$in: domains}}]}))
            return Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile": {"domains": domains}}});
        else
            return false
    },
    sendEmail: function(email, emailBody) {
        Email.send({
            from: "eahefnawy@gmail.com",
            to: email,
            subject: "You Got a New Paperplane",
            text: emailBody
        });
        console.log("email sent");
    }
});
