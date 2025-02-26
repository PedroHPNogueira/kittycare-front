interface TermsCheckboxProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  checked,
  setChecked,
}) => (
  <div className="flex gap-2" onClick={() => setChecked(!checked)}>
    <div className="h-6 w-6">
      <input
        type="checkbox"
        className="h-full w-full"
        checked={checked}
        onChange={() => {}} // Add onChange to prevent React warning
      />
    </div>
    <div className="text-[#898B90]">
      I agree to the{' '}
      <a
        className="font-semibold text-black"
        href="https://kitty-care.webflow.io/terms-of-use"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms of Conditions
      </a>{' '}
      and{' '}
      <a
        className="font-semibold text-black"
        href="https://www.kittycareapp.com/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy.
      </a>
    </div>
  </div>
);
