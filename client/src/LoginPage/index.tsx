import Form from "./Form";

function LoginPage() {
  return (
    <div className="  flex justify-center items-center h-screen  bg-[#7FBA5C]  ">
      <section className="bg-white flex w-[600px]  flex-col rounded-xl">
        <h5 className="text-center py-6 text-[#7FBA5C] font-semibold">
          Welcome to The APP :)
        </h5>
        <Form />
      </section>
    </div>
  );
}

export default LoginPage;
