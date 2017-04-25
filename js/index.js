"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panel = ReactBootstrap.Panel,
    Accordion = ReactBootstrap.Accordion;
var Button = ReactBootstrap.Button,
    Input = ReactBootstrap.Input;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Modal = ReactBootstrap.Modal;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;

var books = typeof localStorage["bookstore"] != "undefined" ? JSON.parse(localStorage["bookstore"]) : [{ title: "Harry Potter and the Sorcerer's Stone", imageURL: "https://s-media-cache-ak0.pinimg.com/564x/92/c3/43/92c3438606c53f479a430ca456ea5e92.jpg", description: "Book 1 in the Harry Potter book series by J.K. Rowling", price: "10$" }, { title: "Harry Potter And The Chamber Of Secrets", imageURL: "https://s-media-cache-ak0.pinimg.com/564x/92/c3/43/92c3438606c53f479a430ca456ea5e92.jpg", description: "Book 2 in the Harry Potter book series by J.K. Rowling", price: "10$" }, { title: "Harry Potter and the Prisoner of Azkaban", imageURL: "https://s-media-cache-ak0.pinimg.com/564x/92/c3/43/92c3438606c53f479a430ca456ea5e92.jpg", description: "Book 3 in the Harry Potter book series by J.K. Rowling", price: "10$" }, { title: "Harry Potter And The Goblet Of Fire", imageURL: "https://s-media-cache-ak0.pinimg.com/564x/92/c3/43/92c3438606c53f479a430ca456ea5e92.jpg", description: "Book 4 in the Harry Potter book series by J.K. Rowling", price: "10$" }, { title: "Harry Potter And The Order Of The Phoenix", imageURL: "https://s-media-cache-ak0.pinimg.com/564x/92/c3/43/92c3438606c53f479a430ca456ea5e92.jpg", description: "Book 5 in the Harry Potter book series by J.K. Rowling", price: "10$" }, { title: "Harry Potter and the Half-Blood Prince ", imageURL: "https://s-media-cache-ak0.pinimg.com/564x/92/c3/43/92c3438606c53f479a430ca456ea5e92.jpg", description: "Book 6 in the Harry Potter book series by J.K. Rowling", price: "10$" }, { title: "Harry Potter and the Deathly Hallows", imageURL: "https://s-media-cache-ak0.pinimg.com/564x/92/c3/43/92c3438606c53f479a430ca456ea5e92.jpg", description: "Book 7 in the Harry Potter book series by J.K. Rowling", price: "10$" }],
    globalTitle = "",
    globalImageURL = "",
    globalDescription = "",
    globalPrice = ""; // Define global variables

// Bookstore class. This holds all books.

var Bookstore = function (_React$Component) {
    _inherits(Bookstore, _React$Component);

    function Bookstore() {
        _classCallCheck(this, Bookstore);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Bookstore.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                Accordion,
                null,
                this.props.data
            )
        );
    };

    return Bookstore;
}(React.Component);

// Book class. This is the display for a book in Bookstore

var Book = function (_React$Component2) {
    _inherits(Book, _React$Component2);

    function Book() {
        _classCallCheck(this, Book);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    Book.prototype.remove = function remove() {
        books.splice(this.props.index, 1);
        update();
    };

    Book.prototype.edit = function edit() {
        globalTitle = this.props.title;
        globalImageURL = this.props.imageURL;
        globalDescription = this.props.description;
        globalPrice = this.props.price;
        document.getElementById("show").click();
    };

    Book.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h4",
                { className: "text-center" },
                "Info"
            ),
            React.createElement("hr", null),
            React.createElement(Image, { imageURL: this.props.imageURL }),
            React.createElement(Description, { description: this.props.description }),
            React.createElement(Price, { price: this.props.price }),
            React.createElement(
                ButtonToolbar,
                null,
                React.createElement(
                    Button,
                    { "class": "delete", bsStyle: "danger", id: "btn-del" + this.props.index, onClick: this.remove.bind(this) },
                    "Delete"
                ),
                React.createElement(
                    Button,
                    { bsStyle: "warning", id: "btn-edit" + this.props.index, onClick: this.edit.bind(this) },
                    "Edit"
                )
            )
        );
    };

    return Book;
}(React.Component);

