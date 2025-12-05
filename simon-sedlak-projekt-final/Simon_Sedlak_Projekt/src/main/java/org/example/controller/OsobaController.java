package org.example.controller;

import org.example.model.Adresa;
import org.example.repository.OsobaRepository;
import org.example.repository.AdresaRepository;
import org.example.model.Osoba;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/osoby")
@CrossOrigin
public class OsobaController {

    private final OsobaRepository osobaRepo;
    private final AdresaRepository adresaRepo;

    public OsobaController(OsobaRepository osobaRepo, AdresaRepository adresaRepo) {
        this.osobaRepo = osobaRepo;
        this.adresaRepo = adresaRepo;
    }

    @GetMapping
    public List<Osoba> all() {
        return osobaRepo.findAll();
    }

    @GetMapping("/{id}")
    public Osoba one(@PathVariable Long id) {
        return osobaRepo.findById(id).orElseThrow();
    }

    @PostMapping
    public Osoba create(@RequestBody Osoba o) {
        if (o.getAdresy() != null){
            o.getAdresy().forEach(a -> a.setOsoba(o));
        }
        return osobaRepo.save(o);
    }

    @PutMapping("/{id}")
    public Osoba update(@PathVariable Long id, @RequestBody Osoba data) {
        Osoba o = osobaRepo.findById(id).orElseThrow();

        o.setJmeno(data.getJmeno());
        o.setPrijmeni(data.getPrijmeni());
        o.setEmail(data.getEmail());
        o.setTelefon(data.getTelefon());

        o.getAdresy().clear();
        if (data.getAdresy() != null) {
            data.getAdresy().forEach(a -> {
                a.setOsoba(o);
                o.getAdresy().add(a);
            });
        }

        return osobaRepo.save(o);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        osobaRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/adresy/{aid}")
    public ResponseEntity<?> deleteAdresa(@PathVariable Long id, @PathVariable Long aid) {
        Adresa a = adresaRepo.findById(aid).orElseThrow();
        if (!a.getOsoba().getId().equals(id)) {
            return ResponseEntity.badRequest().build();
        }
        adresaRepo.delete(a);
        return ResponseEntity.noContent().build();
    }
}
