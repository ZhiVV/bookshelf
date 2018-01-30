window.onload = init;

var bookApp = {};

function init() {

    bookApp.bookArray = localStorage.getItem("bookArray"); 
    bookApp.bookArray = JSON.parse(bookApp.bookArray); 
    if (bookApp.bookArray === null) {
        bookApp.bookArray = [];

        bookApp.bookArray.push({
            cover: 'http://ozon-st.cdn.ngenix.net/multimedia/c300/1016530876.jpg',
            author: "Ник Морган",
            year: 2016,
            name: "JavaScript для детей. Самоучитель по программированию",
        });

        bookApp.bookArray.push({
        cover: 'http://ozon-st.cdn.ngenix.net/multimedia/c300/1019449784.jpg',
        author: "Алексей Васильев",
        year: 2017,
        name: "JavaScript в примерах и задачах",
        });

        localStorage.setItem("bookArray", JSON.stringify(bookApp.bookArray));
    }
    
    bookApp.bookList = function () {
        if (bookApp.bookArray.length == 0) {
        var text = document.getElementById("list");
        text.innerHTML = "К сожалению Ваш список книг пустой";
        } else {
        var addText = '<table border="1"><caption><h2>Список ваших книг</h2></caption>';
        for (var i = 0; i < bookApp.bookArray.length; i++) {
            addText = addText + '<tr><td rowspan="3"><img src="' 
                            + bookApp.bookArray[i].cover 
                            + '" alt="Обложка книги" width="189" height="255" onError="this.src=\'http://ikso.org/uploaded/tik/bisert/images/no_foto.jpg\'"></td><td class="headerBook">' 
                            + bookApp.bookArray[i].name 
                            + '</td><td></td></tr><tr><td>Автор: ' 
                            + bookApp.bookArray[i].author 
                            + '</td><td align="right"><button  class="allBtn" onClick="bookApp.btnEdit(' + i 
                            + ')">Редактировать</button><br><br><button  class="allBtn" onclick="bookApp.btnDel(' + i 
                            + ')">Удалить</button></td></tr><tr><td>Год издания: ' 
                            + bookApp.bookArray[i].year + '</td><td></td></tr>';
            }
            addText = addText + '</table>';
            var text = document.getElementById("list");
            text.innerHTML = addText;
        }
    }

    bookApp.bookList();
    
    var modal = document.getElementById('addEditModal');
        
    bookApp.btnEdit = function (bookNumber) {
        var j = bookNumber;
        modal.style.display = "block"; 
        var text = document.getElementById("modalHeader");
        text.innerHTML = "Редактирование книги";   
        input = document.getElementById('modalBookName');
        modalBookName.value = bookApp.bookArray[j].name;
        input = document.getElementById('modalBookAuthor');
        modalBookAuthor.value = bookApp.bookArray[j].author;
        input = document.getElementById('modalBookYear');
        modalBookYear.value = bookApp.bookArray[j].year;
        input = document.getElementById('modalBookCover');
        modalBookCover.value = bookApp.bookArray[j].cover;
        bookApp.stateEdit = j;        
    }   

    bookApp.btnDel = function(bookNumber) {
        var j = bookNumber;
        var confDel = confirm("Вы точно хотите удалить книгу - " + bookApp.bookArray[j].name + "?");
        if (confDel) {
            bookApp.bookArray.splice(j, 1)
            localStorage.setItem("bookArray", JSON.stringify(bookApp.bookArray));
            bookApp.bookList();
        }        
    }
    
    btnAdd.onclick = function() {
        modal.style.display = "block";
        bookApp.stateEdit = "newbook";        
    }
    
    btnSave.onclick = function() {
        var newName = document.getElementById('modalBookName').value;
        var newAuthor = document.getElementById('modalBookAuthor').value;
        var newYear = document.getElementById('modalBookYear').value;
        var newCover = document.getElementById('modalBookCover').value;
        if (newYear > 2018 || newYear < 1) {
            newYear = 2018;
        }
        if (bookApp.stateEdit == "newbook") {
            bookApp.bookArray.push({
            name: newName,
            author: newAuthor,
            year: newYear,
            cover: newCover
            });
        } else {
            bookApp.bookArray[bookApp.stateEdit] = {
                name: newName,
                author: newAuthor,
                year: newYear,
                cover: newCover
                };
        }
        localStorage.setItem("bookArray", JSON.stringify(bookApp.bookArray));
        bookApp.bookList();
        btnClose.onclick();
        bookApp.stateEdit = "empty state";
    }
    
    btnClose.onclick = function() {
        modal.style.display = "none";
        input = document.getElementById('modalBookName');
        modalBookName.value = '';
        input = document.getElementById('modalBookAuthor');
        modalBookAuthor.value = '';
        input = document.getElementById('modalBookYear');
        modalBookYear.value = '';
        input = document.getElementById('modalBookCover');
        modalBookCover.value = '';
    }
}


