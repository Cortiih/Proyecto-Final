package com.proyecto.backend.dto;

public class UserDTO {

    private Long id;
    private String name;
    private String lastName;
    private String email;
    private boolean admin;
    private String token;


    public UserDTO(Long id, String name, String lastName, String email, boolean admin, String token) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.admin = admin;
        this.token = token;
    }

    public UserDTO(com.proyecto.backend.model.User user, String token) {
        this(user.getId(), user.getName(), user.getLastName(), user.getEmail(), user.isAdmin(), token);
    }

    public UserDTO(com.proyecto.backend.model.User user) {
        this(user, null);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
