import Layout from "../components/Layout";
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { useEffect, useState } from "react"
import Link from 'next/link'

const EditProfile = () => {

    const router = useRouter();

    const [userDetails, setUserDetails] = useState([]);

    const [newName, setNewName] = useState("");

    const [bio, setBio] = useState("");


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


    // make a post
    const uploadProfile = async (e) => {
        e.preventDefault();

        const postdetail = {
            uid: userDetails.walletAddress,
            name: newName,
            bio: bio,
        };

        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {


            const user = await app.logIn(credentials);

            if (user) {

                const insertO = await user.functions.xpaceUploadProfile(postdetail);

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
        <Layout>
            <div class="mx-5 md:mx-20 mt-24 h-full rounded-lg bg-gray-300 px-2">
                <div class="py-10 bg-gray-300 px-2">
                    <br /><br />
                    <div className="flex w-full justify-center items-center mb-4">
                        <h1 className="max-w-md mx-auto text-2xl font-bold text-gray-800">Make a Post</h1>
                    </div>
                    <div class="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
                        <div class="md:flex">
                            <form className="mx-auto w-10/12 mt-8">
                                <div class="mb-6">
                                    <label for="email" class="pl-4 font-bold text-lg text-gray-600 block mb-2 ">Display Name</label>
                                    <input onChange={(e) => setNewName(e.target.value)} type="text" class="shadow-sm bg-gray-50 border
        border-gray-500 text-gray-900  rounded-lg block w-full p-2.5" placeholder="title" required />

                                    <br />

                                    <label for="email" class="pl-4 font-bold text-lg text-gray-600 block mb-2 ">Bio</label>

                                    <textarea onChange={(e) => setBio(e.target.value)} cols="30" type="text"
                                        class="shadow-sm bg-gray-50 border
                                    border-gray-500 
                                    text-gray-900  
                                    rounded-lg block 
                                    w-full p-2.5"
                                        placeholder="content"
                                        required >

                                    </textarea>
                                </div>


                                <button onClick={uploadProfile} type="submit" class="text-white bg-blue-700 
                        hover:bg-blue-800 rounded-md px-5 py-2.5 font-bold text-center">
                                    Update your Profile
                                </button>
                            </form>

                        </div>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default EditProfile;