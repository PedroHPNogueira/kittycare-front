interface CollapseBtnProps {
  handleClick: () => void;
}

const CollapseBtn: React.FC<CollapseBtnProps> = ({ handleClick }) => {
  return (
    <button
      className="relative"
      onClick={handleClick}
      aria-label="Collapse sidebar"
      type="button"
    >
      <div className="h-16 w-16 rotate-45 rounded-2xl bg-[#FAF6F3]" />
      <span className="absolute left-1/2 top-1/2 -translate-x-7 -translate-y-5 text-2xl">
        ‹
      </span>
    </button>
  );
};

export default CollapseBtn;
