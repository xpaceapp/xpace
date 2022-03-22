import Layout from "../components/Layout";
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";

const Make_Post = () => {
    const router = useRouter()
    const [postName, setPostName] = useState("")
    const [postMsg, setPostMsg] = useState("")

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


    // make a post
    const makePost = async (e) => {
        e.preventDefault();

        const postdetail = {
            uid: userDetails.walletAddress,
            name: postName,
            msg: postMsg
        };

        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {


            const user = await app.logIn(credentials);

            if (user) {

                const insertO = await user.functions.xpacePost(postdetail);

                console.log(insertO)

                router.push({
                    pathname: `/posts`,
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
                                    <label for="email" class="pl-4 font-bold text-lg text-gray-600 block mb-2 ">Post Title</label>
                                    <input onChange={(e) => setPostName(e.target.value)} type="text" class="shadow-sm bg-gray-50 border
            border-gray-500 text-gray-900  rounded-lg block w-full p-2.5" placeholder="title" required />

                                    <br />

                                    <label for="email" class="pl-4 font-bold text-lg text-gray-600 block mb-2 ">Post Content</label>

                                    <textarea onChange={(e) => setPostMsg(e.target.value)} cols="30" type="text"
                                        class="shadow-sm bg-gray-50 border
                                        border-gray-500 
                                        text-gray-900  
                                        rounded-lg block 
                                        w-full p-2.5"
                                        placeholder="content"
                                        required >

                                    </textarea>
                                </div>


                                <button onClick={makePost} type="submit" class="text-white bg-blue-700 
                            hover:bg-blue-800 rounded-md px-5 py-2.5 font-bold text-center">
                                    Make a Post
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

export default Make_Post;