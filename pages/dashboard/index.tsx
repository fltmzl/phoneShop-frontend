import withAuth from "hoc/withAuth";
import useUser from "hooks/useUser";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsShop } from "react-icons/bs";
import { isoToReadable } from "utils";

export const Sidebar = () => {
  const router = useRouter();
  console.log(router.pathname);

  return (
    <aside className="bg-slate-900 text-white font-bold px-4 basis-56">
      <div className="flex-center gap-3 py-6 border-b-1 border-white/40">
        <BsShop className="w-5 h-5" />
        <Link href={"/"}>
          <div className="text-xl font-bold cursor-pointer">TokoKita</div>
        </Link>
      </div>
      <div className="space-y-3">
        <div>
          <Link href={"/dashboard"} className={`block py-2 px-6 hover:bg-pri hover:text-slate-900 rounded-xl ${router.pathname === "/dashboard" ? "bg-pri text-slate-900" : ""}`}>
            Users
          </Link>
        </div>
        <div>
          <Link href={"/dashboard/transaction"} className={`block py-2 px-6 hover:bg-pri hover:text-slate-900 rounded-xl ${router.pathname === "/dashboard/transaction" ? "bg-pri text-slate-900" : ""}`}>
            Transaction
          </Link>
        </div>
      </div>
    </aside>
  );
};

const Dashboard = () => {
  const { users, loading } = useUser();

  return (
    <>
      <Head>
        <title>Dashboard | TokoKita</title>
        <meta name="description" content="Website e-commerce yang menjual berbagai macam merk smartphone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 overflow-y-scroll h-full px-10">
          <div>
            <h1 className="text-3xl font-bold my-10">User Data</h1>
          </div>
          <div>
            {loading ? (
              <p>Loading</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-fixed w-full font-light text-center">
                  <thead className="bg-slate-800 text-white rounded-xl">
                    <tr>
                      <th className="text-sm w-1/12 py-4">#</th>
                      <th className="text-sm w-3/12 py-4">User-ID</th>
                      <th className="text-sm w-3/12 py-4">Username</th>
                      <th className="text-sm w-2/12 py-4">Email</th>
                      <th className="text-sm w-3/12 py-4">Created At</th>
                    </tr>
                  </thead>
                  <tbody className="font-extralight">
                    {users.map((user, index) => (
                      <tr key={user._id} className={index % 2 === 0 ? "bg-slate-200" : ""}>
                        <td className="font-normal p-4 overflow-hidden text-sm">{index + 1}</td>
                        <td className="font-normal p-4 overflow-hidden text-ellipsis text-sm">{user._id}</td>
                        <td className="font-normal p-4 overflow-hidden text-sm">{user.username}</td>
                        <td className="font-normal p-4 overflow-hidden text-sm">{user.email}</td>
                        <td className="font-normal p-4 overflow-hidden text-sm">{isoToReadable(user.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default withAuth(Dashboard);
