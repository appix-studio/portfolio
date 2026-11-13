# APPIX STUDIO — Portfolio

<p align="center">
  <img src="images/logo-appix-studio-blanc.svg" alt="APPIX STUDIO" width="190">
</p>

<p align="center">
  <strong>Six projets. Une signature.</strong><br>
  Portfolio web d’APPIX STUDIO — conception d’interfaces et développement de sites sur mesure.
</p>

<p align="center">
  <a href="https://appixstudio.fr">Site officiel</a> ·
  <a href="https://github.com/appix-studio/portfolio">Dépôt GitHub</a> ·
  <a href="mailto:appix.web@gmail.com">Contact</a>
</p>

---

## Présentation

Ce dépôt contient le portfolio d’**APPIX STUDIO**, un studio web indépendant. Le site présente six projets représentatifs de différents besoins : site vitrine, identité visuelle, landing page et expérience e-commerce.

L’objectif du portfolio est de montrer le travail réalisé, les choix de conception et l’approche de développement, tout en permettant aux visiteurs de prendre contact ou de préparer une demande grâce à un brief guidé.

## Aperçu des projets

| Projet | Type | Présentation |
| --- | --- | --- |
| **Maison Veloria** | Concept fictif | Site vitrine pour une pâtisserie artisanale haut de gamme |
| **Zorvék** | Concept fictif | Expérience e-commerce pour une marque de café torréfié |
| **APPIX** | Projet personnel | Site du studio, ses services, ses archives et son brief |
| **MG PIXEL** | Mission réelle | Site pour une activité de réparation informatique et mobile |
| **Bât Innov** | Mission réelle | Site vitrine pour une entreprise de rénovation et construction |
| **Pierre Youdine** | Mission réelle | Site vitrine pour une activité de bricolage et rénovation |

> Les concepts fictifs sont présentés comme des projets de démonstration. Pour les missions réelles, la publication des noms, logos et visuels doit respecter les autorisations des clients concernés.

## Fonctionnalités

- Présentation des projets avec captures d’écran et fiches détaillées.
- Navigation par ancres et menu adapté aux écrans mobiles.
- Mise en page responsive pour mobile, tablette et ordinateur.
- Animations et transitions au défilement, avec prise en compte de la préférence de réduction des animations.
- Indicateur de progression de lecture et navigation active.
- Brief projet guidé en cinq étapes, avec champs conditionnels selon le type de demande.
- Récapitulatif téléchargeable avant l’envoi du brief.
- Envoi du brief par e-mail via le service externe FormSubmit.
- Métadonnées SEO et Open Graph, icônes et visuel de partage.

## Technologies

Le site est volontairement léger et repose principalement sur les technologies natives du web :

- **HTML5** — structure et contenu.
- **CSS3** — mise en page, responsive design et animations.
- **JavaScript natif** — interactions, navigation et logique du formulaire.
- **GSAP + ScrollTrigger** — animations au défilement.
- **Lenis** — défilement fluide lorsque les animations sont autorisées.

Les fichiers des bibliothèques utilisées sont présents dans le dossier `vendor/`. Les polices et les ressources visuelles sont hébergées localement dans le dépôt.

## Structure du dépôt

```text
.
├── index.html          # Page principale et présentation des projets
├── brief.html          # Brief projet guidé
├── portfolio.css       # Styles du portfolio
├── portfolio.js        # Interactions et animations
├── fonts.css           # Déclarations des polices locales
├── fonts/              # Fichiers de polices
├── images/             # Logos, icônes, captures et visuels
└── vendor/             # Bibliothèques front-end utilisées
```

## Lancer le site en local

Aucune installation de dépendances ni étape de compilation n’est nécessaire.

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/appix-studio/portfolio.git
   cd portfolio
   ```
2. Ouvrez `index.html` dans votre navigateur.

Pour tester le site avec un serveur local, vous pouvez également lancer :

```bash
python -m http.server 8000
``

Puis ouvrir [http://localhost:8000](http://localhost:8000).


Le projet est conçu comme un site statique et peut être publié avec **GitHub Pages** depuis la branche `main` (dossier racine), sans étape de build.

Pour activer ou vérifier la publication : ouvrez les paramètres du dépôt GitHub, puis **Pages**, et vérifiez la source de déploiement ainsi que l’URL fournie par GitHub.


**APPIX STUDIO**  
Développement web et création de sites sur mesure.

- E-mail : [appix.web@gmail.com](mailto:appix.web@gmail.com)
- Site : [appixstudio.fr](https://appixstudio.fr)
- GitHub : [@yalumappix](https://github.com/yalumappix)
- LinkedIn : [zumra-gokhan](https://www.linkedin.com/in/zumra-gokhan/)
- Malt : [Profil APPIX](https://www.malt.fr/profile/zumragokhan)

---

<p align="center">
  Fait avec soin par <a href="https://appixstudio.fr"><strong>APPIX STUDIO</strong></a>.
</p>
