import ProtectdLayout from "@/components/ProtectedLayout";
import { ModeToggle } from "@/components/theme-selector";
import UserProfile from "@/components/UserProfile";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <ProtectdLayout>
            <ModeToggle />
            <div className="fixed bottom-2 left-2 z-50">
            <UserProfile />
            </div>
            {children}
        </ProtectdLayout>
    </div>
  );
}
