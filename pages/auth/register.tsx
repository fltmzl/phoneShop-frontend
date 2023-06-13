import FormInput from "@/components/common/FormInput";
import Link from "next/link";

const Login = () => {
  return (
    <main className="flex justify-between h-full text-center">
      <div className="basis-1/2 bg-black h-full"></div>
      <div className="flex-center flex-col basis-1/2 px-16">
        <h1 className="text-4xl font-bold mb-8">Buat akun baru</h1>
        <form className="space-y-5">
          <FormInput type="email" placeholder="Email" id="email" />
          <FormInput type="text" placeholder="Username" id="username" />
          <FormInput type="password" placeholder="Password" id="password" />
          <button className="button-pri w-full bg-lemon-400 border-none text-lg px-7 py-4">Register</button>
        </form>
        <div className="mt-7">
          Sudah mempunyai akun?{" "}
          <Link href={"/auth/login"} className="underline font-bold">
            login sekarang
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
