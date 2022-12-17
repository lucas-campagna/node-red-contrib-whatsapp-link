module.exports = function(RED) {
    const QRCode = require('qrcode');
     
    function WhatsappAdmin(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var whatsappLinkNode = RED.nodes.getNode(config.whatsappLink);
        node.waClient = whatsappLinkNode.client;
        node.WARestart = whatsappLinkNode.WARestart;
        node.WAConnect = whatsappLinkNode.WAConnect;
            
        function SetStatus(WAStatus, color){
            node.status({fill:color,shape:"dot",text:WAStatus});
            msg = {payload : WAStatus};
            node.send(msg);    
        };
                
        // Commands recived for Whatsapp Admin.
        this.on('input', async function(msg, send){
            if (msg.payload === "destroy") {
                await node.waClient.destroy();
                SetStatus("Disconnected","red");
            } 
            else if (msg.payload==="logout") {
                await node.waClient.logout();
                SetStatus("Logged Out","red");
            }
            else if (msg.payload === "state"){
                msg.payload = await node.waClient.getState();
                node.send(msg);
            }           
            else if (msg.payload === "restart"){
                node.WARestart();
                SetStatus("Connecting...", "yellow");
            };        
        });

        //Group Add/leave status-----
        node.waClient.on('group_join', async (notification)=>{
            msg.chat = await notification.getChat();
            msg.payload = msg.chat.name;
            msg.chatID = msg.chat.id.user || `No ID Avilable`;
            msg.type = notification.type;
            msg.notification = notification;
            node.send(msg);
            notification.reply('!Node-Red joined');
        });

        node.waClient.on('group_leave', async (notification)=>{
            msg.chat = await notification.getChat();
            msg.payload = msg.chat.name;
            msg.type = notification.type;
            msg.notification = notification;
            node.send(msg);
        });

        node.waClient.on('group_update', (msg)=>{
            node.send(msg);
        });

        
        //whatsapp Status Parameters----
        node.waClient.on('qr', (qr) => {
            SetStatus("QR Code Generated", "yellow");
            QRCode.toDataURL(qr, function(err, url){
                msg = {payload : url};
                node.send(msg);
            });
        });
        
        node.waClient.on('auth_failure', () => {
            SetStatus('Not Connected','red');
        });
                
        node.waClient.on('loading_screen', () => {
            SetStatus('Connecting...','yellow');
        });
        
        node.waClient.on('ready', () => {
            SetStatus('Connected','green');
        });

        node.waClient.on('disconnected', () => {
            SetStatus("Disconnected","red");
        });

        this.on(`close`, ()=>{
            SetStatus("Disconnected", "red");
        });
    }
    RED.nodes.registerType("admin", WhatsappAdmin);
}