import React, { useEffect, useState } from "react";
import InnerPageHeading from "../Common/InnerPageHeading";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import APIs from "../../API/API";
import axios from "axios";
import { toast } from "react-toastify";

interface Invest {
  id: number;
  name: string;
  upi_id: string;
  status: string;
  type: "upi" | "wallet"
}

function PaymentDetails() {
  const [data, setData] = useState<Invest[]>([]);
  const [input, setInput] = useState("");
  const [payentMethod, setPaymentMethod] = useState<number>();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState();
  const token = localStorage.getItem("token")
  const [paymentType, setPaymentType] = useState("")


  const navigate = useNavigate();


  const hendelBuy = async () => {
    if (payentMethod === undefined) {
      toast.warning("Please Select Payment Method")
      return
    }
    setLoading(true);
    try {
      const { data: response } = await axios.post(
        APIs.MakePayment.path.replace(":id", location.state.id),
        {
          payment_method_id: payentMethod,
          ...(location.state.is_custom && { amount: input }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.success) {
        if (response.data?.payment_status === "completed") {
          return navigate("/purchased");
        }
        navigate("/makePayment", {
          state: response.data,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error => ", error);
    } finally {
      setLoading(false);

    }
  };
  // console.log("aaaaaaaaaa", responseData);

  useEffect(() => {
    let config = {
      method: APIs.PaymentDetails.method,
      maxBodyLength: Infinity,
      url: APIs.PaymentDetails.path,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };


    axios
      .request(config)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setInput(location.state.amount);
    console.log(location.state);
  }, [location.state]);

  useEffect(() => {
    if (paymentType === "wallet") {
      setInput(String(parseFloat(location.state.amount) * 70 / 100))
    }
    
    if (paymentType === "upi") {
      setInput(location.state.amount)
    }
    
  }, [paymentType])

  return (
    <>
      <section className="w-[100vw] sm:w-[400px] min-h-[100vh] h-auto bg-[#eee] mx-auto pb-16 relative">
        <InnerPageHeading title={"Payment Details"} />

        <div className="font-bold bg-white p-5 text-[24px] flex justify-between m-3 rounded-3xl ">
          <p className="">Amount :</p>
          <h1 className="pr-2" >
            ₹
            <input
              type="number"
              placeholder="1000.00"
              value={input}
              min={location.state.amount}
              readOnly={!location.state.is_custom}
              onInput={(e) => setInput(e.currentTarget.value)}
              className=" w-[170px]  text-black font-bold"
            />
          </h1>
        </div>
        <div className="bg-white rounded-3xl m-3 p-4 relative mb-3">
          <h2 className="pb-2 text-[17px] font-semibold">Payment Method</h2>
          <hr />

          {data.map((data, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center py-3 text-[17px]"
              >
                <label className="">{data.name} <span className="text-red-500 text-[12px]">{data.type ==="wallet" && "(30% OFF)"}</span></label>
                <input
                  type="radio"
                  name="test"
                  className="text-[20px]"
                  checked={payentMethod === data.id}
                  onClick={(e) => {
                    if (e.currentTarget.checked) {
                      console.log(data);
                      setPaymentMethod(data.id)
                      setPaymentType(data.type)
                    }
                  }}
                />
              </div>
            );
          })}

          <button
            onClick={hendelBuy}
            className="bg-blue-700 hover:bg-white flex justify-center items-center gap-3 hover:text-blue-700 hover:border-blue-700 hover:border-[1px] font-semibold text-white w-[180px] rounded-md py-[6px] text-[17px] absolute bottom-[-10] left-[25%]"
          >
            <FontAwesomeIcon icon={faCartShopping} />
            <h1>
              {
                loading ? "Wait" : " Buy Now"
              }

            </h1>
          </button>
        </div>

        <div className="bg-white rounded-2xl mt-10 mx-3 p-4 ">
          <h2 className="font-semibold py-2 text-[18px] text-blue-500">Rules:</h2>
          <ol className="list-decimal ps-2 leading-5 flex flex-col gap-4">
            <li className="text-gray-950" > Please do not change the recharge amount at will. If you need to change it, please create a new order.
            </li>
            <li className="text-gray-950" >  The single deposit amount is between 200-50000.
            </li>
            <li className="text-gray-950" > Due to the large number of people recharging the APP, if you encounter a recharge failure, please try another recharge channel.
            </li>
            <li className="text-gray-950" >  After the transfer is successful, if you have not received it after 10 minutes, please contact the online customer service(send a screenshot of the payment. success certificate information and the APP account ID)
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}



export default PaymentDetails;
