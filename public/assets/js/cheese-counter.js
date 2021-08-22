$("#br").hide();

$('#useAllUsers').on('change', function(){ // on change of state
   if(this.checked) // if changed state is "CHECKED"
    {
      $("#counterUsers").hide();
      $("#br").show();

    } else {
      $("#counterUsers").show();
      $("#br").hide();
    }
});

$(document).on("click", ".icon-edit-counter", function(e) {
  let ID = $(this).parent().parent().data('rowId')
  let name = $(this).parent().parent().parent().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(1)').text();
  let startingDate = $(this).parent().parent().parent().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(2)').text().replace('(', '').replace(')', '');
  let startingMarketCheese = $(this).parent().parent().parent().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(3)').text()
  let marketCheese = $(this).parent().parent().parent().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(4)').text()
  let spentCheese = $(this).parent().parent().parent().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(5)').text()
  let targetCheese = $(this).parent().parent().parent().children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(6)').text()

  $('#edit-counter .modal-title').html("Edit Cheese Counter - " + name)
  $('#edit-counter input[name="Name"]').val(name)
  $('#edit-counter input[name="StartingDate"]').val(startingDate)
  $('#edit-counter input[name="StartingMarketCheese"]').val(startingMarketCheese)
  $('#edit-counter input[name="MarketCheese"]').val(marketCheese)
  $('#edit-counter input[name="SpentCheese"]').val(spentCheese)
  $('#edit-counter input[name="TargetCheese"]').val(targetCheese)
  $('#counterID-edit').val(ID);
});
