import React from "react";
import InnerPageHeading from "../Common/InnerPageHeading";

function Ticket() {
  return (
    <>
      <section className="w-[400px] min-h-[100vh] h-auto bg-[#eee] mx-auto relative">
        <InnerPageHeading title="Crate Ticket" />

        <div className="px-3 py-5">
          <div className="py-2">
            <h2 className="text-blue-500 font-bold text-[19px]">Create New Ticket</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, id.
            </p>
          </div>
          <div className="bg-gray-600 p-5 mx-2 mt-4 rounded-[15px]">
            <div className="flex flex-col">
              <label className="text-blue-400 font-semibold py-2">Title</label>
              <input type="text" placeholder="Title"  className="rounded-t-md text-[17px] px-3 py-3"/>
            </div>
            <div className="flex flex-col">
              <label className="text-blue-400 font-semibold py-2">Message</label>
              <textarea placeholder="Message Here"  rows={4} name="" id="" className="rounded-t-md text-[17px] px-3 py-3"/>
            </div>
            <div className="text-center pt-6 pb-4">
              <button className="bg-blue-600 text-white py-[10px] rounded-[14px] px-7 hover:bg-blue-600 hover:font-semibold hover:text-black">Submit Ticket</button>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}

export default Ticket;
