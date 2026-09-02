import { config } from "dotenv";
config({ path: ".env" });
config({ path: ".env.local", override: true });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const lots = [
  {
    slug: "gros-oeuvre",
    order: 1,
    title: "Construction & gros œuvre",
    metaDescription:
      "Construction et gros œuvre : fondations, structure en béton armé et charpente. Texel Bâtiment réalise le gros œuvre de vos projets de construction.",
    lead: "Fondations, structure en béton armé et charpente : Texel Bâtiment prend en charge le gros œuvre de vos projets résidentiels, professionnels et industriels, de la première pierre à la mise hors d'eau hors d'air.",
    heroPhoto: "/images/hero.jpg",
    icon: '<line x1="8" y1="34" x2="32" y2="34"></line><line x1="10" y1="34" x2="10" y2="10"></line><line x1="20" y1="34" x2="20" y2="6"></line><line x1="30" y1="34" x2="30" y2="10"></line><line x1="6" y1="24" x2="34" y2="24"></line><line x1="6" y1="14" x2="34" y2="14"></line>',
    gallery: [
      { src: "/images/hero.jpg", alt: "Chantier de gros œuvre, structure en béton armé et charpente métallique en cours de montage" },
      { src: "/images/gros-oeuvre-1.jpg", alt: "Bâtiment en cours de construction, murs en brique et ouvertures de fenêtres" },
      { src: "/images/gros-oeuvre-2.jpg", alt: "Immeuble en construction, structure porteuse en élévation" },
      { src: "/images/gros-oeuvre-3.jpg", alt: "Coffrage et ferraillage avant coulage de béton sur un chantier" },
      { src: "/images/gros-oeuvre-4.jpg", alt: "Ferraillage et coffrage d'une structure en béton armé" },
      { src: "/images/gros-oeuvre-5.jpg", alt: "Coulage d'une dalle en béton sur un chantier urbain" },
      { src: "/images/gros-oeuvre-6.jpg", alt: "Ferraillage au sol avant coulage des fondations" },
    ],
  },
  {
    slug: "genie-civil",
    order: 2,
    title: "Génie civil",
    metaDescription:
      "Génie civil : terrassement, fondations spéciales et ouvrages d'art. Texel Bâtiment intervient sur les travaux d'infrastructure de vos projets.",
    lead: "Terrassement, fondations spéciales, ouvrages d'art : nos équipes interviennent sur les travaux d'infrastructure qui accompagnent vos projets de construction.",
    heroPhoto: "/images/genie-civil.jpg",
    icon: '<line x1="4" y1="20" x2="36" y2="20"></line><line x1="10" y1="20" x2="10" y2="32"></line><line x1="30" y1="20" x2="30" y2="32"></line><path d="M4 20 Q20 10 36 20"></path>',
    gallery: [
      { src: "/images/genie-civil.jpg", alt: "Ouvriers et grue sur un chantier de génie civil, construction d'un ouvrage d'art en béton armé au-dessus d'une rivière" },
      { src: "/images/genie-civil-2.jpg", alt: "Fondations et ferraillage à plat avant coulage sur un chantier" },
    ],
  },
  {
    slug: "amenagement",
    order: 3,
    title: "Aménagement",
    metaDescription:
      "Aménagement intérieur et extérieur : cloisons, revêtements, faux plafonds. Texel Bâtiment transforme vos espaces professionnels et résidentiels.",
    lead: "Cloisons, revêtements, faux plafonds et agencement sur mesure : nous transformons vos espaces intérieurs et extérieurs, du bureau professionnel au logement.",
    heroPhoto: "/images/amenagement.jpg",
    icon: '<rect x="6" y="7" width="28" height="26"></rect><line x1="20" y1="7" x2="20" y2="20"></line><line x1="6" y1="20" x2="20" y2="20"></line><path d="M20 20 A8 8 0 0 1 28 28"></path>',
    gallery: [
      { src: "/images/amenagement.jpg", alt: "Ouvrier posant une cloison lors d'un chantier d'aménagement intérieur" },
      { src: "/images/amenagement-2.jpg", alt: "Équipe au travail lors d'un aménagement de bureaux" },
      { src: "/images/amenagement-3.jpg", alt: "Pose de cloisons vitrées dans un espace de bureaux" },
      { src: "/images/amenagement-4.jpg", alt: "Aménagement intérieur en cours, sol protégé et éclairage suspendu" },
      { src: "/images/amenagement-5.jpg", alt: "Chantier d'aménagement de bureaux, ouvriers sur échelle" },
      { src: "/images/amenagement-6.jpg", alt: "Équipe Texel Bâtiment sur un chantier d'aménagement de bureaux" },
      { src: "/images/amenagement-7.jpg", alt: "Aménagement intérieur, pose de finitions dans un espace de bureaux" },
      { src: "/images/amenagement-8.jpg", alt: "Salle de réunion aménagée, table et écran" },
      { src: "/images/amenagement-9.jpg", alt: "Bureaux aménagés avec espaces de travail et rangements" },
    ],
  },
  {
    slug: "etancheite",
    order: 4,
    title: "Étanchéité",
    metaDescription:
      "Étanchéité de toiture et terrasse : membranes bitumineuses, protection contre les infiltrations. Devis gratuit avec Texel Bâtiment.",
    lead: "Toitures-terrasses, membranes bitumineuses et fondations : nous protégeons durablement vos bâtiments contre les infiltrations d'eau.",
    heroPhoto: "/images/etancheite.jpg",
    icon: '<path d="M6 18 L20 7 L34 18"></path><line x1="9" y1="18" x2="31" y2="18"></line><path d="M8 25 q4 -4 8 0 t8 0 t8 0"></path><path d="M8 31 q4 -4 8 0 t8 0 t8 0"></path>',
    gallery: [
      { src: "/images/etancheite.jpg", alt: "Ouvrier appliquant une membrane d'étanchéité sur une toiture-terrasse" },
      { src: "/images/etancheite-2.jpg", alt: "Toiture-terrasse avec membrane d'étanchéité posée, vue d'ensemble" },
      { src: "/images/etancheite-3.jpg", alt: "Membrane d'étanchéité sur une grande toiture industrielle" },
      { src: "/images/etancheite-4.jpg", alt: "Travaux d'étanchéité sur toiture-terrasse" },
      { src: "/images/etancheite-5.jpg", alt: "Toiture-terrasse étanchéifiée, vue large" },
      { src: "/images/etancheite-6.jpg", alt: "Détail d'une membrane d'étanchéité posée sur toiture" },
    ],
  },
  {
    slug: "electricite",
    order: 5,
    title: "Électricité",
    metaDescription:
      "Installations électriques neuves et mises aux normes, tableaux électriques et réseaux. Devis gratuit avec Texel Bâtiment.",
    lead: "Installations électriques neuves, mises aux normes, tableaux et réseaux : nos électriciens interviennent sur tous types de bâtiments.",
    heroPhoto: "/images/electricite.jpg",
    icon: '<circle cx="20" cy="20" r="15"></circle><polyline points="22,9 13,22 19,22 17,31 27,17 21,17 22,9"></polyline>',
    gallery: [
      { src: "/images/electricite.jpg", alt: "Électricien travaillant sur un tableau électrique dans un bâtiment en chantier" },
    ],
  },
  {
    slug: "climatisation",
    order: 6,
    title: "Climatisation",
    metaDescription:
      "Climatisation et ventilation : installation et entretien de systèmes CVC. Devis gratuit avec Texel Bâtiment.",
    lead: "Climatisation, ventilation et confort thermique : nous installons et entretenons vos équipements CVC pour tous types de bâtiments.",
    heroPhoto: "/images/climatisation.jpg",
    icon: '<rect x="5" y="10" width="30" height="10" rx="2"></rect><line x1="10" y1="24" x2="7" y2="31"></line><line x1="18" y1="24" x2="16" y2="32"></line><line x1="26" y1="24" x2="25" y2="33"></line>',
    gallery: [
      { src: "/images/climatisation.jpg", alt: "Technicien installant une unité de climatisation murale dans un bureau" },
    ],
  },
  {
    slug: "peinture",
    order: 7,
    title: "Peinture",
    metaDescription:
      "Peinture intérieure et extérieure, préparation des supports et enduits. Devis gratuit avec Texel Bâtiment.",
    lead: "Peinture intérieure et extérieure, préparation des supports, enduits et finitions soignées pour tous vos projets.",
    heroPhoto: "/images/peinture.jpg",
    icon: '<rect x="7" y="8" width="20" height="9" rx="2"></rect><line x1="23" y1="17" x2="23" y2="24"></line><line x1="23" y1="24" x2="31" y2="24"></line><line x1="31" y1="24" x2="31" y2="33"></line>',
    gallery: [
      { src: "/images/peinture.jpg", alt: "Peintre appliquant de la peinture blanche au rouleau sur un mur intérieur" },
    ],
  },
  {
    slug: "modulaire",
    order: 8,
    title: "Bâtiment modulaire",
    metaDescription:
      "Construction modulaire : bureaux de chantier, locaux techniques, extensions rapides. Devis gratuit avec Texel Bâtiment.",
    lead: "Bureaux de chantier, locaux techniques, extensions rapides : nos constructions modulaires s'adaptent à tous vos besoins temporaires ou permanents.",
    heroPhoto: "/images/modulaire.jpg",
    icon: '<rect x="6" y="20" width="13" height="12"></rect><rect x="21" y="20" width="13" height="12"></rect><rect x="13" y="8" width="13" height="12"></rect>',
    gallery: [
      { src: "/images/modulaire.jpg", alt: "Module préfabriqué installé par une grue sur un chantier" },
      { src: "/images/modulaire-2.jpg", alt: "Bâtiment modulaire livré, façade blanche et accès aménagé" },
      { src: "/images/modulaire-3.jpg", alt: "Rampe d'accès et parking d'un bâtiment modulaire livré" },
      { src: "/images/modulaire-4.jpg", alt: "Bâtiment modulaire avec antenne, implantation sur site" },
      { src: "/images/modulaire-5.jpg", alt: "Bâtiment modulaire livré, vue extérieure" },
      { src: "/images/modulaire-6.jpg", alt: "Ensemble de bâtiments modulaires sur site, vue d'ensemble" },
    ],
  },
];

