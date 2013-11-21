var username;
var httpRequest;
var lastMessagesRecievedDate;
function generateGuestUsername()	{
	username = "Guest"+Math.floor((Math.random()*100000)+1);
}

function submitHandler(event)	{
	var xhr = new XMLHttpRequest();
	var data = new FormData();
	data.append('username', username);
	data.append('message', document.getElementById('messageInput').value);
	xhr.open('POST', '/send', true);
	xhr.onload = function () {
		getMessages();
		document.getElementById('messageInput').value = '';
	};
	xhr.send(data);
}

function getMessages(event)	{
	var xhr = new XMLHttpRequest();
	var data = new FormData();
	var url = '/messages?date=' + lastMessagesRecievedDate;
	xhr.open('GET', url, true);
	xhr.onload = function () {
	    // do something to response
	    var messagesArray = JSON.parse(this.responseText);
		var messagesDiv = document.getElementById("nodeChat-messages");
		var messagesContainer = document.getElementById("nodeChat-container");
	    for(var i = 0; i < messagesArray.length; i++) {
	        var tempObj = messagesArray[i];
	        var new_message = document.createElement('div');
		    new_message.className = "nodeChat-message";
		    new_message.innerHTML = "<b>" + tempObj.user + ": </b>" + tempObj.message;
		    messagesDiv.appendChild(new_message);
		    lastMessagesRecievedDate = tempObj.date;
	    }
	};
	xhr.send();
}

window.onload = function () {
	generateGuestUsername();
	var submitButton = document.getElementById("messageSubmit");
	submitButton.addEventListener('click', submitHandler);
	window.setInterval(getMessages, 3000);
};