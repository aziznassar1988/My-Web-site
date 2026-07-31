let add = document.querySelector(".add-note");
let pop = document.querySelector(".container-note");
let contNote = document.querySelector(".cont");
let title = document.getElementById("title");
let subject = document.getElementById("subject");
let addBtn = document.querySelector(".new-add");
let arrayNotes = JSON.parse(localStorage.getItem("notes")) || [];

// function getNote() {
//   arrayNotes = arrayNotes.filter((ele) => {
//     return ele.delete === false && ele.complete === false;
//   });
//   createNote(arrayNotes);
// }

// getNote();
add.addEventListener("click", () => {
  pop.classList.add("container-open");
  document.querySelector("#title").focus();
  addNote(title, subject);
  closePop();
});

// Function Close PopUp
function closePop() {
  let close = document.getElementById("close");
  close.addEventListener("click", () => {
    pop.classList.remove("container-open");
  });
}
// Add New Note When click Add Note Button
function addNote(tit, subj) {
  addBtn.addEventListener("click", () => {
    arrayOfNotes = JSON.parse(localStorage.getItem("notes")) || [];
    if (tit.value !== "" && subj.value !== "") {
      let note = {
        id: Date.now(),
        title: tit.value,
        subject: subj.value,
        delete: false,
        complete: false,
      };

      arrayOfNotes.push(note);
      localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
      tit.value = "";
      subj.value = "";
      pop.classList.remove("container-open");
      location.reload();
    }
  });
}

//Create Note
function createNote(arrayNotes) {
  arrayNotes.forEach((note) => {
    let showContant = document.querySelector(".show-notes");
    let divCont = document.createElement("div");
    divCont.className = "cont";
    let divHead = document.createElement("div");
    divHead.className = "header-note";
    divHead.innerHTML = `<span><i class="fa-solid fa-rectangle-xmark del" data-id="${note.id}"></i></span>
                        <h2 data-id="${note.id}">${note.title}</h2>
                        <span><i class="fa-solid fa-pen edit" data-id="${note.id}"></i></span>
                        <span class="complete"><i class="fa-solid fa-check comp" data-id="${note.id}"></i></span>`;
    let divSub = document.createElement("div");
    divSub.className = "sub-note";
    divSub.textContent = note.subject;
    divCont.appendChild(divHead);
    divCont.appendChild(divSub);
    showContant.appendChild(divCont);
  });
}

// Delete Note
let btnDel = document.querySelectorAll(".del");
btnDel.forEach((btn) => {
  btn.addEventListener("click", () => {
    let check = btn.getAttribute("data-id");
    for (let i = 0; i < arrayNotes.length; i++) {
      if (check == arrayNotes[i].id) {
        arrayNotes[i].delete = true;
        localStorage.setItem("notes", JSON.stringify(arrayNotes));
        let cont = btn.closest("div").parentElement;
        cont.style.display = "none";
      }
    }
  });
});

// Edit Note
let btnEdit = document.querySelectorAll(".edit");
btnEdit.forEach((btn) => {
  btn.addEventListener("click", () => {
    pop.classList.add("container-open");
    document.getElementById("title").focus();
    let headerEdit = btn.getAttribute("data-id");
    for (let i = 0; i < arrayNotes.length; i++) {
      if (headerEdit == arrayNotes[i].id) {
        title.value = arrayNotes[i].title;
        subject.value = arrayNotes[i].subject;
        addBtn.textContent = "Update";
        addBtn.addEventListener("click", () => {
          arrayNotes[i].title = title.value;
          arrayNotes[i].subject = subject.value;
          localStorage.setItem("notes", JSON.stringify(arrayNotes));
          pop.classList.remove("container-open");
          location.reload();
        });
        closePop();
      }
    }
  });
});

//Function Complete Note
let btnComp = document.querySelectorAll(".comp");
btnComp.forEach((com) => {
  com.addEventListener("click", () => {
    let complete = com.getAttribute("data-id");
    for (let i = 0; i < arrayNotes.length; i++) {
      if (complete == arrayNotes[i].id) {
        arrayNotes[i].complete = true;
        localStorage.setItem("notes", JSON.stringify(arrayNotes));
        location.reload();
      }
    }
  });
});

// change between Header Buttons
function showNotes() {
  let buttons = document.querySelectorAll(".todo-links a");
  document.querySelector(".show-notes").innerHTML = "";
  buttons.forEach((btn) => {
    if (btn.className == "del-note") {
      let array = arrayNotes.filter((note) => {
        return note.delete == true;
      });
    } else if (btn.classList.contains("new-note")) {
      arrayNotes = arrayNotes.map((note) => {
        return note.complete == false && note.delete == false;
      });
      // createNote(arrayNotes);
    } else if (btn.classList.contains("comp-note")) {
      arrayNotes = arrayNotes.map((note) => {
        return note.complete !== true;
      });
    } else {
      arrayNotes = arrayNotes.filter((note) => {
        return note.delete === false && note.complete === false;
      });
    }
  });
}
