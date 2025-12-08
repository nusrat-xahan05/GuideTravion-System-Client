// // import UsersFilters from "@/components/modules/Admin/UsersManagement/UsersFilters";
// import UsersManagementHeader from "@/components/modules/Admin/GuidesManagement/UsersManagementHeader";
// import UsersTable from "@/components/modules/Admin/GuidesManagement/UsersTable";
// // import TablePagination from "@/components/shared/Table/TablePagination";
// // import { TableSkeleton } from "@/components/shared/Table/TableSkeleton";
// // import { queryStringFormatter } from "@/lib/formatters";
// // import { getDoctors } from "@/services/admin/doctorManagement";
// import { getAllGuides } from "@/services/admin/userManagement";
// // import { getSpecialities } from "@/services/admin/specialitiesManagement";
// // import { Suspense } from "react";

// const AdminUserManagementPage = async ({
//     searchParams,
// }: {
//     searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// }) => {
//     // const searchParamsObj = await searchParams;
//     // const queryString = queryStringFormatter(searchParamsObj); // {searchTerm: "John", speciality: "Cardiology" => "?searchTerm=John&speciality=Cardiology"}
//     // const specialitiesResult = await getSpecialities();
//     // const doctorsResult = await getDoctors(queryString);
//     const guidesResult = await getAllGuides();
//     // console.log('from page: ', guidesResult);
//     // console.log({ doctorsResult });
//     // const totalPages = Math.ceil(
//     //     (doctorsResult?.meta?.total || 1) / (doctorsResult?.meta?.limit || 1)
//     // );
//     return (
//         <div className="space-y-6">
//             <UsersManagementHeader />
//             {/* <UsersManagementHeader specialities={specialitiesResult?.data || []} /> */}
//             {/* <UsersFilters specialties={specialitiesResult?.data || []} /> */}
//             {/* <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
//                 <UsersTable
//                     doctors={doctorsResult.data}
//                     specialities={specialitiesResult?.data || []}
//                 /> */}
//             <UsersTable
//                 guides={guidesResult.data}
//             />
//             {/* <TablePagination
//                     currentPage={doctorsResult?.meta?.page || 1}
//                     totalPages={totalPages || 1}
//                 />
//             </Suspense> */}
//         </div>
//     );
// };

// export default AdminUserManagementPage;