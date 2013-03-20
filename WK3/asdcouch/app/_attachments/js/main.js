$('#testData').on('pageinit', function() {
	$.ajax({
		"url": "_view/class",
		"dataType": "json",
		"success": function(data) {
			$.each(data.rows, function(index, class){
				var class = class.value.classTitle;
				var assignment = class.value.assignmentName;
				var email = class.value.teacherEmail;
				var dueDate = class.value.duedate;
				var note = class.value.notes;
				$("#classlist").append(
					$('<li>').append(
						$('<a>').attr('href', '#')
							.text(class)
					)
				);
			});
		} 
	});	
});