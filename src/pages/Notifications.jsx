import React from 'react'
import AnotherNotifications from '../components/AnotherNotifications'
import FriendsRequest from '../components/FriendsRequest'
function Notifications() {
  return (
    <>
        <div className="lg:mt-5 lg:w-[900px] mx-auto">
        <div>
          <div className="flex items-center p-5 border-b border-gray-200">
            <h2 className="font-medium text-base mr-auto">
              Notifications
            </h2>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 xl:col-span-5">
                <div className="border border-gray-200 rounded-md p-5">
                    <FriendsRequest />
                </div>
              </div>

              <div className="col-span-12 xl:col-span-7">
               <AnotherNotifications />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notifications