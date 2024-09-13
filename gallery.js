
       function getBotResponse(input) {

        var réponses = {
          hello: "hi there! How can I help you?",
          how_are_you: "i'm just a bot, i hope that i  am functioning as expected!",
          what_isyour_name: "i am a chatbot created to assist you!",
          whats_the_most_rated_pic_in_this_gallery :"monalisa"
        }
    
        input = input.toLowerCase()
        
   var keys= Object.keys(réponses)
  
    for (let i = 0; i < keys.length; i++) {
      const element = keys[i]
      var x =element.split('_')
      x = x.join(' ')
      console.log(x);
      
    
if (input === x){
          var y =element.split(' ')
          y.join('_') 
          console.log(y);
          
       
  
        
       }} return réponses[y]}


       $('#send-btn').on('click',function() {
        let userInput = $('#user-input').val()
       console.log(userInput);
       let x = getBotResponse(userInput)
       console.log(x , "fokaad");
       
       $("body").append(` <div class="bubbleleft"> ${userInput} </div>
    
    <div class="bubbleright"> ${x}  </div>`)
      
    
       
      
        })
      