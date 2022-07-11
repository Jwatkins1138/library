const myLibrary = [];
      var deleted = 0;
      var modal = document.getElementById("modal");
      var collection = document.getElementById("count");

      function showModal() {
        modal.classList.toggle('show');
      }

      
      function updateCount() {
        collection.innerHTML = "books: " + (myLibrary.length - deleted);
      }

      updateCount();

      function Book(title, author, pages, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.erase = function () {
          index = myLibrary.indexOf(this);
          deleted += 1;
          updateCount();
          let spine = document.getElementById(index);
          spine.remove();
        }
        this.toggleRead = function () {
          if (this.read == false) {
            this.read = true;
          } else {
            this.read = false;
          }
        }
        this.info = function () {
          console.log(this.title);
          console.log(this.author);
          console.log(this.read);
        }
      }

      function formChanged() {
        title = document.getElementsByName('title')[0].value;
        author = document.getElementsByName('author')[0].value;
        pages = document.getElementsByName('pages')[0].value;
      }

      function addBook() {
        var book = new Book(title, author, pages);
        myLibrary.push(book);
        drawNew();
      }


      function Card(book) {
        this.book = book;
        this.div = document.createElement('div');
        this.text = document.createElement('div');
        this.footer = document.createElement('div');
        this.footer.classList.add('footer');
        this.readBtn = document.createElement('input');
        this.deleteBtn = document.createElement('input');
        this.readBtn.type = 'button';
        this.readBtn.value = 'toggle read';
        this.deleteBtn.type = 'button';
        this.deleteBtn.value = 'remove book';
        this.readBtn.addEventListener('click', book.toggleRead.bind(book), false);
        this.deleteBtn.addEventListener('click', book.erase.bind(book), false);
        this.showCard = function () {
          this.div.classList.toggle('show');
          this.div.appendChild(this.text);
          this.div.appendChild(this.footer);
          this.footer.appendChild(this.readBtn);
          this.footer.appendChild(this.deleteBtn);
          this.text.innerHTML = "<p> Title: " + this.book.title + "</br>" +
            "Author: " + this.book.author + "</br>" +
            "Read: " + this.book.read + "</br>" +
            "Pages: " + this.book.pages + "</p>";
        }
      }

      // this is just a test function
      function libInfo() {
        myLibrary.forEach(book => {
          console.log(book);
          book.info();
        })
      }

      function drawNew() {
        let index = myLibrary.length - 1;
        let book = myLibrary[index];
        const shelves = document.getElementById('shelves');
        let spine = document.createElement('div');
        spine.id = index;
        spine.classList.add('spine');
        let styleRoll = Math.random();
        if (styleRoll < .33) {
          spine.classList.add('first-style');
        } else if (styleRoll < .66) {
          spine.classList.add('second-style');
        } else {
          spine.classList.add('third-style');
        }
        let top = document.createElement('div');
        top.classList.add('top');
        let card = new Card(book);
        card.div.classList.add('modal');
        let bottom = document.createElement('div');
        bottom.classList.add('bottom');
        spine.appendChild(top);
        spine.appendChild(card.div);
        spine.addEventListener('click', card.showCard.bind(card), false);
        spine.appendChild(bottom);
        top.innerHTML = book.title;
        bottom.innerHTML = book.author;
        shelves.appendChild(spine);
      }

      // not implemented
      function eraseLib() {
        document.querySelectorAll('.spine').forEach(item => {
          item.remove();
        })
      }