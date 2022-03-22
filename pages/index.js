import Layout from "../components/Layout";
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";


const Home = () => {
  const router = useRouter();



  // Create user
  const createUser = async (e) => {
    e.preventDefault();
    const resp = await window.solana.connect();
    const address = await resp.publicKey.toString()


    const userdetail = {
      uid: address,
      name: "Unnamed",
      bio: "Nothing to see here",
      profileImage: "/assets/profile.png",
      walletAdress: address,
    };

    const REALM_APP_ID = "products-qexct";
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();

    try {


      const user = await app.logIn(credentials);

      if (user) {

        const insertO = await user.functions.xpaceuser(userdetail);

        console.log(insertO)

        router.push({
          pathname: `/profile`,
        });

      }

    } catch (error) {
      console.error(error);
    }

  }


  return (
    <div class="flex h-screen w-screen bg-cover bg-[url('/assets/grid.png')] justify-center items-center">
      <div className="bg-blue-500 p-10 rounded-lg border-2 border-blue-200">
        <div className="flex justify-center">
          <img className="w-10 h-15" src="/assets/logo.png" />
          <h1 className="font-bold text-4xl text-blue-100"> Xpace</h1>
        </div>
        <br /><br />
        <button onClick={createUser} className="bg-orange-500 p-4 rounded-lg font-bold text-white">
          Connect Wallet
        </button>
      </div>
    </div>
  );
}

export default Home;