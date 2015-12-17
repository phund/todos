Push.debug = true;
Push.allow({
  send: function(userId, notification) {
    // Allow all users to send to everybody - For test only!
    return true;
  }
});

if (Meteor.isClient) {
  Meteor.startup(function () {
    Meteor.defer(function () {
      Session.setDefault("checked", $("input[type=checkbox]").is(":checked"));
    });

    if (Meteor.isCordova) {
      window.alert = navigator.notification.alert;
    }

    Push.addListener('message', function(notification) {
      // Called on every message
      console.log(JSON.stringify(notification))

      function alertDismissed() {
        NotificationHistory.update({_id: notification.payload.historyId}, {
          $set: {
            "recievedAt": new Date()
          }
        });
      }
      alert(notification.message, alertDismissed, notification.payload.title, "Ok");
    });
  })
}