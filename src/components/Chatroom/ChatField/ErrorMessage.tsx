import type { ErrorMessageProps } from './types';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mb-4 text-center text-red-500" role="alert">
      {message}
    </div>
  );
};

export default ErrorMessage;
