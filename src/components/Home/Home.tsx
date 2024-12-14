import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faPhone, faXmark } from "@fortawesome/free-solid-svg-icons";
import useModalStore from "../../Store/ModalTogal";

function Home() {

  //@ts-ignore
  const { isModalVisible, hideModal, showModal, isFirstVisit } = useModalStore();


  useEffect(() => {
    if (isFirstVisit) {
      showModal()
    }
  }, [isFirstVisit])

  const handleAcceptTerms = () => {
    hideModal()

  };

  console.log(JSON.stringify({ isModalVisible, isFirstVisit }));




  return (
    <>
      <section className={`w-[100vw] sm:w-[400px] min-h-[100vh] h-auto bg-[#eee] mx-auto ${isModalVisible ? "fixed" : "relative"}`}>
        <div className={` w-[100vw] sm:w-[400px] mx-auto top-0 left-0 right-0 bottom-0 fixed bg-[rgba(0,0,0,.8)] z-50 flex justify-center items-center ${isModalVisible ? "block" : "hidden"}`}>
          <div className="bg-blue-400 h-[75vh] w-[75%] relative rounded-lg flex flex-col items-center " >
            <h1 className="text-2xl text-white font-bold underline mt-3 mb-1">Terms and Conditions</h1>
            <div className=" my-3 pr-4 ml-5 overflow-auto h-full flex flex-col " >
              <ul className="flex flex-col gap-2 list-decimal list-inside"  >
                <li className="text-gray-200"><span className="font-semibold text-white">Invest Smartly:</span> Ensure informed decisions before investing in solar.</li>
                <li className="text-gray-200"><span className="font-semibold text-white">Secure Deposits:</span> All funds are safeguarded with industry-standard security measures.</li>
                <li className="text-gray-200"><span className="font-semibold text-white">Hassle-Free Withdrawals:</span> Withdraw funds seamlessly following app guidelines and policies.</li>
                <li className="text-gray-200"><span className="font-semibold text-white">Referral Rewards:</span>  Earn bonuses by inviting friends to join solar ventures.</li>
                <li className="text-gray-200"><span className="font-semibold text-white">Transparent Earnings:</span> Track and view earnings with complete transparency and accuracy.</li>
                <li className="text-gray-200"><span className="font-semibold text-white">Timely Updates:</span> Stay informed with regular updates on solar project performance.</li>
                <li className="text-gray-200"><span className="font-semibold text-white">User Privacy:</span> Personal data is protected per the app’s privacy policies.</li>
                <li className="text-gray-200"><span className="font-semibold text-white">Zero Hidden Fees:</span> All charges are disclosed upfront for complete transparency.</li>
                <li className="text-gray-200"><span className="font-semibold text-white">Operational Hours:</span> Transactions are processed within specified operational timelines only.</li>
                <li className="text-gray-200"><span className="font-semibold text-white">No Guarantees or Advice:</span> The App does not provide financial, legal, or tax advice. Any information provided is for informational purposes only and should not be interpreted as investment advice or guarantees of performance.</li>
                <li className="text-gray-200"><span className="font-semibold text-white">Ethical Investments: </span> Funds are directed toward sustainable and environmentally-friendly projects.</li>
              </ul>

            </div>
            <button onClick={handleAcceptTerms} className="bg-white mx-auto w-fit mt-1 mb-3 text-blue-500 px-3 py-2 rounded-full">I accept all terms and conditions</button>
          </div>
        </div>
        <div className=" sticky top-0" >
          <Header title={"Solar Cash"} logo="/assets/logo1.png" />
          <div >
            <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
              <div className="h-[200px]">
                <img
                  src="/assets/solar1.png"
                  className="object-cover h-48 w-96"
                />
              </div>
              <div className="h-7">
                <img
                  src="/assets/solor2.jpg"
                  className=" object-cover h-48 w-96"
                />
              </div>
              <div className="h-7">
                <img src="\assets\solar3.jpg" className="object-contain" />
              </div>
            </Carousel>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '15px',
              width: '90%',
              margin: 'auto',
              backgroundColor: '#fff',
              marginTop: '10px',
              overflow: 'hidden', // Hide overflow for smooth transition
              position: 'relative'
            }}
          >
            {/* Icon */}
            <FontAwesomeIcon icon={faBullhorn} size="lg" style={{ color: '#007bff' }} />
            {/* @ts-ignore */}
            <marquee direction="Down" height="25" scrollamount="2">
              {(new Array(100).fill(undefined)).map(() => (
                <div className=" flex justify-between  ml-8"  >
              
                  <span
                    style={{
                      fontSize: '16px',
                      color: '#333',
                      display: 'inline-block',

                    }}
                  >
                    {Math.floor(Math.random() * (990 - 610 + 1)) + 610}*****{Math.floor(Math.random() * 100 + 10)}
                  </span>
                 
                  {/* Dynamic amount */}
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#28a745',
                      display: 'inline-block',

                    }}
                  > <span className="text-gray-500 mx-4" >&nbsp;&nbsp;&nbsp;&nbsp;Withdraw</span>
                    ₹{Math.floor(Math.random() * (5000 - 500 + 1)) + 500}
                  </span>
                </div>
              ))}
            </marquee>

            {/* Keyframes Animation */}
            <style>
              {`
                @keyframes moveUp {
                  0% {
                    transform: translateY(100%);
                  }
                  100% {
                    transform: translateY(-100%);
                  }
                }
        `}
            </style>
          </div>
          <div className="px-3 pb-4 ">
            <h2 className="text-[17px] py-3 font-bold">Contect Us</h2>
            <div className="flex justify-around items-center bg-white h-[90px] rounded-se-[32px] rounded-es-[32px] shadow-xl ">
              <Link to={"/withdraw"} className="flex flex-col items-center hover:text-blue-800 group">
                <img src="\assets\wallet.png" width="45px" className="group-hover:w-[50px]" />
                <span className="pt-1 text-[13px] font-semibold">Withdraw</span>
              </Link>

              <Link to={"/invest"} className="flex flex-col items-center hover:text-blue-800 group">
                <img src="\assets\recharge.png" width="45px" className="group-hover:w-[50px]" />
                <span className="pt-1 text-[13px] font-semibold">Recharge</span>
              </Link>

              <Link to={"/"} className="flex flex-col items-center hover:text-blue-800 group">
                <img src="\assets\download.png" width="45px" className="group-hover:w-[50px]" />
                <span className="pt-1 text-[13px] font-semibold">Download</span>
              </Link>

              <Link to={"/share"} className="flex flex-col items-center hover:text-blue-800 group">
                <div className="w-[50px] flex justify-center" >
                  <img src="\assets\share_10976059.png" width="90%" className="group-hover:w-[100%]" />
                </div>
                <span className="pt-1 text-[13px] font-semibold">Share</span>
              </Link>
            </div>
          </div>
        </div>
        <div className=" pb-10 overflow-scroll h-[42vh] ">
          <h2 className="text-[17px] py-3 px-3 font-bold">About Us</h2>
          <div className="bg-white px-3 py-3 text-[15px] font-[cursive]">
            <div className="">
              <img src="\assets\solar1.png" className="w-auto h-[100px] ps-[4px] float-right" />
              <p className="font-sans" >
                Solar power companies in the chain marketing model are
                revolutionizing the renewable energy industry by offering
                innovative solar solutions while empowering a network of
                distributors to promote clean energy. These companies provide
                individuals with the opportunity to earn passive income by
                helping others switch to solar power. Through a network of
                distributors, they reach a wider audience and contribute to
                sustainable energy solutions.
              </p>

            </div>
            <br />
            <h2 className="font-bold pb-3 font-sans">How it Works:-</h2>

            <ol className="space-y-3 font-sans ">
              <img src="\assets\solar3.jpg" className="w-auto h-[100px] pe-[5px] float-left" />
              <li>
                1. Sign-Up Process: Individuals interested in joining the
                company as distributors can sign up by purchasing a starter kit
                or becoming a part of the solar marketing network. This kit may
                include materials on solar products, sales training, and
                marketing tools.
              </li>
              <li>
                2. Promote Solar Products: Distributors are then responsible for
                selling solar panels, solar batteries, inverters, and related
                solar technology to customers. They educate potential buyers on
                the benefits of solar energy, including long-term savings on
                electricity bills, environmental sustainability, and energy
                independence.
              </li>
              <li>
                3. Recruitment: In addition to selling solar products,
                distributors are encouraged to recruit others into the network,
                building their own teams. Each new recruit (downline) becomes a
                part of the distributor’s network, and they earn commissions on
                the sales made by their recruits, creating a chain of sales and
                recruits.
              </li>
              <li>
                4. Commissions and Incentives: Distributors earn commissions on
                both their direct sales and the sales made by their recruits.
                This incentivizes the growth of the distributor network. The
                company often offers bonuses, travel rewards, and leadership
                programs to motivate top performers.
              </li>
              <li>
                5. Training and Support: Solar chain marketing companies
                typically provide continuous training, support, and marketing
                materials to help their distributors succeed. This includes
                training on how to sell solar products effectively, build a
                network, and manage customer relationships.
              </li>
            </ol>
            <br />

            <h2 className="pb-2 font-bold font-sans">
              Benefits of Solar Power Chain Marketing:-
            </h2>

            <ul className="space-y-3 list-disc ps-3 font-sans">
              <img src="\assets\solarInvest.jpg" className="w-auto h-[100px] pe-[5px] float-right" />
              <li>
                Earn Passive Income: Distributors have the potential to earn not
                just from direct sales but also from the sales generated by
                their recruits, creating a passive income stream.
              </li>
              <li>
                Promote Clean Energy: Distributors are promoting renewable
                energy and contributing to environmental sustainability, making
                this business model attractive for eco-conscious individuals.
              </li>
              <li>
                Low Initial Investment: Compared to traditional businesses,
                joining a solar power MLM often requires a relatively low
                initial investment, making it accessible to many people.
              </li>
              <li>
                Flexibility: Many distributors can work from home or remotely,
                which provides flexibility and the opportunity to manage their
                schedules.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
