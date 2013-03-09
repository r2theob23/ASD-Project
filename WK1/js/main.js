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
	});
function toggleControls (n) {
		switch(n){
			case "on":
				$('addAssignmentForm').style.display = "none";
				$('clearData').style.display = "inline";
				$('disData').style.display = "inline";
				$('addNew').style.display = "block";
				break;
			case "off":
				$('addAssignmentForm').style.display = "block";
				$('clearData').style.display = "inline";
				$('disData').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
};
	
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
}; 

//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	for(var n in json){
		var id = Math.floor(Math.random()*10000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
	} 
};

var getData = function(){
	toggleControls("on");
	if(localStorage.length === 0){
		alert("There is no data in Local Storage so example data was added.")
		autoFillData();
	}
	var makeDiv = document.createElement('div');	
	makeDiv.setAttribute("id", "items");
	var makeList = document.createElement('ul');
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	$('items').style.display = "display";
	for(var i=0, len=localStorage.length; i<len; i++){
		var makeli = document.createElement('li');
		var linksLi = document.createElement('li');
		makeList.appendChild(makeli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var makeSublist = document.createElement('ul');
		makeli.appendChild(makeSublist);
		getImage(obj.GorI[1], makeSublist);
		for(var n in obj){
			var makeSubli = document.createElement('li');
			makeSublist.appendChild(makeSubli);
			var optSubText = obj[n][0]+""+obj[n][1];
			makeSubli.innerHTML = optSubText;
			makeSublist.appendChild(linksLi);
		}
		makeItemLinks(localStorage.key(i), linksLi);
	}
}; 

var	deleteItem = function (){
	var ask = confirm("Are you sure you want to delete this assignment?")
	if(ask){
		localStorage.removeItem(this.key);
		alert('Assignment Deleted!!!!')
		window.location.reload();
	}else{
		alert("Assignment Was Not Deleted")
	}		
};
					
var clearLocal = function(){
	if(localStorage.length === 0){
		alert("There is no data to clear.")
	}else{
		localStorage.clear();
		alert("All assignments have been deleted!")
		window.location.reload();
		return false;
	}
};
