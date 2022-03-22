import Layout from "../components/Layout";
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";


const Course = () => {
    const router = useRouter();

    const [posts, setPosts] = useState([]);

    const [walletAdress, setWalletAddress] = useState("");

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


    // Load all Posts
    useEffect(async () => {
        // add your Realm App Id to the .env.local file
        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();


        try {
            const resp = await window.solana.connect();
            const address = resp.publicKey.toString()
            // setWalletAddress(address)

            const user = await app.logIn(credentials);
            const allPost = await user.functions.xpaceViewAllPost();
            setPosts(() => allPost);

        } catch (error) {
            console.error(error);
        }
    }, [posts]);




    const LogOut = async () => {
        try {
            await window.solana.disconnect()


            router.push({
                pathname: `/`,
            });


        } catch (err) {
            // { code: 4001, message: 'User rejected the request.' }
            console.log(err)
        }
    }


    return (
        <Layout>
            <div class="mt-24 h-full w-full lg:px-40 px-3 py-2 lg:py-3">

                <div class="py-2 capitalize flex justify-center">
                    <p class="text-2xl font-semibold text-gray-700">Posts</p>

                </div>


                <div class="w-full">
                    <ul>
                        {/* one start */}
                        {posts.map((post, index) => (
                            <div key={index} className="border-2 mb-4 rounded-md p-4 border-gray-400 cursor-pointer">
                                <a href={`/post?id=${post._id}`}>

                                    <li class="flex border-gray-900 p-3 border-2 w-full rounded-lg justify-between items-center">
                                        <div class="flex flex-row items-center">
                                            <img src={userDetails.profileImage} class="w-10 h-10 rounded-full" />
                                            <span className="ml-2 text-2xl font-bold text-black">
                                                {userDetails.name}
                                            </span>
                                        </div>

                                        <div>
                                            {walletAdress}
                                        </div>

                                    </li>


                                    <div class="my-4">
                                        <p class="text-3xl font-semibold mb-2">{post.name}</p>
                                        <p class="text-xl text-gray-500 truncate w-2/3">
                                            {post.msg}
                                        </p>
                                    </div>
                                </a>

                            </div>
                        ))}
                        {/* end one */}


                    </ul>
                </div>


            </div>
        </Layout>
    );
}

export default Course;