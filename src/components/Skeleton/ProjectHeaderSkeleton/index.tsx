export const ProjectHeaderSkeleton = () => (
  <div className="animate-pulse grid grid-rows-1 lg:grid-cols-5 px-[29px] py-12 bg-zinc-100 dark:bg-neutral-700 rounded-lg items-center lg:place-items-center gap-4 ">
    <div className="h-8 bg-gray-200 rounded-lg dark:bg-gray-700 w-full" />
    <div className="lg:col-span-2 flex flex-row gap-[22px] w-full lg:items-center lg:justify-center">
      <div className=" h-8 w-16 bg-gray-200 rounded-lg dark:bg-gray-700" />
      <div className="h-8  w-1/2 bg-gray-200 rounded-lg dark:bg-gray-700" />
    </div>
    <div className="h-8 w-2/3 bg-gray-200 rounded-lg dark:bg-gray-700 " />
    <div className="flex flex-col gap-3 dark:text-white w-full lg:items-center lg:justify-center">
      <div className=" h-8 w-2/3 bg-gray-200 rounded-lg dark:bg-gray-700 " />
      <div className="h-8  w-2/3 bg-gray-200 rounded-lg dark:bg-gray-700" />
    </div>
  </div>
);
