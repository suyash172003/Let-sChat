package org.example.websocket.Repository;

import org.example.websocket.Model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Message, Long>{
    List<Message> findAllByRoomId(Long roomId);
}
