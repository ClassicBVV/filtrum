import $ from 'jquery';
import "fullpage.js"

$(document).ready(function() {
  const contraindications = localStorage.getItem('contraindications');
  if (contraindications == 1) {
    $(".js-contraindications-block").addClass("is-hidden");
  }
  $('#fullpage').fullpage(
    {scrollBar: true}
  );

  $(".js-video-open").click(()=> {
    popups.video()
  });

  $(".js-menu-btn").click(()=> {
    $(".js-header").toggleClass("is-open");
  });

  $(".js-contraindications-hidden-btn").click(()=> {
    $(".js-contraindications-block").addClass("is-hidden");
    localStorage.setItem('contraindications', 1);
  });

  $(".js-main").addClass("is-loaded");
});