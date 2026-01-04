export type Sponsor = {
  id: string;
  name: string;
  tier: "Platinum" | "Gold" | "Silver" | "Community" | string;
  logo: string;
  url: string;
};

const toId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const sponsors: Sponsor[] = [
  { id: toId("ACME"), name: "ACME", tier: "Platinum", logo: "/logos/acme.svg", url: "#" },
  { id: toId("NeuralNet"), name: "NeuralNet", tier: "Gold", logo: "/logos/neuralnet.svg", url: "#" },
  { id: toId("WebWorks"), name: "WebWorks", tier: "Silver", logo: "/logos/webworks.svg", url: "#" },
  { id: toId("OSS Foundation"), name: "OSS Foundation", tier: "Community", logo: "/logos/oss.svg", url: "#" },
];

export default sponsors;
