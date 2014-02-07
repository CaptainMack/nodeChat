---------nodeChat---------

The application consists of following files:

index.html
/public/nodechat.css
/public/nodeClient.js
nodeServer.js

The following description is organized per file.


---------index.html-------

The index file consists of several div tags for styling and a form in which the user can type a message and a submit button for submitting the form. 

---------nodechat.css-------

The file consists purely of CSS for styling the webchat-application

---------nodeClient.js-------

The client-side script, nodeClient.js, handles retrieval and sending of messages through the use of two functions, one handling the sending of the form when the person hits the submit (Send!) button. The function sends the username (which is randomly generated on pageload) and the message. The other function handles the retrieval of new messages, this is invoked each 3 seconds. First time we retrieve messages from the server, we send an empty GET-request in order to get all messages. The data received is a JSON-array with messages containing user/message info. After all have been iterated through and appended to the chat, we saved the date of the newest message. Each 3 seconds the function is invoked and sends a new GET-request with the date and time of the last received message. The server-side is described in nodeServer.js.

---------nodeServer.js-------

When the server receives a POST-request with the username and message, it's saved to a mongodb database with the date, when the message was recieved, added to the JSON object. 
When the server receives an empty GET-request, it finds all messages from the database and sends it in an response. When the server receives a GET-request with a date, it finds all messages that is newer than the message last recieved by the client and returns any JSON object that it might find.