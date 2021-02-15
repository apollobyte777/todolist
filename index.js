$(document).ready(function(){
var getCompleted = function() {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=299',
    dataType: 'json',
    success: function (response, textStatus) {
      response.tasks.forEach(function (task) {
        if (task.completed == true){
        console.log(task.completed);
        $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button>');
      }
      })
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};

var getActive = function() {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=299',
    dataType: 'json',
    success: function (response, textStatus) {
      response.tasks.forEach(function (task) {
        if (task.completed == false){
        console.log(task.completed);
        $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
      }
      })
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};

var getAll = function() {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=299',
    dataType: 'json',
    success: function (response, textStatus) {
      response.tasks.forEach(function (task) {
        console.log(task.completed);
        $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
      })
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};


$('#completed').on('click', function(){
  $('#todo-list').empty();
  getCompleted();
});

$('#active').on('click', function(){
  $('#todo-list').empty();
  getActive();
});

$('#all').on('click', function(){
  $('#todo-list').empty();
  getAll();
});


 var createTask = function () {
  $.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=299',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: $('#new-task-content').val()
      }
    }),
    success: function (response, textStatus) {
      getAll();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });  
}

 $('#create-task').on('submit', function (e) {
     e.preventDefault();
     $('#todo-list').empty();
     createTask();
  });
  
  getAll();

  var deleteTask = function (id) {
  $.ajax({
 type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=299',
    success: function (response, textStatus) {
      getAll();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

$(document).on('click', '.delete', function () {
  $('#todo-list').empty();
  deleteTask($(this).data('id'));
});

var markTaskComplete = function (id) {
  $.ajax({
 type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=299',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#todo-list').empty();
      getAll();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}


var markTaskActive = function (id) {
  $.ajax({
 type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=299',
    dataType: 'json',
    success: function (response, textStatus) {
    $('#todo-list').empty();
      getAll();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

$(document).on('change', '.mark-complete', function () {
 if (this.checked) {
    markTaskComplete($(this).data('id'));
  } else {
    markTaskActive($(this).data('id'));
  }
});


});


