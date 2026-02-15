"use client";

import { useState } from "react";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

export default function Notification() {
  const [loginPush, setLoginPush] = useState(false);
  const [loginEmail, setLoginEmail] = useState(false);
  const [updatePush, setUpdatePush] = useState(false);
  const [newsletterPush, setNewsletterPush] = useState(false);

  const renderCheckbox = (
    checked: boolean,
    onClick: () => void,
    label: string,
  ) => (
    <div className="flex items-center gap-2 cursor-pointer" onClick={onClick}>
      {checked ? (
        <FaCheckSquare className="text-xl text-[#026937]" />
      ) : (
        <FaRegSquare className="text-xl" />
      )}
      <span className="text-base text-grey-40">{label}</span>
    </div>
  );

  return (
    <div className="px-7 md:px-15 mt-5 bg-[#F3F3F3] rounded-[10px] pt-5 md:pt-15 pb-20 min-h-screen">
      {/* Login Alerts */}
      <div className="hidden grid-cols-1 md:grid-cols-2 space-y-5 md:space-y-10">
        <div>
          <p className="text-base text-grey-90 font-bold leading-loose">
            Login Alerts
          </p>
          <p className="text-base text-grey-40">
            Notification on successful log into your account
          </p>
        </div>
        <div className="flex flex-col space-y-5 mb-15 md:mb-0">
          {renderCheckbox(
            loginPush,
            () => setLoginPush(!loginPush),
            "Push Notification",
          )}
          {renderCheckbox(
            loginEmail,
            () => setLoginEmail(!loginEmail),
            "Email",
          )}
        </div>
      </div>

      {/* Update Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 space-y-5 md:space-y-10">
        <div>
          <p className="text-base text-grey-90 font-bold leading-loose">
            Update Alerts
          </p>
          <p className="text-base text-grey-40">
            Notification on Product Update
          </p>
        </div>
        <div className="flex gap-5 mb-15 md:mb-0">
          {renderCheckbox(
            updatePush,
            () => setUpdatePush(!updatePush),
            "Push Notification",
          )}
        </div>
      </div>

      {/* Newsletters */}
      <div className="grid grid-cols-1 md:grid-cols-2 space-y-5">
        <div>
          <p className="text-base text-grey-90 font-bold leading-loose">
            Newsletters
          </p>
          <p className="text-base text-grey-40">
            Notification on what we are upto.
          </p>
        </div>
        <div className="flex gap-5">
          {renderCheckbox(
            newsletterPush,
            () => setNewsletterPush(!newsletterPush),
            "Push Notification",
          )}
        </div>

        <button
          type="submit"
          className="py-3 w-full md:max-w-[340px] text-white mt-15 md:mt-20 font-bold bg-[#026937] rounded-[10px]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
