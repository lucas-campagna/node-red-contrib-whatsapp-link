# Whatsapp Link :iphone:

Simple node for connecting Node-Red to Whatsapp :iphone:

Currently in developing mode, Continous updated may encounter. :sweat_smile:

## To Connect with Whatsapp 
1. Deploy any whatsapp node along with whatsappLink node.
2. look in Console/ Bash/ terminal.
3. whatsappLink node will initilize, connect with whatsapp and generate a QR code it terminal.
4. Scan the QR code with your Whatsapp Mobile App (Go to settings > Linked device > Scan & Connect).
5. Done - Whatsapp Connected.

 *It will create a Whatsapp Web instance in your machine and store your session locally in Node-RED.*


## Nodes
1. **Whatsapp Admin** : Node used for basic status of whatsapp.
    

    | Inputs | Description           |
    |--------|--------------         |
    | test   | Checks the current status of whatsapp and output the same in `msg.payload`|
    | destroy| Close the client and destroy the whatsapp connection.|
    | restart | Restart the whatsapp connection. |
    | logout | Simply log you out and close the session. |
    ---
    
    
    | Output | Description |
    |--------| ------------|
    |`status` | provide status on `msg.payload` for all and each input mentioned in above table. |
    | Connecting..| When whatsapp attempting to connect.
    | QR Code (image) | when QR code is generated. *This method can also be used to get QR Code (image) generated by whatsapp.*
    | Connected | When whatapp is sucessfully connected.|
    

2. **Whatsapp In** : Node to recive all messages send to connected number.
    -  Simply deploy the node and wait for green (connected) status.
    -  After succesfully connection, Node is able to recive all messages.
    - Messages can be read at `msg.payload` and `msg.body`.
    - Sender number can be read at `msg.from`.
    - Please look complete `{msg}` to get all details about recived message.

    
*Try to send `!nodered` to connected whatsapp number and get a `Hi` in reply from Node-Red.*

3. **Whatsapp Out** : As simple as mention on name, node will send `msg.payload` recived at input to the number mentioned in node.

     *Don't forget to mention international dialing code befor your number. Number must be in format like `+11 99999 99999` without any space.* 

## Future Nodes
Currently working on more Whatsapp Node and will be avilable soon -

1. Group Message Node.
2. Chat Reply node.
3. Instruction (smart) Reply Node.

Complete detail for Nodes will also be updated as soon as possible. 

>Please don`t try to spam with your personal Number, Suspicious activities might be tracked by whatsapp. 

Thanks to bear with me 
