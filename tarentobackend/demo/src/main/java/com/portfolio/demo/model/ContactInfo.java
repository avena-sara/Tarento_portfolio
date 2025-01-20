package com.portfolio.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "contact_info")
@Data // Lombok annotation to generate getters, setters, equals, hashcode, toString
public class ContactInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate the primary key
    private Long id; // Numeric id for the primary key (auto-generated)

    @Column(name = "name")
    private String name; // Maps to 'name' column in DB

    @Column(name = "email")
    private String email; // Maps to 'email' column in DB

    @Column(name = "message")
    private String message; // Maps to 'message' column in DB

    @Column(name = "created_at", columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime createdAt; // Maps to 'created_at' column in DB (with timestamp)
}
