import React, { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Button,
  Typography,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  ChevronDownIcon,
  PencilSquareIcon
} from "@heroicons/react/24/solid";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import EditModalAkun from "../profile/EditModalAkun";
import EditModalName from "../profile/EditModalName";

export default function ProfileMenu({ photoURL, displayName, username, mutate, id }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [isEditModalNameOpen, setIsEditModalNameOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Destroy the 'token' cookie
    destroyCookie(null, "token", { path: "/" });
    destroyCookie(null, "username", { path: "/" });
    destroyCookie(null, "role", { path: "/" });
    destroyCookie(null, "id", { path: "/" });

    // Redirect to the login page
    router.push("/");
  };

  const profileMenuItems = [
    {
      label: "Profil",
      icon: UserCircleIcon,
      action: () => router.push("/profile"),
    },
    {
      label: "Edit Display Name",
      icon: PencilSquareIcon    ,
      action: () => setIsEditModalNameOpen(true), // Buka modal edit akun saat diklik
    },
    {
      label: "Edit Akun",
      icon: PencilSquareIcon    ,
      action: () => setIsEditModalOpen(true), // Buka modal edit akun saat diklik
    },
    {
      label: "Log Out",
      icon: PowerIcon,
      action: handleLogout, // Tambahkan properti action
    },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="User Photo"
              className="border border-blue-900 p-0.5"
              src={photoURL}
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          <div className="mx-4 mt-2">
            <div className="font-semibold text-blue-gray-900 text-base">
              {displayName}
            </div>
            <div className="text-blue-gray-400 text-xs">{username}</div>
          </div>
          <hr className="my-2 mx-4 border" />
          {profileMenuItems.map(({ label, icon, action }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={() => {
                  if (action) action(); // Panggil fungsi action jika tersedia
                  closeMenu();
                }}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${
                    isLastItem ? "text-red-500" : ""
                  }`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      {/* Modal Edit Akun */}
      { isEditModalOpen &&
        <EditModalAkun
        uname={username}
        userId={id}
        mutate={mutate}
        onClose={() => setIsEditModalOpen(false)}
      />
     }
      {/* Modal Edit Name */}
      { isEditModalNameOpen &&
        <EditModalName
        name={displayName}
        userId={id}
        mutate={mutate}
        onClose={() => setIsEditModalNameOpen(false)}
      />
     }
    </>
  );
}
