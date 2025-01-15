package org.example.websocket.Controller;

import org.example.websocket.Model.Message;
import org.example.websocket.Service.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class WebController {

    private static final Logger logger = LoggerFactory.getLogger(WebController.class);

    @Autowired
    private MessageService messageService;

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/messages/{roomId}")
    @CrossOrigin(origins = "http://127.0.0.1:5173")
    public Message sendMessage(@RequestBody Message message) {
        logger.info("Received message: " + message.getContent() + " from user: " + message.getUser());
        messageService.save(message);
        return message;
    }
}
