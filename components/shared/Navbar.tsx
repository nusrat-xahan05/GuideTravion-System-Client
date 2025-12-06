// import { getCookie } from "@/services/auth/tokenHandlers";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Navbar = async () => {
    // const accessToken = await getCookie("accessToken");

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/tours", label: "Tours" },
        { href: "/contact", label: "Contact" },
    ];

    const dashboardLink = '/dsa'
    //     userRole === "ADMIN"
    //         ? "/admin/dashboard"
    //         : userRole === "GUIDE"
    //             ? "/guide/dashboard"
    //             : userRole === "TOURIST"
    //                 ? "/tourist/dashboard"
    //                 : "/dashboard";

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

                    {/* {accessToken && (
                        <Link
                            href={dashboardLink}
                            className="text-[15px] text-gray-700 font-medium hover:text-blue-600 transition-all duration-300 ease-out">
                            Dashboard
                        </Link>
                    )} */}
                </nav>

                {/* Right: Auth Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                    <Link href="/login">
                        <Button className="rounded-xl px-7 text-[14px] bg-blue-600 hover:bg-blue-700">
                            Login
                        </Button>
                    </Link>
                    {/* {!accessToken ? (
                        <>
                            <Link href="/register">
                                <Button
                                    variant="outline"
                                    className="rounded-xl px-7 text-[14px] border-blue-600 text-blue-600 hover:bg-blue-50">
                                    Register
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button className="rounded-xl px-7 text-[14px] bg-blue-600 hover:bg-blue-700">
                                    Login
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Link href="/logout">
                            <Button className="rounded-xl px-7 text-[14px] bg-red-500 hover:bg-red-600">
                                Logout
                            </Button>
                        </Link>
                    )} */}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="rounded-lg border-gray-300">
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

                                {/* {accessToken && (
                                    <Link
                                        href={dashboardLink}
                                        className="text-[17px] font-medium hover:text-blue-600 transition duration-300"
                                    >
                                        Dashboard
                                    </Link>
                                )} */}

                                <div className="border-t pt-5 flex flex-col space-y-4">
                                    {/* {!accessToken ? (
                                        <>
                                            <Link href="/register">
                                                <Button
                                                    variant="outline"
                                                    className="w-full rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50"
                                                >
                                                    Register
                                                </Button>
                                            </Link>

                                            <Link href="/login">
                                                <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700">
                                                    Login
                                                </Button>
                                            </Link>
                                        </>
                                    ) : (
                                        <Link href="/logout">
                                            <Button className="w-full rounded-xl bg-red-500 hover:bg-red-600">
                                                Logout
                                            </Button>
                                        </Link>
                                    )} */}
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
