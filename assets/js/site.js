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

})();
