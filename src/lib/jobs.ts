export type JobSection =
  | { type: "text"; title: string; paragraphs: string[] }
  | { type: "list"; title: string; items: string[] }
  | { type: "steps"; title: string; items: string[] };

export type Job = {
  slug: string;
  title: string;
  short: string;
  contract: string;
  location: string;
  salary: string;
  tag?: { label: string; tone: "accent" | "muted" };
  intro: string;
  missions: string[];
  profile: string;
  hours: string;
  start: string;
  story: string[];
  sections?: JobSection[];
  highlights: string[];
  visual: "ugc" | "call";
};

export const jobs: Job[] = [
  {
    slug: "createur-ugc",
    title: "Créateur UGC",
    short:
      "Vous apparaissez à l’écran, avec votre téléphone. On vous donne une vidéo de référence : vous la refaites, pour des entreprises, pour promouvoir leurs produits ou leurs services.",
    contract: "À la performance",
    location: "Depuis ton téléphone",
    salary: "Selon les vues",
    tag: { label: "Ouvert", tone: "accent" },
    hours: "À ton rythme",
    start: "Dès que tu es prêt",
    visual: "ugc",
    highlights: [
      "À distance, depuis ton téléphone",
      "Rémunération à la performance, selon les vues",
      "Aucune expérience demandée",
    ],
    intro: "Si c’est toi, voici précisément le poste.",
    story: [],
    missions: [],
    profile: "",
    sections: [
      {
        type: "text",
        title: "Pour qui c’est",
        paragraphs: [
          "On recherche des profils motivés, avec un téléphone, prêts à filmer pour des entreprises — à partir d’une vidéo de référence déjà fournie.",
          "Si c’est toi, voici précisément le poste.",
        ],
      },
      {
        type: "text",
        title: "Le poste",
        paragraphs: [
          "Tu filmes des vidéos pour des entreprises, destinées aux réseaux (TikTok, Instagram, etc.). On ne te demande pas d’inventer la vidéo. On te donne une vidéo de référence, déjà choisie : tu la reproduis avec ton téléphone.",
          "On te donne une vidéo de référence. Tu la reproduis.",
          "On te met en contact avec les entreprises. On te montre quoi faire, à chaque étape.",
        ],
      },
      {
        type: "list",
        title: "Ce qu’on attend",
        items: [
          "Un téléphone qui filme correctement",
          "Du temps libre pour tourner",
          "De la motivation",
          "Pas de CV. Pas de diplôme. Pas de studio.",
        ],
      },
      {
        type: "steps",
        title: "Comment ça se passe",
        items: [
          "Vous choisissez votre job.",
          "On vous appelle.",
          "Vous démarrez le travail.",
        ],
      },
      {
        type: "text",
        title: "La paye : à la performance",
        paragraphs: [
          "À la performance, ça veut dire : ta paye suit le nombre de vues de tes vidéos. Quelqu’un dont la vidéo fait un million de vues n’est pas payé comme quelqu’un dont la vidéo en fait dix mille. Pas de tarif unique : ça suit ce que la vidéo fait.",
        ],
      },
    ],
  },
  {
    slug: "appointment-setter",
    title: "Appointment setter",
    short:
      "Vous appelez des entreprises pour leur proposer des services de publicité. L’objectif n’est pas de vendre : c’est de réserver un rendez-vous. On vous fournit le texte de l’appel — vous n’avez pas à l’inventer.",
    contract: "À la vente",
    location: "Depuis ton téléphone",
    salary: "À partir de 70 €",
    tag: { label: "Ouvert", tone: "accent" },
    hours: "À ton rythme",
    start: "Dès que tu es prêt",
    visual: "call",
    highlights: [
      "À distance, depuis ton téléphone",
      "Rémunération à la vente, à partir de 70 €",
      "Aucune expérience demandée",
    ],
    intro: "Si c’est toi, voici précisément le poste.",
    story: [],
    missions: [],
    profile: "",
    sections: [
      {
        type: "text",
        title: "Pour qui c’est",
        paragraphs: [
          "On recherche des profils motivés, avec un téléphone, qui se sentent capables d’appeler des entreprises — on vous dit quoi dire.",
          "Si c’est vous, voici précisément le poste.",
        ],
      },
      {
        type: "text",
        title: "Le poste",
        paragraphs: [
          "Vous appelez des entreprises pour leur proposer des services de publicité. Votre objectif, ce n’est pas de tout vendre au téléphone : c’est d’obtenir un rendez-vous. Ensuite, notre équipe s’en charge.",
          "On ne vous demande pas d’inventer ce que vous allez dire. On vous donne les phrases, déjà prêtes. Vous les suivez, vous improvisez un peu pour rester naturel.",
          "On vous montre quoi dire, à chaque étape.",
        ],
      },
      {
        type: "list",
        title: "Profil recherché",
        items: [
          "Un téléphone",
          "Du temps libre pour appeler",
          "De la motivation",
          "Parler clairement, avec une voix mature — pour être crédible auprès des entreprises",
          "Pas besoin de CV, pas besoin de diplôme",
        ],
      },
      {
        type: "steps",
        title: "Comment ça se passe",
        items: [
          "Vous choisissez votre job.",
          "On vous appelle.",
          "Vous démarrez le travail.",
        ],
      },
      {
        type: "text",
        title: "La paye : à la vente",
        paragraphs: [
          "Ce n’est pas le rendez-vous qui est payé, c’est la suite : si l’entreprise avec qui vous avez pris rendez-vous achète nos services, vous touchez au minimum 70 €.",
        ],
      },
    ],
  },
];

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}

