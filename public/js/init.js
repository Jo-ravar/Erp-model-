(function($){
  $(function(){

    $('.button-collapse').sideNav();

  });
  $(document).ready(function() {
    $('select').material_select();
  });
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
  $('.chips-initial').material_chip({
    data: [{
      tag: 'English',
    }, {
      tag: 'Physics',
    }, {
      tag: 'Maths',
    }],
  });
   // end of document ready
})(jQuery); // end of jQuery name space