//              React Query              //
// Similar to contextAPI or redux to setup:
// 1) create a place where the data will be lives
// 2) provide that to the application
// useQuery()
// The hook that we will use all the time is useQuery()
// It accept object with 2 things : 1) queryKey: [], 2) queryFn: getCabins it's for fetching data from api
// It return states like isLoading, data, error (destructure it) & more & more (u can check that by print it)
// The way to do mutation is by useMutation({
//mutationFn: (id) => deleteCabin(id)
//});
// If we wanna to let the fetched data fetch again we will use invalidate (u can see it in toolkit)
// How the program will know ?! by onSuccess property
// We can get access on QueryClient by useQueryClient();
// I can pass in mutate function the properties like : onSuccess
// Also can get access at the data that the mutation function return
// One of the biggest advantage of use React Query that:
// request and fetching data even if I dont open the page like (cabin) by call this data in main(app) page
// In queryKey the array work like dependency array in useEffect(if I put an obj or anything else it will re-fetch if this obj changed)
// I can prefetching use queryClient to prefetch using queryClient.prefetchQuery
// Function for useQueryClient is setQueryData(["name"], data):
// It provided to you to set data manually into reactQuery cache
// onSettled: used like onSuccess but it work even the mutation success or return error
//        React-hook-form             //
// Used to handling forms in react SPA applications
// use it by install, after that using useForm() (print it)
// important things in useForm() is {register, handleSubmit, reset, getValues, formState} //reset : to reset the form (let it empty)
// getValues(): as the name says get values from current form it used like that:
// getValues().nameOfValue
// formState: to get the errors from it
// 1st step: in all input fields we should type like that {...register(theId for component)} // I can in it an object contain required, min, max, validate
// min & max to specify the value of this input
// validate: to check the value at these input
// 2nd step: add handleSubmit to onSubmit at form (u can watch CreateCabinForm file)
// If I have one children and everytime it accept a property like id or class I can access to it from {children} prop like that: {children.props.id}
// If I wanna to send data(column that I will update, value) to update it in database sending like that updateSetting({ [field]: value });
//        Render Prop           //
// It's a prop like any other prop
// Accept a function to render it in the element that it recieved without these element know what it's recieve
// Special useCase for it like that (we need to pass two different components with different props to the same element) : render={(company) => (
//   <CompanyItem
//     key={company.companyName}
//     company={company}
//     defaultVisibility={false}
//   />
// )}
// render={(product) => (
//   <ProductItem key={product.productName} product={product} />
// )}

//    React-portal           //
// Allows us to render an element outside the parent component DOM structure
// We can render a component in any place where we want in parent component
// UseCase: To avoid {overflow: hidden}
// It used like this:
// return createPortal(jsx,where to render like: document.querySelector(".root"))
// Search about cloneElement in react.dev )(uncommomt technique)
// This is how to create compound component (in ./ui/Modal)
// 1. create contextAPI
// 2. create parent function (here it's Modal)

// I can get all props at Component using ...props

//        Rechart-library       //
// struture in SalesChart
// ResponsiveContainer: as the name says
// AreaChart: for add the data & hieght & width
// XAxis, YAxis: unit(to add more text to data like "$")
// CartesianGrid: to show the lines behind the chart strokeDashArray(add number to let the lines behind the chart dashed )
// Tooltip: allow hover on the chart and show a value and the {dataKey}
// Area: recieve a dataKey as name type(u can search about it), stroke & fill for colors of chart
//        react error Boundaries    //
// Like try & catch
// Wrap <App /> in ErrorBoundary
// FallbackComponent: property to accept component to show

//  window.matchMedia("(prefers-color-scheme: dark").matches : to see if user prefer darkmode or not by his settings
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
// setup the cache and query client using QueryClient()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // specifies options for our query
      // staleTime: 60 * 1000, // amount of time that data in the cache stay fresh (if I update something in fetched data it will change when the status changed from fresh to stale (after that if I leave the page and return to it the data will change) )
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<CheckIn />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
