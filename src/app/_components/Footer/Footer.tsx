import amazonPayLogo from "../../../../public/images/amazon-pay.png";
import americanExpressLogo from "../../../../public/images/American-Express-Color.png";
import masterCardLogo from "../../../../public/images/mastercard.webp";
import appStoreLogo from "../../../../public/images/get-apple-store.png";
import googlePlayLogo from "../../../../public/images/get-google-play.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 py-6">
        <div className="container w-full lg:w-[80%] px-4 mx-auto space-y-4">
          <header>
            <h2 className="text-xl font-semibold text-emerald-700">
              Get the FreshCart App
            </h2>
            <p className="text-slate-400 ">
              We will send you a link, open it on your phone to download the app
            </p>
          </header>
          <div className="flex gap-2">
            <input
              className="px-2 py-1 rounded-md border-2 border-slate-400 border-opacity-50 flex-1"
              type="email"
              placeholder="Email Address"
            />
            <Button className="cursor-pointer">Share App Link</Button>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center py-4 border-y-2 border-slate-300 border-opacity-50">
            <div className="payment-partners flex gap-3 items-center">
              <h3>Payment Partners</h3>
              <Image className="w-24" src={amazonPayLogo} alt="" />
              <Image className="w-24" src={americanExpressLogo} alt="" />
              <Image className="w-20" src={masterCardLogo} alt="" />
            </div>
            <div className="download flex items-center gap-3">
              <h3>Get deliveries with FreshCart</h3>
              <Image className="w-24" src={appStoreLogo} alt="" />
              <Image className="w-[110px]" src={googlePlayLogo} alt="" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
