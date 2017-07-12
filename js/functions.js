function ResetCourseAdd() {

	document.getElementById("btnReset").style.visibility = 'hidden';
	document.getElementById("newCourseName").style.visibility = 'hidden';
	document.getElementById("newCourseCode").style.visibility = 'hidden';
	document.getElementById("btnAddCourse").style.visibility = 'visible';
	document.getElementById("btnSubmitCourse").style.visibility = 'hidden';
}


function addCourse() {

	document.getElementById("btnReset").style.visibility = 'visible';
	document.getElementById("newCourseName").style.visibility = 'visible';
	document.getElementById("newCourseCode").style.visibility = 'visible';
	document.getElementById("btnAddCourse").style.visibility = 'hidden';
	document.getElementById("btnSubmitCourse").style.visibility = 'visible';

}

function changePass()
{
	window.location.replace("changePass.php");
}

function addSubmit(id) {

	var name = document.getElementById("newCourseName").value;
	var code = document.getElementById("newCourseCode").value;

	$.post("ajax.php", {
		addCourseName : name,
		code : code,
		userid : id
	}).done(function(data) {
		window.location.replace ('courses.php') ;
	});

}

function updateCourse(id) {

	document.getElementById(id + "edit").style.visibility = 'hidden';
	document.getElementById(id + "delete").style.visibility = 'hidden';
	document.getElementById(id + "change").style.visibility = 'visible';

	var courseName = document.getElementById(id + "courseName").lastChild.innerHTML;
	document.getElementById(id + "courseName").innerHTML = "<input type='text' style='width:80px;' id=" + id + "editName" + " />";
	document.getElementById(id + "editName").value = courseName;

	var courseCode = document.getElementById(id + "courseCode").innerHTML;
	document.getElementById(id + "courseCode").innerHTML = "<input type='text' style='width:80px;' id=" + id + "editCode" + " />";
	document.getElementById(id + "editCode").value = courseCode;
}

function updateSubmitCourse(id) {

	document.getElementById(id + "edit").style.visibility = 'visible';
	document.getElementById(id + "delete").style.visibility = 'visible';
	document.getElementById(id + "change").style.visibility = 'hidden';

	var courseName = document.getElementById(id + "editName").value;
	document.getElementById(id + "courseName").innerHTML = "<a href=\"chapters.php?id=" + id + "\">" + courseName + "</a>";
	var courseCode = document.getElementById(id + "editCode").value;
	document.getElementById(id + "courseCode").innerHTML = courseCode;

	$.post("ajax.php", {
		editCourseId : id,
		name : courseName,
		code : courseCode
	});
}

function deleteCourse(id) {

	var courseName = document.getElementById(id + "courseName").lastChild.textContent;
	var r = confirm("Are you sure you want to delete " + courseName + "?");
	if (r == true) {

		$.post("ajax.php", {
			deleteCourseId : id
		}).done(function(data) {
			window.location.replace("courses.php");
		});

	}

}

function addChapter(courseId, lastChapterNum) {

	var nextChapterNum = lastChapterNum + 1;
	$.post("ajax.php", {
		addChapterCourseId : courseId,
		ChapterNum : nextChapterNum
	}).done(function(data) {
		window.location.replace("chapters.php?id=" + courseId);
	});

}

function updateChapter(chapterId, chapterNum, courseId, direction) {
	$.post("ajax.php", {
			updateChapterId : chapterId,
			chapterNum : chapterNum,
			courseId : courseId,
			direction : direction
		}).done(function(data) {
			//alert(data);
			window.location.replace("chapters.php?id=" + courseId);
		});

}

function deleteChapter(id, courseId) {

	var div = document.getElementById(id + "chapterNum");
	var chapterNum = div.getElementsByTagName('a')[0].innerHTML;
	var r = confirm("Are you sure you want to delete " + chapterNum + "?");
	if (r == true) {

		$.post("ajax.php", {
			deleteChapterId : id
		}).done(function(data) {
			window.location.replace("chapters.php?id=" + courseId);
		});

	}

}

function typeChange(id) {

	var div = document.createElement("div");
	div.style.width = "100px";
	div.style.height = "100px";
	div.style.background = "red";
	div.style.color = "white";
	div.style.position = "absolute";
	div.style.top = "20%";
	div.style.left = "40%";

	document.body.appendChild(div);

}

