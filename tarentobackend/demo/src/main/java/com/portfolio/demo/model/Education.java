package com.portfolio.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "education")
@Data // Lombok annotation to generate getters, setters, equals, hashcode, toString
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate the primary key
    private Long id; // Numeric id for the primary key

    @Column(name = "degree")
    private String degree; // Maps to 'degree' column in DB

    @Column(name = "institution")
    private String institution; // Maps to 'institution' column in DB

    @Column(name = "year")
    private String year; // Maps to 'year' column in DB

    @Column(name = "cgpa_or_percentage")
    private String cgpaOrPercentage; // Maps to 'cgpa_or_percentage' column in DB

    @Column(name = "board_or_university")
    private String boardOrUniversity; // Maps to 'board_or_university' column in DB
}
