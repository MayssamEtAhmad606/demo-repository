function generateID() {
  var count = 0;
  return function () {
    return count++;
  };
}
var id = generateID();

// Function for iterating over arrays
function each(array, func) {
  for (var i = 0; i < array.length; i++) {
    func(array[i], i);
  }
}

// Function for filtering
function filter(array, predicate) {
  var acc = [];
  each(array, function (element, i) {
    if (predicate(element, i)) {
      acc.push(element);
    }
  });
  return acc;
}

function picture(image, name, artist, description, century) {
  return {
    image: image,
    name: name,
    artist: artist,
    description: description,
    century: century,
    id: id(),
    date: new Date()
  };
}

function MakePicture() {
  var obj = {};
  obj.list = [];
  
  obj.addpicture = function (image, name, artist, description, century) {
    this.list.push(picture(image, name, artist, description, century));
  };
  
  obj.removepicture = function (id) {
    this.list = this.list.filter(function (element) {
      return element.id !== id;
    });
  };
  
  obj.sortByDate = function () {
    return this.list.sort(function (a, b) {
      return a.date.getTime() - b.date.getTime();
    });
  };
  
  obj.displaybyArtist = function (artist) {
    return filter(this.list, function (element) {
      return element.artist === artist;
    });
  };

  return obj;
}

var obj = MakePicture();

obj.addpicture("https://cdn.britannica.com/24/189624-050-F3C5BAA9/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg?w=1000",
  "Mona Lisa", "Leonardo da Vinci", "The Mona Lisa, painted by Leonardo da Vinci, is a renowned portrait featuring a woman with a mysterious smile. Created in the early 16th century, it's famous for its sophisticated technique and is displayed in the Louvre Museum.", "Fifteenth");
obj.addpicture("https://cdn.britannica.com/75/115475-050-9F9B00CE/Self-portrait-drawing-Leonardo-da-Vinci-Royal-Library.jpg", "Self-Portrait",
  "Leonardo da Vinci", "A self-portrait is an artwork created by an artist of themselves, reflecting their appearance and often their personality or emotions.", "Seventeenth");
obj.addpicture("https://example.com/image3.jpg", "Picture 3", "Artist 3", "Description 3", "Eighteenth");
obj.addpicture("https://example.com/image4.jpg", "Picture 4", "Artist 4", "Description 4", "Nineteenth");
obj.addpicture("https://example.com/image5.jpg", "Picture 5", "Artist 5", "Description 5", "Twentieth");

console.log(obj);

$("body").append("<button id='showBut'>Add</button>");
$(".container").prepend("<button id='Sort'>Sort by Date</button>");

$('#inputs').hide();

var show = false;
$("#showBut").on('click', function () {
  show = !show;
  $('#inputs').toggle(show);
});

function displayone(obj) {
  $('#con1').append(`
    <div class="infoimg" id="${obj.id}">
      <img src="${obj.image}" alt="">
      <h2 class="nameart">${obj.artist}</h2>
      <h1 class="namepic">${obj.name}</h1>
      <p class="desc">${obj.description}</p>
    </div>`);
}

function displayAll(array) {
  $('#con1').empty();
  each(array, function (element) {
    displayone(element);
  });
}

displayAll(obj.list);

$("#btnn").on("click", function () {
  var image = $("#ipn1").val();
  var name = $("#ipn2").val();
  var artist = $("#ipn3").val();
  var description = $("#ipn4").val();
  var century = $("#ipn6").val();

  obj.addpicture(image, name, artist, description, century);
  $('#con1').empty();
  displayAll(obj.list);
});

function search() {
  var artist = $("input[type='text']").val(); 
  var filtered = obj.displaybyArtist(artist);
  $('#con1').empty();
  displayAll(filtered);
}

$("#search").on("click", function (event) {
  event.preventDefault();
  search();
});

$("#Sort").on("click", function () {
  var sortedList = obj.sortByDate();
  $('#con1').empty();
  displayAll(sortedList);
});
