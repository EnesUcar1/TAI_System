$("#br").hide();

$('#useAllUsers').on('change', function(){ // on change of state
   if(this.checked) // if changed state is "CHECKED"
    {
      $("#counterAccounts").hide();
      $("#br").show();

    } else {
      $("#counterAccounts").show();
      $("#br").hide();
    }
})
