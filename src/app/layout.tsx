import { Karla } from "next/font/google";
import { _SERVICE } from "../../declarations/ic_siwe_provider/ic_siwe_provider.did";
import WalletInitate from "../components/wallet/WalletInitate";
import '../../global.css'

const poppins = Karla({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <WalletInitate>
          {children}
        </WalletInitate>
      </body>
    </html>
  );
}
