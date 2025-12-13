import { Card, CardContent } from "@/components/ui/card";
import { ITour } from "@/types/tour.interface";

const BookingSummary = ({ tour, startDate, endDate, persons }: { tour: ITour; startDate: Date; endDate: Date; persons: string; }) => {

    const totalAmount = Number(persons) * tour.pricePerPerson
    const s1 = startDate.toString();
    const strDate = s1.split('T')[0];
    const e1 = endDate.toString();
    const edDate = e1.split('T')[0];

    return (
        <Card className="sticky top-24">
            <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-lg">Booking Summary</h3>

                <div className="text-sm space-y-1">
                    <p>Tour: {tour.title}</p>
                    <p>{`Dates: ${strDate} - ${edDate}`}</p>
                    <p>Persons: {persons}</p>
                </div>

                <div className="border-t pt-3">
                    <p className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>৳ {totalAmount}</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

export default BookingSummary;
