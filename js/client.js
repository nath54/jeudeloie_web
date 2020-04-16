
//SOME FUNCTIONS 

function message_to_chat(msg){
    var ediv=document.getElementById("chat_receive");
    var ep=document.createElement("p");
    ep.innerHTML=msg;
    ediv.appendChild(p);
}



//WEB SOCKET 

var ws = new WebSocket("ws://localhost:8100");

ws.onopen = function (event) {
    ws.send('{ "type":"text", "content":"Browser ready."}' ); 
};

ws.onmessage=function(event) { 
    var message = JSON.parse(event.data);
    switch(message.type) {
        case "text":
            message_to_chat(message.content);
            break;
        case "données partie":
            
            break;
    }
};





