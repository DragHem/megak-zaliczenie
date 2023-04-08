import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { UserService } from "services";
import { usePopup } from "../../../components/providers/PopupProvider";
import { useRouter } from "next/router";

interface Props {
  message: string;
  status: string;
}

const ActivationPage = ({ message, status }: Props) => {
  const { triggerPopup } = usePopup();
  const router = useRouter();

  useEffect(() => {
    triggerPopup(message, status);
    setTimeout(() => router.push("/"), 1850);
  }, []);

  return null;
};

export default ActivationPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.activationId as string;

  const { message, status } = await UserService.activateUser(query);

  return {
    props: {
      message,
      status,
    },
  };
};
