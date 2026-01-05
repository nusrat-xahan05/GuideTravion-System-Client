import ManagementPageHeader from "@/components/shared/ManagementPage/ManagementPageHeader";


const WishlistHeader = () => {

    return (
        <>
            <div className="space-y-3">
                <ManagementPageHeader
                    title="My Wishlist"
                    description="See Tours information and details"
                />
            </div>
        </>
    );
};

export default WishlistHeader;
