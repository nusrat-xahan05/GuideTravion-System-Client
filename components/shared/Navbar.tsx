import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getUserRole } from "@/services/auth/getUserRole";
import { getDefaultDashboardRoute } from "@/lib/navbar-auth-routes";
import LogoutButton from "./Auth/LogoutButton";


const Navbar = async () => {
    const navItems = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/tour", label: "Tours" }
    ];

    const userRole = await getUserRole();
    const dashboardLink = userRole ? getDefaultDashboardRoute(userRole) : '/';


    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
            <div className="mx-auto max-w-[1250px] h-[60px] flex items-center justify-between px-6">

                {/* Left: Logo */}
                <Link href="/" className="text-[22px] font-bold text-blue-600">
                    GuideTravion
                </Link>

                {/* Middle Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-[15px] text-gray-700 font-medium hover:text-blue-600 transition-all duration-300 ease-out">
                            {item.label}
                        </Link>
                    ))}

                    {userRole && (
                        <Link
                            href={dashboardLink}
                            className="text-[15px] text-gray-700 font-medium hover:text-blue-600 transition-all duration-300 ease-out">
                            Dashboard
                        </Link>
                    )}
                </nav>

                {/* Right: Auth Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                    {!userRole ? (
                        <>
                            <Link href="/register/tourist">
                                <Button
                                    variant="outline"
                                    className="rounded-xl px-7 text-[14px] border-blue-700 text-blue-600 hover:bg-blue-50 cursor-pointer">
                                    Register
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button className="rounded-xl px-7 text-[14px] bg-blue-700 hover:bg-blue-700 cursor-pointer">
                                    Login
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <LogoutButton></LogoutButton>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="rounded-lg border-gray-300 cursor-pointer">
                                <Menu />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="p-6 w-[300px]">
                            <SheetTitle className="sr-only">Mobile Menu</SheetTitle>

                            <div className="flex flex-col space-y-5 mt-10">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="text-[17px] font-medium hover:text-blue-600 transition duration-300"
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                {userRole && (
                                    <Link
                                        href={dashboardLink}
                                        className="text-[17px] font-medium hover:text-blue-600 transition duration-300"
                                    >
                                        Dashboard
                                    </Link>
                                )}

                                <div className="border-t pt-5 flex flex-col space-y-4">
                                    {!userRole ? (
                                        <>
                                            <Link href="/register">
                                                <Button
                                                    variant="outline"
                                                    className="w-full rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer"
                                                >
                                                    Register
                                                </Button>
                                            </Link>

                                            <Link href="/login">
                                                <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 cursor-pointer">
                                                    Login
                                                </Button>
                                            </Link>
                                        </>
                                    ) : (
                                        <LogoutButton></LogoutButton>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
