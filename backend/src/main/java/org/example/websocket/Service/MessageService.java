package org.example.websocket.Service;

import org.example.websocket.Model.Message;
import org.example.websocket.Repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private ChatRepository chatRepository;

    public void save(Message message) {
        chatRepository.save(message);
    }
}
