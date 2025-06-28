"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  CreditCard,
  Bell,
  FileText,
  LogOut,
  Crown,
} from "lucide-react";

interface Props {
  userName?: string;
  userEmail?: string;
  userInitials?: string;
  isPremium?: boolean;
}

const UserDropdown = ({
  userName = "User",
  userEmail = "user@example.com",
  userInitials = "U",
  isPremium = false,
}: Props) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        className="relative h-8 w-8 rounded-full bg-blue-600 text-white text-sm font-semibold"
      >
        {userInitials}
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium">{userName}</p>
            {isPremium && <Crown className="h-3 w-3 text-yellow-500" />}
          </div>
          <p className="text-xs text-muted-foreground">{userEmail}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuItem asChild>
        <a href="/admin/account/profile" className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          Profile
        </a>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <a href="/admin/dashboard/properties" className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          My&nbsp;Properties
        </a>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <a href="/admin/tools/alerts" className="flex items-center">
          <Bell className="mr-2 h-4 w-4" />
          Alerts&nbsp;&amp;&nbsp;Notifications
        </a>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem asChild>
        <a href="/admin/account/plan" className="flex items-center">
          <CreditCard className="mr-2 h-4 w-4" />
          Billing&nbsp;&amp;&nbsp;Plan
        </a>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <a href="/admin/account/settings" className="flex items-center">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </a>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        className="text-red-600 cursor-pointer"
        onClick={() => window.location.assign("/api/auth/signout")}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Log&nbsp;out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserDropdown;