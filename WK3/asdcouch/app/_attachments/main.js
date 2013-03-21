$('#testData').on('pageinit', function(){
	$.ajax({
		"url": "_view/class",
		"dataType": "json",
		"success": function(data){
			$.each(data.rows, function(index, project){
				var classTitle = project.value.class;
				var assignmentName = project.value.assignment;
				$('#classlist').append(
						$('<li>').append(
							$('<a id="listitem">').attr('href', '#')
								.text(classTitle)
						)
					);
			});
			$('#classlist').listview('refresh');
		}
	})
})
	
