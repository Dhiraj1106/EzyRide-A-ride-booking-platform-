package org.example.ezyride.DAO;

import org.example.ezyride.Entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DriverDAO extends JpaRepository<Driver, Long> {

    Optional<Driver> findByUserId(Long userId);
}