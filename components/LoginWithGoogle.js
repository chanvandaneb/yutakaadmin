import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"

export default function test() {
  return (
    <div>
      <div class="flex flex-col md:flex-row h-screen items-center">
        <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img
            src="https://source.unsplash.com/random/?food"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>

        <div
          class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
        >
          <div class="w-full h-100">
            <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">
              Log in to Admin Dashboard
            </h1>

            <hr class="my-6 border-gray-300 w-full" />


            <div className="border border-1 border-gray-300 mb-5 rounded-2xl">
            <img className="rounded-2xl" src="https://i.ibb.co/yN8PQJ2/300631170-473853108083590-2846346756193704367-n.jpg"/>
            
            </div>
            <button onClick={() => signIn('google')}
              type="button"
              class="w-full block bg-white hover:bg-gray-200 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-5 rounded-2xl border border-gray-300"
            >
                <div class="flex items-center justify-center">
                <img
                  class="h-5 mr-2"
                  src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                  alt=""
                />
                <span class="ml-4">Log in with Google</span>
              </div>
            </button>

            <div className="flex justify-between mt-8">
            
            <p>
              Need an account?{" "}
              <a
                href="#"
                class="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Contact to Store
              </a>
            </p>

            <p>
                @2023 Yutaka
            </p>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
