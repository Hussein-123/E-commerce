import amazonPayLogo from "../../../../public/images/amazon-pay.png";
import americanExpressLogo from "../../../../public/images/American-Express-Color.png";
import masterCardLogo from "../../../../public/images/mastercard.webp";
import appStoreLogo from "../../../../public/images/get-apple-store.png";
import googlePlayLogo from "../../../../public/images/get-google-play.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-slate-100 py-4 sm:py-6 mt-8">
      <div className="container w-full px-3 sm:px-4 md:px-6 lg:w-[90%] xl:w-[80%] mx-auto space-y-4">
        <header>
          <h2 className="text-lg sm:text-xl font-semibold text-emerald-700">
            Get the FreshCart App
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            We will send you a link, open it on your phone to download the app
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            className="px-3 py-2 sm:py-2.5 rounded-md border-2 border-slate-300 hover:border-slate-400 focus:border-emerald-500 focus:outline-none transition-colors flex-1 text-sm sm:text-base"
            type="email"
            placeholder="Email Address"
          />
          <Button className="cursor-pointer px-4 py-2 sm:py-2.5 text-sm sm:text-base whitespace-nowrap bg-emerald-600 hover:bg-emerald-700">
            Share App Link
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 justify-between py-4 border-y-2 border-slate-200">
          <div className="payment-partners">
            <h3 className="text-sm sm:text-base font-medium mb-3 text-gray-700">
              Payment Partners
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
              <Image
                className="w-16 sm:w-20 md:w-24 h-auto"
                src={amazonPayLogo}
                alt="Amazon Pay"
              />
              <Image
                className="w-16 sm:w-20 md:w-24 h-auto"
                src={americanExpressLogo}
                alt="American Express"
              />
              <Image
                className="w-14 sm:w-16 md:w-20 h-auto"
                src={masterCardLogo}
                alt="Mastercard"
              />
            </div>
          </div>

          <div className="download">
            <h3 className="text-sm sm:text-base font-medium mb-3 text-gray-700">
              Get deliveries with FreshCart
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
              <Image
                className="w-20 sm:w-24 md:w-28 h-auto"
                src={appStoreLogo}
                alt="Download on App Store"
              />
              <Image
                className="w-24 sm:w-28 md:w-32 h-auto"
                src={googlePlayLogo}
                alt="Get it on Google Play"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
