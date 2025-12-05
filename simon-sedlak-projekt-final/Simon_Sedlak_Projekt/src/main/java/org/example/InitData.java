package org.example;

import org.example.model.Adresa;
import org.example.model.Osoba;
import org.example.repository.OsobaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class InitData implements CommandLineRunner {

    private final OsobaRepository repo;

    public InitData(OsobaRepository repo) {
        this.repo = repo;
    }

    @Override
    public void run(String... args) throws Exception {
        for (int i = 1; i <= 10; i++) {
            Osoba o = new Osoba();
            o.setJmeno("Jmeno" + i);
            o.setPrijmeni("Prijmeni" + i);
            o.setEmail("user" + i + "@example.com");
            o.setTelefon("+4207770000" + i);

            Adresa a1 = new Adresa();
            a1.setUlice("Stara " + i);
            a1.setMesto("Praha");
            a1.setPsc("10000");
            a1.setOsoba(o);

            Adresa a2 = new Adresa();
            a2.setUlice("Nova " + i);
            a2.setMesto("Brno");
            a2.setPsc("60200");
            a2.setOsoba(o);

            o.getAdresy().add(a1);
            o.getAdresy().add(a2);

            repo.save(o);
        }
    }
}
