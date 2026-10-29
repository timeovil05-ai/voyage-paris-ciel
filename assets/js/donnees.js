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

  // Le lien avec la filière CIEL, visite par visite
  liensCiel: [
    { lieu: "Notre-Dame", theme: "Numérique et patrimoine", texte: "Scan 3D et jumeau numérique pour reconstruire la cathédrale." },
    { lieu: "Cité des sciences", theme: "Numérique et métiers", texte: "Manipulations à l'e-LAB et métiers des réseaux à la Cité des métiers." },
    { lieu: "Arts et Métiers", theme: "Électronique et télécoms", texte: "Du télégraphe aux réseaux actuels." },
    { lieu: "Maison de la Radio", theme: "Audiovisuel et diffusion", texte: "Le trajet du son : micro, régie, diffusion." }
  ]
};
