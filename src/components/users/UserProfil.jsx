import React from 'react'

export default function UserProfile() {
  return (
    <div className='flex justify-center items-center w-full'>
    
 
        <div className="bg-gray-800 relative shadow overflow-hidden sm:rounded-lg">
        <div
    className="bg-gray-800  relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
    <div className="flex items-center gap-4">
      <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxhdmF0YXJ8ZW58MHwwfHx8MTY5MTg0NzYxMHww&ixlib=rb-4.0.3&q=80&w=1080"
      className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
    />
      <div className="w-fit transition-all transform duration-500">
        <h1 className="text-gray-600 dark:text-gray-200 font-bold">
          Sandjon Yves
        </h1>
        <p className="text-gray-400">Senior Developer</p>
        <a
          className="text-xs text-gray-500 dark:text-gray-200 group-hover:opacity-100 opacity-0 transform transition-all delay-300 duration-500">
          GRADE A
        </a>
      </div>
    </div>
  
</div>
    <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-white">
            student data
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Details and informations in this studeny.
        </p>
    </div>
    <div className="border-t ">
        <dl>
            <div className="bg-gray-8000 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-50">
                    fist name
                </dt>
                <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
                    Mickael Poulaz
                </dd>
            </div>
            <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-50">
                   last name
                </dt>
                <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
                    React JS
                </dd>
            </div>
            {/* <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-50">
                    Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
                    m.poul@example.com
                </dd>
            </div> */}
            {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Salary
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    $10,000
                </dd>
            </div> */}
            {/* <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    About
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    To get social media testimonials like these, keep your customers engaged with your social media accounts by posting regularly yourself
                </dd>
            </div> */}
        </dl>
    </div>
</div>

</div>
  )
}
