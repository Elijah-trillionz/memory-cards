// developed with ❤️ by Elijah Trillionz.
// design inspired by Brad Traversy
// v1.0

const cardsContainer = document.querySelector(".display-card");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const clrBtn = document.getElementById("clr-btn");
const addBtn = document.getElementById("add-btn");
const display = document.querySelector(".card-question");
const displayPara = document.querySelector(".card-question > p");
const pagin = document.querySelector(".pagination > p");
const addContainer = document.querySelector(".add");
const questionInput = document.getElementById("quest");
const answerInput = document.getElementById("ans");
const submitBtn = document.getElementById("submit");

const data = [];

// open form modal
function openFormModal() {
  addContainer.classList.add("open");
}

// close form modal
function closeModal() {
  addContainer.classList.remove("open");
}

// declaring pagination numbers
let overAll = 0;

// add to index on click of the next button
let indexNo = 0;
function addToIndex() {
		if (data.length > 1) {
				if (indexNo+1 < data.length) {
    indexNo++;
   loopThroughData(true, false, data[indexNo]);
  } else {
  		indexNo = 0;
  		loopThroughData(true, false, data[indexNo]);
  }
		} else {
				console.log("Disabled")
		}
  pagin.innerText = `${indexNo+1}/${overAll}`;
}

// remove from index on click of the previous button
function removeFromIndex() {
  if (data.length > 1) {
   if (indexNo === 0) {
   		indexNo = data.length - 1;
   	loopThroughData(true, false, data[indexNo]);
   	} else {
   			indexNo--;
   			loopThroughData(true, false, data[indexNo]);
   	}
  } else {
    console.log("Cannot go back");
  }
  pagin.innerText = `${indexNo+1}/${overAll}`;
}

// submitting form
function submitForm() {
  if (questionInput.value === "" || answerInput.value === "") {
    alert("Fields are invalid");
  } else {
    closeModal();
    data.push({
      quest: questionInput.value,
      ans: answerInput.value,
      id: 1,
    });
    questionInput.value = "";
    answerInput.value = "";
    showAnswer(data[indexNo]);
    overAll = data.length
    pagin.innerText = `${indexNo+1}/${overAll}`;
    
    // save data
    saveData();
  }
}

// display answers
function showAnswer(dataIndex) {
  if (displayPara.innerText === dataIndex.quest + "?") {
    loopThroughData(false, true, dataIndex);
  } else {
    loopThroughData(true, false, dataIndex);
  }
}

// loop through array: data
function loopThroughData(quest, ans, dataIndex) {
  if (quest) {
    displayPara.innerText = `${dataIndex.quest}?`;
  } else {
    displayPara.innerText = `${dataIndex.ans}.`;
  }
}

// save questions and answers on local storage
function saveData() {
	localStorage.setItem("data", JSON.stringify(data));
}

//get saved data.
const savedData = JSON.parse(localStorage.getItem("data"));

if (savedData !== null) {
		savedData.forEach((value, index) => {
			data.push(value);
			loopThroughData(true, false, data[0]);
			overAll = data.length
    pagin.innerText = `${indexNo+1}/${overAll}`;
		});
}

// clear items from array
function clearItems() {
		// get current array that is displaying
		let itemIndex;
		data.forEach((value) => {
			switch (displayPara.innerText.substr(0, displayPara.innerText.length -1)) {
			case value.quest:
			   itemIndex = data.indexOf(value);
			   break;
		 case value.ans: 
		     itemIndex = data.indexOf(value);
		     break;		
		}
	});
	data.splice(itemIndex, 1);
	saveData();
	location.reload();
	//console.log(displayPara.innerText)
}

//localStorage.removeItem("data")


// event listeners
addBtn.addEventListener("click", openFormModal);

//event for submitting form
submitBtn.addEventListener("click", submitForm);

// flip over question to see answer
display.addEventListener("click", () => {
  showAnswer(data[indexNo]);
});

// next button event
nextBtn.addEventListener("click", addToIndex);

// previous button event listener
prevBtn.addEventListener("click", removeFromIndex);

// clear button event listener
clrBtn.addEventListener("click", clearItems)
