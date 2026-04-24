import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/home");
}

// import HomePage from "../components/pages/home";

// export default function Home() {
//   return <HomePage />;
// }
