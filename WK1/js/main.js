//Robert Smith
//ASD 1303
//main.js

var changePage = function(pageId){
	$.mobile.changePage($('#'+ pageId),{transition:"fade"});
};//End change page function

$('#home').on('pageinit', function(){
	//code needed for home page goes here

});//End home page

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



//Start storeData function	
var storeData = function(data, key){
	if(!data){
		var id = Math.floor(Math.random()*10000001);
	}else{
		id = key;
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
	};
});//end storeData Function

//display data function
$('#disData').on("click", function getData(){
	
	if(localStorage.length === 0){
		alert("There is no data in Local Storage so example data was added.")
		autoFillData();
	}
	
	$('#data').html('<div id="items"></div>');
		for(var i=0, len=localStorage.length; i<len; i++){
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);

			var obj = JSON.parse(value);
			var makeSublist = $('<ul>');
			$('#items').append(makeSublist);

			for(var n in obj){
			var makeSubli = $('<li>');
			makeSublist.append(makeSubli);
			var optSubText = obj[n][0]+" "+obj[n][1];
			makeSubli.html(optSubText);
		}
		
	}

	$('<p>').html($('<a>').attr({'href': '#','onclick': 'editItem(' + key + ');'}).html('Edit Assignment')).appendTo("#items");
	$('<p>').html($('<a>').attr({'href': '#', 'onclick': 'deleteItem(' + key + ');'}).html('Delete Assignment')).appendTo("#items");		
		

});//End Display Data

function autoFillData(){
	//json.js info
	for(var n in json){
		var id = Math.floor(Math.random()*10000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
	}
};//End auto fill

$('#clearData').on("click", function clearLocal(){
	if(localStorage.length === 0){
		alert("There is no data to clear.")
	}else{
		localStorage.clear();
		alert("All assignments have been deleted!")
		window.location.reload();
		return false;
	}
});//End Clear data

//Edit Item Function
function editItem () {
	//Grab the data from our item from local storage
	var value =localStorage.getItem(this.key);
	var item = JSON.parse(value);
	//show the form
	toggleControls('off');
	//populate the form fields with current localStorage values.
	$('clname').value = item.clname[1];
	$('asname').value = item.asname[1];
	$('dudate').value = item.dudate[1];
	$('InsName').value = item.InsName[1];
	$('email').value = item.email[1];
	$('notes').value = item.notes[1];

	//Remove the intial listener from the input 'save' button
	save.removeEventListener('click', storeData);
	//change submit button to edit button
	$('submit').value = "Edit Assignment";
	var editSubmit = $('submit');
	//SAve the key value established in this function as a property of the editSubmit event
	editSubmit.addEventListener('click', validate);
	editSubmit.key = this.key;
};

//delete single item
function deleteItem(){
	var ask = confirm("Are you sure you want to delete this assignment?")
	if(ask){
		localStorage.removeItem(this.key);
		alert('Assignment Deleted!!!!')
		window.location.reload();
	}else{
		alert("Assignment Was Not Deleted")
	}
};//End delete single item


//Ajax

$('#testData').on('pageinit', function(){

//XML
	$('#xmlData').on('click', function(){
		$('#projectData').empty();
		$('#ajaxDiv').empty();
		$('<h2>').html("XML Test Data").appendTo('#ajaxDiv');		
			$.ajax({
				url: 'xhr/xml.xml',
				type: 'GET',
				dataType: 'xml',
				success: function(xml){
					$(xml).find('user').each(function(){
						var id = $(this).attr('id');
						var GorI =	$(this).find('GorI').text();
						var clname 	  =	$(this).find('clname').text();
						var asname     =	$(this).find('asname').text();
						var email   	  =	$(this).find('email').text();
						var prior	  =	$(this).find('prior').text();
						var month  	  =	$(this).find('month').text();
						var day	  =	$(this).find('day').text();
						var year 	  =	$(this).find('year').text();
						var notes 	  =	$(this).find('notes').text();
						$('<div class="userInput" id="user_'+ id +'"></div>')
							.html(+'<p>'+"Class Name: "+ clname +'</p>'+
								  '<p>'+"Assignment Name: "+ asname +'</p>'+
								  '<p>'+"Instructor Email: "+ email +'</p>'+
								  '<p>'+"Day: "+ day +'</p>'+
								  '<p>'+"Month "+ month +'</p>'+
								  '<p>'+"Year : "+ year +'</p>'+
								  '<p>'+"Notes "+ notes +'</p>'
								 ).appendTo('#ajaxDiv');	
					});
					console.log("XML works");
					console.log(xml);
					}
				});
			return false;
	});		
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
										'<p>'+'Class Name : '+ blue[0]+'</p>'+
										'<p>'+'Assignment Name : '+ blue[1]+'</p>'+
										'<p>'+'Instructor Email : '+ blue[2]+'</p>'+
										'<p>'+'Month : '+ blue[3]+'</p>'+
										'<p>'+'Day : '+ blue[4]+'</p>'+
										'<p>'+'Year : '+ blue[5]+'</p>'+
										'<p>'+'Notes : '+ blue[6]+'</p>'+
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

//End
//var makeDiv = $('<div>');	
//	makeDiv.attr("id", "items");
//	var makeList = $('<ul>');
//	makeDiv.append(makeList);
//	$('#data').append(makeDiv);
//	$('#items').show();


			//$('#items').append('<li>' + "Class Name: " + optSubText + '</li>');
			//$('#items').append('<li>' + "Assignment Name: " + optSubText + '</li>');
			//$('#items').append('<li>' + "Instructor E-mail: " + optSubText + '</li>');
			//$('#items').append('<li>' + "Month: " + optSubText + '</li>');
			//$('#items').append('<li>' + "Day: " + optSubText + '</li>');
			//$('#items').append('<li>' + "Year: " + optSubText + '</li>');
			//$('#items').append('<li>' + "Notes: " + optSubText + '</li>');





