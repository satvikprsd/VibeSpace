import ProtectdLayout from "@/components/utils/ProtectedLayout";
import { ModeToggle } from "@/components/utils/theme-selector";
import UserProfile from "@/components/main/UserProfile";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <ProtectdLayout>
            <ModeToggle />
            <div className="fixed bottom-3 left-2 z-50 max-h-15">
              <UserProfile />
            </div>
            {children}
        </ProtectdLayout>
    </div>
  );
}
