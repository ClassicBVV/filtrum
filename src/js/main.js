import $ from 'jquery';
import "fullpage.js"

$(document).ready(function() {
  $('#fullpage').fullpage(
    {scrollBar: true}
  );

  $(".js-video-open").click(()=> {
    popups.video()
  })
});