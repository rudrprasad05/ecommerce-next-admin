"use client";

import Button from "@/components/Button";
import Nav from "@/components/Nav";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return <div>{domLoaded && <div>hello</div>}</div>;
};

export default Users;
