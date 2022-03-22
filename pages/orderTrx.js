import Layout from "../components/Layout";
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { useEffect, useState } from "react"
import Link from 'next/link'


const Hire = () => {

    const router = useRouter()

    const [userDetails, setUserDetails] = useState([]);
    const [trxs, setTrxs] = useState([]);


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


    // Load all courses
    useEffect(async () => {
        // add your Realm App Id to the .env.local file
        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();


        try {
            const user = await app.logIn(credentials);
            const allTrx = await user.functions.xpaceUserTrx(userDetails.walletAddress);
            setTrxs(() => allTrx);

        } catch (error) {
            console.error(error);
        }
    }, [trxs]);


    // approve order
    const approveOrder = async (arg) => {

        const approveTrx = {
            owner: userDetails.walletAddress,
            buyer: arg.buyer,
            courseid: userDetails.walletAddress + arg.buyer + arg.name,
            price: arg.price,
            name: arg.name,
            pdf: arg.pdf,
            file: arg.file,
            status: "success"
        };

        console.log(approveTrx.courseid)


        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {

            const user = await app.logIn(credentials);

            if (user) {

                const insertO = await user.functions.xpaceapproveOrder(approveTrx);

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
            <div class="h-full w-full lg:px-40 px-3 py-2 lg:py-3">

                <div class="py-2 mt-24 flex justify-center">
                    <p class="text-2xl font-bold text-gray-700">Transactions</p>

                </div>


                <div class="w-full">
                    <ul>
                        {trxs.map((trx, index) => (
                            <li key={index} class="flex border-2 p-3 border-gray-400 mb-4 rounded-lg">
                                <div class="flex flex-row items-center justify-between"  >

                                    <div class="flex flex-col items-left justify-center ml-3">
                                        <p class="text-black font-semibold text-lg">{trx.name} k</p>
                                        <p class="text-gray-600 font-semibold">Status:
                                            {trx.status == "success" ? <span className="ml-4 text-green-600">{trx.status}...</span> : <span className="ml-4 text-red-700">{trx.status}...</span>}
                                        </p>
                                    </div>

                                </div>
                                {trx.owner == userDetails.walletAddress ? <a onClick={() => approveOrder(trx)} class="p-3 text-white rounded-lg bg-green-600 ml-auto font-semibold">
                                    <button> Approve Order</button>
                                </a> : <a href={`/page?id=${trx.owner}`} class="p-3 text-white rounded-lg bg-blue-600 ml-auto font-semibold">
                                    <button> Send Message</button>
                                </a>}


                            </li>

                        ))}
                    </ul>
                </div>

            </div>
        </Layout>
    );
}

export default Hire;