
 /// for id image 
function generateID() {
  var count = 0;
  return function () {
    return count++;
  };
}
var id = generateID();

//  each
function each(array, func) {
  for (var i = 0; i < array.length; i++) {
    func(array[i], i);
  }
}

// filter for remove and display 
function filter(array, predicate) {
  var acc = [];
  each(array, function (element, i) {
    if (predicate(element, i)) {
      acc.push(element);
    }
  });
  return acc;
}

//// for ajouter une image 

function picture(image, name, artist, description) {
  return {
    image: image,
    name: name,
    artist: artist,
    description: description,
    id: id(),
    date:  Date()
  };
}

//  creat class 

function MakePicture() {
  var obj = {}
  obj.list = []
  obj.addpicture = addpicture
  obj.removepicture = removepicture
  obj.sortByDate = sortByDate
  obj.displaybyArtist = displaybyArtist
  return obj;
}
  

/// methode for class 
// add pour ajouter image / remove for delete / sort mech nadham tsawre bel date d'ajoute / display pour la func search
var  addpicture= function (image, name, artist, description, ) {
    this.list.push(picture(image, name, artist, description, ));
  };
  
var removepicture = function (id) {
    this.list = this.list.filter(function (element) {
      return element.id !== id;
    });
  };
  
var sortByDate = function () {
    return this.list.sort(function (a, b) {
      return a.date.getTime() - b.date.getTime();
    });
  };
  
var displaybyArtist = function (artist) {
    return filter(this.list, function (element) {
      return element.artist === artist;
    });
  };



  /// add images 

var obj = MakePicture();
obj.addpicture("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Van-willem-vincent-gogh-die-kartoffelesser-03850.jpg/800px-Van-willem-vincent-gogh-die-kartoffelesser-03850.jpg",
   "The Potato Eaters", " Vincent van Gogh", " shows five peasants eating potatoes around a simple table. The painting uses dark tones to depict the harsh, humble lives of rural workers, emphasizing their dignity despite poverty.");
   
      obj.addpicture("https://upload.wikimedia.org/wikipedia/en/0/07/Matisse-Luxe.jpg",
       "Luxe, Calme et Volupté", "  Henri Matisse", " shows five peasants eating potatoes around a simple table. The painting uses dark tones to depict the harsh, humble lives of rural workers, emphasizing their dignity despite poverty.");
    
    
   
obj.addpicture("https://cdn.britannica.com/24/189624-050-F3C5BAA9/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg?w=1000",
  "Mona Lisa", "Leonardo da Vinci", "The Mona Lisa, painted by Leonardo da Vinci, is a renowned portrait featuring a woman with a mysterious smile. Created in the early 16th century, it's famous for its sophisticated technique and is displayed in the Louvre Museum.");
  
  obj.addpicture("./img/Van_Gogh_-_Starry_Night_-.jpg", 
  "Starry Night", "Vincent van Gogh", " Shows a vibrant night sky swirling over a tranquil village. Painted from his asylum room, it’s known for its bold colors and emotional intensity.");

obj.addpicture("https://cdn.britannica.com/75/115475-050-9F9B00CE/Self-portrait-drawing-Leonardo-da-Vinci-Royal-Library.jpg", "Self-Portrait",
  "Leonardo da Vinci", "The Persistence of Memory by Salvador Dalí depicts melting clocks in a surreal, dreamlike landscape, symbolizing the fluidity of time.");



  obj.addpicture("https://www.henrimatisse.org/assets/img/paintings/the-dessert-harmony-in-red.jpg", "Henri Matisse",
    " The Dessert ", "woman setting a table in a red room filled with intricate patterns. The bright, bold colors and simplified forms are characteristic of Matisse’s Fauvist style, emphasizing harmony and decorative beauty over realism.");
  
  
    obj.addpicture("./img/Salvador-Dali-Persistence-of-Memory.webp", "Persistence of Memory",
        "Salvador Dali ", "A self-portrait is an artwork created by an artist of themselves, reflecting their appearance and often their personality or emotions.");
      
     obj.addpicture("./img/Salvador-Dali-Museum-St.-Petersburg-Florida.jpg", "PetersburgF lorida",
          "Salvador Dali ", "The Salvador Dalí Museum in St. Petersburg, Florida, showcases the largest collection of Dalí's art outside Spain in a unique, futuristic building.");
        
          




          /// button add for user pour add a img // sort by 
          // prepend for add in the first  / add for add in the last elament 


$("body").append("<button id='showBut'>Add</button>");
$(".container").prepend("<button id='Sort'>Sort by Date</button>");

$('#inputs').hide();

var show = false;
$("#showBut").on('click', function () {
  show = !show; 
  $('#inputs').toggle(show); 
});

//  func  for display / ajouter / search img 

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
  $('#con1').empty()
  each(array, function (element) {
    displayone(element)
  });
}

displayAll(obj.list)

$("#btnn").on("click", function () {
  var image = $("#ipn1").val()
  var name = $("#ipn2").val()
  var artist = $("#ipn3").val()
  var description = $("#ipn4").val()
  var century = $("#ipn6").val()


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
//search
$("#search").on("click", function (event) {
  event.preventDefault();
  search();
});
// sort 
$("#Sort").on("click", function () {
  var sortedList = obj.sortByDate();
  $('#con1').empty();
  displayAll(sortedList);
});



/// chatbot  interface 
function createChatInterface() {
  $('#send-btn').on('click', function() {
      const userMessage = $('#user-input').val().trim();
      if (userMessage) {
          $('<div/>', {
              'class': 'bubbleleft',
              'text': userMessage
          }).appendTo('#chat-messages');

          $('<div/>', {
              'class': 'bubbleright',
              'text': 'I am a chatbot. How can I assist you?'
          }).appendTo('#chat-messages');

          $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);

          $('#user-input').val('');
      }
  });
}

createChatInterface();




$('#chat').on('click', function() {
  $('#chatbox').toggle(); // click hide click show 
});

$('#adminbutton').on('click', function() {
  $('#adminpanel').toggle();
});




/// condition panal admin 
$("#adminbutton").on('click', function () {
  var code = prompt("Enter admin code:");
  if (code === "0000") {
      $("#adminpanel").show();
  } else {
      alert("Invalid code.");
  }
});




/// admin add img
$("#addimage").on('click', function () {
  var image = $("#addimageurl").val();
  var name = $("#addimagename").val();
  var artist = $("#addimageartist").val();
  var description = $("#addimagedescription").val();
  obj.addpicture(image, name, artist, description);
  displayAll(obj.list);
  $("#adminpanel").hide(); 
});


// remove img with name 
$("#removeimage").on('click', function () {
  var name = $("#removeimagename").val();
  obj.list = obj.list.filter(function (picture) {
      return picture.name !== name;
  });
  displayAll(obj.list);
  $("#adminpanel").hide(); 
});



/// ipdate imge 
$("#updateimage").on('click', function () {
  var name = $("#updateimagename").val();
  var newImage = $("#updateimageurl").val();
  var newArtist = $("#updateimageartist").val();
  var newDesc = $("#updateimagedescription").val();

  each(obj.list, function (picture) {
      if (picture.name === name) {
          picture.image = newImage;
          picture.artist = newArtist;
          picture.description = newDesc;
      }
  });
  displayAll(obj.list);
  $("#adminpanel").hide(); 
});
