import Layout from "../components/Layout";
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { useEffect, useState } from "react"
import Link from 'next/link'


const Hire = () => {
    const [users, setUsers] = useState([]);


    // Load all courses
    useEffect(async () => {
        // add your Realm App Id to the .env.local file
        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {
            const user = await app.logIn(credentials);
            const allCourse = await user.functions.xpaceViewUsers();
            setUsers(() => allCourse);

        } catch (error) {
            console.error(error);
        }
    }, [users]);


    return (
        <Layout>
            <div class="h-full w-full lg:px-40 px-3 py-2 lg:py-3">

                <div class="py-2 mt-24">
                    <p class="text-xl font-semibold text-gray-700">Professionals</p>
                    <p class="text-md text-gray-400">7 Results Found</p>
                </div>


                <div class="w-full">
                    <ul>
                        {users.map((user, index) => (
                            <li key={index} class="flex border p-3 border-1 rounded-lg">
                                <div class="flex flex-row items-center justify-center"  >
                                    <img src={user.profileImage} alt="user" class="rounded-full w-10 h-10" />
                                    <div class="flex flex-col items-left justify-center ml-3">
                                        <p class="text-black font-semibold text-lg">{user.name} k</p>
                                        {/* <p class="text-sm text-gray-400">Product Designer</p> */}
                                    </div>
                                </div>
                                <a href={`/page?id=${user.walletAddress}`} class="py-2 px-3 text-white rounded-lg bg-blue-600 ml-auto font-semibold">
                                    View Profile
                                </a>

                            </li>

                        ))}
                    </ul>
                </div>

            </div>
        </Layout>
    );
}

export default Hire;