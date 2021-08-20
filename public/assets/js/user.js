$(document).ready(function() {
  addCheeseClass();
  addAvatarImage();
});

function addCheeseClass() {
  let cheeseElement = $(".badge")
  $.each(cheeseElement, function(key, value) {
    let cheese = $(value).html();
    if (cheese >= 200)
      $(value).addClass("bg-gradient-success");
    else if (cheese >= 100)
      $(value).addClass("bg-gradient-info");
    else
      $(value).addClass("bg-gradient-secondary");
  });
}

let randomImage = null;

function addAvatarImage() {
  var images = [
    'https://cdn.contactcenterworld.com/images/user-master/2020-8-27-18221151.png',
    'https://www.onattercume.com/wp-content/uploads/2018/02/orta-yas.png',
    'https://www.tcsohbet.net/wp-content/uploads/2020/05/person4.png',
    'https://haticekocak.com/assets/front/img/testimonials/1606436367.png',
    'https://evdeneveasansorlunakliyat.com/trex/assets/img/yorumlar/2897524865.jpg',
    'https://tedarikciportal.sutas.com.tr/_nuxt/img/avatar.2918610.png'
  ];

  randomImage = images[Math.floor(Math.random() * images.length)];

  $.each($('.avatar'), function( index, value ) {
    $(this).attr("src", randomImage);
  });
}

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
    let cheeseClass = null;
    if (result.Cheese >= 200) {
      cheeseClass = "bg-gradient-success";
    }
    else if (result.Cheese >= 100) {
      cheeseClass = "bg-gradient-info";
    }
    else {
      cheeseClass = "bg-gradient-secondary";
    }

    $("#tbody-users").prepend('<tr data-row-id="' + result.ID + '">' +
                              '<td>' +
                                '<div class="d-flex px-2 py-1">' +
                                  '<div>' +
                                    '<img src=" ' + randomImage + '" class="avatar avatar-sm me-3" alt="user1">' +
                                  '</div>' +
                                  '<div class="d-flex flex-column justify-content-center">' +
                                    '<h6 class="mb-0 text-sm">' + result.Name + '</h6>' +
                                    '<p class="text-xs text-secondary mb-0"> ' + result.Email + '</p>' +
                                  '</div>' +
                                '</div>' +
                              '</td>' +
                              '<td>' +
                                '<p class="text-xs font-weight-bold mb-0">User</p>' +
                                '<p class="text-xs text-secondary mb-0">Cheeser</p>' +
                              '</td>' +
                              '<td class="align-middle text-center text-sm">' +
                                '<span class="badge badge-sm ' + cheeseClass + '"> ' + result.Cheese + ' </span>' +
                              '</td>' +
                              '<td class="align-middle text-center">' +
                                '<span class="text-secondary text-xs font-weight-bold">' + result.Date + '</span>' +
                              '</td>' +
                              '<td class="align-middle">' +
                                '<a href="javascript:;" class="icon-edit-user text-secondary font-weight-bold text-xs" data-bs-toggle="modal" data-bs-target="#edit-user" data-toggle="tooltip" data-original-title="Edit user">' +
                                  '<i class="fas fa-edit" aria-hidden="true"></i>' +
                                '</a>' +

                                '<a href="javascript:;" style="margin-left:5%" class="button-delete-user text-secondary font-weight-bold text-xs" data-id="' + result.ID + '">' +
                                  '<i class="fas fa-trash" aria-hidden="true"></i>' +
                                '</a>' +
                              '</td>' +
                            '</tr>');

    $(".button-add-user-close").click();
  });
});

$(document).on("click", ".icon-edit-user", function(e) {
  let ID = $(this).parent().parent().data("rowId");
  let name = $(this).parent().parent().children(':nth-child(1)').children().children(':nth-child(2)').children(':nth-child(1)').text();
  let email = $(this).parent().parent().children(':nth-child(1)').children().children(':nth-child(2)').children(':nth-child(2)').text();
  let cheese = $(this).parent().parent().children(':nth-child(3)').children().text();

  $('#ID-edit').val(ID);
  $('#name-edit').val(name);
  $('#email-edit').val(email);
  $('#cheese-edit').val(cheese);
  $('#edit-user > div > div > div:nth-child(1) > h5').text('Edit User - ' + name);
});

$(document).on("click", ".button-edit-user", function(e) {
  let ID = $('#ID-edit').val();
  let name = $('#name-edit').val();
  let email = $('#email-edit').val();
  let cheese = $('#cheese-edit').val();

  let userData = {
    "ID": ID,
    "Name": name,
    "Email": email,
    "Cheese": cheese
  }

  $.ajax({
    url: "/users",
    type: "put",
    data: userData
  }).done(function(result) {
    let oldCheese =     $('tr[data-row-id="' + ID +'"]').children(':nth-child(3)').children().text();
    $('tr[data-row-id="' + ID +'"]').children(':nth-child(1)').children().children(':nth-child(2)').children(':nth-child(1)').text(name);
    $('tr[data-row-id="' + ID +'"]').children(':nth-child(1)').children().children(':nth-child(2)').children(':nth-child(2)').text(email);
    $('tr[data-row-id="' + ID +'"]').children(':nth-child(3)').children().text(cheese);
    $('tr[data-row-id="' + ID +'"]').children(':nth-child(3)').children().toggleClass(getCheeseClass(oldCheese) + " " + getCheeseClass(cheese))
    $(".button-edit-user-close").click();

    function getCheeseClass(cheese) {
      if (cheese >= 200)
        return "bg-gradient-success";
      else if (cheese >= 100)
        return "bg-gradient-info";
      else
        return "bg-gradient-secondary";
    }
  });
});

$(document).on("click", ".button-delete-user", function(e) {
  var ID = $(this).data("id");
  let _this = this;
  $.ajax({
    url: "/users",
    type: "delete",
    data: {"ID": ID}
  }).done(function(result) {
    $(_this).parent().parent().remove();
  });
});
