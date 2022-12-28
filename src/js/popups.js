import $ from 'jquery'
import MagnificPopup from 'magnific-popup';


$(document).ready(function () {
  var popups = {
    video: function () {
      jQuery.magnificPopup.open({
        items: {
          src: '.js-video-popup'
        },
        closeOnBgClick: false,
        closeOnContentClick: false,
        showCloseBtn: false,
        type: 'inline'
      });
    },
  }
  window.popups = popups;

  $('.js-close-mfp').click(function () {
    $.magnificPopup.close();
  });
});