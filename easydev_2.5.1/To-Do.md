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


05.09.
- Male popravke, zabelezeno u kompitu *DONE*
- Proveriti zasto ne postoji licence id za entitet kada se uloguje *DONE*
- Proveriti da li se kreira i entitet kada se pravi korisnik u wallet *DONE*

Ammends
Case 1:
- izabere se neka od liste cekanja za bolnicu korisnika
- Izabere se pacijent na listi
- Izabere se jedan od razloga zbog koga treba da se skine sa liste 
- Dodaju se dokuemnti kao dokaz
- Dodaje se opis
-- Napravi se Ammend

Case 2: 
- Entitet izlistava Ammende za svoju bolnicu ( Na slican nacin kao kod pendinga, ne pokazuju se ammendi koji su vec prihvaceni)
- Kada troje potvrde ammend, radi se neka od akcija koja je definisana ammendom

06.09.
- Refaktorisanje ugovora za Ammendove *DONE*
- Refaktorisanje API-ja i beckenda *DONE*

07.09.

- Proveriti metodu za sklanjanje sa liste cekanja da li radi *DONE*
-- Napraviti workaround metodu za dodavanje korisnika na listu cekanja bez pedninga, u svrhu testiranja *DONE*

08.09.

- Napravljena forma za kreiranje Ammenda *DONE*
- Napravljena lista sa Ammend-ovima za bolnicu i approve funkciju *DONE*
- Proveriti kako da ne vraca ammende koji su vec potpisani od strane trenutnog korisnika/entiteta *DONE*

09.09.

- Dodati komponentu koja izlistava sve Ammende *DONE* 
- Dodati dodatna polja za Ammend objekat (naziv bolnice, ordinacije..?)  *DONE*

12.09.
- Zameniti logiku za proveru kojeg je tipa entitet zavisno od licenceID (kod allpendingsForHospital i allAmmendsForHospital) *DONE*
- Naci bolji nacin da se kastuje AmmendType *DONE* 
- Resiti bolje postavljanje maxWaitingTime za listu cekanja -> Na primer, zavisno od koda intervencije/servisa, da se azurira ovaj podatak *Za sad je u redu ovako, predefinisano ce da bude samo kada se sama kreira lista cekanja*

13.09.
- Pokusaj dodavanje notifikacije kada se javi greska *DONE*
- Dodato je logovanje requesta kod API-ja *DONE*


14.09.
- Generalni test aplikacije *DONE*

15.09.
-- Skloniti placeholder vrednosti (identity_name) *DONE*
- Srediti "Approve" dugme (da se prikazuje u celosti) *DONE*

17.09.
- Naci nacin da se uhvate greske sa nizeg nivoa od API-ja (Mozda da se izbaci hvatanje greske, nego da se vraca {success, error} sa nizeg nivoa  *DONE*
-- Nepokrivene metode su zabelezene u fajlu gde je projekat

18.09.
- Hvatanje greske iz ugovora i iz logike *DONEEEE* GG

19.09.
- Integracija podataka koje je dekan poslao u projekat
-- Sredjivanje podataka (kataloga) *DONE*
-- Iscitavanje podataka iz tabele *DONE*
-- Kreiranje objekata od istih *DONEEEEEE*

20.09.

- Proveriti da li se prilikom pravljenja ammenda dodaje jedan evidence iako ne postoji *OK JE*


-------------------------------------------------------------------------
Moguca unapredjenja:

- Napraviti stranice da dodavanje ordinacije i servisa bolnici *DONE* 
- Napraviti stranicu gde se izlistavju svi privatni dokumenti korisnika
- Proveriti zasto puca API kada se pokusa da se procita fajl a nije aktivan server *NE MORA ZA SAD*
- Napraviti skriptu koja pokrece sve servere, API i web app

- Izlistavanje transakcija (?) Proveriti Master Rad folder za primer
- Proveriti da li se brise i enitet kada se brise wallet *NE BRISE SE ZA SAD*

UI

--------------------------------------------------------------------------

Major tasks (by priority):

- Uploading i citanje podataka *DONE*
- Logika za Ammends *DONE*
- Generalni test aplikacije 1 *DONE*
- Integracija podataka koje je dekan poslao u projekat / Soft DL:  20.09. *DONE*
- Pisanje rada / Soft DL: 10.10.  *IN PROGRESS*
- Implementacija BI za statistiku Soft DL: 01.10. *DONE* *2 dana ranije*
- Generalni test 2
-- Skloniti placeholdere
- Dalja nadogradnja nedostataka (unapredjenja) projekta


