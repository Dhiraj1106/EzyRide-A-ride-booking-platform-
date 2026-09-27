package org.example.ezyride.Service;

import org.example.ezyride.DAO.DriverDAO;
import org.example.ezyride.Entity.Driver;
import org.example.ezyride.Entity.VerificationStatus;
import org.springframework.stereotype.Service;

@Service
public class DriverService {

    private final DriverDAO driverDAO;

    public DriverService(DriverDAO driverDAO) {
        this.driverDAO = driverDAO;
    }

    public Driver registerDriver(Driver driver) {

        if (driverDAO.findByUserId(driver.getUser().getId()).isPresent()) {
            throw new RuntimeException("Driver profile already exists");
        }

        if (driver.getVerificationStatus() == null) {
            driver.setVerificationStatus(
                    org.example.ezyride.Entity.VerificationStatus.PENDING
            );
        }

        driver.setOnline(false);

        return driverDAO.save(driver);
    }

    public Driver goOnline(Long driverId) {

        Driver driver = driverDAO.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        driver.setOnline(true);

        return driverDAO.save(driver);
    }

    public Driver goOffline(Long driverId) {

        Driver driver = driverDAO.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        driver.setOnline(false);

        return driverDAO.save(driver);
    }

    public Driver verifyDriver(Long driverId) {

        Driver driver = driverDAO.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        driver.setVerificationStatus(VerificationStatus.VERIFIED);

        return driverDAO.save(driver);
    }

    public Driver rejectDriver(Long driverId) {

        Driver driver = driverDAO.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        driver.setVerificationStatus(VerificationStatus.REJECTED);
        driver.setOnline(false);

        return driverDAO.save(driver);
    }

    public Driver getDriverById(Long driverId) {

        Driver driver = driverDAO.findById(driverId).orElse(null);

        return driver;
    }
    public Driver updateDriver(Long driverId, Driver updatedDriver) {

        Driver driver = driverDAO.findById(driverId).orElse(null);

        if (driver == null) {
            return null;
        }

        driver.setLicenseNumber(updatedDriver.getLicenseNumber());
        driver.setVehicleType(updatedDriver.getVehicleType());
        driver.setVehicleNumber(updatedDriver.getVehicleNumber());

        return driverDAO.save(driver);
    }
}