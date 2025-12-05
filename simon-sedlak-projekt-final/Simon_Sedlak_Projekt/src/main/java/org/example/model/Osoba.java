package org.example.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Osoba {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jmeno;
    private String prijmeni;
    private String email;
    private String telefon;

    @OneToMany(mappedBy = "osoba", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Adresa> adresy = new ArrayList<>();

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getJmeno() {return jmeno;}
    public void setJmeno(String jmeno) {this.jmeno = jmeno;}

    public String getPrijmeni() {return prijmeni;}
    public void setPrijmeni(String prijmeni) {this.prijmeni = prijmeni;}

    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}

    public String getTelefon() {return telefon;}
    public void setTelefon(String telefon) {this.telefon = telefon;}

    public List<Adresa> getAdresy() {return adresy;}
    public void setAdresy(List<Adresa> adresy) {this.adresy = adresy;}
}
