$(document).on("click", ".boxcast-btn", function() {
  console.log('Youtube Streaming false');
  $.ajax({
    type: "POST",
    url: "/update",
    dataType: "json",
    data: {
      status: false
    }
  })
  .done(function(data) {
    console.log(data);
    getStatus();
  });
  return false;
});

// Click event to mark a book as read
$(document).on("click", ".youtube-btn", function() {
  console.log('Youtube Streaming True');
  $.ajax({
    type: "POST",
    url: "/update",
    dataType: "json",
    data: {
      status: true,
      name: 'Lane Anderson'
    }
  })
  .done(function(data) {
    console.log(data);
    getStatus();
  });
  return false;
});

// Click event to mark a book as not read
$(document).on("click", ".markunread", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    type: "GET",
    url: "/markunread/" + thisId
  });
  $(this).parents("tr").remove();
  getUnread();
});


// Functions

// Load unread books and render them to the screen
function getStatus() {
  $.getJSON("/status", function(data) {
    console.log(data)
  });
  console.log('finished retrieving status')
}

getStatus();
