import { IoLogOut, IoCreate } from 'react-icons/io5';
import { IoMdSchool } from 'react-icons/io';
import { BsFileEarmarkPost } from 'react-icons/bs';
import { MdWorkspaces, MdOutlineCreateNewFolder } from 'react-icons/md';

const Sidebar = () => {

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
    <div class="flex justify-between h-full flex-col ">
      <div>
        <div className="mt-12 flex justify-center w-full">
          <button class="h-12 w-12 hover:bg-lightblue text-3xl text-blue-500 rounded-full">
            <img src="/assets/svg.svg" class="w-12 h-10" />
          </button>
        </div>

        <div>
          <a class="focus:outline-none flex items-center py-3 px-4 border-blue-200 border-2 hover:bg-blue-400 hover:shadow-lg hover:text-gray-500 lg:rounded-md rounded-full mr-auto my-3 transition-all ">
            <button className='flex justify-between'>
              <a href="/posts ">
                <p class="text-lg font-bold text-gray-600 text-left hidden lg:block ml-4"> Posts </p>
              </a>
              <BsFileEarmarkPost className='lg:block text-right ml-4 text-sm hidden md:block text-gray-600' size={25} />


              <div class="b md:hidden flex justify-center">
                <a href="/posts" >
                  <BsFileEarmarkPost style={{ color: "black" }} size={25} />
                </a>
              </div>
            </button>
          </a>
        </div>
        <div>
          <a class="focus:outline-none flex items-center py-3 px-4 border-blue-200 border-2 hover:bg-blue-400 hover:shadow-lg hover:text-gray-500 lg:rounded-md rounded-full mr-auto my-3 transition-all ">
            <button className='flex justify-between'>
              <a href="/course">
                <p class="text-lg font-bold text-black text-left hidden lg:block ml-4"> Courses </p>
              </a>
              <IoMdSchool className='lg:block text-right ml-4 text-sm hidden md:block text-gray-600' size={25} />

              <div class="b md:hidden flex justify-center">
                <a href="/course" >
                  <IoMdSchool style={{ color: "black" }} size={25} />
                </a>
              </div>
            </button>
          </a>
        </div>
        <div>
          <a class="focus:outline-none flex items-center py-3 px-4 border-blue-200 border-2 hover:bg-blue-400 hover:shadow-lg hover:text-gray-500 lg:rounded-md rounded-full mr-auto my-3 transition-all ">
            <button className='flex justify-between'>
              <a href="/hire">
                <p class="text-lg font-bold text-black text-left hidden lg:block ml-4"> Hire </p>
              </a>
              <MdWorkspaces className='lg:block text-right ml-4 text-sm hidden md:block text-gray-600' size={25} />


              <div class="b md:hidden flex justify-center">
                <a href="/hire" >
                  <MdWorkspaces style={{ color: "black" }} size={25} />
                </a>
              </div>
            </button>
          </a>
        </div>
        <div>
          <a class="focus:outline-none flex items-center py-3 px-4 border-blue-200 border-2 hover:bg-blue-400 hover:shadow-lg hover:text-gray-500 lg:rounded-md rounded-full mr-auto my-3 transition-all ">
            <button className='flex justify-between'>
              <a href="/make_post">
                <p class="text-lg font-bold text-black text-left hidden lg:block ml-4"> Make a Post </p>
              </a>
              <IoCreate className='lg:block text-right ml-4 text-sm hidden md:block text-gray-600' size={25} />



              <div class="b md:hidden flex justify-center">
                <a href="/make_post" >
                  <IoCreate style={{ color: "black" }} size={25} />
                </a>
              </div>
            </button>
          </a>
        </div>
        <div>
          <a class="focus:outline-none flex items-center py-3 px-4 border-blue-200 border-2 hover:bg-blue-400 hover:shadow-lg hover:text-gray-500 lg:rounded-md rounded-full mr-auto my-3 transition-all ">
            <button className='flex justify-between'>
              <a href="/create_course">
                <p class="text-lg font-bold text-black text-left hidden lg:block ml-4">  Make a Course </p>
              </a>
              <MdOutlineCreateNewFolder className='lg:block text-right ml-4 text-sm hidden md:block text-gray-600' size={25} />


              <div class="b md:hidden flex justify-center">
                <a href="/create_course" >
                  <MdOutlineCreateNewFolder style={{ color: "black" }} size={25} />
                </a>
              </div>
            </button>
          </a>

        </div>



      </div>

      <div class="lg:w-full relative">
        <button onClick={LogOut} class="flex lg:items-left lg:text-left justify-center items-center text-center w-full bg-gray-600 md:bg-red-500 md:hover:bg-red-600 rounded-md transition px-3 my-2 py-3 focus:outline-none">
          <div class="b md:hidden ">
            <IoLogOut style={{ color: "white" }} size={25} />
          </div>
          <div class="hidden lg:block ml-4">
            <button class="text-lg leading-tight font-bold text-gray-100">LogOut</button>
          </div>
          <IoLogOut className='lg:block text-right ml-auto text-sm hidden md:block ' style={{ color: "white" }} size={25} />

        </button>
      </div>
    </div>
  );
}

export default Sidebar;