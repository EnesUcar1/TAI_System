$(document).on("click", "#fur-name", function(e) {
  let ID = $(this).parent().parent().parent().data('rowId')
  let name = $(this).text();
  let cheese = $(this).parent().parent().children(':nth-child(3)').children(':nth-child(1)').text();
  let fraise = $(this).parent().parent().children(':nth-child(4)').children(':nth-child(1)').text();
  let priority = $(this).parent().parent().children(':nth-child(5)').children(':nth-child(1)').text();
  let link = $(this).parent().parent().parent().children(':nth-child(2)').children(':nth-child(1)').attr('src');
  let badgeLink = $(this).parent().parent().parent().children(':nth-child(2)').children(':nth-child(2)').attr('src');
  let bought = $(this).parent().parent().children(':nth-child(6)').text();
  let boughtType = $(this).parent().parent().children(':nth-child(7)').text();
  let purchasedDate = $(this).parent().parent().children(':nth-child(8)').text();

  $('#delete-fur-button').attr('onclick', 'window.location="/favourite-furs/delete-fur?ID=' + ID + '"');
  $('#edit-fur .modal-title').html("Edit Favourite Fur - " + name);
  $('#edit-fur input[name="ID"]').val(ID);
  $('#edit-fur input[name="Link"]').val(link);
  $('#edit-fur input[name="BadgeLink"]').val(badgeLink);
  $('#edit-fur input[name="Name"]').val(name);
  $('#edit-fur input[name="Cheese"]').val(cheese);
  $('#edit-fur input[name="Fraise"]').val(fraise);
  $('#edit-fur select[name="Priority"]').val(priority);
  $('#edit-fur select[name="Bought"]').val(bought);
  $('#edit-fur select[name="BoughtType"]').val(boughtType);
  $('#edit-fur input[name="PurchasedDate"]').val(purchasedDate);
});
