"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { getUserByAddress } from "@/service/contract/queries";
import Link from "next/link";
import { AlignJustify, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const ActionButton = () => {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();

  const [user, setUser] = useState<unknown>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    if (!ready) return;
    if (!authenticated) return;
    if (!wallets?.length) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await getUserByAddress(wallets[0].address);

        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [ready, authenticated, wallets]);

  const DropdownMenus = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="pr-2">
      <div className=" items-center justify-center flex ">
        <div className="flex xl:space-x-4">
          {authenticated && user !== "User does not exist." ? (
            <>
              <Link
                href={"/dashboard"}
                className="
            lg:flex
            items-center
            hidden
            
            "
              >
                <div className="">Dashboard</div>
              </Link>
              <div
                className="font-thin     
        lg:flex
        ml-4 mr-0
            items-center
            hidden"
              >
                |
              </div>
            </>
          ) : authenticated && user == "User does not exist." ? (
            <>
              <Link
                href={"/onboard"}
                className="
          lg:flex
          items-center
          hidden
         
          "
              >
                <div className="">Get DID</div>
              </Link>
              <div
                className="font-thin lg:flex
          items-center
          ml-4 mr-0
          hidden"
              >
                |
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="flex lg:space-x-2 items-center pr-4">
          {/* <Link href={"/free"}>
            <Button
              variant={"outline"}
              className="
            lg:flex
            items-center
            hidden
                border-none 
                text-md
                
                "
            ></Button>
          </Link> */}
          {authenticated ? (
            <Button className="hidden lg:block " onClick={logout}>
              Disconnect
            </Button>
          ) : (
            <Button className="hidden lg:block" onClick={login}>
              Connect
            </Button>
          )}
        </div>
      </div>

      {isDropdownVisible && (
        <div
          onClick={toggleDropdown}
          className="
             rounded-full
             xl:hidden"
        >
          <X className="h-5 w-5  items-center justify-center rounded-full" />
        </div>
      )}
      {!isDropdownVisible && (
        <div onClick={toggleDropdown} className="flex lg:hidden">
          <AlignJustify className="h-6 w-6 items-center justify-center mr-2" />
        </div>
      )}

      {isDropdownVisible && <DropdownMenus />}
    </div>
  );
};

export default ActionButton;
