package org.example.ezyride.Service;

import org.example.ezyride.DAO.UserDAO;
import org.example.ezyride.Entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserDAO userDAO;

    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User registerUser(User user) {

        if (userDAO.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        return userDAO.save(user);
    }

    public User loginUser(String email, String password) {

        User user = userDAO.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    public User getUserById(Long id) {

        User user = userDAO.findById(id).orElse(null);

        return user;
    }

    public User updateUser(Long id, User updatedUser) {

        User user = userDAO.findById(id).orElse(null);

        if (user == null) {
            return null;
        }

        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        user.setPhone(updatedUser.getPhone());

        return userDAO.save(user);
    }
    public User deleteUser(Long id) {
        User user = userDAO.findById(id).orElse(null);
        if (user == null) {
            return null;
        }
        userDAO.delete(user);
        return user;
    }
}