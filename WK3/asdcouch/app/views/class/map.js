function (doc) {
	if (doc._id.substr(0, 6) ==="class:") {
		emit(doc._id.substr(6), {
			"class": doc.classTitle[1],
			"assignment": doc.assignmentName[1],
			"instructor email": doc.teacherEmail[1],
			"due date": doc.dudate[1],
			"notes": doc.notes[1]		
			})
	}
};