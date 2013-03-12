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
	};
});//end storeData Function

function toggleControls (n) {
		switch(n){
			case "on":
				$('clearData').show();
				$('disData').show();
				$('addNew').show();
				break;
			case "off":
				$('clearData').show();
				$('disData').show();
				$('addNew').hide();
				$('items').hide();
				break;
			default:
				return false;
		}
};//End toggle

//display data function
function getData(){
	//toggleControls("on");
	if(localStorage.length === 0){
		alert("There is no data in Local Storage so example data was added.")
		autoFillData();
	}
	var makeDiv = $('<div>');	
	makeDiv.attr("id", "items");
	var makeList = $('<ul>');
	makeDiv.append(makeList);
	$('#data').append(makeDiv);
	$('#items').show();
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = $('<li>');
			var linksLi = $('<li>');
			makeList.append(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			
			var obj = JSON.parse(value);
			var makeSublist = $('<ul>');
			makeli.append(makeSublist);
			
			for(var n in obj){
				var makeSubli = $('<li>');
				makeSublist.append(makeSubli);
				var optSubText = obj[n][0]+""+obj[n][1];
				makeSubli.text(optSubText);
				makeSublist.append(linksLi);
		}
		makeItemLinks(localStorage.key(i), linksLi);
	}
};//End Display Data

function autoFillData(){
	//json.js info
	for(var n in json){
		var id = Math.floor(Math.random()*10000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
	}
};//End auto fill

//Create the edit and delete links for stored data when displayed
function makeItemLinks (key, linksLi) {
	//add edit single item link
	var editLink = $('<a>');
	editLink.href = "#";
	editLink.key = key;
	var editText = "Edit Assignment";
	editLink.on('click', editItem);
	editLink.text(editText);
	linksLi.append(editLink);
	//add line break
	var breakTag = $('<br>');
	linksLi.append(breakTag);
	//add delete single item link
	var deleteLink = ('<a>');
	deleteLink.href = '#';
	deleteLink.key = key;
	var deleteText = "Delete Assignment";
	deleteLink.on('click', deleteItem);
	deleteLink.text(deleteText);
	linksLi.append(deleteLink);
};//End Create Links

//Edit Item Function
function editItem () {
	//Grab the data from our item from local storage
	var value =localStorage.getItem(this.key);
	var item = JSON.parse(value);
	//show the form
	toggleControls('off');
	//populate the form fields with current localStorage values.
	$('#classTitle').value = item.classTittle[1];
	$('#assignmentName').value = item.assignmentName[1];
	$('#teacherEmail').value = item.teacherEmail[1];
	$('#selectMonth').value = item.selectMonth[1];
	$('#selectDay').value = item.selectDay[1];
	$('#selectYear').value = item.selectYear[1];
	$('#notes').value = item.notes[1];

	//Remove the intial listener from the input 'save' button
	save.remove('click', storeData);
	//change submit button to edit button
	$('submit').value = "Edit Assignment";
	var editSubmit = $('submit');
	//Save the key value established in this function as a property of the editSubmit event
	editSubmit.on('click', validate);
	editSubmit.key = this.key;
};//End edit data

//Delete Item Function
function deleteItem(){
	var ask = confirm("Are you sure you want to delete this assignment?")
	if(ask){
		localStorage.removeItem(this.key);
		alert('Assignment Deleted!!!!')
		window.location.reload();
	}else{
		alert("Assignment Was Not Deleted")
	}
};//End delete data

//clear data function
function clearLocal(){
	if(localStorage.length === 0){
		alert("There is no data to clear.")
	}else{
		localStorage.clear();
		alert("All assignments have been deleted!")
		window.location.reload();
		return false;
	}
};//End Clear data


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






