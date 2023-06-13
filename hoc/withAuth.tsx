import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { api } from "config/axios";
import useAuth from "hooks/useAuth";

interface WrappedComponentProps {
  isAuthenticated: boolean;
}

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuth = (props: P & WrappedComponentProps) => {
    const router = useRouter();
    const [cookies] = useCookies(["token"]);
    const { setUserAsLoggedIn } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      console.log("WITH AUTHH");
      setIsLoading(false);

      if (!cookies.token) {
        router.push("/auth/login");
        return;
      }

      const verifyToken = async () => {
        try {
          const res = await api.get("/auth/profile", {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });

          const user = res.data;

          setUserAsLoggedIn({
            userId: user.id,
            username: user.username,
            token: cookies.token,
          });
        } catch (error) {
          console.error(error);
          router.push("/auth/login");
        }
      };

      verifyToken();
    }, [cookies.token, router, setUserAsLoggedIn]);

    if (isLoading) {
      return null;
    }

    if (cookies.token) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };

  WithAuth.displayName = `withAuth(${WrappedComponent.name})`;

  return WithAuth;
};

export default withAuth;
