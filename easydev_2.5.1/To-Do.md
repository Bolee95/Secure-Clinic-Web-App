##TO-DO Web App ##
16.07.

- Loading komponenta *DONE* 
- Forma za kreiranje pacijenta *DONE*
- API poziv za kreiranje pacijenta *DONE* YEEEE


Proveriti: - template/src/containers/UI 
Da li postoji u "New seed"? *NE POSTOJI* __Proveriti naknadno da li je mozda potrebno da se doda__ *DONE* izgleda da ne treba

17.07.
- Da li nam je potreban <Field/> ? Koristi se zbog Reduxa a ne dozvoljava onChange... Da li ima ikakvih benefita? --> Izgleda da vraca i podatke kroz formu, treba da se proveri kako moze da se proveri da li je validna vrednost u njemu *DONE, za sad izbaceno*

18.07.
- Napraviti i popuniti tabelu sa svim pacijentima *BLOCKED* treba da se ispravi bug u react-data-grid
- Posalji remote zapocet projekat *DONE*

__IMPROVEMENTS__
- Kako uhvatiti greske koje se vrate sa servera? Za sad nema dovoljno informacija

20.07
- Ubacena nova tabelica za koriscenje
- Isproban redux store kako se koristi

23.07
- Parsisan response sa servera za sve pacijente
- Omogucen prikaz tabele sa podacima za pacijente
- Provaljeno kako se koristi Loading komponenta

26.07
- Dodate metode za Admin usera

-------------------------------------------
KAIZEN -- Small improvements every day 
11.08.
- Dodati ostatak logike za:
-- Doktora *DONE*
-- Pacijenta

- Prilikom logovanja na sistem, sacuvati podatke o ulogovanom korisniku, zavisno koji je tip korisnika
(Logovanje promeniti da sadrzi samo polje za unos username-a (ID-a))
- Dodati chaincode metodu za pribavljanje svih pacijenata za odredjenu bolnicu ( ako je moguce, ako ne, odraditi improvizaciju) *DONE*

15.08.
- Login forma refaktorisana
- Dodat lokal storage za podatke (lib 'storage')

16-17.08
- Dodate stranice za pending
- Dodato loading dugme
- Dodata metoda za promenu waiting statusa korisnika

- Dodat i integrisan "Entity" ugovor

18.08
- Proveriti kako je moguce integrisati "FullWidth" notifikaciju u projekat
- Prosiriti "Pending" ugovor sa dodatnim informacijama *DONE*
- Omoguciti login i za obicnog korisnika, odnosno izmeniti trenutnu logiku

19.08
- Pokusano dodavanje korisnika na WaitingListu, radi kako treba :) 
- Oradjen refaktoring koda koji se automatski poziva

20.08.
- Dodata komponenta koja izlistava pacijente na izabranoj listi

22.08./23.08.
- Prosiriti WaitingList instance sa sto vise podataka, kao sto su ime i prezime korisnika, naziv bolnice, ordinacije i servisa. Po potrebi kasnije prikazivati potrebne podatke zavisno ko od korisnika ih gleda *DONE*
- Dopuniti UI sa novim poljima iz baze *DONE*
- Naci nacin da se omoguci "Dark mode" u komponenti koja prikazuje sve pacijente za Waiting list (Mozda razdvojiti tabelu i komponentu koja drzi istu trenutno na dve zasebne komponente (?)) *DONE*
- Napraviti login za obicnog korisnika, koji ce moci da vidi sve liste cekanja, kao i listu na kojoj se on nalazi *DONE*
- Iskoristiti dodatno filtriranje Pending-a na osnovu novododatog flega *DONE*
- Proveri zasto se lose postavljaju ordinationCode i serviceCode kada se promeni status na listu za korisnika *DONE*

24.08.
- Razmisliti gde da se koriste pacijentovi privatni podaci i kako *DONE* Provereno kako to trenutno funkcionise. Trenutno stanje modela podataka je ok *DONE*

25.08
- Dodati komponente koje ce da rade sa privatnim podacima korisnika *DONE*
- Dodati ime i prezime za korisnika u privatnim podacima *DONE*

26.08
- Podesiti da se prikazuje sidebar zavisno od toga koji korisnik je ulogovan *DONE* Treba da postoji korisnik i u bazi i u walletu

27.08.
- Napraviti logiku za cuvanje dokumenata i ucitavanje istih

28.08.
- Konsultacije prosle odlicno :) 

30.08.
- Odraditi logiku za citanje i dodavanje jednog/vise fajlova *DONE*
- Dodati nove API pozive *DONE*


31.08.

- Logika za citanje i pisanje odradjena, potrebno je da se ubaci mogucnost skidanja dokumenata, trenutno ne radi

01.09.

- Sredjen problem od juce

02.09.

- Proveriti da li postoje svi potrebni api pozivi *DONE*
-- Treba prosiriti Pending ugovor sa listom dokumenata *DONE*
-- Treba omoguciti da korisnik moze od jednom celu listu dokumentata da posalje (PacientPrivateData) *DONE*

03.09.

- Dovrsiti komponentu za dodavanje dokumenata za pacijenta *DONE*
-- Dropzone komponentu *DONE*
-- Komponenta za dodavanja korisnika u Pending (Iskoristiti ponovo dropzone) *DONE*
- Uskladiti trenutnu web aplikaicju da prihvata fajlove gde je to potrebno *DONE*

04.09.

- Dodati u listu pendinga i da se izlistavaju linkovi ka dokumentima *DONE*
- Spreciti da se desi pucanje kada nije ukljucena baza *DONE*


-------------------------------------------------------------------------
Moguca unapredjenja:

- Naci nacin da se uhvate greske sa nizeg nivoa od API-ja (Mozda da se izbaci hvatanje greske, nego da se vraca {success, error} sa nizeg nivoa
- Izlistavanje transakcija (?) Proveriti Master Rad folder za primer

UI
-- Pokusaj dodavanje notifikacije kada se javi greska

--------------------------------------------------------------------------

Major tasks:

- Uploading i citanje podataka *DONE*
- Logika za Ammends 
- Implementacija BI za statistiku 
