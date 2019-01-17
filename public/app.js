// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    
    
    $("#articles").append("<a  id='headline' href='" + data[i].link + "'>" + data[i].title + "</a>");
    $("#articles").append("<p class='summary'>" + data[i].summary +"</p>");
    $("#articles").append("<br> <button class='btn btn-sm btn-dark' id='create-note' data-id='" + data[i]._id + "' > Notes");
    $("#articles").append("<button class='btn btn-sm btn-success' id='save-me'> Save Article");
    $("#articles").append("<button class='btn btn-sm btn-danger' id='delete-article'> DELETE");
    $("#articles").append("<hr>");
    
    
  }
});



$(document).on("click", "#create-note", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // alert("make a modal")
    
      // The title of the article
      $("#notes").append("<h6 id='note-title'>" + data.title + "</h6>");
      
      $("#notes").append("<input id='titleinput' name='title' placeholder='Note Title' class='form-control'>");
      $("#notes").append("<textarea id='bodyinput' name='body' class='form-control' rows='6'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
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
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#delete-article", function(){
  // alert("DELETE");
});


$("#clear-all").on("click", function() {
  
  $("#articles").empty();
  
});
$("#delete-article").on("click", function() {
  
  $("#articles").empty();
  
});



