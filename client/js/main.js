$(document).ready(function() {

var deferred = $.Deferred();

$('#currentTopic').text('Awaiting for you\'re search..');

// *** create function to remove previous search ***


function placeUserInput(arg) {
  return $('#currentTopic').text(arg);
}

function Elem(val) {
  this.val = val;
console.log(this.val);
  $('<div><img src='+ this.val.image.url +'></div>').appendTo($('.images'));
}

function sendData() {
  var user = {
    input: $('#userInput').val()
  };

  $.post("/topic", user, function(data) {
    // iterateOverData(data);
    if (!data || null || undefined) {
      $('#currentTopic').text('Data not found. Please try your search again');
    }

    data.forEach(function(elem, i) {
      
      if (elem.image) {
        var content = new Elem(elem);  
      }
      
    });
    
    

  }).then(function() {
    placeUserInput(user.input);
  });
}

  $('#requestButton').click(function() {
    sendData();
  });

  // some users may like to press enter inside an input box instead of selecting submit
  $('#userInput').keydown(function(e) {
    if (e.which == 13) {
      e.preventDefault();
      sendData();
    }
  });

  // function iterateOverData(arg) {
  //   for (var i = 0; i < arg.length; i+=1) {
  //     if (!arg[i]) {
  //       console.log('no data found');
  //     }

  //     // for (var key in arg[i]) {
  //     //   placeDataOnToDom(arg[i][key]);  
  //     // }
      
  //   }
  // }

  // function placeDataOnToDom(arg) {
  //   console.log(arg);
  //   if (arg.image) {
  //     for (var key in arg.image) {
  //       // console.log(arg.image);
  //       $('#images > img:first-child').attr('src', arg.image.url);  
  //     }
  //   }
  // }



});
