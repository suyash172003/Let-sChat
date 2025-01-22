package org.example.websocket.Repository;

import org.example.websocket.Model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> getRoomByOwner(String owner);
}
