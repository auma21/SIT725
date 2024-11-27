$(document).ready(function () {
  $(".collapsible").collapsible();
});

$(".dropdown-trigger").dropdown();

$(document).ready(function () {
  $(".modal").modal();
});

const clickMe = () => {
  alert("Thanks for clicking me. Hope you have a nice day!");
};

$(document).ready(function () {
  $("#clickMeButton").click(() => {
    clickMe();
  });
});
