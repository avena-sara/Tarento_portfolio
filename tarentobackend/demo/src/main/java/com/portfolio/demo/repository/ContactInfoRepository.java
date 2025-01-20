package com.portfolio.demo.repository;

import com.portfolio.demo.model.ContactInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactInfoRepository extends JpaRepository<ContactInfo, Long> {
    // Custom queries can be added here if needed
}
