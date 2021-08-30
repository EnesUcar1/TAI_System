$(document).ready(function() {

});

$('#useSomeUsers-edit').on('change', function() {
  if (this.checked) {
    $("#useAllUsers-edit").prop('checked', false);
    $("#counterUsers-edit").show();
  } else {
    $("#counterUsers-edit").hide();
  }
});


$('#useAllUsers-edit').on('change', function() {
  if (this.checked) {
    $("#useSomeUsers-edit").prop('checked', false);
    $("#counterUsers-edit").hide();
  } else {
  }
});

$('#closeCheeseCounter-edit').on('change', function() {
  if (this.checked) {
    $("#EndDate-edit").show();
  } else {
    $("#EndDate-edit").hide();
  }
});

$(document).on("click", ".icon-edit-counter", function(e) {
  if ($("#closeCheeseCounter-edit").checked) {
    $("#EndDate-edit").show();
  } else {
    $("#EndDate-edit").hide();
  }

  if ($("#useSomeUsers-edit").checked) {
    $("#counterUsers-edit").show();
  } else {
    $("#counterUsers-edit").hide();
  }

  let ID = $(this).parent().parent().data('rowId')
  let name = $(this).parent().parent().parent().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(1)').text();
  let startingDate = $(this).parent().parent().parent().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(2)').text().replace('(', '').replace(')', '');
  let startingMarketCheese = $(this).parent().parent().parent().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(3)').text()
  let marketCheese = $(this).parent().parent().parent().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(4)').text()
  let spentCheese = $(this).parent().parent().parent().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(5)').text()
  let targetCheese = $(this).parent().parent().parent().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(6)').text()

  let isCheckedSomeoneUsers = $(this).parent().parent().parent().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(15)').text()
  let isCheckedUseSideUsers = $(this).parent().parent().parent().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(16)').text()
  let isCounterEnded = $(this).parent().parent().parent().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(17)').text()

  $('#useSomeUsers-edit').prop("checked", (isCheckedSomeoneUsers == 'true'));
  $('#useAllUsers-edit').prop("checked", (isCheckedUseSideUsers == 'true'));
  $('#closeCheeseCounter-edit').prop("checked", (isCounterEnded == 'true'));

  $('#edit-counter .modal-title').html("Edit Cheese Counter - " + name)
  $('#edit-counter input[name="Name"]').val(name)
  $('#edit-counter input[name="StartingDate"]').val(startingDate)
  $('#edit-counter input[name="StartingMarketCheese"]').val(startingMarketCheese)
  $('#edit-counter input[name="MarketCheese"]').val(marketCheese)
  $('#edit-counter input[name="SpentCheese"]').val(spentCheese)
  $('#edit-counter input[name="TargetCheese"]').val(targetCheese)
  $('#counterID-edit').val(ID);
});
