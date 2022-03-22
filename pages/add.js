import { useEffect, useState } from "react";
import axios from 'axios'
import { useRouter } from "next/router";
import * as Realm from "realm-web";

const Add = () => {
    const [id, setId] = useState(0)
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")

    const router = useRouter()

    // useEffect(async () => {


    //     // add your Realm App Id to the .env.local file
    //     const REALM_APP_ID = "products-qexct";
    //     const app = new Realm.App({ id: REALM_APP_ID });
    //     const credentials = Realm.Credentials.anonymous();
    //     // try {
    //     //     const user = await app.logIn(credentials);

    //     // } catch (error) {
    //     //     console.error(error);
    //     // }
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const products = {
            id: id,
            name: name,
            price, price,
            category: category,
            image: image
        };

        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {


            const user = await app.logIn(credentials);

            if (user) {

                const insertO = await user.functions.addOne(products);

                console.log(insertO)

                // return insertO

                setId("");
                setImage("");
                setCategory("");
                setName("");
                setPrice(0);

                // router.push({
                //     pathname: '/'
                // })
            }



        } catch (error) {
            console.error(error);
        }





    }


    return (
        <div className="w-full flex justify-center">
            <form className="mx-auto w-1/2 mt-8">
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 
                dark:text-gray-300">ID</label>
                    <input type="number" id="email" value={id} onChange={(e) => setId(e.target.value)} class="shadow-sm bg-gray-50 border
                 border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 
                 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light" placeholder="Id" required />
                </div>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 
                dark:text-gray-300">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="email" class="shadow-sm bg-gray-50 border
                 border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 
                 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light" placeholder="Name" required />
                </div>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 
                dark:text-gray-300">Price</label>
                    <input type="number" id="email" value={price} onChange={(e) => setPrice(e.target.value)} class="shadow-sm bg-gray-50 border
                 border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 
                 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light" placeholder="Price" required />
                </div>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 
                dark:text-gray-300">Category</label>
                    <input type="text" id="email" value={category} onChange={(e) => setCategory(e.target.value)} class="shadow-sm bg-gray-50 border
                 border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 
                 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light" placeholder="Category" required />
                </div>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 
                dark:text-gray-300">Image</label>
                    <input type="text" id="email" value={image} onChange={(e) => setImage(e.target.value)} class="shadow-sm bg-gray-50 border
                 border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 
                 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light" placeholder="Image" required />
                </div>
                <button type="submit" onClick={handleSubmit} class="text-white bg-blue-700
                 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
                  font-medium rounded-lg text-sm px-5 py-2.5 text-center
                   dark:bg-blue-600 dark:hover:bg-blue-700 
                   dark:focus:ring-blue-800">Add A New Product</button>
            </form>
        </div>
    );
}

export default Add;