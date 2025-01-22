package org.example.websocket.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Room {
    @Id
    private Long roomId;
    private String owner;
    private String guest;

    public Room() {}
    public Room(Long roomId, String owner, String guest) {
        this.roomId = roomId;
        this.owner = owner;
        this.guest = guest;
    }
    public Long getRoomId() {
        return roomId;
    }
    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }
    public String getOwner() {
        return owner;
    }
    public void setOwner(String owner) {
        this.owner = owner;
    }
    public String getGuest() {
        return guest;
    }
    public void setGuest(String guest) {
        this.guest = guest;
    }

}
