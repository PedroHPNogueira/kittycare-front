interface SubmitButtonProps {
  isLoading: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => (
  <div className="my-3">
    <div className="my-10 h-[52px] w-full">
      <input
        type="submit"
        className="h-[55px] w-full cursor-pointer rounded-2xl border-2 bg-blue-600 text-base text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 sm:text-xl"
        value={isLoading ? 'Creating account...' : 'Create account'}
        disabled={isLoading}
      />
    </div>
  </div>
);
