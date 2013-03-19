function (doc) {
	if (doc._id.substr(0, 6) ==="class:") {
		emit(doc._id, {
			"class": doc.classTitle[1],
			"assignment": doc.assignmentName[1]
		})
	}
};