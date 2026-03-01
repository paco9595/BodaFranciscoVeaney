import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";

export default function InvitationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            {children}
            <BackToTop />
        </>
    );
}
