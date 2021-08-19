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
    $(".button-add-user-close").click();
  });
});

$(document).on("click", ".button-delete-user", function(e) {
  console.log(this);
});