function changeAvailable(id, available, chapterId) {

	if (available == 1) {
		available = 0;
	} else {
		available = 1;
	}
	$.post("ajax.php", {
		changeAvailableId : id,
		available : available
	}).done(function(data) {

		window.location.replace("questions.php?id=" + chapterId);

	});

}

function addQuestion(courseId, lastChapterNum) {

	var nextChapterNum = lastChapterNum + 1;
	$.post("ajax.php", {
		addChapterCourseId : courseId,
		ChapterNum : nextChapterNum
	}).done(function(data) {
		window.location.replace("chapters.php?id=" + courseId);
	});

}

function updateQuestion(id, number) {

	document.getElementById(id + "edit").style.visibility = 'hidden';
	document.getElementById(id + "delete").style.visibility = 'hidden';
	document.getElementById(id + "change").style.visibility = 'visible';

	var chapterNum = number
	document.getElementById(id + "chapterNum").innerHTML = "<input type='text' style='width:80px;' id=" + id + "editChapterNum" + " value=" + chapterNum + " />";
}

function updateSubmitQuestion(id, courseId) {

	document.getElementById(id + "edit").style.visibility = 'visible';
	document.getElementById(id + "delete").style.visibility = 'visible';
	document.getElementById(id + "change").style.visibility = 'hidden';

	var chapterNum = document.getElementById(id + "editChapterNum").value;
	document.getElementById(id + "chapterNum").innerHTML = "Chapter " + chapterNum;

	if (isNaN(chapterNum) || chapterNum == null || chapterNum == 0) {

		alert("What you entered is not valid!");
		window.location.replace("chapters.php?id=" + courseId);

	} else {

		$.post("ajax.php", {
			editChapterId : id,
			ChapterNum : chapterNum,
			CourseId : courseId
		}).done(function(data) {
			window.location.replace("chapters.php?id=" + courseId);
		});

	}

}

function deleteQuestion(quesId, chapterId, orderNum) {

	var r = confirm("Are you sure you want to delete Question ID: " + quesId + "?");
	if (r == true) {

		$.post("ajax.php", {
			deleteQuestionId : quesId,
			orderNum : orderNum,
			chapterId : chapterId
		}).done(function(data) {
			window.location.replace("questions.php?id=" + chapterId);
		});

	}

}

function decOrderNum(id, orderNum, chapterId) {
	checkNum = orderNum - 1;
	if (checkNum != 0) {
		//check db if a record has orderNum = checkNum
		$.post("ajax.php", {
			oldOrderNum : orderNum,
			newOrderNum : checkNum,
			chapterId : chapterId
		}).done(function(data) {
			window.location.replace("questions.php?id=" + chapterId);
		});
	}
}

function incOrderNum(id, orderNum, chapterId) {
	checkNum = orderNum + 1;
	//check db if a record has orderNum = checkNum
	$.post("ajax.php", {
		oldOrderNum : orderNum,
		newOrderNum : checkNum,
		chapterId : chapterId
	}).done(function(data) {
		//alert(data)
		window.location.replace("questions.php?id=" + chapterId);
	});
}

function setQuestionType(type) {

	//delete the rows if they are already there
	var test = document.getElementById("answerRow");
	while (test) {
		test.parentNode.removeChild(test);
		var test = document.getElementById("answerRow")
	}

	//get the table
	var table = document.getElementById("hor-minimalist-a");
	if (type == "MC") {
		for ( i = 0; i < 4; i++) {
			//insert row and two cells
			var row = table.insertRow(4 + i);
			row.id = "answerRow";
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = "Answer " + (i + 1);
			cell2.innerHTML = "<input type='text' id='mcQuestionAnswer" + i + "' /> Correct <input type='radio' id='mcCorrectAnswer" + i + "' name='correctAnswer' />";
		}
	} else {
		//insert row and two cells
		var row = table.insertRow(4);
		row.id = "answerRow";
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		cell1.innerHTML = "Answer ";
		cell2.innerHTML = "<input type='text' id='textQuestionAnswer' />";

	}
}

