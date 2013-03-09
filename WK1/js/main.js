//Robert Smith
//ASD 1303
//main.js

$('#testData').on('pageinit', function(){

	//CSV
	$('#csvData').on('click', function(){
		$('#projectData').empty();
		$('#ajaxDiv').empty();
		$('<h2>').html("CSV Test Data").appendTo('#ajaxDiv');	
			$.ajax({
				url: 'xhr/csv.csv',
				type: 'GET',
				dataType: 'text',
				success: function(csv){
					var project = csv.split('\n');
					for (var i=1, j=project.length; i<j; i++){
						var red = project[i];
						var blue = red.split(',');
						$(''+'<div class="Data">'+
										'<p>'+'Class Name : '+ blue[1]+'</p>'+
										'<p>'+'Assignment Name : '+ blue[2]+'</p>'+
										'<p>'+'Instructor Email : '+ blue[3]+'</p>'+
										'<p>'+'Month : '+ blue[5]+'</p>'+
										'<p>'+'Day : '+ blue[6]+'</p>'+
										'<p>'+'Year : '+ blue[7]+'</p>'+
										'<p>'+'Notes : '+ blue[8]+'</p>'+
										'</div>'
										).appendTo('#ajaxDiv');
					}	
					console.log("CSV works!");
					console.log(csv);
					}
				});
			return false;
		});

});

var changePage = function(pageId){
	$.mobile.changePage($('#'+ pageId),{transition:"fade"});
};//End change page function

$('#home').on('pageinit', function(){
	//code needed for home page goes here
});

$('#addData').on('pageinit', function(){

		var myForm = $('#addAssignmentForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});//end validation

	
	var storeData = function(data){
	if(!data){
		var id = Math.floor(Math.random()*10000001);
	}else{
		id = data;
	}
		var item 					= {};
		item.classTitle 			= ["Class Name: ", $('#classTitle').val()];
		item.assignmentName 		= ["Assignment Name: ", $('#assignmentName').val()];
		item.teacherEmail 			= ["Instructor E-mail: ", $('#teacherEmail').val()];
		item.selectMonth 			= ["Month: ", $('#selectMonth').val()];
		item.selectDay				= ["Day: ", $('#selectDay').val()];
		item.selectYear				= ["Year: ", $('#selectYear').val()];
		item.notes					= ["Notes: ", $('#notes').val()];

	localStorage.setItem(id, JSON.stringify(item));
	alert("Assignment Added!");
	console.log(data);
	changePage("viewData");
	};//end storeData Function
});





















