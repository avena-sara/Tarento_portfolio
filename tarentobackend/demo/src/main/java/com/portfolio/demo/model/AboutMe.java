package com.portfolio.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "about_me")
@Data // Lombok annotation to generate getters, setters, equals, hashcode, toString
public class AboutMe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate the primary key
    private Long id; // Numeric id for the primary key

    private String techSkills; // Maps to 'tech_skills' column in DB
    private String nonTechSkills; // Maps to 'non_tech_skills' column in DB
    private String achievements; // Maps to 'achievements' column in DB
    private String interests; // Maps to 'interests' column in DB
}
