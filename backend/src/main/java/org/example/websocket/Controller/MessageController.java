package org.example.websocket.Controller;

import org.example.websocket.Model.Message;
import org.example.websocket.Repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController
public class MessageController {

    @Autowired
    private ChatRepository chatRepository;

    @GetMapping("/messages/{roomId}")
    public List<Message> messages(@PathVariable Long roomId) {
        return chatRepository.findAllByRoomId(roomId);
    }

}
