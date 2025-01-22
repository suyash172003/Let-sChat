package org.example.websocket.Controller;

import org.example.websocket.Model.Room;
import org.example.websocket.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @PostMapping("/createRoom")
    public ResponseEntity<String> saveRoom(@RequestBody Room room) {
        roomRepository.save(room);
        return ResponseEntity.ok("Room created successfully");
    }

    @GetMapping("/rooms/{owner}")
    public List<Room> getRooms(@PathVariable String owner) {
        return roomRepository.getRoomByOwner(owner);
    }
}
