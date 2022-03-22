import Layout from "../components/Layout";
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";

const Page = () => {
    const [post, setPost] = useState([]);

    const [userDetails, setUserDetails] = useState([]);

    useEffect(async () => {

        const REALM_APP_ID = "products-qexct";
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


    // Load all Posts
    useEffect(async () => {
        // add your Realm App Id to the .env.local file
        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const profileID = urlParams.get("id")

        // console.log(profileID)


        try {
            const resp = await window.solana.connect();
            const address = resp.publicKey.toString()
            // setWalletAddress(address)

            const user = await app.logIn(credentials);
            const allPost = await user.functions.xpaceOnePost(profileID);
            setPost(() => allPost);

        } catch (error) {
            console.error(error);
        }
    }, [post]);

    return (
        <Layout>
            <div class="mx-5 md:mx-20 mt-24 h-full rounded-lg bg-gray-300 px-2">
                <br /><br />
                <div className="flex flex-col w-full justify-center items-center mb-4">
                    <img src={userDetails.profileImage} style={{ width: "150px", height: "150px", borderRadius: "50%" }} className="bg-blue-100 p-3 border-2 border-black" />
                    <div class="mb-6 flex flex-col justify-center items-center">
                        <h1 className="font-bold text-gray-800 text-2xl">
                            {userDetails.name}
                        </h1>

                        <p className="my-4 font-medium truncate  w-2/3 text-gray-800">
                            {userDetails.walletAddress}
                        </p>

                        <h1 className="font-bold text-gray-800 text-xl">
                            Bio
                        </h1>

                        <p className="mb-4 font-medium text-gray-600">
                            {userDetails.bio}
                        </p>
                    </div>
                </div>
                <div class="max-w-md mx-auto shadow-lg bg-gray-200 rounded-lg overflow-hidden md:max-w-lg">
                    <div class="md:flex justify-center items-center">
                        <div className="mx-auto mt-8">
                            <div class="mb-6 flex flex-col items-center">

                                <p class="text-3xl justify-center font-semibold mb-2"></p>
                                <p class="text-lg text-gray-700 mt-2 w-10/12">
                                    {post.msg}
                                </p>

                                <button type="submit" class="text-white mt-6 bg-blue-700 
                            hover:bg-blue-800 rounded-md px-5  py-2.5 font-bold text-center">
                                    Send Message
                                </button>

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

export default Page;