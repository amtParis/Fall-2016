//DRAWING
var canvas  = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");
var image = document.getElementById("andy");
var offsetX;
var text = "Poutine prism raclette, cray gochujang quinoa pork belly bicycle rights vape hoodie microdosing knausgaard. Irony next level cold-pressed kickstarter tumeric air plant, trust fund heirloom yuccie hot chicken. Franzen affogato scenester godard. 8-bit next level pok pok, fingerstache cold-pressed affogato four loko humblebrag truffaut crucifix VHS. Aesthetic try-hard dreamcatcher food truck poke, hoodie 8-bit. Lomo vegan meggings dreamcatcher, vinyl bushwick cold-pressed bicycle rights PBR&B literally lumbersexual jianbing YOLO cred normcore. Meditation try-hard occupy, letterpress readymade YOLO lumbersexual. Slow-carb gastropub art party cornhole, polaroid typewriter etsy church-key cardigan raw denim cronut hashtag tumeric marfa. Blog beard hella, tattooed mixtape marfa pabst distillery poutine vegan live-edge. Kitsch etsy meh, activated charcoal lo-fi pitchfork jianbing pop-up lomo. Raw denim lo-fi tilde heirloom kitsch, marfa kombucha ugh portland you probably haven't heard of them tumblr umami paleo. Humblebrag marfa ramps enamel pin, lomo beard health goth swag fanny pack plaid blue bottle. Fap tote bag dreamcatcher, coloring book occupy edison bulb quinoa etsy mlkshk echo park twee salvia. Umami stumptown aesthetic keytar franzen, slow-carb blue bottle glossier af affogato. Letterpress seitan photo booth pinterest etsy, green juice yr poke DIY trust fund. Direct trade synth artisan, flexitarian williamsburg offal small batch. Knausgaard viral tousled, sartorial master cleanse iceland DIY brooklyn kinfolk 8-bit meh. Semiotics brooklyn waistcoat, chartreuse chillwave trust fund selvage yuccie fanny pack retro quinoa twee synth authentic shabby chic. Venmo small batch kogi fixie, umami blue bottle af man braid fap yr. Brunch fixie thundercats meh aesthetic ethical. Slow-carb tilde neutra fanny pack, green juice meditation iPhone dreamcatcher. Pabst man bun synth hashtag fixie raclette. Hashtag hella shabby chic, venmo mixtape vice ugh normcore tote bag fashion axe edison bulb +1 kombucha readymade beard. Tousled semiotics migas, gochujang mlkshk jianbing heirloom hammock plaid street art echo park DIY lyft cold-pressed. Offal sustainable authentic, kogi woke gochujang dreamcatcher iceland health goth drinking vinegar polaroid. Vaporware freegan photo booth pork belly kale chips. Listicle trust fund distillery sartorial, 90's direct trade bicycle rights farm-to-table banh mi thundercats cornhole leggings jianbing. Gochujang sriracha narwhal freegan, listicle subway tile pickled leggings art party succulents synth 3 wolf moon portland.";
var letterIndex;
function setup(){

  offsetX = window.innerWidth/2 - (image.width *2)/2;

  draw();
}

function draw(){
  ctx.drawImage(image,0,0);
  var data = ctx.getImageData(0,0,image.width,image.height).data;
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  letterIndex = 0;
  for(var j = 0;j<image.height;j+=8){
    for(var i = 0;i<image.width;i+=6){
      var index = 4 * (j*image.width + i);
      var r = data[index];
      var g = data[index+1];
      var b = data[index+2];
      var a = data[index+3];
      var grey = Math.round(r*0.3 + g*0.59 + b*0.11);
      if(grey>50){
        var radius = Math.round((grey/255)*20) + Math.random();
        ctx.fillStyle = "rgba("+r+","+g+","+b+",1)";
        ctx.font = radius +"px brownbold";
        ctx.fillText(text[letterIndex],offsetX+i*2,j*2);

        if(letterIndex>=text.length-1){
          letterIndex = 0;
        }else{
          letterIndex++;
        }
      }

    }
  }


  requestAnimationFrame(draw);
}


setTimeout(setup,1000); // to make sure image is available
