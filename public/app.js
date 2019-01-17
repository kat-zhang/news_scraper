// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    
    
    $("#articles").append("<a   data-id='" + data._id + "' id='headline' href='" + data[i].link + "'>" + data[i].title + "</a>");
    $("#articles").append("<p  data-id='" + data._id + "' class='summary'>" + data[i].summary +"</p>");
    $("#articles").append("<br> <button class='btn btn-sm btn-dark' id='create-note' data-id='" + data[i]._id + "' > Notes");
    $("#articles").append("<button class='btn btn-sm btn-success' class='save-me'> Save Article");
    $("#articles").append("<button data-id='" + data._id + "' class='btn btn-sm btn-danger' class='delete-article'> DELETE");
    $("#articles").append("<hr>");
    
    
  }
});



$(document).on("click", "#create-note", function() {
 
  $("#notes").empty();

  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
   
    .then(function(data) {
      console.log(data);
    
      // The title of the article
      $("#notes").append("<h6 id='note-title'>" + data.title + "</h6>");
      
      $("#notes").append("<input id='titleinput' name='title' placeholder='Note Title' class='form-control'>");
      $("#notes").append("<textarea id='bodyinput' name='body' class='form-control' rows='6'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='save-note' class='btn btn-sm btn-success'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#save-note", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    .then(function(data) {
  
      $("#notes").empty();
    });

  //Remove the values entered in the input areas
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(".delete-article").on("click", function() {
  // $("data-id='" + data._id + "'").hide();
  // GET route
  //Delete the article from the collection
});


$("#clear-all").on("click", function() {
  $("#articles").empty();
  //get route 
  // Drop the collection from database
  
});

$(".save-me").on("click", function(){
  //grab article realted content with matching attribute data-id values and 
  // hide on the DOM, POST the same info to the saved page
})



