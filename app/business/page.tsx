import { redirect } from "next/navigation";

// /business itself just sends people to the login (which links to sign-up)
export default function BusinessIndex() {
  redirect("/business/login");
}
