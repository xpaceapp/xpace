import Layout from "../components/Layout";
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { useEffect, useState } from "react"
import Link from 'next/link'

const Profile = () => {
    const router = useRouter();


    const [userDetails, setUserDetails] = useState([]);

    useEffect(async () => {

        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {


            const resp = await window.solana.connect();
            const address = resp.publicKey.toString()
            console.log(address)

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
        <Layout>
            <div class="md:mx-20 mx-5 mt-24 h-full rounded-lg bg-gray-300 px-2">
                <br /><br />
                <div className="flex w-full justify-center items-center mb-4">
                    <img src={userDetails.profileImage} style={{ width: "150px", height: "150px", borderRadius: "50%" }} className="bg-blue-100 p-3 border-2 border-black" />

                </div>
                <div class="max-w-md mx-auto shadow-lg bg-gray-200 rounded-lg overflow-hidden md:max-w-lg">
                    <div class="md:flex justify-center items-center">
                        <div className="mx-auto w-1/2 mt-8">
                            <div class="mb-6 flex flex-col justify-center items-center">
                                <h1 className="font-bold text-gray-800 text-2xl">
                                    {userDetails.name}
                                </h1>

                                <p className="my-4 font-medium text-gray-600">
                                    {userDetails.walletAddress}
                                </p>

                                <h1 className="font-bold text-gray-800 text-xl">
                                    Bio
                                </h1>

                                <p className="mb-4 font-medium text-gray-600">
                                    {userDetails.bio}
                                </p>

                                <Link className="flex-end" href={`/edit_profile?id=${userDetails.walletAddress}`}>
                                    <button class="text-white mt-4 bg-green-700 
                            hover:bg-green-800 rounded-md px-5 py-2.5 font-bold text-center">
                                        Edit Profile
                                    </button>
                                </Link>

                            </div>



                        </div>

                    </div>
                    <br />
                    <br />
                </div>
            </div>
        </Layout>
    );
}

export default Profile;