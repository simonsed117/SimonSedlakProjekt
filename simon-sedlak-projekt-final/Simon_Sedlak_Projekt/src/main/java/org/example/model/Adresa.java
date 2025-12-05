package org.example.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Adresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ulice;
    private String mesto;
    private String psc;

    @ManyToOne
    @JoinColumn(name = "osoba_id")
    @JsonBackReference
    private Osoba osoba;

    public Adresa() {}

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getUlice() {
        return ulice;
    }
    public void setUlice(String ulice) {
        this.ulice = ulice;
    }

    public String getMesto() {
        return mesto;
    }
    public void setMesto(String mesto) {
        this.mesto = mesto;
    }

    public String getPsc() {
        return psc;
    }
    public void setPsc(String psc) {
        this.psc = psc;
    }

    public Osoba getOsoba() {
        return osoba;
    }
    public void setOsoba(Osoba osoba) {
        this.osoba = osoba;
    }
}
