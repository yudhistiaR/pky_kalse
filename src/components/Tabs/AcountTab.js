import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProfileCard from "../account/ProfileCard";
import AccountSetting from "../account/accountSetting";
import AddAccount from "../account/AddAccount";
import UserList from "../account/UserList";

const AccountTab = () => {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile">Account</TabsTrigger>
        <TabsTrigger value="set">Account Setting</TabsTrigger>
        <TabsTrigger value="addUser">Tambah Pengguna</TabsTrigger>
        <TabsTrigger value="list">List Pengguna</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ProfileCard />
      </TabsContent>
      <TabsContent value="set">
        <AccountSetting />
      </TabsContent>
      <TabsContent value="addUser">
        <AddAccount />
      </TabsContent>
      <TabsContent value="list">
        <UserList />
      </TabsContent>
    </Tabs>
  );
};

export default AccountTab;
