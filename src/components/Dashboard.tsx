import Title from "./Title";
import Profile from "./profile/Profile";
import GenerateICP from "./wallet/GenerateICP";
import WalletConnection from "./wallet/WalletConnection";

interface DashboardProps {
  isDynamicLoggedIn: boolean
}

export default function Dashboard({ isDynamicLoggedIn }: DashboardProps) {
  return (
    <div className="flex flex-col mx-auto w-full">
      <div className="flex flex-row p-2">
        <Title />
        <WalletConnection isDynamicLoggedIn={isDynamicLoggedIn} />
      </div>
      <div className="px-4">
        <GenerateICP isDynamicLoggedIn={isDynamicLoggedIn} />
        <Profile />
      </div>
    </div>
  );
}
