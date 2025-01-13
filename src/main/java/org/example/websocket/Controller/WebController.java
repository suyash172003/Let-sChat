package org.example.websocket.Controller;

import org.example.websocket.Model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebController {

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message sendTo(@RequestBody Message message) {
        return message;
    }


}
