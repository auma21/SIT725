$(document).ready(function () {


  $("select").formSelect();

  $("#clickMeButton").click(() => {
    clickMe();
  });

  $(".dropdown-trigger").dropdown();

  $(".modal").modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: 0.5, // Opacity of modal background
    in_duration: 300, // Transition in duration
    out_duration: 200, // Transition out duration
    ready: function () {
      alert("Ready");
    }, // Callback for Modal open
    complete: function () {
      alert("Closed");
    }, // Callback for Modal close
  });

  $(".collapsible").collapsible();

  const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!");
  };
});
