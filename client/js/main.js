$(document).ready(function() {

var deferred = $.Deferred();
var previousSearches = [];

// pushes the user to search
$('#currentTopic').text('Awaiting for your search..');

// toggles opacity of our input box
$('input').click(function() {
  $(this).css('opacity', '1');
}).
  blur(function() {
   $(this).css('opacity', '0'); 
  });


// *** create function to remove previous search ***
function deletePreviousContent(arg) {
  deferred.resolve($(arg).remove());
  return deferred.promise();
}

function placeUserInput(arg) {
  return $('#currentTopic').text(arg);
}

function Elem(val) {
  this.val = val;
  $('<div class="add-content"><img src='+ this.val.image.url +'></div>').appendTo($('.images'));
}

function sendData() {
  var user = {
    input: $('#userInput').val()
  };

  $.post("/topic", user, function(data) {
    if (!data || null || undefined) {
      $('#currentTopic').text('Data not found. Please try your search again');
    }

    setPreviousSearchesOnDom(previousSearches);

    data.forEach(function(elem, i) {        
      if (elem.image) {
        var content = new Elem(elem);  
      }
    });

  }).then(function() {
    $('input').css('opacity', '0');
    previousSearches.push(user.input);
    placeUserInput(user.input);
  });
}
  // for pressing the submit button
  // $('#requestButton').click(function() {
  //   sendData();
  // });

  // some users may like to press enter inside an input box instead of selecting submit
  $('#userInput').keydown(function(e) {
    if (e.which == 13) {
      e.preventDefault();
      if ($('.images > .add-content').length) {
        $('.images > div').fadeOut(900, function() {
          deletePreviousContent(this);
        });
      }
      sendData();  
    }
  });

  // purpose for this is show users previous searches
  function setPreviousSearchesOnDom(arg) {
    arg.forEach(function(elem, i) {
      if (i === 1) {
        return;
      }
      if ($('#previousTopic').text()) {
        $('#previousTopic').css({"left": "-=10", "opacity": "1"});
      }
      $('#previousTopic').text(elem).animate({"left": "10px", "opacity": ".4"}, 900);
    });
  }



});
