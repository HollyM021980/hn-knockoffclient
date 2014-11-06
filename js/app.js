var hnClientApp = {
  // mainURL: 'https://thawing-wildwood-9103.herokuapp.com/'
  mainURL: 'http://localhost:3000/'
};


hnClientApp.renderCommentsList = function() {
  $.ajax({
        url: hnClientApp.mainURL + 'comments',
        type: 'GET'
    }).done(function(response) {
        var template = Handlebars.compile($("#commentsTemplate").html());
      $('#content').html(template({
          comments: response
      }));
    });
};

hnClientApp.renderSubmissionList = function() {
  $.ajax({
        url: hnClientApp.mainURL + 'submissions',
        type: 'GET'
    }).done(function(response) {
        var template = Handlebars.compile($("#submissionsTemplate").html());
      $('#content').html(template({
          submissions: response
      }));
    });
};

hnClientApp.renderUserList = function() {
  $.ajax({
        url: hnClientApp.mainURL + 'users',
        type: 'GET'
    }).done(function(response) {
        var template = Handlebars.compile($("#usersTemplate").html());
      $('#content').html(template({
          users: response
      }));
    });
};


hnClientApp.addUsers = function() {
  $('#content').on('submit', '.js-userForm', function(e) {
      e.preventDefault();
      var data = {
          user: {
            name: $(this).find('input[name="name"]').val(),
            email: $(this).find('input[email="email"]').val()
          }
      };

      $.ajax({
          url: hnClientApp.mainURL+'users',
          type: 'POST',
          data: data
      }).done(function(response) {
        hnClientApp.renderUserList();
      });
  });
};

hnClientApp.deleteUsers = function() {
    $('#content').on('click', '.js-deleteUser', function(e) {
      e.preventDefault();

      var id = $(this).attr('data-id');

      $.ajax({
          url: hnClientApp.mainURL+'users/'+id,
          type: 'DELETE'
      }).done(function(response) {
        hnClientApp.renderUserList();
      });
  });
};

// var mainURL = 'https://thawing-wildwood-9103.herokuapp.com/';
var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'home': 'home',
      'users': 'users',
      'comments': 'comments'
    },

    home: function() {
        hnClientApp.renderSubmissionList();
    },

    comments: function() {
      hnClientApp.renderCommentsList();
    },
    users: function() {
        hnClientApp.renderUserList();

        hnClientApp.addUsers();

        hnClientApp.deleteUsers();
    },

});

var router = new Router();

// This tells backbone to watch for back buttons
// and other navigation.
Backbone.history.start();



