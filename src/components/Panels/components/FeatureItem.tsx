interface FeatureItemProps {
  text: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <li className="relative flex items-center">
    <img
      src="/assets/Frame.png"
      alt=""
      className="absolute left-0 h-5 w-5 sm:h-6 sm:w-6"
      aria-hidden="true"
    />
    <span className="pl-8 text-sm sm:text-base">{text}</span>
  </li>
);
