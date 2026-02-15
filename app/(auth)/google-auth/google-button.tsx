"use client";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import http from "@/services/http";
import cookie from "@/services/cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dispatch, FC, SetStateAction } from "react";
import { Loader2 } from "lucide-react";

export const GoogleButton: FC<{
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}> = ({ isLoading, setIsLoading }) => {
  const router = useRouter();
  const googleSignup = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
      try {
        const res = await http.post(`/auth/google`, {
          token: response.access_token,
        });
        if (res.data.status === 201) {
          cookie.set("google-email", res.data.data.email);
          toast.success("Successful!", {
            description: res.data.message,
          });
          router.push("/google-auth");
        } else if (res.data.status == 200) {
          cookie.set("auth-user", res.data.data);
          toast.success("Successful!", {
            description: res.data.message,
          });
          router.push("/dashboard");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const description =
          error.response.data.message === "User not found"
            ? "You are using a wrong login method for this user."
            : error.response.data.message;
        toast.error("Login failed!", {
          description,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      {/* Separator with lines */}
      <div className="flex items-center mt-10 gap-x-4">
        <div className="w-24">
          <Image src="/Line6.svg" alt="line6.png" width={500} height={500} />
        </div>
        <p className="text-center w-32">Or continue with</p>
        <div className="w-24">
          <Image src="/Line7.svg" alt="line7.png" width={500} height={500} />
        </div>
      </div>

      {/* Social button */}
      <div className="flex mt-5 ">
        <div className="flex gap-7 justify-center w-full">
          <Button
            variant="outline"
            className="bg-[#F3F3F3] border-none"
            onClick={() => googleSignup()}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Image
                src="/google-icon.svg"
                alt="Google"
                width={20}
                height={20}
              />
            )}
          </Button>
        </div>
      </div>
    </>
  );
};
