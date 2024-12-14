import React from "react";
import InnerPageHeading from "../Common/InnerPageHeading";

function Recharge() {
  return (
    <>
      <section className="w-[100vw] sm:w-[400px] min-h-[100vh] h-auto bg-blue-400 mx-auto relative">
        <InnerPageHeading title="Recharge" />

        <div className="px-3 py-[45px]">
          <div>
            <h2 className="font-semibold py-[5px]">Choose Amount</h2>
            <div className="flex justify-between py-2">
              <button className="bg-white w-[120px] py-1 rounded-[6px] font-semibold hover:bg-blue-800 hover:text-white hover:font-bold">
                Rs 500
              </button>
              <button className="bg-white w-[120px] py-1 rounded-[6px] font-semibold hover:bg-blue-800 hover:text-white hover:font-bold">
                Rs 3000
              </button>
              <button className="bg-white w-[120px] py-1 rounded-[6px] font-semibold hover:bg-blue-800 hover:text-white hover:font-bold">
                Rs 5000
              </button>
            </div>
            <div className="flex justify-between py-2">
              <button className="bg-white w-[120px] py-1 rounded-[6px] font-semibold hover:bg-blue-800 hover:text-white hover:font-bold">
                Rs 10000
              </button>
              <button className="bg-white w-[120px] py-1 rounded-[6px] font-semibold hover:bg-blue-800 hover:text-white hover:font-bold">
                Rs 20000
              </button>
              <button className="bg-white w-[120px] py-1 rounded-[6px] font-semibold hover:bg-blue-800 hover:text-white hover:font-bold">
                Rs 50000
              </button>
            </div>
          </div>

          <div className="py-3">
            <h2 className="font-semibold py-[5px]">Amount</h2>
            <div>
              <input
                type="text"
                placeholder="00.00"
                className="w-[100%] px-2 py-2 rounded-[6px]"
              />
            </div>
          </div>

          <div className="font-semibold py-[5px]">
            <h2>Recharge Method</h2>
            <div className="flex justify-between py-2">
              <button className="bg-white w-[120px] py-1 rounded-[6px] font-semibold hover:bg-blue-800 hover:text-white hover:font-bold">
                QLPay
              </button>
              <button className="bg-white w-[120px] py-1 rounded-[6px] font-semibold hover:bg-blue-800 hover:text-white hover:font-bold">
                FastPay
              </button>
              <button className="bg-white w-[120px] py-1 rounded-[6px] font-semibold hover:bg-blue-800 hover:text-white hover:font-bold">
                QLSPay
              </button>
            </div>

            <div className="flex gap-2 py-2">
              <button className="bg-white w-[120px] py-1 rounded-[6px] font-semibold hover:bg-blue-800 hover:text-white hover:font-bold">
                AtPay
              </button>
              <button className="bg-white w-[120px] py-1 rounded-[6px] font-semibold hover:bg-blue-800 hover:text-white hover:font-bold">
                YessPay
              </button>
            </div>
          </div>

          <div className="py-5">
            <button className="w-[100%] bg-blue-800 text-white rounded-full py-2 font-semibold  hover:bg-white hover:text-black ">Recharge</button>
          </div>
        </div>

      </section>
    </>
  );
}

export default Recharge;
