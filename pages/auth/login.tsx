import FormInput from "@/components/common/FormInput";
import useAuth from "hooks/useAuth";
import useInput from "hooks/useInput";
import Link from "next/link";

const Login = () => {
  const { login } = useAuth();
  const [email, handleEmail] = useInput("");
  const [password, handlePassword] = useInput("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <main className="flex justify-between h-full text-center">
      <div className="flex-center flex-col basis-1/2 px-5">
        <h1 className="text-4xl font-bold mb-8">Masuk ke akun anda</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <FormInput type="email" placeholder="Email" id="email" value={email} onChange={handleEmail} />
          <FormInput type="password" placeholder="Password" id="password" value={password} onChange={handlePassword} />
          <button className="button-pri w-full bg-lemon-400 border-none text-lg px-7 py-4" type="submit">
            Login
          </button>
        </form>
        <div className="mt-7">
          Belum mempunyai akun?{" "}
          <Link href={"/auth/register"} className="underline font-bold">
            Buat akun sekarang
          </Link>
        </div>
      </div>
      <div className="basis-1/2 bg-black h-full"></div>
    </main>
  );
};

export default Login;
