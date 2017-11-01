$(document).ready(function(){
	$("a#advanced_search").click(function(){
		$("#advanced_search_form").toggle();
	});

	
	$("#result_search_button").click(function(){
		var search = $("#result_search_input").val();
		// console.log(search);
		window.location.href = '/search?q='+search;
	  });
});

// $('nav a').on('click',function(e){
// 	e.preventDefault();
// 	var url = this.href;
// 	$('nav a.current').removeClass('current');
// 	$(this).addClass('current');

// 	$('#container').remove();
// 	$('#container').load(url + ' #container').fadeIn('slow');
// });

function show_report(p,c,t){
	$('#show_reports').empty();
	$('#show_reports').load('/search_database?province='+p+'&city='+c+'&type='+t);
}