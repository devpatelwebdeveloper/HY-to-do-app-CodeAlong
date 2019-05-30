$(document).ready(function() {
  $("form").on("submit", function(e) {
    e.preventDefault();
    // store input into variable to reduce lookups
    $input = $("input[type=text]");

    if ($input.val() !== "") {
      $("#error").hide();
      let toDoItem = "<span class='check todo'></span>" + $input.val();

      //allow the removal of items
      let removalLink = "<a href='#'><i class='fa fa-times-circle'></i></a>";

      let toDoListItem =
        "<li class='toDoItem'> " + toDoItem + removalLink + "</li>";
      $("ul").append(toDoListItem);
      $input.val("");
    } else {
      // show error if input is empty
      $("#error").show();
    }
    //drag/drop sort items
    $("ul").sortable();
  });

  // when the page loads focus on the input field
  $("input[type=text]").focus();

  $("ul").on("click", ".toDoItem", function() {
    const checkBox = $(this).find(".check");
    checkBox.toggleClass("todo done");
    $(this).toggleClass("completed");

    // automatically move completed items to the bottom
    if (checkBox.is(".done")) {
      const toDoListItem = $(this);
      moveToBottom(toDoListItem);
    }
  });

  //allow the removal of items
  $("ul").on("click", "a", function() {
    const toDoListItem = $(this).parent();
    toDoListItem.remove();
  });

  // automatically move completed items to the bottom
  let moveToBottom = function(item) {
    item.fadeOut(function() {
      item.appendTo($("ul"));
      item.fadeIn();
    });
  };
});
