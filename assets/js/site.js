/*
  Affiche les données de donnees.js dans les pages.
  Chaque page a des zones vides (avec un id) que ce script remplit.
*/

(function () {
  const V = window.VOYAGE;

  // Petite aide : crée un élément HTML avec une classe et un texte
  function el(balise, classe, texte) {
    const e = document.createElement(balise);
    if (classe) e.className = classe;
    if (texte) e.textContent = texte;
    return e;
  }

  function badgeStatut(code) {
    const s = V.statuts[code];
    const b = el("span", "statut " + code, s.nom);
    b.title = s.aide;
    return b;
  }

  // ---------- Compte à rebours ----------
  const zoneJours = document.getElementById("rebours-jours");
  if (zoneJours) {
    const ms = new Date(V.depart) - new Date();
    const jours = Math.max(0, Math.ceil(ms / 86400000));
    zoneJours.textContent = jours;
    document.getElementById("rebours-unite").textContent = jours > 1 ? "jours" : "jour";
  }

  // ---------- Plan de la Ligne S ----------
  const zoneLigne = document.getElementById("stations");
  if (zoneLigne) {
    V.ligne.forEach(function (st) {
      const li = el("li", "station" + (st.terminus ? " terminus" : ""));
      li.appendChild(el("span", "station-point"));
      const txt = el("div", "station-texte");
      txt.appendChild(el("div", "station-nom", st.nom));
      if (st.terminus) {
        txt.appendChild(el("span", "etiquette-gab", st.detail));
      } else {
        txt.appendChild(el("div", "station-detail", st.detail));
      }
      li.appendChild(txt);
      const p = el("span", "pastille j" + st.jour, "J" + st.jour);
      p.setAttribute("aria-label", "Jour " + st.jour);
      li.appendChild(p);
      zoneLigne.appendChild(li);
    });
  }

  // ---------- Les 3 jours (accueil) ----------
  const zoneJoursListe = document.getElementById("jours-liste");
  if (zoneJoursListe) {
    V.jours.forEach(function (j) {
      const li = el("li");
      const a = el("a", "jour-lien " + j.id);
      a.href = "programme.html#" + j.id;
      a.appendChild(el("span", "pastille " + j.id, "J" + j.numero));
      const t = el("div");
      t.appendChild(el("strong", "", j.titre));
      t.appendChild(el("span", "", j.date));
      a.appendChild(t);
      const f = el("span", "fleche", "›");
      f.setAttribute("aria-hidden", "true");
      a.appendChild(f);
      li.appendChild(a);
      zoneJoursListe.appendChild(li);
    });
  }

  // ---------- Lien avec CIEL (accueil) ----------
  const zoneCiel = document.getElementById("ciel-liste");
  if (zoneCiel) {
    V.liensCiel.forEach(function (c) {
      const li = el("li");
      li.appendChild(el("div", "lieu", c.lieu));
      li.appendChild(el("h3", "", c.theme));
      li.appendChild(el("p", "", c.texte));
      zoneCiel.appendChild(li);
    });
  }

  // ---------- Légende des statuts ----------
  const zoneLegende = document.getElementById("legende");
  if (zoneLegende) {
    Object.keys(V.statuts).forEach(function (code) {
      const li = el("li");
      li.appendChild(badgeStatut(code));
      li.appendChild(el("span", "", V.statuts[code].aide));
      zoneLegende.appendChild(li);
    });
  }

  // ---------- Programme jour par jour ----------
  const zoneProgramme = document.getElementById("programme");
  if (zoneProgramme) {
    V.jours.forEach(function (j) {
      const section = el("section", "jour " + j.id);
      section.id = j.id;
      section.setAttribute("aria-labelledby", j.id + "-titre");

      const ent = el("div", "jour-entete");
      ent.appendChild(el("span", "pastille " + j.id, "J" + j.numero));
      const et = el("div");
      const h2 = el("h2", "", j.titre);
      h2.id = j.id + "-titre";
      et.appendChild(h2);
      et.appendChild(el("p", "", j.date));
      ent.appendChild(et);
      section.appendChild(ent);

      const ol = el("ol", "trajet-jour");
      j.etapes.forEach(function (e) {
        if (e.trajet) {
          const seg = el("li", "segment");
          seg.appendChild(el("span"));
          seg.appendChild(el("span"));
          seg.appendChild(el("span", "", e.trajet));
          ol.appendChild(seg);
          return;
        }
        const li = el("li", "arret " + e.type);
        li.appendChild(el("span", "arret-heure", e.heure));
        li.appendChild(el("span", "arret-point"));
        const c = el("div", "arret-contenu");
        c.appendChild(el("h3", "", e.titre));
        if (e.texte) c.appendChild(el("p", "", e.texte));
        c.appendChild(badgeStatut(e.statut));
        if (e.planB) {
          const b = el("div", "branche");
          b.appendChild(el("h4", "", e.planB.titre));
          b.appendChild(el("p", "", e.planB.texte));
          b.appendChild(badgeStatut(e.planB.statut));
          c.appendChild(b);
        }
        li.appendChild(c);
        ol.appendChild(li);
      });
      section.appendChild(ol);
      zoneProgramme.appendChild(section);
    });

    // Le programme est créé après le chargement : on va au jour demandé (ex. programme.html#j2)
    if (location.hash) {
      const cible = document.getElementById(location.hash.slice(1));
      if (cible) cible.scrollIntoView();
    }

    // Met en avant le jour visible dans le sélecteur
    const liens = document.querySelectorAll(".choix-jour a");
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (en) {
          if (!en.isIntersecting) return;
          liens.forEach(function (l) {
            l.classList.toggle("actif", l.getAttribute("href") === "#" + en.target.id);
          });
        });
      }, { rootMargin: "-30% 0px -60% 0px" });
      document.querySelectorAll(".jour").forEach(function (s) { obs.observe(s); });
    }
  }

  // ---------- Lieux : fiches et carte ----------
  function pastilleLieu(l) {
    if (l.sorte === "auberge") return { classe: "auberge", texte: "H" };
    if (l.sorte === "planb") return { classe: "planb", texte: "B" };
    return { classe: "j" + l.jour, texte: "J" + l.jour };
  }

  function ligneInfo(dl, titre, texte) {
    dl.appendChild(el("dt", "", titre));
    dl.appendChild(el("dd", "", texte));
  }

  const zoneFiches = document.getElementById("fiches");
  if (zoneFiches) {
    V.lieux.forEach(function (l) {
      const p = pastilleLieu(l);
      const art = el("article", "fiche " + l.sorte);
      art.id = l.id;
      art.tabIndex = -1;

      const ent = el("div", "fiche-entete");
      ent.appendChild(el("span", "pastille " + p.classe, p.texte));
      const t = el("div");
      t.appendChild(el("h2", "", l.nom));
      t.appendChild(el("p", "", l.quand));
      ent.appendChild(t);
      art.appendChild(ent);

      if (l.texte) art.appendChild(el("p", "fiche-texte", l.texte));

      const dl = el("dl", "fiche-infos");
      ligneInfo(dl, "Adresse", l.adresse);
      ligneInfo(dl, "Accès", l.acces);
      if (l.objectif) ligneInfo(dl, "Objectif", l.objectif);
      if (l.ciel) ligneInfo(dl, "Lien CIEL", l.ciel);
      if (l.matieres) ligneInfo(dl, "Matières", l.matieres);
      art.appendChild(dl);

      if (l.mission) {
        const m = el("div", "mission");
        m.appendChild(el("h3", "", "Ta mission"));
        m.appendChild(el("p", "", l.mission));
        m.appendChild(badgeStatut("proposition"));
        art.appendChild(m);
      }
      if (l.aConfirmer) art.appendChild(el("p", "fiche-question", "À confirmer : " + l.aConfirmer));

      const pied = el("div", "fiche-pied");
      pied.appendChild(badgeStatut(l.statut));
      const bouton = el("button", "bouton-carte", "Voir sur la carte");
      bouton.type = "button";
      bouton.dataset.lieu = l.id;
      pied.appendChild(bouton);
      art.appendChild(pied);

      zoneFiches.appendChild(art);
    });
  }

  const zoneCarte = document.getElementById("carte");
  if (zoneCarte) {
    if (!window.L) {
      zoneCarte.appendChild(el("p", "carte-erreur", "La carte n'a pas pu se charger. Vérifie ta connexion internet, puis recharge la page. Les fiches des lieux restent lisibles plus bas."));
    } else {
      const carte = L.map(zoneCarte, { scrollWheelZoom: false });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">contributeurs OpenStreetMap</a>'
      }).addTo(carte);

      const marqueurs = {};
      V.lieux.forEach(function (l) {
        const p = pastilleLieu(l);
        const icone = L.divIcon({
          className: "marqueur",
          html: '<span class="pastille ' + p.classe + '">' + p.texte + "</span>",
          iconSize: [34, 34], iconAnchor: [17, 17]
        });
        const m = L.marker(l.gps, { icon: icone, title: l.nom, alt: l.nom }).addTo(carte);
        m.bindTooltip(l.nom, { direction: "top", offset: [0, -16] });
        m.on("click", function () {
          const fiche = document.getElementById(l.id);
          fiche.scrollIntoView({ block: "start" });
          fiche.focus({ preventScroll: true });
        });
        marqueurs[l.id] = m;
      });

      carte.fitBounds(V.lieux.map(function (l) { return l.gps; }), { padding: [30, 30] });

      document.querySelectorAll(".bouton-carte").forEach(function (b) {
        b.addEventListener("click", function () {
          const m = marqueurs[b.dataset.lieu];
          zoneCarte.scrollIntoView({ block: "center" });
          carte.setView(m.getLatLng(), 16);
          m.openTooltip();
        });
      });
    }
  }

  // ---------- Groupes ----------
  function carteGroupe(g, codeEleve) {
    const art = el("article", "groupe");
    art.style.setProperty("--couleur-groupe", g.couleur);
    const ent = el("div", "groupe-entete");
    ent.appendChild(el("h3", "", g.nom));
    ent.appendChild(el("span", "exemple", "Exemple fictif"));
    art.appendChild(ent);

    const dl = el("dl", "fiche-infos");
    ligneInfo(dl, "Référent", g.referent);
    dl.appendChild(el("dt", "", "Téléphone"));
    const dd = el("dd");
    const tel = el("a", "", g.telephone);
    tel.href = "tel:" + g.telephone.replace(/\s/g, "");
    dd.appendChild(tel);
    dd.appendChild(document.createTextNode(" (numéro fictif)"));
    dl.appendChild(dd);
    art.appendChild(dl);

    const codes = el("ul", "codes");
    codes.setAttribute("aria-label", "Codes des élèves du groupe");
    g.codes.forEach(function (c) {
      const li = el("li", c === codeEleve ? "moi" : "", c);
      if (c === codeEleve) li.setAttribute("aria-current", "true");
      codes.appendChild(li);
    });
    art.appendChild(codes);
    return art;
  }

  const zoneGroupes = document.getElementById("groupes");
  if (zoneGroupes) {
    V.groupes.forEach(function (g) { zoneGroupes.appendChild(carteGroupe(g)); });

    const form = document.getElementById("recherche");
    const champ = document.getElementById("code");
    const resultat = document.getElementById("resultat");

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      // « e7 », « E7 » ou « E07 » donnent tous E07
      const brut = champ.value.trim().toUpperCase().replace(/^E?0*(\d{1,2})$/, "$1");
      const code = /^\d{1,2}$/.test(brut) ? "E" + brut.padStart(2, "0") : "";
      resultat.textContent = "";

      const groupe = V.groupes.find(function (g) { return g.codes.indexOf(code) !== -1; });
      if (!groupe) {
        champ.setAttribute("aria-invalid", "true");
        resultat.appendChild(el("p", "resultat-erreur", "Ce code n'existe pas. Les codes vont de E01 à E27 : vérifie le code donné par ton professeur."));
        return;
      }
      champ.removeAttribute("aria-invalid");
      champ.value = code;
      resultat.appendChild(el("p", "resultat-titre", "Tu es dans le " + groupe.nom + "."));
      resultat.appendChild(carteGroupe(groupe, code));
    });
  }

  // ---------- Espace organisateurs ----------
  const O = V.orga;
  const euros = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

  // Calcule le budget. prixMije permet de tester un autre prix de nuit (simulateur).
  function calculBudget(prixMije) {
    const personnes = O.eleves + O.adultes;
    let total = 0, etablissement = 0, familles = 0;
    const lignes = O.budget.map(function (l) {
      const prix = l.reglable === "mije" && prixMije !== undefined ? prixMije : l.prix;
      const montant = l.quantite * prix;
      total += montant;
      if (l.repartition === "adultes") {
        etablissement += montant;
      } else {
        etablissement += montant / personnes * O.adultes;
        familles += montant / personnes * O.eleves;
      }
      return { ligne: l, prix: prix, montant: montant };
    });
    return { lignes: lignes, total: total, etablissement: etablissement, familles: familles, parEleve: familles / O.eleves };
  }

  const zoneSuivi = document.getElementById("suivi");
  if (zoneSuivi) {
    // Compte à rebours vers la date clé
    const ms = new Date(O.dateCle.date) - new Date();
    const j = Math.max(0, Math.ceil(ms / 86400000));
    document.getElementById("cle-jours").textContent = j;
    document.getElementById("cle-unite").textContent = j > 1 ? "jours" : "jour";
    document.getElementById("cle-texte").textContent = O.dateCle.titre + ", le 13 janvier 2027 à 11 h. " + O.dateCle.texte;

    // Barre des démarches par statut
    const compte = {};
    O.demarches.forEach(function (d) { compte[d.statut] = (compte[d.statut] || 0) + 1; });
    const barre = document.getElementById("barre-statuts");
    const legendeBarre = document.getElementById("barre-legende");
    const resume = [];
    Object.keys(V.statuts).forEach(function (code) {
      if (!compte[code]) return;
      const seg = el("span", "segment-statut " + code);
      seg.style.flexGrow = compte[code];
      barre.appendChild(seg);
      const li = el("li");
      li.appendChild(badgeStatut(code));
      li.appendChild(el("span", "", "× " + compte[code]));
      legendeBarre.appendChild(li);
      resume.push(compte[code] + " " + V.statuts[code].nom.toLowerCase());
    });
    barre.setAttribute("aria-label", O.demarches.length + " démarches : " + resume.join(", "));

    const zoneDem = document.getElementById("demarches");
    O.demarches.forEach(function (d) {
      const li = el("li", "demarche");
      li.appendChild(badgeStatut(d.statut));
      const t = el("div");
      t.appendChild(el("strong", "", d.nom));
      t.appendChild(el("span", "", d.remarque));
      li.appendChild(t);
      zoneDem.appendChild(li);
    });

    const zoneQ = document.getElementById("questions");
    O.questions.forEach(function (q) {
      zoneQ.appendChild(el("dt", "", q.qui));
      zoneQ.appendChild(el("dd", "", q.texte));
    });
  }

  const tableauBudget = document.getElementById("tableau-budget");
  if (tableauBudget) {
    const corps = tableauBudget.querySelector("tbody");
    const b = calculBudget();

    function ligneTableau(poste, calcul, montant, statut, classe) {
      const tr = el("tr", classe || "");
      const th = el("th", "", poste);
      th.scope = "row";
      tr.appendChild(th);
      const tdC = el("td", "", calcul);
      tdC.dataset.titre = "Calcul";
      tr.appendChild(tdC);
      const tdM = el("td", "montant", montant);
      tdM.dataset.titre = "Montant";
      tr.appendChild(tdM);
      const tdS = el("td");
      tdS.dataset.titre = "Statut";
      tdS.appendChild(badgeStatut(statut));
      tr.appendChild(tdS);
      corps.appendChild(tr);
    }

    b.lignes.forEach(function (x) {
      const l = x.ligne;
      const calcul = l.quantite > 1 ? l.detail + " × " + euros.format(x.prix) : l.detail;
      ligneTableau(l.poste, calcul, euros.format(x.montant), l.statut);
    });
    ligneTableau("Sous-total sans autocar ni métro", "", euros.format(b.total), "estimation", "sous-total");
    O.budgetOptions.forEach(function (l) {
      ligneTableau(l.poste, l.detail + " × " + euros.format(l.prix), euros.format(l.quantite * l.prix), l.statut, "option");
    });
    O.budgetManquant.forEach(function (l) {
      ligneTableau(l.poste, l.detail, "à venir", l.statut, "manquant");
    });

    // Les 3 « tickets » de la répartition
    const zoneTickets = document.getElementById("tickets");
    [
      { qui: "Établissement", detail: "part des 3 accompagnateurs", montant: euros.format(b.etablissement) },
      { qui: "Familles", detail: "part des 27 élèves, au total", montant: euros.format(b.familles) },
      { qui: "Par élève", detail: "sans autocar, métro ni pique-niques", montant: "≈ " + euros.format(b.parEleve), principal: true }
    ].forEach(function (t) {
      const d = el("div", "ticket" + (t.principal ? " principal" : ""));
      d.appendChild(el("span", "ticket-qui", t.qui));
      d.appendChild(el("span", "ticket-montant", t.montant));
      d.appendChild(el("span", "ticket-detail", t.detail));
      d.appendChild(badgeStatut("estimation"));
      zoneTickets.appendChild(d);
    });

    const piqueNique = O.budgetOptions[0].prix * 2;
    const avecPN = b.parEleve + piqueNique;
    document.getElementById("note-budget").textContent =
      "Avec les 2 pique-niques à 8 € : environ " + euros.format(avecPN) + " par élève. Par rapport au budget de départ de " +
      euros.format(O.budgetDepart) + ", il resterait environ " + euros.format(O.budgetDepart - avecPN) +
      " par élève pour l'autocar et le métro. C'est une estimation : elle sera corrigée avec le devis de l'autocar et les tarifs 2027 du MIJE.";

    // Simulateur
    const simMije = document.getElementById("sim-mije");
    const simCar = document.getElementById("sim-autocar");
    const simPN = document.getElementById("sim-piquenique");
    const simRes = document.getElementById("sim-resultat");

    function simuler() {
      const prixMije = parseFloat(simMije.value);
      const car = parseFloat(simCar.value) || 0;
      simRes.textContent = "";
      if (isNaN(prixMije) || prixMije <= 0) {
        simRes.appendChild(el("span", "sim-erreur", "Indique un prix de nuit au MIJE, par exemple 60."));
        return;
      }
      const s = calculBudget(prixMije);
      // L'autocar est partagé entre les 30 personnes ; l'établissement paye la part des adultes
      const parEleve = s.parEleve + (simPN.checked ? piqueNique : 0) + car / (O.eleves + O.adultes);
      const ecart = O.budgetDepart - parEleve;

      simRes.appendChild(el("span", "sim-etiquette", "Prix simulé par élève"));
      simRes.appendChild(el("span", "sim-montant", "≈ " + euros.format(parEleve)));
      let phrase;
      if (ecart >= 0) {
        phrase = "Il reste " + euros.format(ecart) + " sous le budget de départ de " + euros.format(O.budgetDepart) + (car ? "" : ", sans compter l'autocar") + ".";
      } else {
        phrase = "Cela dépasse le budget de départ de " + euros.format(-ecart) + ".";
      }
      simRes.appendChild(el("span", "sim-phrase" + (ecart < 0 ? " depasse" : ""), phrase + " Le métro n'est pas compté."));
    }
    [simMije, simCar, simPN].forEach(function (c) { c.addEventListener("input", simuler); });
    simuler();
  }

  const zoneFrise = document.getElementById("frise");
  if (zoneFrise) {
    O.calendrier.forEach(function (c) {
      const li = el("li", "frise-etape " + c.statut + (c.cle ? " cle" : ""));
      li.appendChild(el("span", "frise-date", c.date));
      li.appendChild(el("p", "", c.action));
      li.appendChild(badgeStatut(c.statut));
      zoneFrise.appendChild(li);
    });

    const zoneRisques = document.getElementById("liste-risques");
    O.risques.forEach(function (r) {
      const li = el("li", "risque");
      const si = el("div", "risque-si");
      si.appendChild(el("span", "risque-etiquette", "Si"));
      si.appendChild(el("p", "", r.risque));
      li.appendChild(si);
      const alors = el("div", "risque-alors");
      alors.appendChild(el("span", "risque-etiquette", "Plan B"));
      alors.appendChild(el("p", "", r.planB));
      li.appendChild(alors);
      zoneRisques.appendChild(li);
    });

    const zoneSources = document.getElementById("liste-sources");
    O.sources.forEach(function (s) {
      const li = el("li");
      if (s.url) {
        const a = el("a", "", s.nom);
        a.href = s.url;
        a.rel = "noopener";
        li.appendChild(a);
      } else {
        li.textContent = s.nom;
      }
      zoneSources.appendChild(li);
    });

    // Met en avant la partie visible dans le sous-menu
    const liensOrga = document.querySelectorAll(".choix-jour a");
    if ("IntersectionObserver" in window) {
      const obsOrga = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (en) {
          if (!en.isIntersecting) return;
          liensOrga.forEach(function (l) {
            l.classList.toggle("actif", l.getAttribute("href") === "#" + en.target.id);
          });
        });
      }, { rootMargin: "-30% 0px -60% 0px" });
      document.querySelectorAll(".partie").forEach(function (s) { obsOrga.observe(s); });
    }
  }

  // ---------- Jeux : quiz ----------
  // Le meilleur score est gardé dans le navigateur (localStorage), jamais envoyé.
  function lireScore(id) {
    try { return localStorage.getItem("quiz-" + id); } catch (e) { return null; }
  }
  function ecrireScore(id, score) {
    try {
      const ancien = parseInt(lireScore(id), 10);
      if (isNaN(ancien) || score > ancien) localStorage.setItem("quiz-" + id, score);
    } catch (e) { /* navigation privée : on ne garde pas le score */ }
  }

  const zoneQuizListe = document.getElementById("quiz-liste");
  if (zoneQuizListe) {
    const zoneQuiz = document.getElementById("quiz");

    function afficherListe() {
      zoneQuizListe.textContent = "";
      V.quiz.forEach(function (qz) {
        const li = el("li");
        const b = el("button", "quiz-carte");
        b.type = "button";
        b.appendChild(el("span", "pastille j" + qz.jour, "J" + qz.jour));
        const t = el("span", "quiz-carte-texte");
        t.appendChild(el("strong", "", qz.titre));
        const meilleur = lireScore(qz.id);
        t.appendChild(el("span", "", qz.lieu + " · " + (meilleur !== null ? "meilleur score " + meilleur + "/" + qz.questions.length : "pas encore joué")));
        b.appendChild(t);
        b.addEventListener("click", function () { lancerQuiz(qz); });
        li.appendChild(b);
        zoneQuizListe.appendChild(li);
      });
    }

    function lancerQuiz(qz) {
      let i = 0, score = 0;
      zoneQuiz.hidden = false;

      function question() {
        const q = qz.questions[i];
        zoneQuiz.textContent = "";
        const ent = el("div", "quiz-entete");
        ent.appendChild(el("span", "pastille j" + qz.jour, "J" + qz.jour));
        ent.appendChild(el("strong", "", qz.titre));
        ent.appendChild(el("span", "quiz-progres", "Question " + (i + 1) + " sur " + qz.questions.length));
        zoneQuiz.appendChild(ent);

        const barre = el("div", "quiz-barre");
        const rempli = el("span");
        rempli.style.width = (i / qz.questions.length * 100) + "%";
        barre.appendChild(rempli);
        zoneQuiz.appendChild(barre);

        const h3 = el("h3", "quiz-question", q.q);
        h3.id = "quiz-q";
        zoneQuiz.appendChild(h3);

        const choix = el("div", "quiz-choix");
        choix.setAttribute("role", "group");
        choix.setAttribute("aria-labelledby", "quiz-q");
        const boutons = q.choix.map(function (c, n) {
          const b = el("button", "quiz-reponse", c);
          b.type = "button";
          b.addEventListener("click", function () { repondre(n, boutons); });
          choix.appendChild(b);
          return b;
        });
        zoneQuiz.appendChild(choix);
        zoneQuiz.focus({ preventScroll: true });
      }

      function repondre(n, boutons) {
        const q = qz.questions[i];
        const juste = n === q.bonne;
        if (juste) score++;
        boutons.forEach(function (b, k) {
          b.disabled = true;
          if (k === q.bonne) b.classList.add("bonne");
          if (k === n && !juste) b.classList.add("fausse");
        });
        const retour = el("div", "quiz-retour " + (juste ? "juste" : "faux"));
        retour.appendChild(el("strong", "", juste ? "Bonne réponse !" : "Pas tout à fait. La bonne réponse : " + q.choix[q.bonne] + "."));
        retour.appendChild(el("p", "", q.explication));
        zoneQuiz.appendChild(retour);

        const fin = i === qz.questions.length - 1;
        const suivant = el("button", "bouton-principal", fin ? "Voir mon score" : "Question suivante");
        suivant.type = "button";
        suivant.addEventListener("click", function () {
          if (fin) { resultat(); } else { i++; question(); }
        });
        zoneQuiz.appendChild(suivant);
        suivant.focus();
      }

      function resultat() {
        ecrireScore(qz.id, score);
        afficherListe();
        const total = qz.questions.length;
        zoneQuiz.textContent = "";
        const ent = el("div", "quiz-entete");
        ent.appendChild(el("span", "pastille j" + qz.jour, "J" + qz.jour));
        ent.appendChild(el("strong", "", qz.titre));
        zoneQuiz.appendChild(ent);
        zoneQuiz.appendChild(el("p", "quiz-score", score + "/" + total));
        const message = score === total ? "Parfait, tu es prêt pour la visite !"
          : score >= total / 2 ? "Bien joué. Relis les explications pour les questions ratées."
          : "Pas grave : tu en sauras plus après la visite. Tu peux recommencer.";
        zoneQuiz.appendChild(el("p", "quiz-message", message));

        const actions = el("div", "frise-actions");
        const encore = el("button", "bouton-principal", "Recommencer ce quiz");
        encore.type = "button";
        encore.addEventListener("click", function () { lancerQuiz(qz); });
        const autre = el("button", "bouton-carte", "Choisir un autre quiz");
        autre.type = "button";
        autre.addEventListener("click", function () {
          zoneQuiz.hidden = true;
          zoneQuizListe.querySelector("button").focus();
        });
        actions.appendChild(encore);
        actions.appendChild(autre);
        zoneQuiz.appendChild(actions);
        encore.focus();
      }

      question();
      zoneQuiz.scrollIntoView({ block: "nearest" });
    }

    afficherListe();
  }

  // ---------- Jeux : remettre les inventions dans l'ordre ----------
  const zoneFriseJeu = document.getElementById("frise-jeu");
  if (zoneFriseJeu) {
    const resultatFrise = document.getElementById("frise-resultat");
    let ordre = [];

    function melanger() {
      do {
        ordre = V.frise.items.slice().sort(function () { return Math.random() - 0.5; });
      } while (ordre.every(function (it, k) { return k === 0 || it.annee > ordre[k - 1].annee; }));
      resultatFrise.textContent = "";
      afficherFrise();
    }

    function deplacer(k, sens, focusSens) {
      const cible = k + sens;
      if (cible < 0 || cible >= ordre.length) return;
      const tmp = ordre[k]; ordre[k] = ordre[cible]; ordre[cible] = tmp;
      resultatFrise.textContent = "";
      afficherFrise();
      // Garde le focus sur l'invention déplacée, pour pouvoir continuer au clavier
      const bouton = zoneFriseJeu.children[cible].querySelector(focusSens === -1 ? ".monter" : ".descendre");
      (bouton.disabled ? zoneFriseJeu.children[cible].querySelector("button:not([disabled])") : bouton).focus();
    }

    function afficherFrise(verifie) {
      zoneFriseJeu.textContent = "";
      const trie = V.frise.items.slice().sort(function (a, b) { return a.annee - b.annee; });
      ordre.forEach(function (it, k) {
        const bienPlace = verifie && trie[k] === it;
        const li = el("li", "frise-item" + (verifie ? (bienPlace ? " juste" : " faux") : ""));
        const txt = el("div", "frise-item-texte");
        txt.appendChild(el("strong", "", it.nom));
        txt.appendChild(el("span", "", it.texte));
        li.appendChild(txt);
        if (bienPlace) li.appendChild(el("span", "frise-annee", String(it.annee)));

        const btns = el("div", "frise-boutons");
        const haut = el("button", "monter", "↑");
        haut.type = "button";
        haut.setAttribute("aria-label", "Monter : " + it.nom);
        haut.disabled = k === 0;
        haut.addEventListener("click", function () { deplacer(k, -1, -1); });
        const bas = el("button", "descendre", "↓");
        bas.type = "button";
        bas.setAttribute("aria-label", "Descendre : " + it.nom);
        bas.disabled = k === ordre.length - 1;
        bas.addEventListener("click", function () { deplacer(k, 1, 1); });
        btns.appendChild(haut);
        btns.appendChild(bas);
        li.appendChild(btns);
        zoneFriseJeu.appendChild(li);
      });
    }

    document.getElementById("frise-verifier").addEventListener("click", function () {
      const trie = V.frise.items.slice().sort(function (a, b) { return a.annee - b.annee; });
      const justes = ordre.filter(function (it, k) { return trie[k] === it; }).length;
      afficherFrise(true);
      resultatFrise.textContent = justes === ordre.length
        ? "Bravo, tout est dans l'ordre ! Du télégraphe de Chappe au Web : presque 200 ans de télécoms."
        : justes + " sur " + ordre.length + " sont bien placées (en vert). Déplace les autres et vérifie encore.";
    });
    document.getElementById("frise-melanger").addEventListener("click", melanger);

    melanger();
  }

  // ---------- Aide : numéros d'urgence ----------
  const zoneUrgences = document.getElementById("urgences");
  if (zoneUrgences) {
    V.urgences.forEach(function (u) {
      const li = el("li");
      const a = el("a", "urgence");
      a.href = u.numero === "114" ? "sms:114" : "tel:" + u.numero;
      a.appendChild(el("span", "urgence-numero", u.numero));
      const t = el("span", "urgence-texte");
      t.appendChild(el("strong", "", u.nom));
      t.appendChild(el("span", "", u.texte));
      a.appendChild(t);
      li.appendChild(a);
      zoneUrgences.appendChild(li);
    });
  }
})();
