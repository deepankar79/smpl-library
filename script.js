"use strict";
let el, li, li2, li3, li4, ul, brdr, sts, delBtn;

const bookList = document.querySelector(".books-list");
const booksDiv = document.querySelector(".books");
const bTitle = document.getElementById("bname");
const bAuthor = document.getElementById("aname");
const bPages = document.getElementById("pages");
const eform = document.getElementById("form");

const Book = function (title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.status}`;
  };
};

let library = [];
const Book1 = new Book("Harry Potter", "J.K.Rowling", 533, "Read");
const Book2 = new Book("Lord of the Rings", "Tolkein", 999, "Unread");
const Book3 = new Book(
  "A song of Ice and Fire",
  "George R.R. Martin",
  1452,
  "Unread"
);
library.push(Book1);
library.push(Book2);
library.push(Book3);

const addNewBook = function (title, author, pages) {
  let nbook;
  if (title === "" || author === "" || pages === "") {
    alert("Fill all fields");
    return;
  }
  bTitle.value = "";
  bAuthor.value = "";
  bPages.value = "";
  eform.style.display = "none";
  nbook = new Book(title, author, pages, "Unread");
  library.push(nbook);
  insertbook(nbook);
};

const insertbook = function (book) {
  li = document.createElement("li");
  li2 = document.createElement("li");
  li3 = document.createElement("li");
  li4 = document.createElement("li");
  ul = document.createElement("ul");
  brdr = document.createElement("div");
  sts = document.createElement("button");
  sts.innerText = book.status;
  delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  ul.classList.add("books-List");
  booksDiv.append(ul);
  li.innerHTML = book.title;
  ul.append(li);
  li2.innerHTML = book.author;
  ul.append(li2);
  ul.append(li3);
  li3.append(sts);
  ul.append(li4);
  li4.append(delBtn);
  brdr.classList.add("border-line");
  booksDiv.append(brdr);
};

const display = function () {
  library.forEach((book) => insertbook(book));
};
display();

const bookstatus = function (auth) {
  library.forEach((book) => {
    if (book.author === auth) {
      if (book.status === "Unread") book.status = "Read";
      else book.status = "Unread";
    }
  });
};
const buttons = document.querySelectorAll("button");

let btninput, bstatus;
buttons.forEach((button) =>
  button.addEventListener("click", function (e) {
    btninput = e.target.innerText;
    if (btninput === "Delete") {
      e.target.parentElement.parentElement.remove();
    } else if (btninput === "Submit") {
      e.preventDefault();
      addNewBook(bTitle.value, bAuthor.value, bPages.value);
    } else if (btninput === "Unread" || btninput === "Read") {
      bookstatus(e.target.parentElement.previousSibling.innerText);
      if (e.target.innerText === "Unread") e.target.innerText = "Read";
      else e.target.innerText = "Unread";
    } else if (btninput === "Add Book") {
      eform.style.display = "block";
    }
  })
);