function editQuestionInfo(type, questionText, correctAnswer, choiceArray) {
	setQuestionType(type);
	document.getElementById("questionText").value = questionText;
	if (type == "MC") {
		document.getElementById("questionTypeMC").checked = "checked";
		for (var i = 0; i < 4; i++) {
			document.getElementById("mcQuestionAnswer" + i).value = choiceArray[i];
			if (correctAnswer == choiceArray[i]) {
				document.getElementById("mcCorrectAnswer" + i).checked = "checked";
			}
		}
	} else {
		document.getElementById("questionTypeText").checked = "checked";
		document.getElementById("textQuestionAnswer").value = correctAnswer;
	}
}

function addEditQuestion(quesId, chapterId, orderNum, edit) {
	var type;
	var question;
	var correctAnswer;
	var choices;
	var filename;
	var difficulty;
	var errorMessages = new Array();
	
	//get the difficulty
	var e = document.getElementById("difficulty");
	difficulty = e.options[e.selectedIndex].text;
	
	//get the file name
	filename = document.getElementById("picture").value;

	if (filename) {
		var lastIndex = filename.lastIndexOf("\\");
		if (lastIndex >= 0) {
			filename = filename.substring(lastIndex + 1);
		}
	} else {
		if (!edit) {
			//errorMessages.push("No image was selected");
			filename = null;
		}

	}

	//test if there is question text
	question = document.getElementById("questionText").value;
	if (!question) {
		errorMessages.push("No question text was entered")
	}

	//see if multiple choice is checked
	if (document.getElementById('questionTypeMC').checked) {

		//get question text and answer
		type = "MC"
		choices = [document.getElementById('mcQuestionAnswer0').value, document.getElementById('mcQuestionAnswer1').value, document.getElementById('mcQuestionAnswer2').value, document.getElementById('mcQuestionAnswer3').value];
		if (edit) {
			choiceIDs = [document.getElementById('choiceid0').value, document.getElementById('choiceid1').value, document.getElementById('choiceid2').value, document.getElementById('choiceid3').value];
		}
		var isSelected = false
		for ( i = 0; i < 4; i++) {
			if (document.getElementById('mcCorrectAnswer' + i).checked) {
				correctAnswer = document.getElementById('mcQuestionAnswer' + i).value
				isSelected = true
			}
			if (!document.getElementById('mcQuestionAnswer' + i).value) {
				errorMessages.push("Answer #" + (i + 1) + " is not filled out")
			}
		}
		if (!isSelected) {
			errorMessages.push("No correct answer was selected")
		}
		//see if text is checked
	} else if (document.getElementById('questionTypeText').checked) {

		//get question text and answer
		type = "Text"
		correctAnswer = document.getElementById("textQuestionAnswer").value

		if (!correctAnswer) {
			errorMessages.push("No answer was filled out")
		}
	} else {
		errorMessages.push("No question type was selected")
	}

	//see if there is data in error messages
	if ( typeof errorMessages !== 'undefined' && errorMessages.length > 0) {

		var error = ""
		for ( i = 0; i < errorMessages.length; i++) {
			error = error.concat(errorMessages[i] + "<br />")
		}
		document.getElementById("error").innerHTML = error
	} else {
		document.getElementById("error").innerHTML = ""
		if (type == "Text") {
			if (!edit) {
				document.body.style.cursor = "wait";
				document.getElementById("uploading").innerHTML = "Uploading file please wait..."
				var fd = new FormData(document.getElementById("fileinfo"));
					$.ajax({
						url : "uploadFile.php",
						type : "POST",
						data : fd,
						processData : false, // tell jQuery not to process the data
						contentType : false // tell jQuery not to set contentType
					}).done(function(data) {
						if(data){
						
						
							$.post("ajax.php", {
							addQuestionChapterId : chapterId,
							type : type,
							filename : filename,
							question : question,
							correctAnswer : correctAnswer,
							orderNum : orderNum, 
							difficulty : difficulty
						}).done(function(data) {
							window.location.replace("questions.php?id=" + chapterId);
						});
						
							
						
							
						
						} else {
							alert("No image was selected!"); //error uploading file
							//document.body.style.cursor = "";
							//document.getElementById("uploading").innerHTML = ""
							$.post("ajax.php", {
							addQuestionChapterId : chapterId,
							type : type,
							//filename : null,
							question : question,
							correctAnswer : correctAnswer,
							orderNum : orderNum, 
							difficulty : difficulty
						}).done(function(data) {
							window.location.replace("questions.php?id=" + chapterId);
						});
						}
					});
			} else {
				if (!filename) {
					filename = document.getElementById("urlLink").innerHTML;
					$.post("ajax.php", {
					editQuesIdText : quesId,
					chapterId : chapterId,
					type : type,
					questionText : question,
					correctAnswer : correctAnswer,
					picURL : filename, 
					difficulty : difficulty
				}).done(function(data) {
					window.location.replace("questions.php?id=" + chapterId);
				});
				}
				
				if(filename){
					document.body.style.cursor = "wait";
					document.getElementById("uploading").innerHTML = "Uploading file please wait..."
					var fd = new FormData(document.getElementById("fileinfo"));
					$.ajax({
						url : "uploadFile.php",
						type : "POST",
						data : fd,
						processData : false, // tell jQuery not to process the data
						contentType : false // tell jQuery not to set contentType
					}).done(function(data) {
						if(data){
							$.post("ajax.php", {
							editQuesIdText : quesId,
							chapterId : chapterId,
							type : type,
							questionText : question,
							correctAnswer : correctAnswer,
							picURL : filename, 
							difficulty : difficulty
						}).done(function(data) {
							window.location.replace("questions.php?id=" + chapterId);
						});
							
						} else {
							document.body.style.cursor = "";
							document.getElementById("uploading").innerHTML = ""
							alert("Error uploading file!");
						}
					});
				}
			}

		} else if (type == "MC") {
			if (!edit) {
				document.body.style.cursor = "wait";
				document.getElementById("uploading").innerHTML = "Uploading file please wait..."
				var fd = new FormData(document.getElementById("fileinfo"));
					$.ajax({
						url : "uploadFile.php",
						type : "POST",
						data : fd,
						processData : false, // tell jQuery not to process the data
						contentType : false // tell jQuery not to set contentType
					}).done(function(data) {
						if(data){
							$.post("ajax.php", {
							addQuestionChapterId : chapterId,
							type : type,
							filename : filename,
							question : question,
							correctAnswer : correctAnswer,
							orderNum : orderNum,
							choices : choices, 
							difficulty : difficulty
						}).done(function(data) {
							window.location.replace("questions.php?id=" + chapterId);
						});
							
						} else {
							//alert("Error uploading file!");
							//document.body.style.cursor = "";
							//document.getElementById("uploading").innerHTML = ""
							//new
							alert("No image was selected!");
							
							$.post("ajax.php", {
							addQuestionChapterId : chapterId,
							type : type,
							//filename : filename,
							question : question,
							correctAnswer : correctAnswer,
							orderNum : orderNum,
							choices : choices, 
							difficulty : difficulty
						}).done(function(data) {
							window.location.replace("questions.php?id=" + chapterId);
						});
							//end new
						}
					});
			} else {
				if (!filename) {
					filename = document.getElementById("urlLink").innerHTML;
						$.post("ajax.php", {
						editQuesIdMC : quesId,
						chapterId : chapterId,
						type : type,
						questionText : question,
						correctAnswer : correctAnswer,
						picURL : filename,
						choices : choices,
						choiceIDs : choiceIDs, 
						difficulty : difficulty
					}).done(function(data) {
						window.location.replace("questions.php?id=" + chapterId);
					});
				}
				if(filename){
					document.body.style.cursor = "wait";
					document.getElementById("uploading").innerHTML = "Uploading file please wait..."
					var fd = new FormData(document.getElementById("fileinfo"));
					$.ajax({
						url : "uploadFile.php",
						type : "POST",
						data : fd,
						processData : false, // tell jQuery not to process the data
						contentType : false // tell jQuery not to set contentType
					}).done(function(data) {
						if(data){
							$.post("ajax.php", {
							editQuesIdMC : quesId,
							chapterId : chapterId,
							type : type,
							questionText : question,
							correctAnswer : correctAnswer,
							picURL : filename,
							choices : choices,
							choiceIDs : choiceIDs, 
							difficulty : difficulty
						}).done(function(data) {
							window.location.replace("questions.php?id=" + chapterId);
						});
						} else {
							alert("Error uploading file!");
							document.body.style.cursor = "";
				document.getElementById("uploading").innerHTML = ""
						}
					});
				}
				
			}

		}

	}

}