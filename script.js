document.addEventListener("DOMContentLoaded", function () {
  console.log("load");
  if (checkBrowser()) {
    loadDataFromStorage();
  }
  console.log("bookData");
  console.log(bookData);
  prosessingUpdate();

  const submitForm = document.getElementById("formAddBook");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("grab");
    addBook();
  });
});

let bookData = [];
const BOOKS_KEY = "BOOKS_DATA";
function addBook() {
  const id = generateId();
  const bookTitle = document.getElementById("bookTitle").value;
  const bookWriter = document.getElementById("bookWriter").value;
  const bookYear = document.getElementById("bookYear").value;
  const bookFinish = document.getElementById("bookFinish").checked;

  const book = bookObject(id, bookTitle, bookWriter, bookYear, bookFinish);
  bookData.push(book);
  saveData();
  prosessingUpdate();
}

function generateId() {
  return +new Date();
}

function bookObject(id, bookTitle, bookWriter, bookYear, bookFinish) {
  return { id, bookTitle, bookWriter, bookYear, bookFinish };
}

function displayBook(bookData) {
  const container = document.createElement("div");
  container.classList.add("container-component");
  container.setAttribute("id", `book-${bookData.id}`);

  const containerBook = document.createElement("div");
  containerBook.classList.add("book");
  container.append(containerBook);

  const thumnail = document.createElement("div");
  thumnail.classList.add("img-book");
  const img = document.createElement("img");
  img.src = "book_2132343.png";
  thumnail.append(img);
  containerBook.append(thumnail);

  const isiBook = document.createElement("div");
  isiBook.classList.add("meta-book");
  containerBook.append(isiBook);

  const bookTitle = document.createElement("h4");
  bookTitle.innerText = bookData.bookTitle;
  const bookWriter = document.createElement("p");
  bookWriter.innerText = bookData.bookWriter;
  const bookYear = document.createElement("p");
  bookYear.innerText = bookData.bookYear;
  isiBook.append(bookTitle, bookWriter, bookYear);

  const btnBookContainer = document.createElement("div");
  btnBookContainer.classList.add("button-book");
  const btnBookComplete = document.createElement("button");
  btnBookComplete.classList.add("btn-book-selesai");
  const btnBookUncomplete = document.createElement("button");
  btnBookUncomplete.classList.add("btn-book-blmselesai");
  const btnBookDelete = document.createElement("button");
  btnBookDelete.classList.add("btn-book-hapus");

  const uncompleteBook = document.querySelector(".progressBook");
  const completeBook = document.querySelector(".finishBook");

  if (bookData.bookFinish) {
    btnBookContainer.append(btnBookUncomplete, btnBookDelete);
    container.append(btnBookContainer);
    completeBook.append(container);

    btnBookDelete.addEventListener("click", function () {
      console.log(bookData.id);
    });
  } else {
    btnBookContainer.append(btnBookComplete, btnBookDelete);
    container.append(btnBookContainer);
    uncompleteBook.append(container);

    btnBookDelete.addEventListener("click", function () {
      console.log(bookData.id);
    });
  }
}

function empty() {
  const uncompleteBook = document.querySelector(".progressBook");
  const completeBook = document.querySelector(".finishBook");
  uncompleteBook.innerHTML = "";
  completeBook.innerHTML = "";
}

function prosessingUpdate() {
  empty();
  for (const book of bookData) {
    displayBook(book);
  }
}

function checkBrowser() {
  if (typeof Storage === "undefined") {
    alert("Browsermu tidak mendukung local storage!");
    return false;
  }
  return true;
}

function saveData() {
  if (checkBrowser()) {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(bookData));
  }
}

function loadDataFromStorage() {
  if (checkBrowser()) {
    let data = localStorage.getItem(BOOKS_KEY, JSON.stringify(bookData));
    data = JSON.parse(data);
    if (data !== null) {
      for (const grabBook of data) {
        bookData.push(grabBook);
      }
    }
  }
}
