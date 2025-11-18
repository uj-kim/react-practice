import type { Feature } from "../types/feature";
import Button from "./Button";

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <div className="feature_card">
      <h2>Feature Card</h2>
      <h3>{feature.name}</h3>
      <h3>{feature.description}</h3>
      <h3>{feature.status}</h3>
      <h3>{feature.audience}</h3>
      <Button />
    </div>
  );
};

export default FeatureCard;