// This lists all info for a Book

function Image(props) {
    return React.createElement("img", { src: props.imageURL });
}

function Description(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h3",
            null,
            "About"
        ),
        React.createElement(
            "p",
            null,
            props.description
        )
    );
}

var Price = function Price(props) {
    return React.createElement(
        "p",
        null,
        "Price: ",
        props.price
    );
};

//'Add' button and modal

var AddBook = function (_React$Component3) {
    _inherits(AddBook, _React$Component3);

    function AddBook(props) {
        _classCallCheck(this, AddBook);

        var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

        _this3.state = { showModal: false };
        return _this3;
    }

    AddBook.prototype.close = function close() {
        globalTitle = "";
        globalImageURL = "";
        globalDescription = "";
        globalPrice = "";
        this.setState({ showModal: false });
    };

    AddBook.prototype.open = function open() {
        this.setState({ showModal: true });
        if (document.getElementById("title") && document.getElementById("info")) {
            $("#title").val(globalTitle);
            $("#imageURL").val(globalImageURL);
            $("#description").val(globalDescription);
            $("#price").val(globalPrice);
            if (globalTitle != "") {
                $("#modalTitle").text("Edit book info");
                $("#addButton").text("Edit book info");
            }
        } else requestAnimationFrame(this.open);
    };

    AddBook.prototype.add = function add() {
        var title = document.getElementById("title").value;
        var imageURL = document.getElementById("imageURL").value;
        var description = document.getElementById("description").value;
        var price = document.getElementById("price").value;
        var exists = false;
        for (var i = 0; i < books.length; i++) {
            if (books[i].title === title) {
                books[i].imageURL = imageURL;
                books[i].description = description;
                books[i].price = price;
                exists = true;
                break;
            }
        }
        if (!exists) {
            if (title.length < 1) title = "Untitled";
            books.push({ title: title, imageURL: document.getElementById("imageURL").value, description: document.getElementById("description").value, price: document.getElementById("price").value });
        }
        update();
        this.close();
    };

    AddBook.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                Button,
                {
                    bsStyle: "primary",
                    bsSize: "large",
                    onClick: this.open.bind(this),
                    id: "show"
                },
                "Add a new book"
            ),
            React.createElement(
                Modal,
                { show: this.state.showModal, onHide: this.close.bind(this) },
                React.createElement(
                    Modal.Header,
                    { closeButton: true },
                    React.createElement(
                        Modal.Title,
                        { id: "modalTitle" },
                        "Add a book"
                    )
                ),
                React.createElement(
                    Modal.Body,
                    null,
                    React.createElement(
                        "form",
                        null,
                        React.createElement(Input, { type: "text", label: "Book", placeholder: "Enter title", id: "title" }),
                        React.createElement(Input, { type: "text", label: "ImageURL", placeholder: "Enter image url", id: "imageURL" }),
                        React.createElement(Input, { type: "text", label: "Description", placeholder: "Enter description", id: "description" }),
                        React.createElement(Input, { type: "text", label: "Price", placeholder: "Enter price", id: "price" })
                    )
                ),
                React.createElement(
                    Modal.Footer,
                    null,
                    React.createElement(
                        Button,
                        { onClick: this.add.bind(this), bsStyle: "primary", id: "addButton" },
                        "Save changes"
                    ),
                    React.createElement(
                        Button,
                        { onClick: this.close.bind(this) },
                        "Close"
                    )
                )
            )
        );
    };

    return AddBook;
}(React.Component);

// Update function to display all the books

function update() {
    localStorage.setItem("bookstore", JSON.stringify(books));
    var rows = [];
    for (var i = 0; i < books.length; i++) {
        rows.push(React.createElement(
            Panel,
            { header: books[i].title, eventKey: i, bsStyle: "success" },
            React.createElement(Book, {
                title: books[i].title,
                imageURL: books[i].imageURL,
                description: books[i].description,
                price: books[i].price,
                index: i })
        ));
    }
    ReactDOM.render(React.createElement(Bookstore, { data: rows }), document.getElementById("app"));
};

ReactDOM.render(React.createElement(AddBook, null), document.getElementById("button"));
update();