interface SignupHeaderProps {
  urlParams: URLSearchParams;
}

export const SignupHeader: React.FC<SignupHeaderProps> = ({ urlParams }) => (
  <div className="text-center">
    <h2 className="pb-4 text-[28px] font-semibold sm:text-[40px]">Sign up</h2>
    <div className="text-base font-medium sm:text-lg">
      Already have an account?{' '}
      <span className="text-[#0061EF]">
        <a href={`/login?${urlParams.toString()}`}>Login</a>
      </span>
    </div>
  </div>
);
