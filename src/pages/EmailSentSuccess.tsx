import Layout from '../components/Layout';

const EmailSentSuccess: React.FC = () => {
  return (
    <Layout>
      <div className="m-auto w-[343px] max-w-[90%] rounded-3xl border-2 border-[#B8B8B8] bg-white px-[21px] py-[47px] sm:w-[600px] sm:px-[100px] sm:py-[70px]">
        <div className="flex h-full w-full flex-col items-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <img
              src="/assets/png/Daco_68893.png"
              alt=""
              width={100}
              height={100}
            />
            <h2 className="pb-4 text-[28px] font-semibold sm:text-[40px]">
              Email Sent
            </h2>
          </div>
        </div>
        <div className="w-full text-center">
          <p className="text-base sm:text-lg">
            Check your inbox or spam folder
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default EmailSentSuccess;
