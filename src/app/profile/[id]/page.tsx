import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export default async function UserProfile ({
  params
}: any) {
    const { id } = await params

  return (
    <div className="h-screen">
      <div className="py-2 px-2">
        <Link href="/">
          <div className="inline-flex items-center space-x-2">
            <FaArrowLeftLong className="text-sm" />
            <span className="text-sm font-semibold">Back Home</span>
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-[80%] md:w-[40%] lg:w-[30%] xl:w-[20%]">
          <div>PROFILE PAGE {id}
            <p className="text-3xl text-black">
            </p>
            <p className="text-3xl text-red-500"></p>

          </div>
        </div>
      </div>
    </div>
  );
}
