import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {BookingSearchInput} from "@/features/manager/bookings/filter-booking/ui/BookingSearchInput";
import BookingTable from "@/features/manager/bookings/booking-table/ui/BookingTable";

export default function ManagerBookingsPage() {
  return (
      <>
        <BreadcrumbLayout
            items={[
                { label: "Менеджер", href: "/manager" },
              { label: "Бронирования", href: "/manager/bookings" }
            ]}
        />
          <BookingSearchInput />
          <BookingTable />
      </>
  );
}
