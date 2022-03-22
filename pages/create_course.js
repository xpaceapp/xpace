import Layout from "../components/Layout";
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";

const Create_Course = () => {
    const router = useRouter()
    const [courseName, setCourseName] = useState("")
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("")

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


    // upload course
    const uploadCourse = async (e) => {
        e.preventDefault();


        const coursedetail = {
            owner: userDetails.walletAddress,
            name: courseName,
            ownername: userDetails.name,
            price: price,
            desc: desc,
            pdf: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFuzXlbe2gwPOnc_oVk1wkYy071i9GYQrqM3jhjF_rwqRJzhXCrWS-v-tovl5CclzgCcI&usqp=CAU",
            file: "https://www.youtube.com/watch?v=UBJ-j6Mcbzw"
        };

        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {


            const user = await app.logIn(credentials);

            if (user) {

                const insertO = await user.functions.xpaceCourses(coursedetail);

                console.log(insertO)

                router.push({
                    pathname: `/course`,
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
                        <h1 className="max-w-md mx-auto text-2xl font-bold text-gray-800">Make a Course</h1>
                    </div>
                    <div class="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
                        <div class="md:flex">
                            <form className="mx-auto w-10/12 mt-8">
                                <div class="mb-6">
                                    <label for="email" class="pl-4 font-bold text-lg text-gray-600 block mb-2 ">Post Title</label>
                                    <input onChange={(e) => setCourseName(e.target.value)} type="text" class="shadow-sm bg-gray-50 border
            border-gray-500 text-gray-900  rounded-lg block w-full p-2.5" placeholder="title" required />

                                    <br />

                                    <label for="email" class="pl-4 font-bold text-lg text-gray-600 block mb-2 ">Amount in Xpace Token</label>
                                    <input onChange={(e) => setPrice(e.target.value)} type="number" class="shadow-sm bg-gray-50 border
            border-gray-500 text-gray-900  rounded-lg block w-full p-2.5" placeholder="amount" required />

                                    <br />

                                    <label for="email" class="pl-4 font-bold text-lg text-gray-600 block mb-2 ">Description</label>
                                    <textarea cols={30} onChange={(e) => setDesc(e.target.value)} type="text" class="shadow-sm bg-gray-50 border
            border-gray-500 text-gray-900  rounded-lg block w-full p-2.5" placeholder="amount" required > </textarea>

                                    <br />

                                    <label for="email" class="pl-4 font-bold text-lg text-gray-600 block mb-2 ">Pdf</label>

                                    <input type="file"
                                        id="fileElem"
                                        multiple accept="image/*"


                                        class="bg-gray-50 border
                                    border-gray-400 
                                    text-gray-900  rounded-lg 
                                    block w-full p-1"  required
                                    />
                                    <br />

                                    <label for="email" class="pl-4 font-bold text-lg text-gray-600 block mb-2 ">File</label>

                                    <input type="file"
                                        id="fileElem"
                                        multiple accept="image/*"


                                        class="bg-gray-50 border
                                    border-gray-400 
                                    text-gray-900  rounded-lg 
                                    block w-full p-1"  required
                                    />
                                    <br />

                                </div>


                                <button onClick={uploadCourse} type="submit" class="text-white bg-blue-700 
                            hover:bg-blue-800 rounded-md px-5 py-2.5 font-bold text-center">
                                    Create a Course
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

export default Create_Course;