import Layout from "../components/Layout";
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { FaSearch } from 'react-icons/fa'

const Course = () => {
    const router = useRouter()

    const [courses, setCourses] = useState([]);

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
                console.log(userDetails.walletAddress, "dkdk")
            } else {
                router.push({
                    pathname: `/`,
                });
            }

        } catch (error) {
            console.error(error);
        }


    }, [userDetails]);


    // Load all courses
    useEffect(async () => {
        // add your Realm App Id to the .env.local file
        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();




        try {
            const user = await app.logIn(credentials);
            const allCourse = await user.functions.xpaceViewCourses();
            setCourses(() => allCourse);

        } catch (error) {
            console.error(error);
        }
    }, [courses]);

    // make an order
    const createOrder = async (arg) => {


        const orderTrx = {
            owner: arg.owner,
            buyer: userDetails.walletAddress,
            courseid: arg.owner + userDetails.walletAddress + arg.name,
            price: arg.price,
            name: arg.name,
            pdf: arg.pdf,
            file: arg.file,
            status: "pending"
        };

        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {


            const user = await app.logIn(credentials);

            if (user) {

                const insertO = await user.functions.xpaceOrderTrx(orderTrx);

                console.log(insertO)

                router.push({
                    pathname: `/orderTrx`,
                });

            }

        } catch (error) {
            console.error(error);
        }
    }



    return (
        <Layout>
            <div class="mt-20 mb-30 h-screen w-full lg:px-40 px-3 py-2 lg:py-3">

                <div class="relative">
                    <input class="pl-12 rounded-md w-full border-2 border-gray-600 p-2 focus:border-gray-400 focus:shadow-lg focus:text-blue-400 transition bg-white  text-sm focus:outline-none" placeholder="Search Courses" />
                    <button type="submit">
                        <FaSearch class="absolute right-0 top-0 flex items-center mt-3 mr-10  text-gray-600" />

                    </button>
                </div>
                <div class="py-3">
                    <h1 class="text-blue-500 text-2xl font-bold">Browse by Category</h1>
                </div>


                <div class="py-3 flex flex-row justify-between w-full">
                    <button class="flex flex-row overflow-hidden">
                        <div class="flex justify-center py-4 px-2  items-center bg-gray-700 font-bold text-white rounded-md">
                            <span>Designer</span>
                        </div>
                    </button>
                    <button class="flex flex-row">
                        <div class="flex justify-center py-4 px-2 items-center bg-gray-700 font-bold text-white rounded-md">
                            <span>Traders</span>
                        </div>
                    </button>
                    <button class="flex flex-row">
                        <div class="flex justify-center py-4 px-2 items-center bg-gray-700 font-bold text-white rounded-md">
                            <span>Developers</span>
                        </div>
                    </button>

                    <button class="flex flex-row">
                        <div class="flex justify-center py-4 px-2 items-center bg-gray-700 font-bold text-white rounded-md">
                            <span>Investors</span>
                        </div>
                    </button>
                </div>

                <div class="py-2 capitalize">
                    <p class="text-3xl font-semibold text-gray-700 flex justify-center">courses</p>
                    <p class="text-md flex justify-center mt-1 text-gray-500"> 16 results found</p>
                </div>


                <div class="w-full">
                    <ul>
                        {courses.map((course, index) => (
                            <div key={index} className="border-2 mb-4 rounded-md p-4 border-gray-400">
                                <li class="flex border-gray-900 p-3 border-2 w-full rounded-lg justify-between items-center">
                                    <div class="flex flex-row items-center">
                                        <img src="../assets/img1.jpg" class="w-10 h-10 rounded-full" />
                                        <span className="ml-2 text-2xl font-bold text-black">
                                            {course.ownername}
                                        </span>
                                    </div>

                                    <div>
                                        {course.owner}
                                    </div>

                                </li>


                                <div class="my-4">
                                    <p class="text-3xl font-bold">{course.name} --
                                        <span className="text-2xl">
                                            <span className="text-blue-500 mr-4">
                                                {course.price}
                                            </span>
                                            xpaceToken
                                        </span>
                                    </p>
                                    <p class="text-md truncate mt-2 ">
                                        {course.desc}
                                    </p>
                                </div>
                                <div className="flex w-full justify-center">
                                    <button onClick={() => createOrder(course)} className="bg-blue-400 font-bold text-gray-200 p-3 rounded-lg"> Order </button>
                                </div>
                            </div>

                        ))}
                    </ul>
                </div>


            </div>
        </Layout>
    );
}

export default Course;