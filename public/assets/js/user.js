$(document).on("click", ".button-edit", function(e) {
});

$(document).on("click", ".button-add-user", function(e) {
  let userName = $("#name-add").val();
  let userEmail = $("#email-add").val();
  let userCheese = $("#cheeese-add").val();

  let userData = {
    "Name": userName,
    "Email": userEmail,
    "Cheese": userCheese
  }

  $.ajax({
    url: "/users",
    type: "post",
    data: userData
  }).done(function(result) {
    console.log(result);
  });
});

$('body').delegate('.submit-button-delete', 'click', function() {
  let userID = $(this).data("userId");
  $.ajax({
    url: "/accounts/delete-account",
    type: "post",
    data: {
      "ID": userID
    }
  }).done(function(result) {
    $("tr[data-user-id-tr='" + userID + "']").remove();
    dataNothing();
  });
});

$('#userName-add').on('input', function() {
  $(".modal-title-add").html($("#userName-add").val());
});
