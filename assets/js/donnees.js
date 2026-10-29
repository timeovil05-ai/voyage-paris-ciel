/*
  Fichier de données du voyage : notre « petite base de données ».
  Source : Dossier_voyage_Paris_CIEL_v1.docx (version du 29/10/2026).
  Pour mettre le site à jour, on modifie seulement ce fichier.

  Statuts possibles (les mêmes que dans le dossier) :
  verifie, estimation, attente, confirmer, afaire, fait, proposition
*/

window.VOYAGE = {
  depart: "2027-05-10T08:30:00+02:00",

  statuts: {
    verifie:     { nom: "Vérifié",     aide: "Trouvé sur un site officiel ou un document reçu." },
    estimation:  { nom: "Estimation",  aide: "Calcul fait à partir de chiffres vérifiés." },
    confirmer:   { nom: "À confirmer", aide: "Question posée ou à poser au site concerné." },
    attente:     { nom: "En attente",  aide: "Demande envoyée, pas encore de réponse." },
    proposition: { nom: "Proposition", aide: "Idée de l'équipe, à valider avec les enseignants." },
    fait:        { nom: "Fait",        aide: "Démarche terminée." },
    afaire:      { nom: "À faire",     aide: "Pas encore fait." }
  },

  // Les stations de la « Ligne S » (page d'accueil)
  ligne: [
    { nom: "Saint-Laurent-sur-Sèvre", detail: "Lycée Saint Gab'", jour: 1, terminus: true },
    { nom: "Notre-Dame", detail: "Lundi après-midi", jour: 1 },
    { nom: "Cité des sciences", detail: "Mardi matin", jour: 2 },
    { nom: "Arts et Métiers", detail: "Mardi après-midi", jour: 2 },
    { nom: "Maison de la Radio", detail: "Mercredi matin", jour: 3 },
    { nom: "Saint-Laurent-sur-Sèvre", detail: "Retour au lycée", jour: 3, terminus: true }
  ],

  jours: [
    {
      id: "j1",
      numero: 1,
      date: "Lundi 10 mai 2027",
      titre: "Départ et Notre-Dame",
      etapes: [
        { heure: "8 h 30", titre: "Départ du lycée en autocar", texte: "Pause de 45 min en route (règle européenne : pause après 4 h 30 de conduite).", statut: "estimation", type: "depart" },
        { trajet: "Autocar, environ 369 km et 3 h 51 de conduite sans pause" },
        { heure: "≈ 13 h 15", titre: "Arrivée près de l'auberge MIJE", texte: "6 rue de Fourcy, Paris 4e. Dépôt des bagages à la consigne (à confirmer pour un groupe), puis pique-nique.", statut: "confirmer", type: "pause" },
        { trajet: "À pied, environ 14 min" },
        { heure: "15 h – 16 h", titre: "Notre-Dame de Paris", texte: "Visite libre, sans prise de parole, 1 h maximum à l'intérieur. Angle CIEL : le numérique au service de la reconstruction.", statut: "verifie", type: "visite" },
        { heure: "16 h 30", titre: "Retour à l'auberge", texte: "Les chambres ouvrent à 15 h ou 15 h 30 selon la source.", statut: "confirmer", type: "pause" },
        { heure: "Soir", titre: "Dîner à l'auberge et débrief", texte: "Demi-pension.", statut: "verifie", type: "pause" }
      ]
    },
    {
      id: "j2",
      numero: 2,
      date: "Mardi 11 mai 2027",
      titre: "Cité des sciences et Arts et Métiers",
      etapes: [
        { heure: "8 h 15", titre: "Départ de l'auberge", texte: "En métro vers la Cité des sciences et de l'industrie.", statut: "verifie", type: "depart" },
        { trajet: "Métro ligne 7, environ 33 min avec marge" },
        { heure: "10 h – 13 h", titre: "Cité des sciences", texte: "e-LAB (espace trilingue), Carrefour numérique, Cité des métiers. Forfait groupe de 200 €. Atelier réseaux et cybersécurité à confirmer.", statut: "confirmer", type: "visite" },
        { heure: "13 h", titre: "Pique-nique", statut: "estimation", type: "pause" },
        { trajet: "Métro, environ 28 min avec marge" },
        { heure: "15 h – 16 h 30", titre: "Musée des Arts et Métiers", texte: "Visite guidée « La saga des télécommunications » (1 h 30, 100 € le groupe).", statut: "verifie", type: "visite" },
        { trajet: "À pied, environ 23 min" },
        { heure: "16 h 30", titre: "Retour à l'auberge", statut: "verifie", type: "pause" },
        { heure: "Soir", titre: "Dîner et préparation des comptes rendus", statut: "verifie", type: "pause" }
      ]
    },
    {
      id: "j3",
      numero: 3,
      date: "Mercredi 12 mai 2027",
      titre: "Maison de la Radio et retour",
      etapes: [
        { heure: "7 h 30", titre: "Petit-déjeuner", texte: "Horaire à confirmer. Les chambres sont libérées avant midi.", statut: "confirmer", type: "pause" },
        { heure: "8 h 15", titre: "Chargement des bagages dans l'autocar", statut: "estimation", type: "depart" },
        { trajet: "Autocar vers Paris 16e, 38 à 60 min le matin" },
        {
          heure: "10 h – 11 h 30", titre: "Maison de la Radio et de la Musique",
          texte: "Visite « Histoire et architecture » (1 h 30, 120 € la classe). C'est le seul créneau trouvé ce jour-là.",
          statut: "verifie", type: "visite",
          planB: {
            titre: "Plan B : tour Eiffel",
            texte: "Si la Maison de la Radio n'est pas réservable. Environ 244 € par les escaliers, 389 € avec ascenseur. Lien CIEL : histoire de la radio et des antennes de diffusion.",
            statut: "estimation"
          }
        },
        { heure: "11 h 30 – 12 h", titre: "Départ vers la Vendée", texte: "Pause de 45 min en route.", statut: "estimation", type: "depart" },
        { trajet: "Autocar, environ 3 h 51 de conduite sans pause" },
        { heure: "≈ 17 h 30", titre: "Arrivée au lycée", statut: "estimation", type: "arrivee" }
      ]
    }
  ],

  // Les lieux (page Lieux). Positions GPS approximatives, pour la carte.
  lieux: [
    {
      id: "auberge", nom: "Auberge MIJE Fourcy", sorte: "auberge",
      quand: "Lundi soir au mercredi matin", jour: null,
      adresse: "6 rue de Fourcy, 75004 Paris", acces: "Métro Saint-Paul (ligne 1) ou Pont Marie (ligne 7)",
      gps: [48.8553, 2.3601],
      texte: "Notre auberge de jeunesse pour les 2 nuits. Chambres non mixtes de 2 à 10 lits, demi-pension (dîner et petit-déjeuner).",
      statut: "verifie"
    },
    {
      id: "notre-dame", nom: "Notre-Dame de Paris", sorte: "visite",
      quand: "Lundi 10 mai, 15 h – 16 h", jour: 1,
      adresse: "Parvis Notre-Dame, 75004 Paris", acces: "À pied depuis l'auberge, environ 14 min",
      gps: [48.8530, 2.3499],
      objectif: "Comprendre comment le numérique aide à reconstruire et à documenter un monument.",
      mission: "Repérer 3 éléments de la cathédrale. Après la visite, chercher quel outil numérique a servi pour l'un d'eux (scan 3D, maquette numérique).",
      ciel: "Numérique, données, modélisation 3D, jumeau numérique.",
      matieres: "Enseignement pro CIEL, histoire-géographie.",
      aConfirmer: "Existence d'un dossier pédagogique de Notre-Dame pour les lycéens.",
      statut: "verifie"
    },
    {
      id: "cite-sciences", nom: "Cité des sciences et de l'industrie", sorte: "visite",
      quand: "Mardi 11 mai, 10 h – 13 h", jour: 2,
      adresse: "30 avenue Corentin-Cariou, 75019 Paris", acces: "Métro Porte de la Villette (ligne 7)",
      gps: [48.8956, 2.3880],
      objectif: "Découvrir des outils numériques et des métiers du numérique, de l'électronique et des réseaux.",
      mission: "Tester une manipulation (e-LAB ou Carrefour numérique) et noter un métier de la Cité des métiers qui t'intéresse, avec la formation à suivre.",
      ciel: "Numérique, réseaux, cybersécurité, orientation après le bac pro (BTS CIEL).",
      matieres: "Enseignement pro CIEL, anglais (e-LAB trilingue, niveau A2), orientation.",
      aConfirmer: "Atelier réseaux et cybersécurité pour des lycéens ; contenu du forfait de 200 €.",
      statut: "confirmer"
    },
    {
      id: "arts-metiers", nom: "Musée des Arts et Métiers", sorte: "visite",
      quand: "Mardi 11 mai, 15 h – 16 h 30", jour: 2,
      adresse: "60 rue Réaumur, 75003 Paris", acces: "Métro Arts et Métiers (lignes 3 et 11)",
      gps: [48.8663, 2.3555],
      objectif: "Comprendre l'histoire des télécommunications, du télégraphe aux réseaux actuels.",
      mission: "Construire une frise de 5 inventions vues pendant la visite, avec leur date et leur principe en une phrase.",
      ciel: "Électronique, télécommunications, réseaux.",
      matieres: "Enseignement pro CIEL, maths-sciences, histoire-géographie.",
      aConfirmer: "Créneau du mardi 11 mai à 15 h pour 30 personnes (réservation ouverte en 2027).",
      statut: "verifie"
    },
    {
      id: "maison-radio", nom: "Maison de la Radio et de la Musique", sorte: "visite",
      quand: "Mercredi 12 mai, 10 h – 11 h 30", jour: 3,
      adresse: "116 avenue du Président-Kennedy, 75016 Paris", acces: "En autocar depuis l'auberge, 38 à 60 min",
      gps: [48.8527, 2.2786],
      objectif: "Comprendre comment un programme de radio est produit et diffusé.",
      mission: "Dessiner le trajet du son : micro, régie, diffusion. Noter 2 métiers techniques rencontrés.",
      ciel: "Audiovisuel, électronique, chaîne de diffusion.",
      matieres: "Enseignement pro CIEL, maths-sciences (ondes), histoire (architecture).",
      aConfirmer: "Existence d'une visite plus technique (studios, régie) ; réservations ouvertes le 13 janvier 2027 à 11 h.",
      statut: "verifie"
    },
    {
      id: "tour-eiffel", nom: "Tour Eiffel (plan B)", sorte: "planb",
      quand: "Mercredi 12 mai, seulement si la Maison de la Radio n'est pas réservable", jour: 3,
      adresse: "Champ-de-Mars, 75007 Paris", acces: "En autocar depuis l'auberge",
      gps: [48.8584, 2.2945],
      texte: "Environ 244 € par groupe par les escaliers, 389 € avec ascenseur. Lien CIEL : histoire de la radio et des antennes de diffusion.",
      statut: "estimation"
    }
  ],

  // Les groupes : DONNÉES FICTIVES. Les élèves ont un code, jamais leur vrai nom.
  // Les numéros 06 39 98 xx xx sont réservés par l'Arcep aux œuvres de fiction : ils n'appartiennent à personne.
  groupes: [
    {
      id: "fibre", nom: "Groupe Fibre", couleur: "#E30613",
      referent: "Accompagnateur A", telephone: "06 39 98 00 01",
      codes: ["E01", "E02", "E03", "E04", "E05", "E06", "E07", "E08", "E09"]
    },
    {
      id: "wifi", nom: "Groupe Wi-Fi", couleur: "#22407A",
      referent: "Accompagnatrice B", telephone: "06 39 98 00 02",
      codes: ["E10", "E11", "E12", "E13", "E14", "E15", "E16", "E17", "E18"]
    },
    {
      id: "5g", nom: "Groupe 5G", couleur: "#1F9C98",
      referent: "Accompagnateur C", telephone: "06 39 98 00 03",
      codes: ["E19", "E20", "E21", "E22", "E23", "E24", "E25", "E26", "E27"]
    }
  ],

  // Page Aide : numéros d'urgence officiels (gratuits, valables partout en France)
  urgences: [
    { numero: "112", nom: "Numéro d'urgence européen", texte: "Pour toute urgence, même depuis un téléphone sans carte SIM." },
    { numero: "15", nom: "SAMU", texte: "Malaise, blessure grave, problème de santé urgent." },
    { numero: "17", nom: "Police", texte: "Agression, vol, danger immédiat." },
    { numero: "18", nom: "Pompiers", texte: "Incendie, accident, personne en danger." },
    { numero: "114", nom: "Urgence par SMS", texte: "Si tu ne peux pas parler (personnes sourdes, malentendantes ou en danger)." }
  ],

  // ===== Jeux (page Jeux) =====
  // Quiz d'exemple écrits par l'équipe. Les profs peuvent en ajouter ou les remplacer :
  // copier un bloc { ... }, changer les textes, et indiquer dans « bonne » le numéro
  // de la bonne réponse (0 = la première, 1 = la deuxième, etc.).
  quiz: [
    {
      id: "notre-dame", titre: "Notre-Dame et le numérique", lieu: "Notre-Dame de Paris", jour: 1, auteur: "Équipe du projet",
      questions: [
        { q: "En quelle année un incendie a-t-il gravement abîmé Notre-Dame ?", choix: ["2009", "2015", "2019", "2022"], bonne: 2,
          explication: "L'incendie a eu lieu le 15 avril 2019. La cathédrale a rouvert en décembre 2024." },
        { q: "Comment appelle-t-on la copie numérique en 3D d'un bâtiment réel ?", choix: ["Un avatar", "Un jumeau numérique", "Un hologramme", "Un clone réseau"], bonne: 1,
          explication: "Un jumeau numérique est un modèle 3D fidèle du bâtiment. Il aide à comprendre et à reconstruire." },
        { q: "Quel outil mesure un bâtiment avec des millions de points grâce à un laser ?", choix: ["Un scanner 3D", "Un oscilloscope", "Un multimètre", "Un routeur"], bonne: 0,
          explication: "Le scanner laser 3D enregistre la forme exacte des murs, des voûtes et des statues." },
        { q: "Combien de temps maximum restons-nous à l'intérieur de Notre-Dame ?", choix: ["30 min", "1 h", "2 h", "Toute l'après-midi"], bonne: 1,
          explication: "La visite libre est prévue de 15 h à 16 h, 1 h maximum à l'intérieur." }
      ]
    },
    {
      id: "cite-sciences", titre: "Cité des sciences et métiers", lieu: "Cité des sciences", jour: 2, auteur: "Équipe du projet",
      questions: [
        { q: "Quelle ligne de métro prenons-nous pour aller à la Cité des sciences ?", choix: ["Ligne 1", "Ligne 4", "Ligne 7", "Ligne 14"], bonne: 2,
          explication: "La ligne 7 relie notre quartier à Porte de la Villette, environ 33 min avec la marge." },
        { q: "Quel BTS peut-on préparer après un bac pro CIEL ?", choix: ["BTS CIEL", "BTS Tourisme", "BTS Bâtiment", "BTS Diététique"], bonne: 0,
          explication: "Le BTS CIEL (cybersécurité, informatique et réseaux, électronique) est la suite logique du bac pro." },
        { q: "Que veut dire « cybersécurité » ?", choix: ["Réparer des ordinateurs cassés", "Protéger les systèmes et les données contre les attaques", "Créer des jeux vidéo", "Vendre du matériel informatique"], bonne: 1,
          explication: "La cybersécurité protège les réseaux, les appareils et les données." },
        { q: "Combien coûte le forfait groupe de la Cité des sciences ?", choix: ["100 €", "120 €", "200 €", "420 €"], bonne: 2,
          explication: "Le forfait groupe est de 200 € (grille des tarifs groupes de juillet 2026)." }
      ]
    },
    {
      id: "arts-metiers", titre: "La saga des télécoms", lieu: "Arts et Métiers", jour: 2, auteur: "Équipe du projet",
      questions: [
        { q: "Le télégraphe de Chappe transmettait les messages…", choix: ["par des signaux visibles de tour en tour", "par un câble électrique", "par ondes radio", "par fibre optique"], bonne: 0,
          explication: "Des bras articulés sur des tours formaient des signaux, lus à la longue-vue par la tour suivante." },
        { q: "Le code Morse transforme les lettres en…", choix: ["couleurs", "points et traits", "nombres binaires de 8 bits", "notes de musique"], bonne: 1,
          explication: "Chaque lettre est une suite de signaux courts (points) et longs (traits)." },
        { q: "Qui a déposé le brevet du téléphone en 1876 ?", choix: ["Thomas Edison", "Guglielmo Marconi", "Alexander Graham Bell", "Nikola Tesla"], bonne: 2,
          explication: "Alexander Graham Bell a déposé son brevet en 1876." },
        { q: "Dans une fibre optique, l'information voyage sous forme de…", choix: ["courant électrique", "lumière", "son", "ondes radio"], bonne: 1,
          explication: "La fibre guide de la lumière : c'est très rapide et peu sensible aux perturbations." }
      ]
    },
    {
      id: "maison-radio", titre: "Le trajet du son à la radio", lieu: "Maison de la Radio", jour: 3, auteur: "Équipe du projet",
      questions: [
        { q: "Dans quel ordre passe le son d'une émission de radio ?", choix: ["Régie, micro, diffusion", "Micro, régie, diffusion", "Diffusion, micro, régie", "Micro, diffusion, régie"], bonne: 1,
          explication: "Le micro capte la voix, la régie règle et mélange le son, puis l'émetteur le diffuse." },
        { q: "Dans « FM », que veut dire la lettre M ?", choix: ["Musique", "Mégahertz", "Modulation", "Mobile"], bonne: 2,
          explication: "FM veut dire modulation de fréquence." },
        { q: "En quelle unité mesure-t-on une fréquence ?", choix: ["En volts", "En watts", "En hertz", "En décibels"], bonne: 2,
          explication: "La fréquence se mesure en hertz (Hz). Une radio FM émet autour de 100 mégahertz." },
        { q: "Quelle est la forme du bâtiment de la Maison de la Radio ?", choix: ["Une tour carrée", "Un cercle", "Un triangle", "Une pyramide"], bonne: 1,
          explication: "Le bâtiment, inauguré en 1963, est rond. On la surnomme « la Maison ronde »." }
      ]
    }
  ],

  // Mini-jeu : remettre les inventions dans l'ordre (lien avec la mission des Arts et Métiers)
  frise: {
    titre: "Remets les inventions dans l'ordre",
    items: [
      { annee: 1794, nom: "Télégraphe de Chappe", texte: "Signaux visibles entre des tours" },
      { annee: 1844, nom: "Premier message en morse", texte: "Télégraphe électrique" },
      { annee: 1876, nom: "Téléphone", texte: "La voix transmise par un fil" },
      { annee: 1895, nom: "Radio (TSF)", texte: "Premiers essais de Marconi sans fil" },
      { annee: 1989, nom: "Web", texte: "Proposé par Tim Berners-Lee au CERN" }
    ]
  },

  // ===== Espace organisateurs (parties 7 à 12 du dossier) =====
  orga: {
    eleves: 27,
    adultes: 3,
    budgetDepart: 275, // € par personne, évoqué au début du projet

    // Lignes du budget. Le montant est calculé par le site : quantité × prix.
    // repartition : "tous" = partagé entre les 30 personnes ; "adultes" = seulement les 3 accompagnateurs
    budget: [
      { poste: "Hébergement MIJE (demi-pension)", quantite: 60, detail: "30 pers. × 2 nuits", prix: 60, repartition: "tous", statut: "estimation", reglable: "mije" },
      { poste: "Adhésion MIJE", quantite: 1, detail: "1 groupe", prix: 54, repartition: "tous", statut: "verifie" },
      { poste: "Taxe de séjour (adultes)", quantite: 6, detail: "3 adultes × 2 nuits", prix: 2.60, repartition: "adultes", statut: "verifie" },
      { poste: "Cité des sciences (forfait)", quantite: 1, detail: "1 groupe", prix: 200, repartition: "tous", statut: "verifie" },
      { poste: "Arts et Métiers (visite guidée)", quantite: 1, detail: "1 groupe", prix: 100, repartition: "tous", statut: "verifie" },
      { poste: "Maison de la Radio (visite)", quantite: 1, detail: "1 groupe", prix: 120, repartition: "tous", statut: "verifie" }
    ],
    // Hors sous-total, comme dans le dossier
    budgetOptions: [
      { poste: "Pique-niques MIJE (lundi et mardi)", quantite: 60, detail: "30 pers. × 2 repas", prix: 8, statut: "estimation" }
    ],
    budgetManquant: [
      { poste: "Autocar", detail: "devis Richou Voyages", statut: "attente" },
      { poste: "Métro dans Paris", detail: "prix des tickets à calculer", statut: "afaire" }
    ],

    // Prochaine date importante (pour le compte à rebours)
    dateCle: { date: "2027-01-13T11:00:00+01:00", titre: "Ouverture des réservations de la Maison de la Radio", texte: "Réserver le créneau du mercredi 12 mai à 10 h (120 €)." },

    calendrier: [
      { date: "29/10/2026", action: "Demande de devis hébergement au MIJE (formulaire envoyé, accusé de réception reçu).", statut: "fait" },
      { date: "29/10/2026", action: "Demande de devis autocar à Richou Voyages : erreur d'envoi, nouvel essai à faire.", statut: "afaire" },
      { date: "Novembre 2026", action: "Envoyer les 4 emails prêts : Arts et Métiers, Cité des sciences, Maison de la Radio, Notre-Dame. Aucun n'est encore envoyé.", statut: "afaire" },
      { date: "Avant le 13/01/2027", action: "Préparer la réservation Maison de la Radio (compte et informations du groupe).", statut: "afaire" },
      { date: "13/01/2027, 11 h", action: "Ouverture des réservations de la Maison de la Radio : réserver le créneau du mercredi 12 mai à 10 h (120 €).", statut: "verifie", cle: true },
      { date: "≈ 11/02 au 20/04/2027", action: "Fenêtre de réservation du musée des Arts et Métiers pour mai 2027 (paiement dans les 21 jours).", statut: "confirmer" },
      { date: "Selon devis", action: "Cité des sciences : réservation par devis, délai à confirmer par email.", statut: "attente" },
      { date: "Selon devis", action: "MIJE : confirmation et acompte (30 % annoncé si plus de 10 semaines avant).", statut: "confirmer" },
      { date: "Pas de réservation", action: "Notre-Dame : visite libre sans prise de parole. Surveiller la plateforme réservée aux scolaires (calendrier ouvert jusqu'en décembre 2026).", statut: "verifie" },
      { date: "Avant le voyage", action: "Décision de la direction et de l'OGEC, autorisations parentales, assurance, liste des élèves et des accompagnateurs.", statut: "afaire" }
    ],

    demarches: [
      { nom: "Programme choisi et vérifié sur les sites officiels", statut: "verifie", remarque: "4 visites et horaires de trajet. Dates de réservation à reconfirmer en 2027." },
      { nom: "Tarifs des visites (420 € au total)", statut: "verifie", remarque: "Tarifs affichés en 2026 : à reconfirmer pour 2027." },
      { nom: "Tarifs MIJE 2026", statut: "verifie", remarque: "Tarifs 2027 : en attente de la réponse du MIJE." },
      { nom: "Devis MIJE", statut: "attente", remarque: "Formulaire envoyé le 29/10/2026." },
      { nom: "Devis autocar", statut: "attente", remarque: "Formulaire en erreur, nouvel essai." },
      { nom: "Emails aux 4 sites de visite", statut: "afaire", remarque: "Brouillons prêts dans Outlook, 2 à 3 questions chacun, non envoyés." },
      { nom: "Fiches pédagogiques", statut: "proposition", remarque: "À valider avec les enseignants." },
      { nom: "Dossier final et oral", statut: "afaire", remarque: "Oral devant la classe fin novembre 2026." }
    ],

    risques: [
      { risque: "Maison de la Radio complète ou créneau refusé", planB: "Visite de la tour Eiffel le mercredi (réservation avec compte scolaire, environ 244 € par les escaliers). Autre idée à étudier : une autre visite audiovisuelle à Paris." },
      { risque: "Pas d'atelier réseaux et cybersécurité à la Cité des métiers", planB: "Garder l'e-LAB et le Carrefour numérique. Demander à la Cité des sciences une autre activité numérique pour lycéens." },
      { risque: "MIJE complet à nos dates", planB: "Demander les deux autres auberges MIJE (Fauconnier, Maubuisson) ou une autre auberge de jeunesse à Paris." },
      { risque: "Bagages refusés à la bagagerie le lundi", planB: "L'autocar garde les bagages pendant Notre-Dame (option A), puis les dépose à l'auberge." },
      { risque: "Chambres disponibles seulement à 15 h 30", planB: "Le programme du lundi tient : retour à l'auberge à 16 h 30." },
      { risque: "Circulation difficile le mercredi matin", planB: "Marge prévue : départ de l'auberge à 8 h 15 pour une visite à 10 h (trajet de 38 à 60 min)." },
      { risque: "Panne ou grève dans le métro (mardi)", planB: "Prévoir une marge de 30 min dans les trajets et un itinéraire de secours à pied ou en bus." }
    ],

    questions: [
      { qui: "MIJE", texte: "Disponibilités et tarifs 2027, heure d'accès aux chambres (15 h ou 15 h 30), bagagerie le lundi, règle d'encadrement pour 27 élèves, acompte et annulation." },
      { qui: "Autocar", texte: "Prix de l'option A (autocar à Paris, avec hôtel du chauffeur) et de l'option B (aller-retour supplémentaire)." },
      { qui: "Maison de la Radio", texte: "Créneau du 12 mai à 10 h pour 30 personnes ; existence d'une visite plus technique." },
      { qui: "Cité des sciences", texte: "Date et façon de réserver ; contenu du forfait de 200 € ; atelier réseaux et cybersécurité." },
      { qui: "Arts et Métiers", texte: "Créneau du 11 mai à 15 h pour 30 personnes et date d'ouverture des réservations." },
      { qui: "Notre-Dame", texte: "Confirmation de la visite libre pour 30 personnes et dossier pédagogique." },
      { qui: "Établissement", texte: "Accord de la direction et de l'OGEC, qui paye la part des accompagnateurs, assurance." }
    ],

    sources: [
      { nom: "MIJE, « Présentation et tarifs groupes 2026 » (PDF)", url: "https://documents.mije.com/mije/MIJE-Paris-tarifs-groupes-2026.pdf" },
      { nom: "MIJE, formulaire de devis hébergement", url: "https://www.mije.com/devis/devis-hebergement" },
      { nom: "Richou Voyages, transport en autocar", url: "https://www.richou-voyages.fr/transport" },
      { nom: "Richou Voyages, sites d'exploitation", url: "https://www.richou-voyages.fr/sites-exploitation" },
      { nom: "ONISEP, fiche du lycée Saint-Gabriel Saint-Michel", url: "https://www.onisep.fr/ressources/structures-enseignement/pays-de-la-loire/vendee/lycee-professionnel-prive-saint-gabriel-saint-michel" },
      { nom: "Sites officiels consultés en octobre 2026 : Radio France, musée des Arts et Métiers, Cité des sciences (tarifs groupes de juillet 2026), Notre-Dame de Paris" },
      { nom: "Google Maps (durées de trajet), règlement (CE) n° 561/2006 (temps de conduite), circulaire 2011-117 (sorties scolaires)" }
    ]
  },

  // Le lien avec la filière CIEL, visite par visite
  liensCiel: [
    { lieu: "Notre-Dame", theme: "Numérique et patrimoine", texte: "Scan 3D et jumeau numérique pour reconstruire la cathédrale." },
    { lieu: "Cité des sciences", theme: "Numérique et métiers", texte: "Manipulations à l'e-LAB et métiers des réseaux à la Cité des métiers." },
    { lieu: "Arts et Métiers", theme: "Électronique et télécoms", texte: "Du télégraphe aux réseaux actuels." },
    { lieu: "Maison de la Radio", theme: "Audiovisuel et diffusion", texte: "Le trajet du son : micro, régie, diffusion." }
  ]
};