async function main() {
  for (const lot of lots) {
    const { gallery, ...data } = lot;
    await prisma.lot.upsert({
      where: { slug: lot.slug },
      update: {
        ...data,
        gallery: {
          deleteMany: {},
          create: gallery.map((g, i) => ({ ...g, order: i })),
        },
      },
      create: {
        ...data,
        gallery: { create: gallery.map((g, i) => ({ ...g, order: i })) },
      },
    });
  }

  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      companyName: "Texel Bâtiment",
      phoneDisplay: "06 61 83 74 52",
      phoneIntl: "+33661837452",
      whatsappNumber: "33661837452",
      email: "texel.batiment@gmail.com",
      defaultWaMessage: "Bonjour, je souhaite un devis pour mon projet.",
      heroEyebrow: "Entreprise générale du bâtiment",
      heroTagline: "Construire avec exigence. Réaliser avec maîtrise.",
      heroLead:
        "Entreprise spécialisée dans la construction, le génie civil et les travaux tous corps d'état, Texel Bâtiment accompagne ses clients dans la réalisation de projets résidentiels, industriels et professionnels, de la structure aux finitions.",
      heroExpertise: ["Construction", "Génie civil", "Aménagement", "Étanchéité", "Électricité", "Travaux industriels"],
      heroPhoto: "/images/hero.jpg",
      whyTitle: "Pourquoi Texel Bâtiment",
      whyPhoto: "/images/equipe.jpg",
      whyList: [
        "De la structure et du gros œuvre jusqu'aux finitions",
        "Devis gratuit et sans engagement",
        "Intervention rapide",
        "Équipe qualifiée, tous corps d'état",
        "Un seul interlocuteur du début à la fin",
      ],
      showcasePhoto: "/images/realisation.jpg",
      showcaseTitle: "Parlons-en, du gros œuvre à la dernière touche de peinture.",
      showcaseText:
        "Chaque chantier est suivi de la structure aux finitions, avec un seul interlocuteur pour coordonner tous les corps de métier.",
    },
  });

  await prisma.realisation.deleteMany({});
  await prisma.realisation.createMany({
    data: [
      { order: 0, photo: "/images/hero.jpg", tag: "Gros œuvre", caption: "Structure et charpente en cours de montage" },
      { order: 1, photo: "/images/realisation.jpg", tag: "Livraison", caption: "Bâtiment livré clé en main" },
    ],
  });

  console.log("Seed termine :", lots.length, "lots, 1 settings, 2 realisations.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
