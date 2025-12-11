
const TourDetailPage = async ({ params, }: { params: Promise<{ id: string }>; }) => {
    const { id } = await params;

    console.log('from page: ', id);
    // const result = await getDoctorById(id);
    return (
        <div className="container mx-auto px-4 py-8 space-y-6">
            <h2>hello from doctor page</h2>
            {/* <DoctorProfileContent doctor={result.data} />
            <DoctorReviews doctorId={id} /> */}
        </div>
    );
};

export default TourDetailPage;