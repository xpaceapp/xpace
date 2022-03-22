import Layout from "../components/Layout";
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";

const Navbar = () => {
    const [userDetails, setUserDetails] = useState([]);

    useEffect(async () => {

        const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {


            const resp = await window.solana.connect();
            const address = resp.publicKey.toString()
            // console.log(address)

            if (address) {
                const user = await app.logIn(credentials);
                const myDetails = await user.functions.xpaceGetUser(address);
                setUserDetails(() => myDetails);
            } else {
                router.push({
                    pathname: `/`,
                });
            }

        } catch (error) {
            console.error(error);
        }


    }, [userDetails]);



    return (
        <div class="flex fixed right-0 items-center border-b-2 border-black w-full justify-between py-2 lg:px-60 flex-row  z-20 bg-gray-400 px-2 shadow-lg">
            <div class="flex justify-center items-center lg:py-2 py-2 ml-32 flex-row">
                <h1 className="font-bold text-4xl mr-4 -ml-8 md:mr-0 md:-ml-0 flex justify-center font-serif">Xpace</h1>
            </div>
            <div class="text-xl">
                <button class="text-gray-600 rounded-full flex items-center">
                    <span class="px-3 font-bold text-2xl text-black">{userDetails.name}</span>
                    <img src={userDetails.profileImage} class="w-10 md:w-15  border-2 border-gray-400 h-9 rounded-full" />
                </button>
            </div>
        </div>
    );
}

export default Navbar;