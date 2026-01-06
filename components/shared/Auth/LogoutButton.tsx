"use client";

import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/auth/logoutUser";

const LogoutButton = () => {
    const handleLogout = async () => {
        await logoutUser();
    };
    return (
        <Button className="cursor-pointer" variant={"destructive"} onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;