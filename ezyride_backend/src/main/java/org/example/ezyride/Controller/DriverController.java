package org.example.ezyride.Controller;

import org.example.ezyride.Entity.Driver;
import org.example.ezyride.Service.DriverService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @PostMapping("/register")
    public Driver registerDriver(@RequestBody Driver driver) {
        return driverService.registerDriver(driver);
    }
    @PutMapping("/{driverId}/online")
    public Driver goOnline(@PathVariable Long driverId) {
        return driverService.goOnline(driverId);
    }

    @PutMapping("/{driverId}/offline")
    public Driver goOffline(@PathVariable Long driverId) {
        return driverService.goOffline(driverId);
    }
    @PutMapping("/{driverId}/verify")
    public Driver verifyDriver(@PathVariable Long driverId) {
        return driverService.verifyDriver(driverId);
    }

    @PutMapping("/{driverId}/reject")
    public Driver rejectDriver(@PathVariable Long driverId) {
        return driverService.rejectDriver(driverId);
    }
    @GetMapping("/{driverId}")
    public Driver getDriverById(@PathVariable Long driverId) {

        return driverService.getDriverById(driverId);
    }
    @PutMapping("/{driverId}")
    public Driver updateDriver(
            @PathVariable Long driverId,
            @RequestBody Driver driver) {

        return driverService.updateDriver(driverId, driver);
    }
}