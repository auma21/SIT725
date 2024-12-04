$(document).ready(function () {
  $(".collapsible").collapsible();
});

$(".dropdown-trigger").dropdown();

$(document).ready(function () {
  $(".modal").modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      ready: function() { alert('Ready'); }, // Callback for Modal open
      complete: function() { alert('Closed'); } // Callback for Modal close
  });
});

const clickMe = () => {
  alert("Thanks for clicking me. Hope you have a nice day!");
};

$(document).ready(function () {
  $("#clickMeButton").click(() => {
    clickMe();
  });
});

$(document).ready(function(){
  $('select').formSelect();
});
